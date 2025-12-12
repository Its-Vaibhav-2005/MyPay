import {neon} from '@neondatabase/serverless'
import dotenv from 'dotenv'

dotenv.config();

// SQL connection on neon DB
export const sql = neon(process.env.DBURL);