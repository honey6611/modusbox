import * as Koa from 'koa';
import { renderCtx } from '../jsend';
import {
    asyncHttpRequest,
    HttpOptions,
    normalizeResponse
} from '../utils';
import {
    serverConf,
    HTTPStatus
} from '../config/config';

export default router => {
    return router
        .get(
            `/search`,
            async (ctx: Koa.Context, next: Function) => {
                const symbolKeyWordSearch: string = ctx.query.keyword ? ctx.query.keyword : '';
                if (!symbolKeyWordSearch) {
                    renderCtx.response(
                        ctx,
                        HTTPStatus.BadRequest,
                        'Bad Request'
                    );
                }

                const Options: HttpOptions = {
                    method: 'get',
                    // tslint:disable-next-line: max-line-length
                    url: `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbolKeyWordSearch}&apikey=${serverConf.apikey}`
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
                        HTTPStatus.ServerError,
                        err
                    );
                }
            });
}