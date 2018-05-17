const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const users = [
    {
        username: "iaml",
        full_name: "Eduard Telezhnikov"
    },
    {
        username: "everzilov",
        full_name: "Evgeny Verzilov"
    },
    {
        username: "sergeyk555",
        full_name: "Sergey K"
    },
];

app.get("/api/users/", (req, res) => {
    return res.json(users);
});

app.get("/api/users/:username/", (req, res) => {
    const name = req.params["username"];
    if (name) {
        const user = users.find(user => user.username === name);
        if (user) return res.json(user);
    }
    return res.json({status: "user not found"});
});

app.put("/api/users/:username/", (req, res) => {
    const nameOld = req.params["username"];
    const nameNew = req.body.username;
    if (nameOld && nameNew) {
        const user = users.find(user => user.username === nameOld);
        if (user) {
            user.username = nameNew;
            return res.json({status: "ok"});
        }
    }
    return res.json({status: "error"});
});

const server = app.listen(7000, () => console.log("starting server"));


