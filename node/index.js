const express = require('express')
const CONFIG = require("./config")
const helmet = require("helmet")
const permissionsPolicy = require("permissions-policy")
const bodyParser = require('body-parser')

const app = express()

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
app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true 
}));

const cors = require("cors")
app.use("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* EndPoint Base */
    const index = require("./api/controllers/index")
    app.use("/", index);
/* EndPoint Base */

/* Static Files */
    app.use('/assets', express.static('assets'));
/* Static Files */

var server = app.listen(CONFIG.port, () => {
    console.log(`Servidor escuchando en el puerto ::${CONFIG.port}`);
});