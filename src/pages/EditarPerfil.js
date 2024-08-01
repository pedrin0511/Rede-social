import { useState, useEffect} from "react"
import FotoPerfil from "../componentes/elementos/FotoPerfil"
import { Link } from "react-router-dom";
import styles from './editarperfil.module.css'
import { MdDriveFolderUpload, MdOutlineSaveAs } from "react-icons/md";
import { IoIosReturnLeft } from "react-icons/io";
function EdtitarPerfil(){
    
    const [username, setUsername] = useState('');
    const[idade,setidade] = useState('')
    const [id , setId] = useState('')
   const[bio , setBio] = useState('')
   const [file, setFile] = useState(null);
   const [imageBase64, setImageBase64] = useState('');

    useEffect(()=>{
        const userId = localStorage.getItem('userId');
        if(userId){
            setId(userId)
        }
    },[])

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
            
            console.log(userExists)
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
                    window.location.reload('./EditarPerfil.js');
                })
                .catch((error) => {
                    alert('erro ao atualizar')
                })
            }
        })
        .catch((error)=> console.log(error))
        
    }
        
function editarBio(e){
    e.preventDefault()

    fetch(`http://localhost:5000/users/${id}`,{
        method: 'PATCH',
        headers:{
             'Content-Type': 'application/json'
        },
        body: JSON.stringify({Bio: bio})
    })
    .then(resp => resp.json)
    .then((data) =>{
        alert('sucesso')
    })
    .catch((error) => {
        alert(error)
    })
}

const convert_base64 = (e)=> {
    const file = e.target.files[0]
    if(file){
        const reader = new FileReader()
        reader.onloadend = () => {
            setImageBase64(reader.result)
        }
        reader.readAsDataURL(file)
    }
}


   function salvarfoto(e){
    e.preventDefault()

    if(!imageBase64){
        alert('Adicione imagem')
    }


    fetch(`http://localhost:5000/users/${id}`, {
        method:'PATCH',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fotodeperfil: imageBase64,
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
    .then((data) => {
        alert('Idade atualizada')
        window.location.reload('./EditarPerfil.js');
    })
    .catch((error)=> (console.log(error)))
   
   }

    return(
        <div className={styles.container}>
            <div className={styles.borda}>
            <div className={styles.container_img}>
                <div>
                    <FotoPerfil id={id}/>
                </div>

                <div className={styles.foto}>
                    <div className={styles.custom_upload}>
                        <input type="file" id="upload" onChange={convert_base64} style={{display: 'none'}}/>
                        <label htmlFor="upload" className={styles.label}><MdDriveFolderUpload /> Escolher arquivo</label>
                    </div>
                

                <button className={styles.button_foto} onClick={salvarfoto}><MdOutlineSaveAs /> salvar</button>
                </div>
            </div>
            <div className={styles.form}>
                <div className={styles.url}>
                <h2>Mudar nome</h2>
                <input type="text" className={styles.inputN} placeholder="Digite seu novo nome..."  onChange={(e) => setUsername(e.target.value) }/>
                <button onClick={editarNome}><MdOutlineSaveAs />salvar </button>
            </div>

            <div className={styles.url}>
                <h2>Bio</h2>
                <textarea className={styles.custom_textarea}  placeholder="Digite sua bio aqui..." onChange={(e) => setBio(e.target.value) }></textarea>
                <button onClick={editarBio}><MdOutlineSaveAs />salvar </button>
            </div >

            <div className={styles.url}>
                <h2>Idade</h2>
                <input type="text"  placeholder="Digite sua idade aqui..." onChange={(e) => setidade(e.target.value) }/>
                <button onClick={editarIdade}><MdOutlineSaveAs />salvar </button>
            </div>
            <div className={styles.ver_perfil}>
            <button ><Link to='/perfil'>Ver perfil <IoIosReturnLeft /></Link></button>
            </div>
           
            </div>
            </div>
            
        </div>
    )
}

export default EdtitarPerfil