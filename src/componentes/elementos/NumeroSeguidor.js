import { useState, useEffect } from 'react';

function Seguidores(){
    const [id, setId] = useState('');
    const [seguidores, setseguidores] = useState([]);
    const [numeroSeguidores, setnumeroSeguidores] = useState(0);


    useEffect(() => {
        const setIds = localStorage.getItem('frendid');
        if (setIds) {
            setId(setIds);
        }
    }, []); // pega o id dos outros usuarios


    
useEffect (()=>{
    fetch(`http://localhost:5000/users/${id}` ,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then((data) => {
        console.log(data.seguidores)
        setseguidores(data.seguidores)
    })
    .catch((error) => console.log(error))
},[id])

useEffect(() => {
    const numero_final = (seguidores) => {
        if (seguidores && seguidores.length > 0) {
            setnumeroSeguidores(seguidores.length);
        } else {
            setnumeroSeguidores(0);
        }
    };

    numero_final(seguidores);
}, [seguidores]);





    return(
        <div>
            <h3>Seguidores: {numeroSeguidores}</h3>
        </div>
    )
}

export default Seguidores