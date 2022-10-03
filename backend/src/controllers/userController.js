const Router = require('koa-router');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:')

var router = new Router();

// Rota que lista os usuarios
router.get('/users', async (ctx) => {
    db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, nome TEXT, email TEXT UNIQUE, idade INTEGER)')
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM users', (err, rows) => {
            if(err) return err
            resolve(rows)
        })
    }).then(result => {
        ctx.status = 200;
        ctx.body = {total: result.length, count: result.length, rows: result}
    }).catch(error => {
        console.log(error)
    })
})

// Rota para criação de usuarios
router.post('/user', async (ctx) => {
    db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, nome TEXT, email TEXT UNIQUE, idade INTEGER)')
    db.exec(`INSERT INTO users (nome, email, idade) VALUES (
        "${ctx.request.body.nome}", 
        "${ctx.request.body.email}", 
        ${ctx.request.body.idade})`,
        err => {
            if(err) console.log(err.message)
        }
    )
    ctx.status = 201
})

// Rota que busca um usuario especifico
router.get('/user/:nome', async (ctx) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE nome = "${ctx.params.nome}"`, function(err, rows) {
            if(err) return reject(err);
            resolve(rows)
        });
    }).then(result => {
        if(result != undefined) {
            ctx.body = result
            ctx.status = 200
        } else {
            ctx.body = {nome: '', email: '', idade: 18}
            ctx.status = 404
        }
    }).catch(error => {
        console.log(error)
    });
})

// Rota para deletar um usuario
router.delete('/user/:nome', async (ctx) => {
        db.exec(`DELETE FROM users WHERE nome = "${ctx.params.nome}"`)
        ctx.body = {nome: '', email: '', idade: 18}
})

router.delete('/user/:nome/:id', async (ctx) => {
    db.exec(`DELETE FROM users WHERE nome = "${ctx.params.nome}" and id = ${ctx.params.id}`)
    ctx.body = {nome: '', email: '', idade: 18}
})

router.put('/user/:id', async (ctx) => {
    db.exec(`UPDATE users SET 
        nome = "${ctx.request.body.nome}",
        email = "${ctx.request.body.email}",
        idade = ${ctx.request.body.idade}
        WHERE id = ${ctx.request.body.id}`
    )
})

module.exports = router