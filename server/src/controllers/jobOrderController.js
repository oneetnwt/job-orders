import JobOrder from "../models/orders.js";
import Status from "../models/status.js";

export const getJobOrders = async (req, res) => {
    try {
        const jobOrders = await JobOrder.find()
            .populate("notedBy", "name")
            .sort({ createdAt: -1 });
        res.status(200).json(jobOrders);
    } catch (error) {
        console.error("Error in GET /job-orders:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const createJobOrder = async (req, res) => {
    try {
        const {
            requestingDepartment,
            requestorName,
            dueDate,
            contactNumber,
            notedBy,
            orders,
            attachedFiles,
            completionDate,
            urgency,
        } = req.body;

        if (
            !requestingDepartment ||
            !requestorName ||
            !dueDate ||
            !contactNumber ||
            !notedBy ||
            !orders ||
            !completionDate ||
            !urgency
        )
            return res.status(400).json({ error: "All fields are required" });

        const newJobOrder = new JobOrder({
            requestingDepartment,
            requestorName,
            dueDate: new Date(dueDate),
            contactNumber,
            notedBy,
            orders: orders.map((order) => ({
                quantity: order.quantity,
                unit: order.unit,
                jobOrderDescription: order.jobOrderDescription,
                unitPrice: order.unitPrice,
            })),
            attachedFiles: attachedFiles || [],
            completionDate: new Date(completionDate),
            urgency
        });

        await newJobOrder.save();

        res.status(201).json({
            message: "Job order created successfully",
            jobOrder: newJobOrder,
        });
    } catch (error) {
        console.error("Error in GET /job-order:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const cleanId = id.trim();
        const { newStatus, updatedBy, remarks } = req.body;

        const jobOrder = await JobOrder.findById(cleanId);

        if (!jobOrder) return res.status(404).json({ message: "Job order not found" });

        addStatusHistory(cleanId, jobOrder.status, newStatus, updatedBy, remarks)

        jobOrder.status = newStatus;

        await jobOrder.save();


        return res.status(201).json({ message: "Status updated" })
    } catch (error) {
        console.error('Error in PUT', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const addStatusHistory = async (jobOrderId, currentStatus, newStatus, updatedBy, remarks) => {
    const newOrderStatus = new Status({
        jobOrderId,
        currentStatus,
        newStatus,
        updatedBy,
        remarks
    })

    await newOrderStatus.save();
}