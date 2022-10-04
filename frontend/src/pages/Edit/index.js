import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../services/api"

const Edit = () => {
    let {id} = useParams()

    const [user, setUser] = useState({
        nome: '',
        email: '',
        idade: 0
    })

    const getUser = () => {
        api.get('/users')
            .then(response => {
                response.data.rows.find(user => {
                    if(user.id === Number(id)) {
                        setUser({"id": user.id, "nome": `${user.nome}`, "email": `${user.email}`, "idade": user.idade})
                    }
                })
            })
    }

    const editUser = (id) => {
        api.put(`/user/${id}`, user)
    }

    const changeData = (element) => {
        const {name, value} = element.target
    
        setUser({...user, [name]: value})
      }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className='vh-100 d-flex justify-content-center align-items-center'>
            <div className='container-sm d-flex justify-content-center'>
                <div className='card d-flex flex-column align-items-center'>
                    <form className="row mb-3 d-flex justify-content-center m-3">
                        <div className="col-sm-8 card-body">
                            <label htmlFor="nome" className="form-label">Nome</label>
                            <input name="nome" type="text" className="form-control" value={user.nome} id="nome" onChange={changeData}></input>
                        </div>
                        <div className="col-sm-1 card-body">
                            <label htmlFor="idade" className="form-label">Idade</label>
                            <input name='idade' type="number" className="form-control" id="idade" value={user.idade} onChange={changeData} />
                        </div>
                        <div className="card-body">
                            <label htmlFor="email" className="form-label">E-mail</label>
                            <input name='email' type="email" className="form-control" id="email" value={user.email} onChange={changeData} />
                        </div>
                    </form>
                    <div className='d-flex gap-3'>
                        <a className="btn btn-outline-success mb-3" href="/listar" onClick={() => editUser(user.id)} role="button">Salvar</a>
                        <a className="btn btn-outline-dark mb-3" href="/" role="button">Voltar</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit