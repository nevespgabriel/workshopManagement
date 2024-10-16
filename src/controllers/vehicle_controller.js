import Vehicle from "../models/vehicle_model.js";

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

const update = async(req, res) => {
    try{
        const old = await Vehicle.findById(req.params.id);
        const content = await Vehicle.findByIdAndUpdate(req.params.id, {
            plate: req.body.plate,
            model: req.body.model,
            year: req.body.year,
            owner: req.body.owner,
            maintenances: old.maintenances
        }).exec();
        res.status(201).json(content);
    } catch(error){
        res.status(400).send(error.message);
    }
}

const destroy = async(req, res) => {
    try{
        await Vehicle.findByIdAndDelete(req.params.id).exec();
        res.status(200).json();
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