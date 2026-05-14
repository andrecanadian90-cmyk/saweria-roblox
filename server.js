const express = require("express");

const app = express();

app.use(express.json());

let latestDonation = null;

// WEBHOOK DARI SAWERIA
app.post("/webhook/saweria", (req, res) => {

    console.log("DONATION MASUK");
    console.log(req.body);

    latestDonation = {
        name: req.body.donator || "Unknown",
        amount: req.body.amount || 0,
        message: req.body.message || ""
    };

    res.sendStatus(200);
});

// API UNTUK ROBLOX
app.get("/latest-donation", (req, res) => {

    if (!latestDonation) {
        return res.json({
            status: false
        });
    }

    res.json({
        status: true,
        data: latestDonation
    });
});

// TEST
app.get("/", (req, res) => {
    res.send("API ONLINE");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("SERVER RUNNING");
});