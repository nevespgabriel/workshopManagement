import Maintenance from "../models/maintenance_model.js";
import Vehicle from "../models/vehicle_model.js"
import Workshop from "../models/workshop_model.js";

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
        const vehicle = await Vehicle.findById(req.body.vehicle).exec();
        const workshop = await Workshop.findById(req.body.workshop).exec();
        vehicle.maintenances.push(content._id);
        workshop.maintenances.push(content._id);
        await vehicle.save();
        await workshop.save();
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
        const old = await Maintenance.findById(req.params.id).exec();
        const old_vehicle = await Vehicle.findById(old.vehicle).exec();
        const old_workshop = await Workshop.findById(old.workshop).exec();
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
        const vehicle = await Vehicle.findById(req.body.vehicle).exec();
        const workshop = await Workshop.findById(req.body.workshop).exec();
        vehicle.maintenances.push(content._id);
        workshop.maintenances.push(content._id);
        await vehicle.save();
        await workshop.save();
        await old_vehicle.maintenances.forEach((maintenance, index) => {
            if(req.params.id == maintenance){
                old_vehicle.maintenances.splice(index, 1);
                old_vehicle.save();
            }
        })
        await old_workshop.maintenances.forEach((maintenance, index) => {
            if(req.params.id == maintenance){
                old_workshop.maintenances.splice(index, 1);
                old_workshop.save();
            }
        });
        res.status(201).json(content);
    } catch(error){
        res.status(400).send(error.message);
    }
}

const destroy = async(req, res) => {
    try{
        const old = await Maintenance.findById(req.params.id).exec();
        await Maintenance.findByIdAndDelete(req.params.id).exec();
        const old_vehicle = await Vehicle.findById(old.vehicle).exec();
        const old_workshop = await Workshop.findById(old.workshop).exec();
        await old_vehicle.maintenances.forEach((maintenance, index) => {
            if(req.params.id == maintenance){
                old_vehicle.maintenances.splice(index, 1);
                old_vehicle.save();
            }
        })
        await old_workshop.maintenances.forEach((maintenance, index) => {
            if(req.params.id == maintenance){
                old_workshop.maintenances.splice(index, 1);
                old_workshop.save();
            }
        });
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