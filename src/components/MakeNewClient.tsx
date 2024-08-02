import React, { forwardRef, useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Space } from 'antd';
import { UndoOutlined } from '@ant-design/icons';
import InputMask from 'react-input-mask';
import { z } from 'zod';
import { ClientData } from '../types';
import type { DatePickerProps } from 'antd';
import type { Dayjs } from 'dayjs';

const { Option } = Select;

interface Props {
  newClientId: number;
  CloseForm: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => void;
}

const MaskedInput = forwardRef((props: any, ref: any) => (
  <InputMask {...props} ref={ref}>
    {(inputProps: any) => <Input {...inputProps} />}
  </InputMask>
));

const clientSchema = z.object({
  
    id: z.number().int(),
    name: z.string().nonempty('Пожалуйста, введите ваше имя!'),
    data: z.string().nonempty('Пожалуйста, выберите дату!'),
    number: z.string().nonempty('Некорректный номер телефона!'),
    country: z.string(), 
    email: z.string().optional(),
});

const MakeNewClient: React.FC<Props> = ({ newClientId, CloseForm, fetchData }) => {
  const [date, setDate] = useState<any>('');
  const onChange: DatePickerProps<Dayjs[]>['onChange'] = (date, dateString) => {
    setDate(dateString);
  };

  const onFinish = (client: any) => {
    const result = clientSchema.safeParse({
      id: Number(newClientId),
      name: client.name,
      data: date,
      number: client.number,
      country: client.country,
      email: client.email,
    });

    if (!result.success) {
      console.error('Ошибки валидации:', result.error.errors);
      return;
    }

    const newData: ClientData = result.data;


    fetch('https://66a3f9b844aa637045830af6.mockapi.io/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        fetchData();
        CloseForm(false);
        setDate('');
      })
      .catch((error) => {
        console.error('Ошибка при создании клиента:', error);
      });

    console.log(result);
  };

  return (
    <div style={{ paddingTop: 20 }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="ФИО"
          name="name"
          rules={[{ required: true, message: 'Пожалуйста, введите ваше имя!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Дата"
          name="data"
          rules={[{ required: true, message: 'Пожалуйста, выберите дату!' }]}
        >
          <DatePicker onChange={onChange} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Номер телефона"
          name="number"
          rules={[{ required: true, message: 'Пожалуйста, введите номер телефона!' }]}
        >
          <MaskedInput mask="+7 (999) 999-99-99" maskChar={null} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'Некорректный формат электронной почты!',
            },
            {
              required: true,
              message: 'Пожалуйста, введите ваш E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Адрес">
          <Space.Compact>
            <Form.Item
              name={['address', 'province']}
              noStyle
              rules={[{ required: true, message: 'Регион обязателен!' }]}
            >
              <Input style={{ width: '50%' }} placeholder="Введите город" />
            </Form.Item>
            <Form.Item
              name={['address', 'street']}
              noStyle
              rules={[{ required: true, message: 'Улица обязательна!' }]}
            >
              <Input style={{ width: '50%' }} placeholder="Введите улицу" />
            </Form.Item>
          </Space.Compact>
        </Form.Item>

        <Form.Item
          label="Страна"
          name="country"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ marginTop: 20 }}>
          <Button type="default" style={{ marginRight: 10 }} icon={<UndoOutlined />} htmlType="reset">
            Отмена
          </Button>
          <Button type="primary" htmlType="submit">
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MakeNewClient;
