import React from 'react'
import { Button , Form , Input} from 'antd'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../redux/alertSlice'

function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async (values) => {

        try {

            dispatch(showLoading())
            const response = await axios.post('/api/admin/login' , values)
            dispatch(hideLoading())
            if(response.data.success){

                toast.success(response.data.message)
                toast('Redirecting to Dashboard')
                localStorage.setItem('token', response.data.data)
                navigate('/admin/dashboard')

            }else{

                toast.error(response.data.message)

            }

        } catch (error) {

            dispatch(hideLoading())
            toast.error('Something went wrong')

        }

    }

    return (
        <>
            <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div
                    className="card bg-dark text-white"
                    style={{ borderRadius: "1rem" }}
                    >
                    <div className="card-body p-5 text-center ">
                        <div className="mb-md-2 mt-md-4 pb-5">
                        <h2 className="fw-bold mb-2 text-uppercase">LOGIN</h2>
                        <Form className='mt-5' layout='vertical' onFinish={onFinish}>
                            <Form.Item name='email'>
                                <Input className='p-2 text-black' placeholder='Email'/>
                            </Form.Item>
                            <Form.Item name='password'>
                                <Input className='p-2 text-black' type='password' placeholder='Password'/>
                            </Form.Item>
                        <Button type="primary" shape='round' size='large' className='px-5 mt-4 h1 fw-bold' htmlType='submit'>Login</Button>
                        </Form>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
        </>
    )
}

export default Login
