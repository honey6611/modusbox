import * as Koa from 'koa';
import * as koaLogger from 'koa-logger';
import * as bodyParser from 'koa-bodyparser';
import Routes from './routes';

class App {
    public server: Koa;
    constructor() {
        this.server = new Koa();
        this.middleware();
    }
    private middleware() {
        this.server.use(koaLogger(str => {
            console.debug(str);
        }));
        this.server.use(bodyParser());
        this.server.use(Routes());
    }
}
export default new App().server;