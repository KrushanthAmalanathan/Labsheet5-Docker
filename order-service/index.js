const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let orders = [];
let idCounter = 1;

app.get("/orders", (req, res) => {
    res.json(orders);
});

app.get("/orders/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const order = orders.find(o => o.id === id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
});

app.post("/orders", (req, res) => {
    const order = {
        id: idCounter++,
        item: req.body.item,
        quantity: req.body.quantity,
        customerId: req.body.customerId,
        status: "PENDING"
    };
    orders.push(order);
    res.status(201).json(order);
});

app.listen(8082, () => {
    console.log("Order Service running on port 8082");
});