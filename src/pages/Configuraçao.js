import {FaTrash } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useState , useEffect} from 'react';
import { useNavigate , Link } from 'react-router-dom';
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
    }, [recarregar]);

    const sair = () =>{
        setLogado(false)
        localStorage.removeItem('logado')
        localStorage.removeItem('userId');
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
            {!logado ? (<></>) : (<></>)}
            <h1>Configuraçoes</h1>
            <div className={style.container_texto}>
            <p>Sobre a conta</p>
             <button ><Link to='/editarperfil'>EDITE SEU PERFIL AQUI</Link></button>
             <div>
                <button  onClick={sair}> <FiLogOut />SAIR</button>
                <button  onClick={excluir}>  <FaTrash />Excluir</button>  
             </div>
                 
            </div>
            
              
        </div>
    )
}

export default Configuraçao