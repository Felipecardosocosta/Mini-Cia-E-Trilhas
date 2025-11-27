import React, { useEffect } from 'react'
import Perfil from '../Perfil/Perfil';
import { Form } from 'react-router-dom';
import Form_perfil_nEditavel from './Form-perfil-nEditavel';
import Form_perfil_editavel from './Form_perfil_editavel';
import { Mycontext } from '../../context/ContextGlobalUser';

function Form_perfil() {
     const { meusDados,setMeusDados, user, setUser, infouser, setInfouser } = React.useContext(Mycontext)
    const [email, setEmail] = React.useState('')
    const [telefone, setTelefone] = React.useState('')
    const [senha, setsenha] = React.useState('')
    const [senhanova, setSenhanova] = React.useState('')
    const [editar, setEditar] = React.useState(false)

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            setUser(currentUser);
            setEmail(currentUser.email || '');
            setTelefone(currentUser.telefone || '');
        }
    }, [meusDados]);

    async function alterações(e) {
        e.preventDefault();



        const dadosAlterados = {
            email: email,
            telefone: telefone
            
        }

        const resposta = await (Perfil)
        if (resposta.status !== 200) {
            alert("Erro ao salvar alterações, verifique seus dados.")
            return
        }
        console.log(dadosAlterados);

        alert("Alterações salvas com sucesso!")
    }



    return (
            <>
                {!editar ?
                    <Form_perfil_nEditavel setEditar={setEditar} editar={editar} /> :
                    <Form_perfil_editavel setEditar={setEditar} editar={editar} />
                }


            </>
    )
}

export default Form_perfil