const {v4} = require('uuid')
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = []

app.get('/repositories', (req, res) => {
    return res.status(200).json(repositories)
})

app.post('/repositories/', (req, res) => {
    const { title, url, techs} = req.body;

    const repository = { id: v4(), title, url, techs, likes: 0};

    repositories.push(repository);

    return res.json(repository);

})

app.post('/repositories/:id/like', (req, res) =>{
    const { id } = req.params;

    const repositoryIndex = repositories.findIndex(p => p.id === id);

    if(repositoryIndex < 0){
        return res.status(400).json({error: "Repository Not Found" })
    }

    repositories[repositoryIndex].likes += 1;

    return res.json(repositories[repositoryIndex]);
})

app.put('/repositories/:id', (req, res) => {
    const {id} = req.params;
    const { title, url, techs} = req.body;

    const repositoryIndex = repositories.findIndex(p => p.id === id);

    if(repositoryIndex < 0){
        return res.status(400).json({error: "Repository Not Found"})
    }

    repositories[repositoryIndex].title = title;
    repositories[repositoryIndex].url = url;
    repositories[repositoryIndex].techs = techs;


    return res.json(repositories[repositoryIndex]);

})

app.delete('/repositories/:id', (req, res) => {
    const {id} = req.params;

    repositoriesIndex = repositories.findIndex(p => p.id === id);

    if(repositoriesIndex < 0){
        return res.status(400).json({error: "Repository not found"});
    }

    repositories.splice(repositoriesIndex, 1);

    return res.status(204).send();
})

module.exports = app;