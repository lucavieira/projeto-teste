//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables
const PORT = process.env.PORT || 5000;

const Koa = require('koa');
const koa = new Koa();
const cors = require('@koa/cors')
const bodyparser = require('koa-bodyparser')

const Router = require('koa-router');
var router = new Router();

const routes = require('./controllers/userController')

//rota simples pra testar se o servidor está online
router.get('/', async (ctx) => {
  ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}`; //http://localhost:5000/
});

//Uma rota de exemplo simples aqui.
//As rotas devem ficar em arquivos separados, /src/controllers/userController.js por exemplo

koa.use(cors())
koa
  .use(bodyparser())
  .use(routes.routes())
  .use(router.routes())
  .use(routes.allowedMethods({throw: true}))

const server = koa.listen(PORT);

module.exports = server;