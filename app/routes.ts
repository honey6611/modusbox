import * as Router from 'koa-router';
import * as Koa from 'koa';
import { renderCtx } from './jsend';
import {
    asyncHttpRequest,
    HttpOptions,
    normalizeResponse
} from './utils';
import { serverConf, HTTPStatus } from './config/config';

const router = new Router();
export default () => {
    router
        .get(
            `/`,
            async (ctx: Koa.Context, next: Function) => {
                const Options: HttpOptions = {
                    method: 'get',
                    // tslint:disable-next-line: max-line-length
                    url: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=${serverConf.apikey}`
                };

                let timeSeriesResponse: Response;
                try {
                    timeSeriesResponse = <Response>await asyncHttpRequest(<HttpOptions>Options);

                    renderCtx.response(
                        ctx,
                        200,
                        normalizeResponse(timeSeriesResponse)
                    );
                }
                catch (err) {

                    renderCtx.response(
                        ctx,
                        500,
                        err
                    );
                }
            })
        .get(
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