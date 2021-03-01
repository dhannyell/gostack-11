import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';

import api from './services/api';

export default function App(){
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        })
    }, []);

    async function handleAddProject(){

        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: 'Lukas Lima'
        });

        setProjects([...projects, response.data])
    }

    return (
        <>
        <StatusBar backgroundColor="black" barStyle="light-content"/>

        <SafeAreaView style={styles.container}>
            <FlatList 
                data = {projects}
                keyExtractor={project => project.id}
                renderItem={({item: project}) => (
                    <Text style={styles.title}>{project.title}</Text>
                )}
            />

            <TouchableOpacity 
                activeOpacity={0.6} 
                style={styles.button} 
                onPress={handleAddProject}
            >
                <Text style={styles.buttonText}>Adicionar projeto</Text>
            </TouchableOpacity>
        </SafeAreaView>
        
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7965c1',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#fff',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    }
});