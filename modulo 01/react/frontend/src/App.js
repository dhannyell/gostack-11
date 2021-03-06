import React, { useState, useEffect } from 'react';
import api from './services/api'

import './App.css'

import Header from './components/Header';
import axios from 'axios';

/**
 * Componente
 * Propriedade
 * Estado & Imutabilidade
 */

function App() {
    //useState retorna um array com 2 posições
    //
    //1. Variavel com o valor inicial
    //2. Função para atualizar os valores

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        })
    }, []);

    async function handleAddProject(){
        //projects.push(`Novo projeto ${Date.now()}`);
        //setProjects([...projects, `Novo Projeto ${Date.now()}`]);
        //console.log(projects);

        const response = await api.post('projects', {
            title: `Novo Projeto ${Date.now()}`,
            owner: "Lukas"
        });

        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <>
            <Header title="Homepage" />
            
            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
        </>
    )
}

export default App;