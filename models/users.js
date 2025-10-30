import mongoose from "mongoose";

const users_schema = mongoose.Schema({
    name : {type:String ,required: true},
    order_id : {type: Number, required: true},
    product_name :{type:String, required: true}
});

const users_model = mongoose.model("users_model",users_schema);

export default users_model