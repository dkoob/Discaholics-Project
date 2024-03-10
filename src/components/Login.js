import React, { useState } from 'react';

const Login = ({ login, signup })=> {
  const [username, setUsername] = useState('');
  const [email_address, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const _login = async(ev)=> {
    ev.preventDefault();
    try {
      await login({ email_address, password });
    }
    catch(ex){
      console.log(ex.response.data);
    }
  }

  const _signup = async(ev)=> {
    ev.preventDefault();
    try {
      await signup({ username, email_address, password })
    } catch (ex) {
      console.log(ex.response.data);
    }
  }
  return (
    <>
    <form onSubmit={ _login }>
      <input
        placeholder='email address'
        value={ email_address }
        onChange={ ev => setEmail(ev.target.value)}
      />
      <input
        type='password'
        placeholder='password'
        value={ password }
        onChange={ ev => setPassword(ev.target.value)}
      />
      <button disabled={!email_address || !password}>Login</button>
    </form>
    <br></br>
    <form onSubmit={ _signup }>
      <input
        type='username'
        placeholder='username'
        value={ username }
        onChange={ ev => setUsername(ev.target.value)}
      />
      <input
        placeholder='email address'
        type='email'
        value={ email_address }
        onChange={ ev => setEmail(ev.target.value)}
      />
      <input
        type='password'
        placeholder='password'
        value={ password }
        onChange={ ev => setPassword(ev.target.value)}
      />
      <button disabled={!username || !email_address || !password}>Signup</button>
    </form>

    </>
  );
}

export default Login;
