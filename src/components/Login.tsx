import React, { useState, useEffect } from 'react';  
import type { FormProps } from 'antd';  
import { Button, Checkbox, Form, Input } from 'antd';  
import { useNavigate } from 'react-router-dom';

type FieldType = {  
    username?: string;  
    password?: string;  
    remember?: boolean;  
};  

interface LoginProps { 
    setLogin: React.Dispatch<React.SetStateAction<boolean>>; 
    setNewUser: React.Dispatch<React.SetStateAction<string>>;
} 

const Login: React.FC<LoginProps> = ({ setLogin , setNewUser }) => {  
    const [name, setName] = useState<string>('');  
    const navigate = useNavigate()
    const onFinish = (values: FieldType) => {
        if(values.username === 'admin' && values.password === 'admin'){
            setName(values.username || '');
            setNewUser(values.username || '')
            setLogin(true); 
            navigate('/main')
            console.log("User logged in:", values.username); 
        } 
        else 
            alert('Неправильное имя пользователя или пароль');
    };  
 

    return (  
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>  
            <Form  
                name="basic"  
                labelCol={{ span: 8 }}  
                wrapperCol={{ span: 16 }}  
                style={{ maxWidth: 600 }}  
                initialValues={{ remember: true }}  
                onFinish={onFinish}  
                autoComplete="off"  
            >  
                <Form.Item<FieldType>  
                    label="Username"  
                    name="username"  
                    rules={[{ required: true, message: 'Please input your username!' }]}  
                >  
                    <Input />  
                </Form.Item>  

                <Form.Item<FieldType>  
                    label="Password"  
                    name="password"  
                    rules={[{ required: true, message: 'Please input your password!' }]}  
                >  
                    <Input.Password />  
                </Form.Item>  

                <Form.Item<FieldType>  
                    name="remember"  
                    valuePropName="checked"  
                    wrapperCol={{ offset: 8, span: 16 }}  
                >  
                    <Checkbox>Remember me</Checkbox>  
                </Form.Item>  

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>  
                    <Button type="primary" htmlType="submit">  
                        Submit  
                    </Button>  
                </Form.Item>  
            </Form>  
        </div>          
    );  
}  

export default Login; 
