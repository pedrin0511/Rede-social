import React, { useState , useEffect} from 'react';

function FotoPerfil({id}){
const[fotoperfil , setfotoperfil] = useState('')

useEffect (() =>{
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
          setfotoperfil(user.fotodeperfil)
          console.log(user.fotodeperfil)
        }
           
      })
      .catch((error) => {
        console.log(error)
      })
})
    return (
        <>
        <img src={fotoperfil} alt='foto perfil'/>
        </>
    )
}

export default FotoPerfil