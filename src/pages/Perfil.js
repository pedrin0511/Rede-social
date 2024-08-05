import { useState , useEffect } from "react"
import styles from './Perfil.module.css'
import FotoPerfil from "../componentes/elementos/FotoPerfil"
import {Link} from 'react-router-dom'
import Publicaçoes from "../componentes/publicaçoes"
import MeuSeguidores from "../componentes/elementos/Myseguidores"
function Perfil(){
    const [username ,setUsername] = useState('')
    const [idade ,setidade] = useState('')
    const [bio ,setbio] = useState('')
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
              setidade(user.Idade)
              setbio(user.Bio)
             
            }
          })
          .catch((error) => {
            console.log(error);
          });
        }
      }, [id]);

    return (
        <div>
            <div className={styles.container_img}>
               <FotoPerfil id={id}/>
              <div>
              <h1>{username}</h1>
              <div className={styles.bio_idade}>
              <p>{bio}</p>
              <p>Idade: {idade}</p>
              </div>
              <MeuSeguidores/>
            </div>
            </div>
            <Link to='/Post'>New Post</Link>
            <Publicaçoes/>
            
        </div>
    )
}

export default Perfil