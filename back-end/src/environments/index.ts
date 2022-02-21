import * as dotenv from 'dotenv'
dotenv.config();

const PORT: number = +process.env.PORT  || 3000
const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET || 'SECRET_KEY'

export{
    ACCESS_TOKEN_SECRET,
    PORT
}