// eslint-disable-next-line
import useLogout from '../hook/useLogout';
import useLogin from '../hook/useLogin';
import React, {useState, Component, PureComponent} from 'react';
import {useForm} from 'react-hook-form';
import useVerify, { requestVerification } from '../hook/useVerify';
import pb from '../lib/pocketbase';
import './Auth.css';
import { isError } from 'react-query';

const Auth = () => {
    const {register, handleSubmit, reset} = useForm();

    const [DUMMY, setDUMMY] = useState(0);
    const isLoggedin = pb.authStore.isValid;

    //login function
    const logout = useLogout();
    const {data: isVerified} = useVerify();
    const {mutate: login, isLoading, isError} = useLogin();

    async function onSubmit(data){
        login({email: data.email, password: data.password})
        reset();
    }
    function onLogout(){
        logout();
    }

    if (isLoggedin) {
        return (
            <div className='login-auth'>
                <div className='loginheader'><h1>Welcome, {pb.authStore.model.username}!</h1></div>
                <p>Verified: {""+isVerified}</p>
                {!isVerified && <button onClick={requestVerification}>Send Verfication Email</button>}
                <button onClick={onLogout}>Logout</button>
            </div>    
        );
    }
    return (
        <div className='login-auth'>
            <div className='loginheader'><h1>Please Login</h1></div>
            {isLoading && <p>Logging in...</p>}
            {isError && <p>Invalid email or password</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" name="email" placeholder="Email" {...register("email")} />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    {...register("password")} 
                />

                <button type="submit" disabled={isLoading}>{isLoading ? "Loading":"Login"}</button>
            </form>
        </div>
    );
}

export default Auth;