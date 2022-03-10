import {Location} from "../entity/Location";
import {validate} from "../utils/Validations";
import {LocationRepository} from "../Repositories/LocationRepository";
import {getCustomRepository} from "typeorm";


const RegisterLocation = async (req,res)=>{
    const {name,district,sector}  = req.body;

    if (!validate(name) || !validate(district))
    {
        return res.status(500).json({
            success: false,
            message: "name and district are required fields"
        });
    }

    try {
        await Location.saveLocation(name,district,sector);
        return res.status(201).json({message:"successfully saved"});
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            message: "Error occurred when registering a new location"
        });
    }
}

const RetrieveLocations = (req,res)=>{
    try {
        const locations  = Location.find();
        return res.status(200).json(locations);
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while fetching locations"
        });
    }
}

export {RegisterLocation, RetrieveLocations};