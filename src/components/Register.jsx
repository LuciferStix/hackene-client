import React from 'react'
import Logo from "../assets/logo.png"
import { Link, useNavigate,redirect } from 'react-router-dom'
import './scss/register.scss'
import { useState,useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerroute } from '../utils/APIRoutes'
import axios from 'axios'



function Register() {
    const navigate = useNavigate();
    const [value, setvalue] = useState({
        username: "",
        email: "",
        password: "",
        confirmpassword: ""
    })
    const toastOptions = (position = "top-center", autoclose = 6000) => {
        return {
            position: position, // positions are : top-center , top-left,top-right , similarly for others 
            autoClose: autoclose,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
        }
    }

    useEffect(() => {
        if(localStorage.getItem('chatment_user')){
          navigate('/');
        }
      }, [])


    async function handlesubmit(e) {
        e.preventDefault();
        if (handleValidation()) {

            const { username, email, password } = value;

            //----------posting data to the particular route in postroute
            const { data } = await axios.post(registerroute, {
                username,
                email,
                password
            })
            // console.log(`the status recieved from post ${JSON.stringify(data.msg)}`);
            if (data.status) {
                console.log('status checked.....')
                localStorage.setItem('chatment_user', JSON.stringify(data.user_data));
                navigate('/setavatar');

            }
            else
                toast.error(data.msg, toastOptions)

        }
    }


    function handleValidation() {
        // e.preventDefault()
        const { username, password, confirmpassword } = value;
        if (password !== confirmpassword) {
            toast.error('passwords are not matching', toastOptions);
            return false;
        } else if (username.length <= 3) {
            toast.info('username is too small !!! ', toastOptions);
            return false;
        } else if (password.length < 5) {
            toast.info('password is too small', toastOptions);
            return false;
        }
        return true;

    }


    function handlechange(e) {
        setvalue({ ...value, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="form-cont">
                <form onSubmit={(e) => { handlesubmit(e) }}>
                    <div className="brand">
                        <img src={Logo} alt="" />
                        <h1>chatment</h1>
                    </div>
                    <input type="text" name="username" placeholder="username" onChange={(e) => handlechange(e)} />
                    <input type="text" name="email" placeholder="email" onChange={(e) => handlechange(e)} />
                    <input type="password" name="password" placeholder="password" onChange={(e) => handlechange(e)} />
                    <input type="password" name="confirmpassword" placeholder="confirm password" onChange={(e) => handlechange(e)} />
                    <button type="submit" >create user</button>
                    <span>already have an account ? <Link to="/login">login</Link></span>
                </form>
                <ToastContainer />
            </div>
        </>
    )
}

export default Register;