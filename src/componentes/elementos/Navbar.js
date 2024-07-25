import styles from './Navbar.module.css'
import React, { useState, useEffect} from 'react';


function Navbar({sair , excluir , id}){

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
            <img src='https://static.vecteezy.com/ti/vetor-gratis/p1/9292244-default-avatar-icon-vector-of-social-media-user-vetor.jpg' alt='perfil'/>
            {username && <h2>{username}</h2>}
            </div>
            <div className={styles.perfil}>
                
                <button className={styles.sair} onClick={sair}>SAIR</button>
                <button className={styles.excluir} onClick={excluir}>excluir</button>
            </div>
        </nav>
    )
}
export default Navbar