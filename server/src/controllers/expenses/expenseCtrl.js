const expressAsyncHandler = require("express-async-handler");
const Expense = require("../../model/Expense");

// Create Expense
const createExpCtrl = expressAsyncHandler(async (req, res) => {
    const { title, amount, description, user } = req.body;
    try {
        const expense = await Expense.create({
            title,
            amount,
            description,
            user,
        });
        res.json(expense);  // Use lowercase 'expense' here
    } catch (error) {
        res.json(error);
    }
});

// Fetch all Expenses
const fetchAllExpCtrl = expressAsyncHandler(async (req, res) => {
    const { page } = req.body;
    try {
        const expenses = await Expense.paginate({}, { limit: 2, page: Number(page), populate: "user" });  // Use 'expenses' here
        res.json(expenses);
    } catch (error) {
        res.json(error);
    }
});

// Fetch single Expense
const fetchExpDetailsCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await Expense.findById(id);  // Use 'expense' here
        res.json(expense);
    } catch (error) {
        res.json(error);
    }
});

// Update Expense
const UpdateExpCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, amount, description } = req.body;
    try {
        const expense = await Expense.findByIdAndUpdate(
            id,
            {
                title,
                amount,
                description,
            },
            {
                new: true, // Ensures the updated document is returned
            }
        );
        res.json(expense);  // Use 'expense' here
    } catch (error) {
        res.json(error);
    }
});

// Delete Expense
const deleteExpCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await Expense.findByIdAndDelete(id);  // Use 'expense' here
        res.json(expense);
    } catch (error) {
        res.json(error);
    }
});

module.exports = { createExpCtrl, fetchAllExpCtrl, fetchExpDetailsCtrl, UpdateExpCtrl, deleteExpCtrl };

