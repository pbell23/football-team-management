import { Logger, createLogger, format, transports } from 'winston';

const { combine, timestamp, errors, json, colorize, simple } = format;

export const logger: Logger = createLogger({
    level: 'info',
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        errors({ stack: true }),
        json()
    ),
    transports: [
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: combine(
            colorize(),
            simple()
        )
    }));
}
