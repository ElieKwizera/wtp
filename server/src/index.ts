import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express';
import morgan from "morgan";
import locations from "./routes/locations";

const app  = express();

app.use(express.json());
app.use(morgan("common"));

app.use("/api/locations", locations);

app.listen(5000, async () => {
    console.log("server running on port 5000");
    try {
        await createConnection();
        console.log("Connected to the database")
    } catch (err) {
        console.log(err)
    }
})

