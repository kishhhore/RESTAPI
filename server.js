import express from "express";
import connectDB from "./db.js";
import users_model from "./models/users.js";

const app = express();
const port = 3000;

app.use(express.json()) ;
connectDB();

app.get("/users",async(req,res)=>{
    const users = await users_model.find();
    res.json(users);
});

app.post("/users", async(req,res)=>{
    const {name, order_id, product_name}  = req.body;

    if (!name || !order_id || !product_name){
        return res.status(400).json({error : "missing input fields"})
    }

    const new_user = new users_model({name, order_id, product_name});
    await new_user.save();
    res.status(201).json(new_user)
});

app.put("/users/:id",async(req,res)=>{
    const id = req.params.id;
    const {name, order_id,product_name} = req.body

    const update_user = await users_model.findByIdAndUpdate(
        id,
        {name,order_id,product_name},
        {new :true}
    )

    if(!update_user){
        res.status(404).json({error: "user not found"});

    }

    res.json(update_user);


});

app.delete("/users/:id",async(req,res)=>{
    const id  = req.params.id

    deleted_user = await users_model.findByIdAndDelete(id);

    if (!deleted_user){
        res.status(404).json({error: "user_id not found"})
    }

    res.status(200).json({message :"deleted successfully", deleted_user});


});




app.listen(port,()=>console.log("Server is running at port 3000"));