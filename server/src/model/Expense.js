const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2");
// Schema
const expenseSchema = mongoose.Schema({
    title: {
        required: [true, "Title is required"],
        type: String,
    },
    description: {
        required: [true, "Description is required"],
        type: String,
    },
    type: {
        type: String,
        default: "expense",
    },
    amount: {
        required: [true, "Amount is required"],
        type: Number, // Corrected this to remove quotes
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // Must be mongoose ObjectId
        ref: "User",
        required: [true, "User ID is required"],
    }
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    }
});
//pagination 
expenseSchema.plugin(mongoosePaginate);
const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
