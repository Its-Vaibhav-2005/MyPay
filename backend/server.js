import express from 'express';
import dotenv from 'dotenv';
import {sql} from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// middleware
app.use(express.json());

// init DB
async function initDB(){
    try{
        await sql`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            userId VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            createdAt DATE NOT NULL DEFAULT CURRENT_DATE
        )`
        console.log("Database Initialized Successfully");
    }catch(err){
        console.log("Error Initializing Database: ", err);
        process.exit(1);
    }
}


app.get('/', (req, res)=>{
    res.send("Hello from MyPay Backend");
})
// routes
// 1. add transaction
app.post('/api/trasactions', async (req, res)=>{
    try{
        const {title, amount, category, userId} = req.body;
        if(!title || amount===undefined || !category || !userId){
            return res.status(400).json({
                msg:"All fields are required"
            })
        }

        const transaction = await sql`INSERT INTO transactions (title, amount, category, userId) VALUES (${title}, ${amount}, ${category}, ${userId}) RETURNING *`;

        res.status(201).json({
            msg:"Successfully added transaction",
            transaction: transaction[0]
        })


    }catch(err){
        console.log("Error adding transaction: ", err);
        res.status(500).json({
            msg:"Sorry, It's not you, it's us. Please try again later."
        })
    }
})

// 2. get transaction by userId
app.get('/api/transactions/:userId', async(req, res)=>{
    try{
        const {userId} = req.params;
        const transactions = await sql`SELECT * FROM transactions WHERE userId = ${userId} ORDER BY createdAt DESC`;
        res.status(200).json({
            "transactions": transactions
        });
    }catch(err){
        console.log("Error fetching transaction: ", err);
        res.status(500).json({
            msg:"Sorry, It's not you, it's us. Please try again later."
        })
    }
})

// 3. delete transaction by id
app.delete('/api/transactions/:id', async(req, res)=>{
    try{
        const {id} = req.params;

        if(isNaN(parseInt(id))){
            return res.status(400).json({
                msg: "Transaction ID must be integer"
            });
        }

        const result = await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`;
        if (result.length === 0){
            return res.status(404).json({
                msg: "Transaction not found"
            });
        }
        res.status(200).json({
            "msg": "Transaction deleted successfully",
            "result": result
        });
    }catch(err){
        console.log("Error fetching transaction: ", err);
        res.status(500).json({
            msg:"Sorry, It's not you, it's us. Please try again later."
        })
    }
}) 
initDB().then(()=>{
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}: http://127.0.0.1:${PORT}`);
        })
    }
)

