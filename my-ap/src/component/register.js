import { Button, Checkbox, DatePicker, Form, Input, message, Select } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { registerUser, reset } from '../features/auth/authSlice';

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user ) {
            toast.success(message)
            navigate('/')
        }

        // dispatch(reset())

    }

        , [user, isError, isLoading, message, isSuccess, dispatch])


    const onFinish = async (fieldsValue) => {
        const values = {
            ...fieldsValue,
        }

        dispatch(registerUser(values))
    };
    return (
        <div className='container mx-auto'>
            <div>
                <div className='block  rounded-lg shadow-lg bg-white mt-5'>
                    <h1 className='bg-[#f3f3f3] p-2 mb-2'>form </h1>

                    <Form onFinish={onFinish}>
                        <div className='grid grid-cols-3 gap-3 p-3 '>

                            <Form.Item
                                name="name"
                                label="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name!',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                        </div>
                        <div className="flex justify-end  flex-row gap-4 p-4">
                            <Form.Item >
                                {
                                    isLoading ? <>
                                        <Button loading>
                                            Loading
                                        </Button>

                                    </> : <>

                                        <Button htmlType="submit">
                                            Register
                                        </Button>

                                    </>
                                }
                            </Form.Item>
                        </div>

                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Register;


























