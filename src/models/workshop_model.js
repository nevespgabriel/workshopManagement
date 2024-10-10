import { Schema, model } from "mongoose";

const workshopSchema = new Schema({
    name:{
        type: Schema.Types.String,
        required: true
    },
    address:{
        type: Schema.Types.String,
        required: true
    },
    specialties:{
        type: [Schema.Types.String],
        required: true,
    },
    maintenances:{
        type: [Schema.Types.ObjectId],
        ref: "Maintenance"
    }
});

const Workshop = model("Workshop", workshopSchema);

export default Workshop;