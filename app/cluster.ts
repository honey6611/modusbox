
import * as cluster from 'cluster';
import * as  http from 'http';
import { cpus, hostname } from 'os';
import * as Koa from 'koa';

/**
 * run app in clustered mode
 * @param options {port,ip,workers}
 * @param server
 */
export const clustered = (options, server: Koa) => {
    if (cluster.isMaster) {

        for (let i = 0; i < cpus().length; i++) {
            cluster.fork();
        }

        cluster.on('online', worker => {
            console.log(
                `Worker %s is online`, worker.process.pid
            );
        });

        cluster.on('exit', (worker, code, signal) => {
            console.log(
                `Worker ${worker.process.pid} died with code: ${code} and signal: ${signal}\nStarting a new worker...`);
            cluster.fork();
        });
    }
    else {
        return initiateServer(options, server);
    }
};

/**
 * run app as single instance
 * @param options {port,ip}
 * @param server
 */
export const initiateServer = (options, server: Koa) => {
    const httpServer: http.Server = http.createServer(server.callback())
        .listen(
            options.port,
            options.host
        );
    return httpServer;
};