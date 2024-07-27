import styles from './Navbar.module.css'
import React, { useState} from 'react';
import { FaCog, FaTrash } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import ButtonEdit from '../elementos/ButtonEdit';

function Config({ sair , excluir , handleEditButtonClick}){
    const[config , setConfig] = useState(true)
        

    const handleConfig  = () => {
        setConfig(!config)
     };

     
    return(
        <>
        <button className={styles.config} onClick={handleConfig}>
        <FaCog /> 
          </button>
        {!config && (
            <div className={styles.configOptions}>
              <h1>CONFIGURAÇOES</h1>
              <div className={styles.botoes}>
              <ButtonEdit onClick={handleEditButtonClick}  text='editar perfil'/>
              <button onClick={sair}>TROCAR</button>
              <div className={styles.bot_sair_excluir}>
              <button className={styles.sair} onClick={sair}> <FiLogOut />SAIR</button>
              <button className={styles.excluir} onClick={excluir}>  <FaTrash />Excluir</button>
              </div>
                
            </div>
            </div>
          )}
</>
    )
}

export default Config