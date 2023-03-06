import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Button, Form, Input } from 'antd'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Qrcode = () => {
  const [qrcode, setQrcode] = useState('')
  const [qrimage, setQrimage] = useState(null)
  




  const { user } = useSelector(state => state.auth)

  const email = user?.data?.email

  const onFinish = (fieldsValue) => {

    const values={
      ...fieldsValue,
      email
    }
  //  console.log(values)

    axios.post('http://localhost:5000/scanqrcode', values)
      .then(res => {
        console.log(res.data.data.qrCode)
        setQrimage(res.data?.data?.qrCode)
      })


  }

  const navigate = useNavigate(

  )




  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [navigate, user])

  return (


    <div>
      <Form onFinish={onFinish}>
        <Form.Item
          name="qrText"
          label="name"
          rules={[
            {
              required: true,
              message: 'Please input your info!',
              whitespace: true,
            },
          ]}
        >
          <Input />


        </Form.Item>

        <Button htmlType="submit">
          Register
        </Button>
      </Form>




      {
        qrimage  &&

          <>
            <a href={qrimage} download>
              <img src={qrimage} alt='jhjh' />

            </a>
          </> 

      }


     

    </div>
  );
};

export default Qrcode;