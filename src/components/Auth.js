// eslint-disable-next-line
import useLogout from '../hook/useLogout';
import useLogin from '../hook/useLogin';
import React, {useState, Component, PureComponent} from 'react';
import {useForm} from 'react-hook-form';
import pb from '../lib/pocketbase';
import './Auth.css';
import { isError } from 'react-query';

const Auth = () => {
    const {register, handleSubmit, reset} = useForm();

    const [DUMMY, setDUMMY] = useState(0);
    const isLoggedin = pb.authStore.isValid;

    //login function
    const logout = useLogout();
    const {mutate: login, isLoading, isError} = useLogin();

    async function onSubmit(data){
        login({username: data.username, password: data.password})
        reset();
    }

    if (isLoggedin) {
        return (
            <div className='login-auth'>
                <div className='loginheader'><h1>Welcome, {pb.authStore.model.username}!</h1></div>
                <button onClick={logout}>Logout</button>
            </div>    
        );
    }
    return (
        <div className='login-auth'>
            <div className='loginheader'><h1>Please Login</h1></div>
            {isLoading && <p>Logging in...</p>}
            {isError && <p>Invalid username or password</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" name="username" placeholder="Username" {...register("username")} />
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