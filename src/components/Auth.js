// eslint-disable-next-line
import useLogout from '../hook/useLogout';
import useLogin from '../hook/useLogin';
import React, {useState, Component, PureComponent} from 'react';
import {useForm} from 'react-hook-form';
import pb from '../lib/pocketbase';
import './Auth.css';

const Auth = () => {
    const {register, handleSubmit, reset} = useForm();

    const [DUMMY, setDUMMY] = useState(0);
    const isLoggedin = pb.authStore.isValid;

    //login function
    const logout = useLogout();
    const {login, isLoading} = useLogin();

    async function onSubmit(data){
        login({data})
        reset();
    }

    if (isLoggedin) {
        return (
            <div>
                <h1>Welcome, {pb.authStore.model.username}!</h1>
                <button onClick={logout}>Logout</button>
            </div>    
        );
    }
    return (
        <div>
          <h1>Please Login</h1>
          {isLoading && <p>Logging in...</p>}
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