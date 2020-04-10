const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-body');
const logger = require('koa-logger');
const mount = require('koa-mount');
const serve = require('koa-static');

const backend = new Koa();
const upload = new Koa();

backend.use(logger());
backend.use(bodyParser({
  formidable: { uploadDir: './images' },
  multipart: true,
  urlencoded: true
}));

upload.use(serve('./views'));
backend.use(mount('/', upload));
const router = new Router();
router.post('/upload', (ctx, next) => {
  console.log('Files: ', ctx.body.files);
  console.log('Fields: ', ctx.body.fields);
  ctx.body = {
    message: 'processing files',
    Files: ctx.body.files,
    Fields: ctx.body.fields
  };
  next();
});

backend.use(router.routes());
backend.use(router.allowedMethods());

backend.listen(3005);

module.exports = backend;
