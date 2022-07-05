import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express';
import morgan from "morgan";
import locations from "./routes/locations";
import dotenv from 'dotenv';
import account from "./routes/account";
import busPark from "./routes/busPark";

dotenv.config();

const app  = express();

app.use(express.json());
app.use(morgan("common"));

app.use("/api/locations", locations);
app.use("/api/buspark", busPark);
app.use("/api/auth", account);

const port = process.env.PORT;

app.listen(port, async () => {
    console.log(`server running on port ${port}`);    
    try {
        await createConnection();
        console.log("Connected to the database!!")
    } catch (err) {
        console.log(err)
    }
})


