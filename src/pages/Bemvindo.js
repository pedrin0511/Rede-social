import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';



function Bemvindo(){
    const [username ,setUsername] = useState('')
    const [id , setId] = useState('')

    useEffect(()=>{
        const userId = localStorage.getItem('userId');
        if(userId){
            setId(userId)
        }
    },[])




    useEffect(() => {
        if (id) {
          fetch(`http://localhost:5000/users`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((resp) => {
            if (!resp.ok) {
              throw new Error('Erro ao buscar usuários');
            }
            return resp.json();
          })
          .then((data) => {
            const user = data.find(user => user.id === id);
            if (user) {
              setUsername(user.username);
            }
          })
          .catch((error) => {
            console.log(error);
          });
        }
      }, [id]);

    return(
        <div>
            {username && <h1>Bem vindo {username}</h1>}
            
            <Link to='/explorar'>explorar</Link>
            
        </div>
    )
}

export default Bemvindo