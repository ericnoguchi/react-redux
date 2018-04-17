const express = require('express')
const app = express()

const users = [{
        "id": 1,
        "fullName": "Allison Finch",
        "bool": true
    },
    {
        "id": 2,
        "fullName": "Jeanette Drake",
        "bool": true
    },
    {
        "id": 3,
        "fullName": "Hilda Anderson",
        "bool": false
    },
    {
        "id": 4,
        "fullName": "Sherri Boyette",
        "bool": false
    },
    {
        "id": 5,
        "fullName": "Ashley Boyd",
        "bool": true
    }
]




app.get('/users', (req, res) => res.json(users))

app.listen(3000, () => console.log('Example app listening on port 3000!'))