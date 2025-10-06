import express from 'express';

// configure environment variables
import dotenv from 'dotenv';
dotenv.config();




const app = express();


// server running now
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})

