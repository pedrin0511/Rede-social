import styles from './Navbar.module.css'
import React, { useState, useEffect} from 'react';
import Config from './Config';
import FotoPerfil from './FotoPerfil';
import{Link} from 'react-router-dom'

function Navbar({sair , excluir , id , handleEditButtonClick}){

const[username , setUsername] = useState('')



useEffect (()=> {
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
            
        
        const user = data.find(user => user.id === id)
        if(user){
          setUsername(user.username)
        }
           
      })
      .catch((error) => {
        console.log(error)
      })
},[id])




    return(
        <nav className={styles.nav}>
            <div  className={styles.perfil}>
               <Link to='perfil'> <FotoPerfil id={id}/></Link>
            
            {username && <h2>{username}</h2>}
            </div>
            <div>
              <Config sair={sair} excluir={excluir} handleEditButtonClick={handleEditButtonClick}/>
            </div>
        </nav>
    )
}
export default Navbar