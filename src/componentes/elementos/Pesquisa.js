import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from './Pesquisa.module.css'

function Pesquisa() {
  const [query, setQuery] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [myId, setMyId] = useState('');
  const [loading, setLoading] = useState(true);


const verperfil = (id) => {
   localStorage.setItem('frendid' , id)
   window.location.reload('/youPerfil')
}

useEffect(() => {
  const userId = localStorage.getItem('userId');
  if (userId) {
      setMyId(userId);
  }
}, [])

  useEffect(() => {
    if(myId){
      setLoading(true)
      fetch('http://localhost:5000/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data)
          const filtrar = data.filter(user => user.id !== myId)
          setAllUsers(filtrar)
        })
        .catch((error) => console.log(error));
    }else{
      setLoading(true)
    }
    
  }, [myId]);

  useEffect(() => {
    if (query.length > 0) {
      const filtro = allUsers.filter((user) =>
        user.username.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0,5)
      setFilteredUsers(filtro);
      
    } else {
      setFilteredUsers([]);
    }
    
  }, [query, allUsers]);

  return (
    <div className={styles.container}>
        
      <input
        className={styles.inputN}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a user..."
      />
      <ul className={styles.ul}>
        
        {filteredUsers.map((user) => (
          <li key={user.id}>
              <div className={styles.usuarios_lista}>
                <img src={user.fotodeperfil} alt={`${user.username}'s profile`} width="50" />
                <button onClick={()=> verperfil(user.id)}><Link to='/youPerfil'> <h2>{user.username}</h2></Link></button>
              </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pesquisa;