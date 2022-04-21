const https = require("https");
const fs = require('fs');
const express = require("express")
const path = require("path")
let options = {};
if (!process.env.PROD) {
    options = {
        key: fs.readFileSync('C:\\Users\\LRO\\code\\web\\debianOs\\ressources\\SSL\\localhost-key.pem'),
        cert: fs.readFileSync('C:\\Users\\LRO\\code\\web\\debianOs\\ressources\\SSL\\localhost.pem'),
    };
}

const app = express();

app.get("/", async(req, res, next) => {
    return res.sendFile(path.join(__dirname, "./index.html"))
})

app.get("/styles/CSS/:file", async(req, res, next) => {
    return res.sendFile(path.join(__dirname, "./styles/CSS", req.params.file))
})

app.get("/scripts/JS/:file", async(req, res, next) => {
    return res.sendFile(path.join(__dirname, "./scripts/JS", req.params.file))
})

app.get("/ressources/app/:file", async(req, res, next) => {
    return res.sendFile(path.join(__dirname, "./ressources/app", req.params.file))
})

app.get("/ressources/os/:file", async(req, res, next) => {
    return res.sendFile(path.join(__dirname, "./ressources/os", req.params.file))
})


https
    .createServer(options, app)
    .listen(process.env.PORT || 10002);