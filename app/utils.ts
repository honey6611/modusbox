
import * as request from 'request';
import { HTTPStatus } from './config/config';
import { isString } from 'util';

/**
 * convert http string response to JSON
 * @param response http response to be normalised
 */
export const normalizeResponse = <T>(response: T) => {
    try {
        if (isString(response)) {
            return JSON.parse(response);
        }
    }
    catch (err) {
        console.error(
            'Unable to parse response\n %s',
            err
        );
    }
    return response;
};

/**
 * function to handel http request get/post
 * @param options :HttpOptions
 */
export async function asyncHttpRequest(options: HttpOptions) {
    return new Promise((resolve, reject) => {
        request(
            options,
            (error: NodeJS.ErrnoException, response: request.Response, body: string) => {
                if (error) {
                    console.error(
                        `Http request failed %s`,
                        error
                    );
                    reject({
                        'error': 'error',
                        'status': HTTPStatus.ServerError,
                        'message': error
                    });
                    return;
                }
                if (response.statusCode !== HTTPStatus.Ok) {
                    console.debug(`Request ${options}\nResponse%${response}`);
                    reject({
                        'error': 'error',
                        'status': response.statusCode,
                        'message': body
                    });
                }
                resolve(body);
            });
    });
}

export interface HttpOptions {
    method: string;
    url: string;
    form?: {};
    headers?: request.Headers;
    qs?: string;
    json?: boolean;
}
