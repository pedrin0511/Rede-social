import { useState, useEffect} from "react"
import styles from './Publicaçoes.module.css'

function Publicaçoes(){
    const [id , setId] = useState('')
const[publicaçao, setPublicaçao] = useState([])
const [idPost , setidPost] = useState('')
const[ClickCont, setClickCont] = useState({})
const [amei , setAmei] = useState({})


useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
        setId(userId);
    }
}, []);// pega o id do usuario logado


    useEffect(() => {
       if(id){ fetch(`https://banco-de-dados-six.vercel.app/users`,{
         method: 'GET',
         headers: {
             'Content-Type': 'application/json',
           },
        })
        .then(resp => resp.json())
        .then((data) =>{
         const usuariologado = data.find(user => user.id === id)
         if(usuariologado && usuariologado.posts){
            const postValido = usuariologado.posts.filter(post =>  post.image || post.legenda  )
            const postid = usuariologado.posts.filter(post => post.id)
            setPublicaçao(postValido)
            setidPost(postid)
            
        }

        })
        .catch((error) => console.log(error))}
       },[id]);


       // deletar post
      const Delete = (idPost) => {

        fetch(`https://banco-de-dados-six.vercel.app/users/${id}`)
        .then(resp => resp.json())
        .then((data) => {
            const atualizar = data.posts.filter(post => post.id !== idPost)

            return fetch(`https://banco-de-dados-six.vercel.app/users/${id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({posts: atualizar})
            })
        })
        .then((resp) => {
            if(resp.ok){
                setPublicaçao((postatualizado) => postatualizado.filter((post) => post.id !== idPost))

            }else{
                alert('erro')
            }
        })
        .catch((error) => console.log(error))
      }

      //determinar curtida valida

      const clickCurtida = (key) => {
        setClickCont (clickanterior => {
            const novoClick = {...clickanterior, [key]: (clickanterior[key] || 0) + 1}

            if(novoClick[key] === 2){
                setAmei(newlike => ({...newlike, [key]: true}))
              
                novoClick[key] = 0
                setTimeout(()=>{
                    setAmei(newlike => ({...newlike , [key]: false}))  
                  },1000)
            }else{
                setTimeout(() => {
                    setClickCont(clickanterior => ({...clickanterior,[key]: 0}))

                }, 400)
            }
            return novoClick
        })
      };
      
    
    
    return(
        <div className={styles.container}> 
            {publicaçao.map((post,index) =>(
                <div key={index} className={styles.post}>
                    
                    <button onClick={() => clickCurtida(post.id)} className={styles.button}>
            {amei[post.id] ? (
              <div className={styles.curtida}>
                <img src="https://www.imagensempng.com.br/wp-content/uploads/2021/02/11-2.png" alt="amei" />
              </div>
            ) : (
              <p></p>
            )}
            <img src={post.image} alt='publicação' className={styles.postImage} />
          </button>
          <p>{post.legenda}</p>
                    <button onClick={() => Delete(post.id)}>Excluir</button>
                </div>
            ))}
            
        </div>
    )
}

export default Publicaçoes