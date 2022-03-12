    import express, {response} from "express";
    import {RegisterLocation, RetrieveLocations} from "../Controllers/LocationsController";

    const router = express.Router();

    router.route("/")
        .post(RegisterLocation)
        .get(RetrieveLocations);


    export default router;