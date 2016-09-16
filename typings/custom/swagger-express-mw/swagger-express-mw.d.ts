// Custom typings for swagger-express-mw
//
declare module 'swagger-express-mw' {
    import * as express from "express";

    function serveStatic(): void;
    namespace serveStatic {
        interface Request extends express.Request {
            swagger: SwaggerObject;
        }

        interface SwaggerObject {
            params: ParametersObject;

            paths: PathsObject; 
        }

        interface PathsObject {
            [key: string]: string;
        }
        
        interface ParametersObject {
            [key: string]: ParameterValueObject;
        }

        interface ParameterValueObject {
            value: string;
        }

        interface SwaggerOptions {
            appRoot: string;
        }

        interface RunnerObject {
            swagger: SwaggerObject;
        }

        interface SwaggerExpress {
            register(app: express.Express): void;

            runner: RunnerObject;
        }

        function create(options: SwaggerOptions, callback: (error: Error, swaggerExpress: SwaggerExpress) => void): void;        
    }

    export = serveStatic;
}
