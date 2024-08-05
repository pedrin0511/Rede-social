import { useState, useEffect } from 'react';
import styles from './Seguir.module.css'
function Seguir() {
    const [myId, setMyId] = useState('');
    const [id, setId] = useState('');
    const [seguindo, setseguindo] = useState(false);


    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setMyId(userId);
        }
    }, []);// pega o id do usuario logado

    useEffect(() => {
        const setIds = localStorage.getItem('frendid');
        if (setIds) {
            setId(setIds);
        }
    }, []); // pega o id dos outros usuarios


    //verifica se esta seguindo ou não
    useEffect(() => {
        const checkSeguindo = async () => {
            const response = await fetch(`http://localhost:5000/users/${id}`);
            const user = await response.json();
            
            if (Array.isArray(user.seguidores) && user.seguidores.includes(myId)) {
                setseguindo(true);
            } else {
                setseguindo(false);
            }
        };

        if (id && myId) {
            checkSeguindo();
        }
    }, [id, myId]);

//função de seguir
    const seguir = async () => {
        //Obter dados do usuário
        const response = await fetch(`http://localhost:5000/users/${id}`);
        const user = await response.json();
        
        //adicionar myId aos seguidores, se ainda não estiver presente
        const NovoSeguidor = Array.isArray(user.seguidores)
            ? (user.seguidores.includes(myId) 
                ? user.seguidores 
                : [...user.seguidores, myId])
            : [myId];

        //enviar a atualização para o backend
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ seguidores: NovoSeguidor })
        });
        setseguindo(true)
        window.location.reload('/yourPerfil')
        
    };


const deixarDeSeguir = async () => {
    const response = await fetch(`http://localhost:5000/users/${id}`)
    const user = await response.json()

    const seguidoresAtualizados = user.seguidores.filter(seguidor => seguidor !== myId)

    await fetch(`http://localhost:5000/users/${id}`, {
        method: 'PATCH',
        headers:{
             'Content-Type': 'application/json'
        },
        body:JSON.stringify({seguidores: seguidoresAtualizados})
    })
    setseguindo(false)
    window.location.reload('/yourPerfil')
    
}

  

    return (
        <>
        {!seguindo ? (<button className={styles.seguir} onClick={seguir} >Seguir</button>) : (<button className={styles.seguindo} onClick={deixarDeSeguir}>seguindo</button>)}
            
        </>
    );
}

export default Seguir;