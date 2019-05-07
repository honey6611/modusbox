import * as Koa from 'koa';
import { renderCtx } from '../jsend';
import {
    asyncHttpRequest,
    HttpOptions,
    normalizeResponse
} from '../utils';
import { serverConf, HTTPStatus } from '../config/config';

export default router => {
    return router
        .get(
            `/time-series-daily/:symbol`,
            async (ctx: Koa.Context, next: Function) => {
                const symbol: string = ctx.params.symbol;
                console.log(symbol)
                if (!symbol) {
                    renderCtx.response(
                        ctx,
                        HTTPStatus.BadRequest,
                        'Bad Request'
                    );
                    return;
                }
                const Options: HttpOptions = {
                    method: 'get',
                    // tslint:disable-next-line: max-line-length
                    url: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${serverConf.apikey}`
                };

                let timeSeriesResponse: Response;
                try {
                    timeSeriesResponse = <Response>await asyncHttpRequest(<HttpOptions>Options);

                    renderCtx.response(
                        ctx,
                        HTTPStatus.Ok,
                        normalizeResponse(timeSeriesResponse)
                    );
                }
                catch (err) {
                    renderCtx.response(
                        ctx,
                        HTTPStatus.ServerError,
                        err
                    );
                }
            });
}