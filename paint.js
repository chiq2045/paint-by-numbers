const Koa = require('koa');
const logger = require('koa-logger');
const mount = require('koa-mount');

const app = new Koa();
const ui = require('./apps/ui');

app.use(logger());

app.use(mount('/', ui));

app.listen(3016, () => {
  console.log('listening at port 3016');
});
