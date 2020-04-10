const Koa = require('koa');
const logger = require('koa-logger');
const serve = require('koa-static');
const { resolve } = require('path');

const ui = new Koa();

ui.use(logger());
ui.use(serve(resolve(__dirname, '../dist')));

module.exports = ui;
