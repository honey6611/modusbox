const alphaAdvantageApiKey: string = process.env.API_KEY ? process.env.API_KEY : 'demo'
export const serverConf = {
    version: '1.0',
    port: 8081,
    host: '0.0.0.0',
    apikey: alphaAdvantageApiKey
}

export const HTTPStatus = {
    'BadRequest': 400,
    'Ok': 200,
    'Unauthorised': 401,
    'ServerError': 500,
    'NotFound': 404,
    'Forbidden': 403
};