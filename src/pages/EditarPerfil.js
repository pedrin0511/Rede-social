import { useState} from "react"
import FotoPerfil from "../componentes/elementos/FotoPerfil"

function EdtitarPerfil({id}){
    const[foto , setfoto] = useState('')
    const [username, setUsername] = useState('');
    const[idade,setidade] = useState('')
   
    function editarNome (e){
        e.preventDefault()

         fetch(`http://localhost:5000/users`)
         .then((resp) =>{
            if(!resp.ok){
                throw new Error('Erro ao buscar usuários');
            }
            return resp.json();
        })
        .then((data)=> {
            const userExists = data.some((user) => user.username === username && user.id !== id);
        
            if(userExists){
                alert('Usuário já cadastrado');
                
            }else{
                return fetch(`http://localhost:5000/users/${id}` ,{
                    method:'PATCH',
                    headers:{
                        'Content-type' : 'application/json'
                    },
                    body: JSON.stringify({username: username})
                })
                .then(resp => resp.json())
                .then((data) =>{
                    alert('nome atualizado')
                })
                .catch((error) => {
                    alert('erro ao atualizar')
                })
            }
        })
    }
        



   function editarfoto(e){
    e.preventDefault()

    if(foto.length > 0){
        alert('iamgem add')
    }else{
        alert('add imagem ')
        return
    }


    fetch(`http://localhost:5000/users/${id}`, {
        method:'PATCH',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fotodeperfil: foto,
        })
      })
      .then(resp => resp.json())
      .then((data)=> {
        console.log('imagem atualizada')
      })
      .catch((error)=>{
        console.log('imagem atualizada')
      })
      window.location.reload('./EditarPerfil.js');
   }

   function editarIdade(e){
    e.preventDefault()

    fetch(`http://localhost:5000/users/${id}`,{
        method:'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({Idade: idade})
    })
    .then(resp => resp.json)
    .then((data) => alert('Idade atualizada'))
    .catch((error)=> alert('erro ao atualizar idade'))
   }

    return(
        <div>
            <div>
                <div>
                    
                    <FotoPerfil id={id}/>
                </div>

                <div>
                <input type="text" onChange={(e) => setfoto(e.target.value)} placeholder="cole a Url da imagem"/>
                <button onClick={editarfoto}>salvar </button>
                </div>
            </div>

            <div>
                <h2>Mudar nome</h2>
                <input type="text" onChange={(e) => setUsername(e.target.value) }/>
                <button onClick={editarNome}>salvar </button>
            </div>

            <div>
                <h2>Idade</h2>
                <input type="text" onChange={(e) => setidade(e.target.value) }/>
                <button onClick={editarIdade}>salvar </button>
            </div>


        </div>
    )
}

export default EdtitarPerfil