import { useState } from 'react';
import api from '../../services/api'

const Create = () => {
  const [data, setData] = useState()

  // Mensagens temporarias que monstram quando dar erro ou não
  const alertMessage = (message, type) => {
    document.getElementById('message').innerHTML = message
    document.getElementById('message').classList.add(type)
    document.getElementById('message').classList.remove('d-none')
  }

  // Envia os dados do usuario a ser cadastrado
  const enviaDados = () => {
    api.post('/user', data)
      .then(result => {
        alertMessage('Cadastrado com Sucesso', 'alert-success')
        setTimeout(() => {
          document.getElementById('message').classList.remove('alert-success')
          document.getElementById('message').classList.add('d-none')
        }, 2000)
      }).catch(error => {
        alertMessage(error.response.data, 'alert-danger')
        setTimeout(() => {
          document.getElementById('message').classList.remove('alert-danger')
          document.getElementById('message').classList.add('d-none')
        }, 2000)
      })
  }

  const changeData = (element) => {
    const {name, value} = element.target

    setData({...data, [name]: value})
  }

  return (
    <div className='vh-100 d-flex justify-content-center align-items-center'>
      <div className='container-sm d-flex flex-column align-items-center'>
        <div className="alert d-none" role="alert" id="message"></div>
        <div className='card d-flex flex-column align-items-center'>
          <form className="row mb-3 d-flex justify-content-center m-3">
            <div className="col-sm-8 card-body">
              <label htmlFor="nome" className="form-label">Nome</label>
              <input name="nome" type="text" className="form-control" id="nome" placeholder='Nome completo' onChange={changeData} />
            </div>
            <div className="col-sm-1 card-body">
              <label htmlFor="idade" className="form-label">Idade</label>
              <input name='idade' type="number" className="form-control" id="idade" onChange={changeData} />
            </div>
            <div className="card-body">
              <label htmlFor="email" className="form-label">E-mail</label>
              <input name='email' type="email" className="form-control" id="email" placeholder='name@example.com' onChange={changeData} />
            </div>
          </form>
          <div className='d-flex gap-3'>
            <a className="btn btn-outline-success mb-3" onClick={enviaDados} role="button">Cadastrar usuário</a>
            <a className="btn btn-outline-dark mb-3" href="/listar" role="button">Listar usuários</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;