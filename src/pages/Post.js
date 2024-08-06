import { useState, useEffect} from "react"
import styles  from "./Post.module.css"
import { MdDriveFolderUpload} from "react-icons/md";
function Post(){
    const [id , setId] = useState('')
    const [imageBase64, setImageBase64] = useState('');
    const [legenda, setlegenda] = useState(``);
    const [image, setImage] = useState(false);
   


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
                setImage(true)
            }
            reader.readAsDataURL(file)
        }
    }

    function postar(e){
        e.preventDefault()

        fetch(`https://banco-de-dados-six.vercel.app/users/${id}`)
        .then(resp => resp.json())
        .then(data => {

            const posts = Array.isArray(data.posts) ? data.posts : []

            const novoPostId = Date.now();
            const novoPostIdSrt = novoPostId.toString()
            
            const updatePost = [...posts, { id: novoPostIdSrt, image: imageBase64, legenda: legenda }];

            return fetch(`https://banco-de-dados-six.vercel.app/users/${id}`,{
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
        <div className={styles.container}>
        <div className={styles.container_post}>

            <div className={styles.escolher_foto}>
              <input type="file" id="upload" onChange={convert_base64}  style={{display: 'none'}}/> 
              <div className={styles.label}><label htmlFor="upload" ><MdDriveFolderUpload />Escolher arquivo</label></div> 
              <div className={styles.foto}>
            </div>
            </div>

            <div className={styles.container_foto}>
            {image ? (
                <div>
                    <div className={styles.postar}>
                    <img src={imageBase64} alt="foto"/>
                    </div>
                    <input type="text" id="legenda" placeholder="LEGENDA..." onChange={(e) => setlegenda(e.target.value)} maxLength={30} />
                    <button onClick={postar}>Postar</button>
                    
                </div>
            ) : (<h1>Escolher foto</h1>)}
        </div>
            
             
             
        </div>
        </div>
    )
}

export default Post