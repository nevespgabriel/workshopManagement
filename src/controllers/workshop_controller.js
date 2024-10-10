import Workshop from "../models/workshop_model.js";

const store = async(req, res) => {
    try{
        const content = Workshop.create({
            name: req.body.name,
            address: req.body.address,
            specialties: req.body.specialties,
            maintenances: []
        });
        res.status(201).json(content);
    } catch(error){
        res.status(400).send(error.message);
    }
}

const index = async(req, res) => {
    try{
        const content = await Workshop.find(req.query).exec();
        res.status(200).json(content);
    } catch(error){
        res.status(400).send(error.message);
    }
}

const show = async(req, res) => {
    try{
        const content = await Workshop.findById(req.params.id).populate("maintenances").exec();
        res.status(200).json(content);
    } catch(error){
        res.status(400).send(error.message);
    }
}

const update = async(req, res) => {
    try{
        const old = await Vehicle.findById(req.params.id);
        const content = await Workshop.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            address: req.body.address,
            specialties: req.body.specialties,
            maintenances: old.maintenances
        }).exec();
        res.status(201).json(content);
    } catch(error){
        res.status(400).send(error.message);
    }
}

const destroy = async(req, res) => {
    try{
        await Workshop.findByIdAndDelete(req.params.id).exec();
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