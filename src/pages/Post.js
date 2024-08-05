import { useState, useEffect} from "react"

function Post(){
    const [id , setId] = useState('')
    const [imageBase64, setImageBase64] = useState('');
    const [legenda, setlegenda] = useState('');
   


    useEffect(()=>{
        const userId = localStorage.getItem('userId');
        if(userId){
            setId(userId)
        }
    },[])

    const convert_base64 = (e) =>{
        const file = e.target.files[0]
        if(file){
            const reader = new FileReader()
            reader.onloadend = () =>{
                setImageBase64(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    function postar(e){
        e.preventDefault()

        fetch(`http://localhost:5000/users/${id}`)
        .then(resp => resp.json())
        .then(data => {

            const posts = Array.isArray(data.posts) ? data.posts : []

            const novoPostId = Date.now();
            const novoPostIdSrt = novoPostId.toString()
            
            const updatePost = [...posts, { id: novoPostIdSrt, image: imageBase64, legenda: legenda }];

            return fetch(`http://localhost:5000/users/${id}`,{
                method:'PATCH',
                headers:{
                     'Content-Type': 'application/json'
                },
                body: JSON.stringify({posts: updatePost})
            })
        })
        .then(resp =>{
            if(resp.ok){
                
                alert('postado')
            }else{
                alert('erro')
            }
        })
        .catch(error =>{
            console.error('error', error)
        })
    }

    



    return(
        <div>
             <input type="file" id="upload" onChange={convert_base64} />
             <input type="text" id="legenda" onChange={(e) => setlegenda(e.target.value)} />
             <button onClick={postar}>Postar</button>
        </div>
    )
}

export default Post