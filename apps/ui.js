const Koa = require('koa');
const serve = require('koa-static');
const { resolve } = require('path');

const ui = new Koa();

ui.use(serve(resolve(__dirname, '../dist')));

module.exports = ui;
