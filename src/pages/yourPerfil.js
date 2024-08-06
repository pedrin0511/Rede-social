import { useState , useEffect } from "react"
import Seguir from "../componentes/elementos/Seguir"
import styles from './yourperfil.module.css'
import Seguidores from "../componentes/elementos/NumeroSeguidor"


function YourPerfil(){
    const [username ,setUsername] = useState('')
    const [idade ,setidade] = useState('')
    const [bio ,setbio] = useState('')
    const [id , setId] = useState('')
    const [foto , setfoto] = useState('')
    
    useEffect(()=>{
      const setIds =  localStorage.getItem('frendid')
      if(setIds){
        setId(setIds)
      }
    },[])
    




    useEffect(() => {
        if (id) {
          fetch(`https://banco-de-dados-six.vercel.app/users`, {
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
              setfoto(user.fotodeperfil)
            }
          })
          .catch((error) => {
            console.log(error);
          });
        }
      }, [id]);

    return (
        <div className={styles.container}>
          <div className={styles.img_perfil}>
          <img src={foto} alt={username}/>
          </div>
          <div>
          <div className={styles.bio}>
            <h2>{username}</h2>
            <p>{idade}</p>
            <p>{bio}</p>
            </div>
            <div className={styles.seguir}>
            <Seguir/>
            </div>
          </div>
          <div className={styles.seguidores}>
            <Seguidores/>
          </div>
            
            
        </div>
    )
}

export default YourPerfil