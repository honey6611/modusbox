import * as Koa from 'koa';
import * as Router from 'koa-router';
import { RenderCtx } from '../jsend';
import { HTTPStatus } from '../config/config';
import timeSeries from './time-series';
import search from './search-symbol';

const router = new Router();
const renderCtx = new RenderCtx();

export default () => {
    router.use(
        timeSeries(router).routes(),
        search(router).routes()
    );
    router.get(
        `/(.*)`,
        async (ctx: Koa.Context, next: Function) => {
            renderCtx.response(
                ctx,
                HTTPStatus.NotFound,
                {
                    message: 'Request not found'
                }
            );
            await next();
        });

    router.allowedMethods();
    return router.middleware(); /**Return router */
}