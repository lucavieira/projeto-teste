const Card = ({nome, email, idade, deletaUser}) => {
    return (
        <div className="card m-3 w-25">
            <div className="card-body d-flex flex-column">
                <strong>Nome: {nome}</strong>
                <strong>Email: {email}</strong>
                <strong>Idade: {idade}</strong>
                <div>
                    {/* <button type='button' className='btn float-end' onClick={() => editUser(nome)}>Editar</button> */}
                    <button type='button' className='btn float-end' onClick={() => deletaUser(nome)}>&#128465;</button>
                </div>
            </div>
        </div>
    )
}

export default Card