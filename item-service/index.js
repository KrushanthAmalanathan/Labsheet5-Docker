const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// In-memory items array
let items = ["Book", "Laptop", "Phone"];

// GET all items
app.get("/items", (req, res) => {
    res.json(items);
});

// GET item by ID
app.get("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 0 || id >= items.length) {
        return res.status(404).json({ message: "Item not found" });
    }
    res.json(items[id]);
});

// POST new item
app.post("/items", (req, res) => {
    const { name } = req.body || {}; // safe destructuring
    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }
    items.push(name);
    res.status(201).json({ message: "Item added", item: name });
});

// PUT (update) item by ID
app.put("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body || {};
    if (isNaN(id) || id < 0 || id >= items.length) {
        return res.status(404).json({ message: "Item not found" });
    }
    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }
    items[id] = name;
    res.json({ message: "Item updated", item: name });
});

// DELETE item by ID
app.delete("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 0 || id >= items.length) {
        return res.status(404).json({ message: "Item not found" });
    }
    const removed = items.splice(id, 1);
    res.json({ message: "Item deleted", item: removed[0] });
});

// Start server
const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Item Service running on port ${PORT}`);
});