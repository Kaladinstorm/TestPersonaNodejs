const env = process.env.NODE_ENV || "dev";

if (env === "dev") {
    const envConfig = require('./config.json');
    const configs = envConfig[env];

    Object.keys(configs).forEach((keys) => {
        process.env[keys] = configs[keys];
    })
}

