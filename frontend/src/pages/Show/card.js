const Card = ({id, nome, email, idade, deletaUser}) => {
    return (
        <div className="card m-3 w-25">
            <div className="card-body d-flex flex-column">
                <strong>Nome: {nome}</strong>
                <strong>Email: {email}</strong>
                <strong>Idade: {idade}</strong>
                <div className="d-flex gap-3 mt-3">
                    <a className="btn btn-outline-dark" href={"/edit/" + id} role="button">Editar</a>
                    <button type='button' className='btn btn-outline-danger' onClick={() => deletaUser(nome)}>Excluir</button>
                    {/* <button type='button' className='btn float-end' onClick={() => deletaUser(nome)}>&#128465;</button> */}
                </div>
            </div>
        </div>
    )
}

export default Card