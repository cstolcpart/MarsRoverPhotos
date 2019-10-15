const winston = require('winston');

const options = {
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        timestamp: true,
        colorize: true,
    },
};

const transports = [];
transports.push(new winston.transports.Console(options.console));

const logger = new winston.Logger({
    transports: transports,
    exitOnError: false,
});

module.exports = logger;