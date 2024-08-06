import React, { useState } from 'react';
import styles from './LoginForm.module.css'


function RegisterForm({onRegister}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [inputClass, setInputClass] = useState(styles.inputN);
  const [labelClass, setLabelClass] = useState(styles.labelN)
const fotodeperfil = 'https://cdn-icons-png.flaticon.com/512/3106/3106921.png'

const registrar = (e) => {
  e.preventDefault()
  

fetch('https://banco-de-dados-six.vercel.app/users')
.then((resp) =>{
    if(!resp.ok){
        throw new Error('Erro ao buscar usuários');
    }
    return resp.json();
})
.then((data) =>{
    const userExists = data.some(
        (user) => user.username === username
    )

    if(userExists){
        setMessage('Usuário já cadastrado');
        
    }else{
      const seguidores = ['']
        return fetch('https://banco-de-dados-six.vercel.app/users',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username,password , fotodeperfil }),
        })
    }
})
.then((resp)=>{
    if(resp && resp.ok){
        return resp.json()
    }
    throw new Error('Erro ao criar usuário');
})
.then((data)=>{
  
    setMessage('Registrado com sucesso');
    setUsername('');
    setPassword('');
    localStorage.setItem('userid', data.id)
    onRegister(data.id)
})
.catch((error)=>{
    setMessage('Este usuario já existe');
    setInputClass(styles.inputE);
    setLabelClass(styles.labelE);
})
}

  return (
    <div className={styles.container}>
      <form onSubmit={registrar}>
        <h1>Registrar-se</h1>
      <label className={labelClass}>Username:</label>
        <input type="text" className={inputClass} value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Crie seu @.' required/>
        <label className={labelClass}>Password:</label>
        <input type="password" className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Crie sua senha.' required/>
        {message && <p>{message}</p>}
        <button type='submit'>Enviar</button>
      </form>
      
    </div>
  );
}

export default RegisterForm;