import React, { useState,} from 'react';
import LoginForm from '../componentes/LoginForm';
import RegisterForm from '../componentes/RegisterForm';
import Bemvindo from '../pages/Bemvindo';
import Navbar from './elementos/Navbar';
import styles from './LogReg.module.css'
import ButtonEdit from '../componentes/elementos/ButtonEdit';
import EditarPerfil from'../pages/EditarPerfil'
function LogReg() {

    const[logado , setLogado] = useState(false)
    const [showLogin, setShowLogin] = useState(true);
    const [idatualizado , setidatualizado] = useState('')
    const [editando ,setEditando] = useState(false)


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


     fetch(`http://localhost:5000/users/${idatualizado}` ,{
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
        {!editando ? (
          <>
            <Navbar sair={sair} excluir={excluir} id={idatualizado} />
            <Bemvindo id={idatualizado} />
            <ButtonEdit onClick={handleEditButtonClick}  text='editar perfil'/> {/* Passa a função para o botão */}
          </>
        ) : (
          <>
          <EditarPerfil/>
          <ButtonEdit onClick={handleEditButtonClick}  text='voltar'/>
          </>
        )}
      </div>
      )}
    </div>
  );
}

export default LogReg;