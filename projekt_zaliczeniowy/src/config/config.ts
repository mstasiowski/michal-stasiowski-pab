//load any environment variables from bash or .env file
import dotenv from 'dotenv';

dotenv.config();

// why or empty string? because typescript understands that this variables are strings and not null
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';

const TOKEN_SECRET = process.env.TOKEN_SECRET || '';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '';


const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.azhxb4q.mongodb.net/MySeriesApiDB`;

//check  if exist (?) if does ,get number port or default 3000
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000;


export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT,
        token:{
            secret:TOKEN_SECRET,
            refresh:REFRESH_TOKEN_SECRET
        }
    }
};