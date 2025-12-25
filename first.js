import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
app.use(cors());//for frontend and backend connection
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const dbpath= 'mongodb+srv://MySQL:MySQL@nothing.3jwi4sr.mongodb.net/backend?appName=nothing';
app.set('views', path.join(__dirname, 'views'));
import { Modal } from "./modal.js";
app.get("/", (req, res) => {
  res.render("first.ejs");
});
app.post("/", async (req, res) => {
    console.log('POST received', req.body);
    const { item, price } = req.body;

    try {
        const user = new Modal({ item,price });
        await user.save();

        res.json({ message: "User saved successfully", user });
    } catch (error) {
        res.status(500).json({ error });
    }
});
app.get("/about", (req, res) => {
    res.render("about.ejs");
});
app.post("/about", async (req, res) => {
    console.log('POST received', req.body);
    const { totalScore , no} = req.body;
    try {
        const user = new Modal({ totalScore , no});
        await user.save();
        res.json({ message: "User saved successfully", user });
    } catch (error) {
        res.status(500).json({ error });
    }
});
app.get("/contact", async (req, res) => {
    try {
        const users = await Modal.find({});
        res.render("contact.ejs", { users });
    } catch (error) {
        res.status(500).json({ error });
    }
});
// app.post("/contact", async (req, res) => {
//     console.log('POST received', req.body);
//     const { totalScore, no } = req.body;
//     try {
//         const user = new Modal({ totalScore, no });
//         await user.save();
//         res.json({ message: "User saved successfully", user });
//     } catch (error) {
//         res.status(500).json({ error });
//     }});

app.get("/api/contact", async (req, res) => {
    try {
        const users = await Modal.find({});
        res.json({ users });
    } catch (error) {
        res.status(500).json({ error });
    }
});
app.get("/api/contact", async(req , res)=>{
    const del= await Modal.find();
    res.json(del);
})
app.delete("/api/contact/:id",async(req, res)=>{
    try{ 
        await Modal.findByIdAndDelete(req.params.id)
        res.json({Message: "user deleted succesfully"});
    } catch (err) {
    res.status(500).json({ error: err.message });
  }

})


const PORT = 5000;
mongoose.connect(dbpath)
    .then(() => {
        console.log('connected to mongoose');
        app.listen(PORT, () => {
            console.log(`server is running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Mongoose connection error:', err);
    });