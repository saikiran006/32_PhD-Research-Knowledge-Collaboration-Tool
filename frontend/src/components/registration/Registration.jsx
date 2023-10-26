import React from "react";
import { Link } from 'react-router-dom'
// import './Register.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const baseurl = 'http://localhost:8080/user'

const Registration = () => {
    let navigate = useNavigate();
    const [form, setformdata] = React.useState({
        name: '',
        emailId: '',
        password: '',
        conf_password: ''
    });
    const handleForm = e => {
        let name = e.target.name;
        let val = e.target.value;
        setformdata({ ...form, [name]: val })
        console.log(form);
    }

    const register = () => {
        console.log("register called!")
        if (form.password !== form.conf_password) {
            alert("Passwords does not match");
        }
        else {
            axios.post(baseurl, {
                name: form.name,
                emailId:form.emailId,
                password: form.password
            }).then(response => {
                console.log(response)
                navigate('/login');
            })
                .catch(err => alert(err.response.data.message));
        }
    }

    return (
        <>
            <br />

            <h1>Register</h1>
            <br />
            <form>
                <div><input type="text" name="name" id="name" value={form.name} placeholder="name" onChange={handleForm} required /></div>
                <div><input type="email" name="emailId" id="emailId" value={form.emailId} placeholder="emailId" onChange={handleForm} required /></div>
                <div><input type="password" name="password" id="password" value={form.password} placeholder="password" onChange={handleForm} required /></div>
                <div><input type="password" name="conf_password" id="conf_password" value={form.conf_password} placeholder="confirm password" onChange={handleForm} required /></div>

                <div><button type="button" className="btn btn-primary" onClick={register}>Register</button> </div>
            </form>
            <Link to="/login">login</Link>
        </>
    );
};
export default Registration;
