import express from "express";
import cors from "cors";
import user from "./user-services.js";

const app = express();
const port = 8000;
app.use(express.json());
app.use(cors());

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    user.getUsers(name, job)
    .then((result) => {
        if (result.length === 0) {
            res.status(404).send("User not found");
            return;
        } else{
            res.send(result);
        }
    })
    .catch((error) => {
        // console.log(error);
        res.status(500).send("Internal Server Error");
    })
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    user.findUserById(id)
    .then((result) => {
        res.send(result);
    })
    .catch((error) => {
        // console.log(error);
        res.status(404).send("User not found");
    })
})

app.get("/", (req, res) =>{
    user.getUsers()
    .then((result) => {
        res.send(result);
    })
    .catch((error) => {
        // console.log(error);
        res.status(500).send("Internal Server Error");
    })
})

// const addUser = (user) => {
//     users["users_list"].push(user);
//     return user;
// };

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    user.addUser(userToAdd);
    res.status(201).send(userToAdd);
});

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    user.deleteUserById(id)
    .then((result) => {
        res.send(result);
    })
    .catch((error) => {
        res.status(404).send("User not found");
    })
})

const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter(
        (user) => user["name"] === name && user["job"] === job
    );
};

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    const result = findUserByNameAndJob(name, job);
    res.send(result);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})