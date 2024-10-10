import { Vehicle } from "../models/vehicle_model.js";

const store = async(req, res) => {
    try{
        const content = Vehicle.create({
            plate: req.body.plate,
            model: req.body.model,
            year: req.body.year,
            owner: req.body.owner,
            maintenances: []
        });
        res.status(201).json(content);
    } catch(error){
        res.status(400).send(error.message);
    }
}

const index = async(req, res) => {
    try{
        const content = await Vehicle.find(req.query).exec();
        res.status(200).json(content);
    } catch(error){
        res.status(400).send(error.message);
    }
}

const show = async(req, res) => {
    try{
        const content = await Vehicle.findById(req.params.id).populate("maintenances").exec();
        res.status(200).json(content);
    } catch(error){
        res.status(400).send(error.message);
    }
}

const update = (id="", maintenanceId="") => async(req, res) => {
    try{
        if(id != ""){
            const content = Vehicle.findById(id);
            Vehicle.findByIdAndUpdate(id, {
                plate: content.plate,
                model: content.model,
                year: content.year,
                owner: content.owner,
                maintenances: content.maintenances.push(maintenanceId)
            }).exec();
            res.json();
        }
        const content = await Vehicle.findByIdAndUpdate(req.params.id, req.body).exec();
        res.status(201).json(content);
    } catch(error){
        res.status(400).send(error.message);
    }
}

const destroy = async(req, res) => {
    try{
        await Vehicle.findByIdAndDelete(req.params.id).exec();
    } catch(error){
        res.status(400).send(error.message);
    }
}

export default{
    store,
    index,
    show,
    update,
    destroy
}