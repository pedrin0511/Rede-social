import { useState, useEffect} from "react"


function Publicaçoes(){
    const [id , setId] = useState('')
const[publicaçao, setPublicaçao] = useState([])
const [idPost , setidPost] = useState('')

useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
        setId(userId);
    }
}, []);// pega o id do usuario logado


    useEffect(() => {
       if(id){ fetch(`http://localhost:5000/users`,{
         method: 'GET',
         headers: {
             'Content-Type': 'application/json',
           },
        })
        .then(resp => resp.json())
        .then((data) =>{
         const usuariologado = data.find(user => user.id === id)
         if(usuariologado && usuariologado.posts){
            const postValido = usuariologado.posts.filter(post =>  post.image && post.legenda  )
            const postid = usuariologado.posts.filter(post => post.id)
            setPublicaçao(postValido)
            setidPost(postid)
            
        }

        })
        .catch((error) => console.log(error))}
       },[id]);

      const Delete = (idPost) => {

        fetch(`http://localhost:5000/users/${id}`)
        .then(resp => resp.json())
        .then((data) => {
            const atualizar = data.posts.filter(post => post.id !== idPost)

            return fetch(`http://localhost:5000/users/${id}`,{
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
      
    
    return(
        <div>
            {publicaçao.map((post,index) =>(
                <div key={index}>
                    <p>{post.legenda}</p>
                    <img src={post.image} alt='publicação'/>
                    <button onClick={() => Delete(post.id)}>Excluir</button>
                </div>
            ))}
            
        </div>
    )
}

export default Publicaçoes