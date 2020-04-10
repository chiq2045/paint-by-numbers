const Koa = require('koa');
const logger = require('koa-logger');
const mount = require('koa-mount');

const app = new Koa();
const ui = require('./apps/ui');
const backend = require('./apps/backend');

app.use(logger());

app.use(mount('/', ui));
app.use(mount('/backend', backend));

app.listen(3000, () => {
  console.log('listening at port 3000');
});
