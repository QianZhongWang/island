const Koa = require('koa');
const InitManager = require('./core/init');
const parser = require('koa-bodyparser');
const catchError = require('./middlewares/exception')

require('./app/models/user')

const app = new Koa();
app.use(parser());
app.use(catchError);

InitManager.initCore(app)

app.listen(3000)
