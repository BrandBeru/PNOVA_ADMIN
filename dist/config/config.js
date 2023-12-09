"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const config = {
    env: process.env.NODE_ENV,
    port: process.env.NODE_PORT,
    host: process.env.NODE_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    jwtSecret: process.env.JWT_SECRET,
    apiKey: process.env.API_KEY
};
exports.default = config;
