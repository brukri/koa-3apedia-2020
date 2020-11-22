import Koa from 'koa';
import Router from 'koa-router';

import api from './api';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import CustomerError from './customer-error';

const app = new Koa();
const router = new Router();

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        if (err instanceof CustomerError) {
            ctx.status = 500;
        } else {
            ctx.status = err.status || err.code || 500;
        }
        ctx.body = {
            success: false,
            message: err.message,
        };
    }
});

app.use(logger());
app.use(json());
app.use(bodyParser());

router.use('/customer', api.routes(), api.allowedMethods());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8080, () => {
    console.log('Server started.');
});
