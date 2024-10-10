import Maintenance from "../models/maintenance_model.js";
import vehicle_controller from "./vehicle_controller.js";
import workshop_controller from "./workshop_controller.js";

const store = async(req, res) => {
    try{
        let cost = 0;
        req.body.services.forEach((service) => {
            cost+=service.price;
        });
        const content = Maintenance.create({
            workshop: req.body.workshop,
            vehicle: req.body.vehicle,
            services: req.body.services,
            date: req.body.date,
            totalCost: cost
        });
        res.status(201).json(content);
    } catch(error){
        res.status(400).send(error.message);
    }
}

const index = async(req, res) => {
    try{
        const content = await Maintenance.find(req.query).exec();
        res.status(200).json(content);
    } catch(error){
        res.status(400).send(error.message);
    }
}

const show = async(req, res) => {
    try{
        const content = await Maintenance.findById(req.params.id).populate("workshop").populate("vehicle").exec();
        res.status(200).json(content);
    } catch(error){
        res.status(400).send(error.message);
    }
}

const update = async(req, res) => {
    try{
        let cost = 0;
        req.body.services.forEach((service) => {
            cost+=service.price;
        });
        const content = await Maintenance.findByIdAndUpdate(req.params.id, {
            workshop: req.body.workshop,
            vehicle: req.body.vehicle,
            services: req.body.services,
            date: req.body.date,
            totalCost: cost
        }).exec();
        res.status(201).json(content);
    } catch(error){
        res.status(400).send(error.message);
    }
}

const destroy = async(req, res) => {
    try{
        await Maintenance.findByIdAndDelete(req.params.id).exec();
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