import React from "react";
import { Link } from 'react-router-dom'
// import './Login.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    var baseurl = 'http://localhost:8080/user/login'
    const navigate = useNavigate();

    const [form, setformdata] = React.useState({
        emailId: '',
        password: '',
    });
    const handleForm = e => {
        let name = e.target.name;
        let val = e.target.value;
        setformdata({ ...form, [name]: val })
        console.log(form);
    }
    const login = () => {
        // let params = new URLSearchParams()
        console.log({ form: form })
        axios.post(baseurl, {
            emailId: form.emailId,
            password: form.password
        }).then(res => {
            console.log(res)
            // sessionStorage.setItem("JWTToken",res.);
            // alert(res.data.message);
            console.log(res.data.token)
            sessionStorage.setItem('userLoggedIn', form.emailId)
            sessionStorage.setItem('token',res.data.token)
            navigate('/dashboard')
        }).catch(err=>alert(err.response.data.message))
    }
    return (
        <>
            <br />
            <h1>Login</h1>
            <br />
            <form>
                <div className="text-box"><input type="text" name="emailId" id="emailId" value={form.emailId} placeholder="emailId" onChange={handleForm} required /></div>
                <div className="text-box"><input type="password" name="password" id="password" value={form.password} placeholder="password" onChange={handleForm} required="true" /></div>
                <div className="text-box"><button type="button" className="btn btn-primary" onClick={login}>Login</button> </div>
            </form>
            <Link to="/">Register</Link>
        </>
    );
};

export default Login;