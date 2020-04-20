const Koa = require('koa');
const Router = require('@koa/router');
const Multer = require('@koa/multer');
const cors = require('@koa/cors');
const { resolve } = require('path');

const imageUpload = new Koa();
const router = new Router();

imageUpload.use(cors());

const storage = new Multer.diskStorage({ // eslint-disable-line
  destination: (req, file, cb) => {
    cb(null, resolve(__dirname, 'images/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = Multer({ storage: storage }).single('image');

router
  .get('/', (ctx, next) => {
    ctx.status = 200;
    ctx.body = { message: 'This is a list of currently available messages' };
    next();
  })
  .post('/', (ctx, next) => {
    upload((ctx, next, err) => {
      if (err instanceof Multer.MulterError) {
        console.error(err);
        ctx.status = 500;
        ctx.body = { error: err };
      } else if (err) {
        console.error(err);
        ctx.status = 500;
        ctx.body = { error: err };
      }
      console.log(ctx.request.file);
      ctx.status = 200;
      ctx.body = ctx.request.file;
    });
    next();
  });

imageUpload.use(router.routes());
imageUpload.use(router.allowedMethods());

module.exports = imageUpload;
