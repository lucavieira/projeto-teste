import { useEffect, useState } from 'react';
import api from '../../services/api'
import Card from './card';

const Show = () => {
    let users = []
    const [user, setUser] = useState()

    const deletaDados = (nome) => {
        api.delete(`/user/${nome}`, user)
    }

    const getUsers = () => {
        api.get('/users')
            .then(response => {
                for (let index in response.data.rows) {
                    users.push(
                        <Card 
                            key={index}
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
            <a className="btn btn-outline-dark" href="/" role="button">Voltar</a>
            <div className='d-flex flex-wrap'>
                {user}
            </div>
        </div>
    );
}

export default Show;