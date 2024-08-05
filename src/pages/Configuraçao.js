import {FaTrash  ,FaUserEdit} from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useState , useEffect} from 'react';
import { useNavigate , Link } from 'react-router-dom';
import { AiOutlineUserSwitch } from "react-icons/ai";
import style from './Configuraçao.module.css'

function Configuraçao(){
    const [logado, setLogado] = useState(!!localStorage.getItem('logado'));
    const [recarregar, setRecarregar] = useState(false);
    const navigate = useNavigate();
    const [id , setId] = useState('')

    useEffect(()=>{
        const userId = localStorage.getItem('userId');
        if(userId){
            setId(userId)
        }
    },[])

    useEffect(() => {
        if (recarregar) {
            navigate('/');
            window.location.reload('/')
            
             // Recarregar a página
        }
    });

    const sair = () =>{
        setLogado(false)
        localStorage.removeItem('logado')
        localStorage.removeItem('userId');
        localStorage.removeItem('frendid');
        setRecarregar(true);
        
    }
    
    const excluir = () => {
        setLogado(false)
        localStorage.removeItem('logado')
        localStorage.removeItem('userId');
      
      
           fetch(`http://localhost:5000/users/${id}` ,{
            method:'DELETE',
            headers:{
              'Content-Type': 'application/json'
            }
           })
           .then((resp)=>{
            if(!resp.ok){
              throw new Error('erro')
            }
            return resp.json()
        })
        .then((data)=>{
            alert('conta exluida')
            setRecarregar(true);
            
        })
        .catch((error)=>{
            alert('Erro ao excluir conta');
        })
      }
      

    return(
        <div className={style.container}>
            
            <h1>Configurações</h1>
            <div className={style.container_config}>

            <Link to='/editarperfil'><div className={style.container_opc}>
               <p>Sobre a conta</p>
               <button ><span><FaUserEdit />EDITE SEU PERFIL AQUI</span></button> 
               
                <button> <span><AiOutlineUserSwitch /> TROCAR DE CONTA</span></button>
             
            </div>
            </Link>
            
            
             <div className={style.container_opc}>
                <p>Opções de saida</p>
                <button  onClick={sair}> <span><FiLogOut />SAIR AGORA</span></button>
                <button  onClick={excluir}> <span><FaTrash />EXCLUIR CONTA</span> </button>  
             </div>
                 
            </div>
            
              
        </div>
    )
}

export default Configuraçao