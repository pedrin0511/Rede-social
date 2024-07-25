import React, { useState, useEffect} from 'react';



function Bemvindo({id}){
    const [username ,setUsername] = useState('')
    

    useEffect(() => {
        fetch(`http://localhost:5000/users` , {
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
        <div>
            {username && <h1>Bem vindo {username}</h1>}
            <h2>Edite seu perfil aqui!</h2>
            
        </div>
    )
}

export default Bemvindo