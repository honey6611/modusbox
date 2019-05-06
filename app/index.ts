import server from './server';
import { clustered, initiateServer } from './cluster';
import { serverConf } from './config/config';

let app;
if (process.env.NODE_ENV !== 'test') {
    app = clustered(serverConf, server);
}
else {
    app = initiateServer(serverConf, server)
}
process
    .on('unhandledRejection', error => {
        console.log(
            `Unhandled rejection %(error)s`,
            { error }
        );
        process.exit(1);
    })
    .on('uncaughtException', error => {
        console.log(
            `Uncaught Exception %(error)s`,
            { error }
        );
        process.exit(1);
    });
export default app;