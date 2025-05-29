import express from "express";
import {
    createJobOrder,
    getJobOrders,
    updateStatus
} from "../controllers/jobOrderController.js";

const app = express.Router();

app.get("/", getJobOrders);
app.post("/create-job-order", createJobOrder);
app.put('/update-status/:id', updateStatus);

export default app;
