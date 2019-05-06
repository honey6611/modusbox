import * as Koa from 'koa';
import * as os from 'os';
import { serverConf, HTTPStatus } from './config/config';

/**
 * renders response
 */
export class RenderCtx {
    constructor() { }

    /**
     * Generic api response
     * @param ctx generic api response
     * @param status http ststus code
     * @param data response data
     */
    // tslint:disable-next-line:no-any
    public response<T>(
        ctx: Koa.Context,
        status: number,
        data: T
    ) {
        const response = this.formatResponse(
            status,
            data
        );
        ctx.set('Content-Type', 'application/json');
        ctx.status = status;
        ctx.body = response;
    }

    /**
     * convert the HTTP status code into JSend status
     * @param code http status code
     */
    private getStatus(code: number): string {
        if (code >= HTTPStatus.ServerError) {
            return 'error';
        }
        if (code >= HTTPStatus.BadRequest) {
            return 'fail';
        }
        return 'success';
    }

    public formatResponse<T>(
        status: number,
        data: T
    ) {
        const responeMetadata = {
            'app': 'Stock ticker price',
            'version': serverConf.version,
            'datetime': (new Date()).toISOString(),
            'status': this.getStatus(status),
            'code': status,
            'hostname': os.hostname(),
            data
        };
        return responeMetadata;
    }
}
export const renderCtx = new RenderCtx();