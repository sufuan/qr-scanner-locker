import { Button, Checkbox, DatePicker, Form, Input, Select } from 'antd';
import axios from 'axios';

const Login = () => {

  

    const onFinish = async (fieldsValue) => {



        const values = {
            ...fieldsValue,
            
        }
        console.log('Received values of form: ', values);



       
    };



    return (
        <div className='container mx-auto'>

          
            <div>
                <div className='block  rounded-lg shadow-lg bg-white mt-5'>


                    <h1 className='bg-[#f3f3f3] p-2 mb-2'>form </h1>

                    <Form onFinish={onFinish}>
                        <div className='grid grid-cols-3 gap-3 p-3 '>

                            {/* class  */}

                          
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
                                <Button htmlType="submit">
                                    Login
                                </Button>
                            </Form.Item>
                        </div>

                    </Form>


                </div>


            </div>

        </div>
    );
};

export default Login;
