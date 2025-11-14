import { Router } from "express";

const userRouter=Router()

userRouter.get("/",async(req, res)=>{
    res.send('Hi Tajinder ji')
})