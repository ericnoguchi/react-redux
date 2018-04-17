const express = require('express');
const app = express()
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    /*     res.header("   Access-Control-Allow-Header", "*"); */

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());

const data = {
    users: [{
            "id": 1,
            "fullName": "Allison Finch",
        },
        {
            "id": 2,
            "fullName": "Jeanette Drake",
        },
        {
            "id": 3,
            "fullName": "Hilda Anderson",
        },
        {
            "id": 4,
            "fullName": "Sherri Boyette",
        },
        {
            "id": 5,
            "fullName": "Ashley Boyd",
        }
    ]
}

//get all
app.get('/users', (req, res) => res.json(data))

// Create
app.post('/users/', (req, res) => {
    const newId = data.users.length ? Math.max(...data.users.map(user => +user.id)) + 1 : 1
    const newUser = req.body;
    newUser.id = newId;
    data.users.push(newUser);
    setTimeout(() => {
        res.json({
            users: [newUser]
        });
    }, 1000)

}) 

// Read 
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    res.json({
        users: data.users.filter(user => user.id == id)
    })
})

//Update
app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    data.users = data.users.map(user => (user.id == id) ? {
        ...user,
        ...updatedUser
    } : user);
    res.json(data);
})

//Delete
app.delete('/users/:id', (req, res) => {
    data.users = data.users.filter(user => user.id != req.params.id)
    res.json(data);
})



app.listen(3000, () => console.log('Example app listening on port 3000!'))