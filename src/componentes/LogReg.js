import React, { useState, useEffect} from 'react';
import LoginForm from '../componentes/LoginForm';
import RegisterForm from '../componentes/RegisterForm';
import Navbar from './elementos/Navbar';
import styles from './LogReg.module.css'

import { Outlet } from 'react-router-dom';

function LogReg() {

    const[logado , setLogado] = useState(false)
    const [showLogin, setShowLogin] = useState(true);
    const [idatualizado , setidatualizado] = useState('')
    const [editando ,setEditando] = useState(false)

    useEffect(() => {
      const logadoStatus = localStorage.getItem('logado');
      const userIds = localStorage.getItem('userId');
      if (logadoStatus === 'true' && userIds) {
          setLogado(true);
          setidatualizado(userIds);
      }
  }, []);

const register = (userId) => {
    setLogado(true)
    localStorage.setItem('logado' , 'true')
    localStorage.setItem('userId', userId);
    setidatualizado(userId)
    console.log(userId)
    
}

const login = (userId) => {
    setLogado(true)
    localStorage.setItem('logado' , 'true')
    localStorage.setItem('userId', userId);
    setidatualizado(userId)
    console.log(userId)
    
}

const sair = () =>{
    setLogado(false)
    localStorage.removeItem('logado')
    localStorage.removeItem('userId');
}

const excluir = () => {
  setLogado(false)
  localStorage.removeItem('logado')
  localStorage.removeItem('userId');


     fetch(`https://banco-de-dados-six.vercel.app/users/${idatualizado}` ,{
      method:'DELETE',
      headers:{
        'Content-Type': 'application/json'
      }
     })
     .then((resp)=>{
      if(!resp.ok){
        throw new Error('erro')
      }
      return resp.json()
  })
  .then((data)=>{
      alert('conta exluida')
      
  })
  .catch((error)=>{
      alert('Erro ao excluir conta');
  })
}

const handleEditButtonClick = () => {
  setEditando(!editando); // Alterna o estado entre edição e visualização
};

  return (
    <div>
      {!logado ? (
        <>
          {showLogin ? (
            <LoginForm onLogin={login}></LoginForm>
          ) : (
            <RegisterForm onRegister={register}/>
          )}
           {showLogin ? <div className={styles.menssagem}><p>Caso voce não tenha uma conta <button onClick={() => setShowLogin(!showLogin)}>
            {showLogin ? 'registrar-se' : 'login'}
          </button>! </p></div> : <div className={styles.menssagem} ><p>Já possuim uma conta? Faça <button onClick={() => setShowLogin(!showLogin)}>
            {showLogin ? 'registrar-se' : 'login'}
          </button> aqui!</p></div>}
          
        </>
      ) : (
        <div>
 
            <Navbar sair={sair} excluir={excluir} id={idatualizado} handleEditButtonClick={handleEditButtonClick}/>
            <div>
            <Outlet />
            </div> 
     
      </div>
      )}
    </div>
  );
}

export default LogReg;