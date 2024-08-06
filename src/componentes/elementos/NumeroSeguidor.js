import { useState, useEffect } from 'react';

function Seguidores(){
    const [id, setId] = useState('');
    
    const [numeroSeguidores, setnumeroSeguidores] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const setIds = localStorage.getItem('frendid');
        if (setIds) {
            setId(setIds);
        }
    }, []); // pega o id dos outros usuarios


    
useEffect (()=>{
    if(id){
        setLoading(true)
        fetch(`https://banco-de-dados-six.vercel.app/users/${id}` ,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then((data) => {
       
        console.log(data.seguidores)
        setnumeroSeguidores(data.seguidores.length)
    })
    .catch((error) => console.log(error))
    .finally(() => setLoading(false))
} 
    
},[id])



 





    return(
        <div>
            {loading ? (<p>Carregando seguidores...</p>): (
               <h3>Seguidores: {numeroSeguidores}</h3> 
            )}
            
        </div>
    )
}

export default Seguidores