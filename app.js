const express = require('express');
const morgan = require('morgan');
const router = require('./routes/index');

const app = express();
app.use(express.json());
app.use(morgan('tiny'));

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/test', (_req, res) => {
  res.status(200).send('Test Ok');
});

app.use('/products', router.productsRouter);
app.use('/sales', router.salesRouter);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;