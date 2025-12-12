import crypto from 'crypto';
import { extractStoreName } from './extractStoreName';

// 加密密钥
const ENCRYPTION_KEY_MD5 = '1cf2c91930c4a46cf84bc65fd418a567dd70f2741596c569894e4085b7b07666';

/**
 * 解密函数 - 对应encryptMD5的解密
 * @param encryptedText 加密的文本，格式为 "salt:encrypted_hex"
 * @returns 解密后的原始文本
 */
function decryptMD5(encryptedText: string): string {
  try {
    if (!encryptedText) return encryptedText;
    
    // 检查格式是否正确
    if (!encryptedText.includes(':')) {
      console.warn('解密失败: 格式不正确，缺少冒号分隔符');
      return encryptedText;
    }
    
    // 分离盐值和加密数据
    const [salt, encryptedHex] = encryptedText.split(':');
    
    if (!salt || !encryptedHex) {
      console.warn('解密失败: 盐值或加密数据为空');
      return encryptedText;
    }
    
    // 使用相同的密钥+盐值生成MD5
    const keyHash = crypto.createHash('md5').update(ENCRYPTION_KEY_MD5 + salt).digest('hex');
    
    // 将加密的十六进制字符串转换为字节数组
    const encryptedBytes = Buffer.from(encryptedHex, 'hex');
    const keyBytes = Buffer.from(keyHash, 'hex');
    
    // XOR解密（XOR是对称的，加密和解密使用相同的操作）
    let decrypted = Buffer.alloc(encryptedBytes.length);
    for (let i = 0; i < encryptedBytes.length; i++) {
      decrypted[i] = encryptedBytes[i] ^ keyBytes[i % keyBytes.length];
    }
    
    // 将字节数组转换回UTF-8字符串
    return decrypted.toString('utf8');
  } catch (error) {
    console.error('解密失败:', error);
    return encryptedText; // 如果解密失败，返回原文
  }
}

/**
 * 解密订单数据列表
 * @param orders 订单列表
 * @returns 解密后的订单列表
 */
export function decryptOrdersList(orders: any[]): any[] {
  if (!Array.isArray(orders)) {
    return orders;
  }
  
  return orders.map(order => {
    try {
      // 解密data字段
      if (order.data && typeof order.data === 'string') {
        const decryptedData = decryptMD5(order.data);
        
        // 尝试解析JSON
        let parsedData = {};
        try {
          parsedData = JSON.parse(decryptedData);
        } catch (parseError) {
          console.warn('解密后的数据不是有效的JSON:', parseError);
          parsedData = { raw: decryptedData };
        }
        
        // 如果parsedData中有storeName字段，提取店铺名称
        if (parsedData && typeof parsedData === 'object' && 'storeName' in parsedData) {
          const originalStoreName = parsedData.storeName;
          if (typeof originalStoreName === 'string') {
            parsedData.storeName = extractStoreName(originalStoreName);
          }
        }
        
        return {
          ...order,
          data: decryptedData,
          parsedData: parsedData
        };
      }
      
      return order;
    } catch (error) {
      console.error('解密订单数据失败:', error, order);
      return order;
    }
  });
}

export default decryptMD5;
