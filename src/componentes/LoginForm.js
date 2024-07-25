import React, { useState } from 'react';
import styles from './LoginForm.module.css'


function LoginForm({onLogin}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [inputClass, setInputClass] = useState(styles.inputN);
  const [labelClass, setLabelClass] = useState(styles.labelN)

function registrar (e){
  e.preventDefault()

  fetch(`http://localhost:5000/users`, {
    method:'GET',
    headers:{
      'Content-Type': 'application/json'
    },
  })
  .then((resp) => {
    if(!resp.ok){
      throw new Error('erro')
    }
    return resp.json()
  })
  .then((data) => {

    const user = data.find(
      (user) => user.username === username && user.password === password
      );

      if(user){
        setMessage('Login bem-sucedido!' + username);
        onLogin(user.id )
      }else{
        setMessage('Usuário ou senha incorretos.');
        setInputClass(styles.inputE);
        setLabelClass(styles.labelE);
      }
  })
.catch((error) =>{
    setMessage('Erro ao tentar login.');
    setInputClass(styles.inputE);
    setLabelClass(styles.labelE);
})   
}

  return (
    <div className={styles.container}>
      <form onSubmit={registrar}>
        <h1>Login</h1>
      <label for="name" className={labelClass}>Username:</label>
        <input type="text" className={inputClass} value={username} onChange={(e) => setUsername(e.target.value)}required placeholder='Digite seu Username'/>
        <label for="password"  className={labelClass}>Password:</label>
        <div className>
          <input type="password" className={inputClass}  value={password} onChange={(e) => setPassword(e.target.value)}required placeholder='Digite sua senha'/>
        </div>
       {message && (<p>{message}</p>)}
       
        <button type='submit'>Enviar</button>
        
      </form>
      
    </div>
  );
}

export default LoginForm;