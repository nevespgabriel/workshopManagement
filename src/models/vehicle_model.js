import { Schema, model } from "mongoose";

const vehicleSchema = new Schema({
    plate:{
        type: Schema.Types.String,
        required: true,
        minLength: 7,
        maxLength: 7,
        unique: true
    },
    model: {
        type: Schema.Types.String,
        required: true,
    },
    year: {
        type: Schema.Types.Number,
        min: 1885,
        required: true
    },
    owner: {
        type: Schema.Types.String,
        required: true
    },
    maintenances:{
        type: [Schema.Types.ObjectId],
        ref: "Maintenance"
    }
});

const Vehicle = model("Vehicle", vehicleSchema);

export default Vehicle;