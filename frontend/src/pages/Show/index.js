import { useEffect, useState } from 'react';
import api from '../../services/api'
import Card from './card';

const Show = () => {
    let users = []
    const [user, setUser] = useState()

    const deletaDados = (nome, id) => {
        api.get('/users')
            .then(response => {
                if(response.data.rows.length > 1) {
                    api.delete(`/user/${nome}/${id}`, user)
                } else {
                    api.delete(`/user/${nome}`, user)
                }
                window.location.reload()
            })
    }

    const getUsers = () => {
        api.get('/users')
            .then(response => {
                for (let index in response.data.rows) {
                    users.push(
                        <Card 
                            key={index}
                            id={response.data.rows[index].id}
                            nome={response.data.rows[index].nome}
                            email={response.data.rows[index].email}
                            idade={response.data.rows[index].idade}
                            deletaUser={deletaDados}
                        />
                    )
                }
                setUser(users)
            }).catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className='container'>
            <div className='d-flex flex-wrap'>
                {user}
            </div>
            <a className="btn btn-outline-dark" href="/" role="button">Voltar</a>
        </div>
    );
}

export default Show;