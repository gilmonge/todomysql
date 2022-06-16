import express, { Express, Request, Response, NextFunction } from 'express';
import CONFIG from "./config"
import helmet from 'helmet';
import permissionsPolicy from 'permissions-policy'
import bodyParser from 'body-parser';
import cors from 'cors'

const app: Express = express()

/* Use helmet */
    app.use(helmet());
    app.use(
        helmet.contentSecurityPolicy({
            useDefaults: true,
            directives:{
                'default-src': [ 
                    "'self'",
                ],
                'font-src': [
                    "'self'",
                    'https:',
                    'data:',
                ],
                'img-src': [
                    "'self'",
                    'https:',
                    'data:',
                ],
                'script-src': [
                    "'self'",
                    "'unsafe-inline'",
                    'https:',
                    "https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js",
                    "https://code.jquery.com/ui/1.12.1/jquery-ui.js",
                ],
                'style-src': [
                    "'self'",
                    'https:',
                    "'unsafe-inline'",
                ],
                'frame-ancestors': [
                    "'self'",
                    "https:",
                ],
            }
        })
    );
/* Use helmet */

/* Use permissions Policy */
    app.use(
        permissionsPolicy({
            features: {
                geolocation: ["self"],
                midi: ["self"],
                syncXhr: [],
                magnetometer: [],
                gyroscope: [],
                fullscreen: ["self"],
            },
        })
    );
/* Use permissions Policy */

/* Use X-XSS-Protection */
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.setHeader("X-XSS-Protection", "1; mode=block");
        next();
    });
/* Use X-XSS-Protection */

/* Use body parser */
    app.use(bodyParser.json({
        limit: '50mb'
    }));

    app.use(bodyParser.urlencoded({
        limit: '50mb',
        parameterLimit: 100000,
        extended: true 
    }));
/* Use body parser */

/* Use CORS */
    const options: cors.CorsOptions = {
    origin: "*"
    };
    app.use(cors(options));
/* Use CORS */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* EndPoint Base */
    import {router as Index} from "./api/controllers/index";
    app.use("/", Index);
/* EndPoint Base */

/* EndPoint Auth */
    import {router as Auth} from "./api/controllers/auth";
    app.use("/api/auth/", Auth);
/* EndPoint Auth */

/* Static Files */
    app.use('/assets', express.static('assets'));
/* Static Files */

app.listen(CONFIG.port, () => {
    console.log(`Servidor escuchando en el puerto ::${CONFIG.port}`);
});