import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright="辅助新人群 qq+1053502785"
      links={[{
        key: 'name',
        title: '点击使用软件-ppmt辅助超线程',
        href: 'https://hamibot.com/marketplace/PtzU1',
        blankTarget: true,
      }]}
    />
  );
};

export default Footer;
