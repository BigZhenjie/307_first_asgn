import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());
app.use(cors());
const ids = [];
const users = {
    users_list: [
        {
            id: "xyz789",
            name: "Charlie",
            job: "Janitor"
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer"
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor"
        },
        {
            id: "yat999",
            name: "Dee",
            job: "Aspring actress"
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender"
        }
    ]
};

const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};

const idGenerator = () => {
    let id = Math.random().toString(36)
    //i am using a while loop here because i want 
    //to make sure that the id is unique
    while (id in ids) {
        id = Math.random().toString(36);
    }
    ids.push(id);
    return id;
};

app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    } else {
        res.send(users);
    }
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
})

app.get("/", (req, res) =>{
    res.send("Hello World");
})

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    userToAdd["id"] = idGenerator();
    addUser(userToAdd);
    res.status(201).send(userToAdd);
});

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const index = users["users_list"].findIndex(
        (user) => user["id"] === id
    );
    if (index > -1) {
        users["users_list"].splice(index, 1);
        res.status(204).send();
    }
    else{
        res.status(404).send("User not found.");
    }
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