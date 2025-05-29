import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const jobOrderSchema = new mongoose.Schema({
    jobOrderNumber: {
        type: Number,
        unique: true
    },
    requestingDepartment: {
        type: String,
        required: true,
        trim: true
    },
    requestorName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    requestDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true
    },
    contactNumber: {
        type: String,
        required: true,
        trim: true
    },
    notedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orders: [{
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        unit: {
            type: String,
            required: true,
            trim: true
        },
        jobOrderDescription: {
            type: String,
            required: true,
            trim: true
        },
        unitPrice: {
            type: Number,
            required: true,
            min: 0
        }
    }],
    attachedFiles: [{
        type: String,
        trim: true
    }],
    completionDate: {
        type: Date,
        required: true
    },
    urgency: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "on-hold", "completed", "cancelled"],
        default: "pending"
    }
}, {
    timestamps: true
});

const AutoIncrement = AutoIncrementFactory(mongoose);

jobOrderSchema.plugin(AutoIncrement, { inc_field: 'jobOrderNumber' });

const JobOrder = mongoose.model("JobOrder", jobOrderSchema);

export default JobOrder;