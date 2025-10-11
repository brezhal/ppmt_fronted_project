import {
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { Modal, message } from 'antd';
import React, { cloneElement, useCallback, useState } from 'react';
export type FormValueType = {
  orderNo?: string;
  customerName?: string;
  customerPhone?: string;
  amount?: number;
  status?: string;
  address?: string;
  description?: string;
} & Partial<API.OrderListItem>;

export type UpdateFormProps = {
  trigger?: React.ReactElement<any>;
  onOk?: () => void;
  values: Partial<API.OrderListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { onOk, values, trigger } = props;

  const intl = useIntl();

  const [open, setOpen] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const { run } = useRequest(async (data: any) => {
    // 这里可以调用更新订单的API
    console.log('更新订单数据:', data);
    return Promise.resolve();
  }, {
    manual: true,
    onSuccess: () => {
      messageApi.success('订单更新成功');
      onOk?.();
    },
    onError: () => {
      messageApi.error('订单更新失败，请重试！');
    },
  });

  const onCancel = useCallback(() => {
    setOpen(false);
  }, []);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onFinish = useCallback(
    async (values?: any) => {
      await run({ data: values });

      onCancel();
    },
    [onCancel, run],
  );

  return (
    <>
      {contextHolder}
      {trigger
        ? cloneElement(trigger, {
            onClick: onOpen,
          })
        : null}
      <StepsForm
        stepsProps={{
          size: 'small',
        }}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              width={640}
              styles={{
                body: {
                  padding: '32px 40px 48px',
                },
              }}
              destroyOnHidden
              title="订单编辑"
              open={open}
              footer={submitter}
              onCancel={onCancel}
            >
              {dom}
            </Modal>
          );
        }}
        onFinish={onFinish}
      >
        <StepsForm.StepForm
          initialValues={values}
          title="基本信息"
        >
          <ProFormText
            name="orderNo"
            label="订单号"
            width="md"
            disabled
          />
          <ProFormText
            name="customerName"
            label="客户姓名"
            width="md"
            rules={[
              {
                required: true,
                message: '请输入客户姓名！',
              },
            ]}
          />
          <ProFormText
            name="customerPhone"
            label="客户电话"
            width="md"
            rules={[
              {
                required: true,
                message: '请输入客户电话！',
              },
            ]}
          />
          <ProFormText
            name="amount"
            label="订单金额"
            width="md"
            valueType="money"
            rules={[
              {
                required: true,
                message: '请输入订单金额！',
              },
            ]}
          />
        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
};

export default UpdateForm;
