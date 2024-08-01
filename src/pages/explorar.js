import { useState , useEffect } from "react"
import styles from './Explorar.module.css'
import { Link } from "react-router-dom"
function Explorar(){
    const [usuarios , setUsuarios] = useState([])
    const [id , setId] = useState('')

const verperfil = (id) =>{
    localStorage.setItem('frendid' , id)
}

useEffect(()=>{
    const userId = localStorage.getItem('userId');
    if(userId){
        setId(userId)
    }
},[])


    useEffect(() => {
       fetch(`http://localhost:5000/users`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
          },
       })
       .then(resp => resp.json())
       .then((data) =>{
        const usuario_logado = data.filter(user => user.id !== id)
        setUsuarios(usuario_logado)
       })
       .catch((error) => console.log(error))
      },[id]);

    return (
        <div className={styles.container}>
            {usuarios.map(usuario =>(
                <div key={usuario.id}>
                    <h2>{usuario.username}</h2>
                    <p>Idade: {usuario.Idade}</p>
                    <p>Bio: {usuario.Bio}</p>
                    <img src={usuario.fotodeperfil} alt={usuario.username}/>
                    <button onClick={()=> verperfil(usuario.id)}><Link to='/youPerfil'>VER PERFIL</Link></button>
                </div>
            ))}
        </div>
    )
}

export default Explorar