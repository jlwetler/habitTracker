import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import UserContext from '../contexts/UserContext'; 
import HabitsContext from '../contexts/HabitsContext';

export default function HabitsContainer() {
    const { user, setUser } = useContext(UserContext);
    const { habits, setHabits } = useContext(HabitsContext);
    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }    
    
    useEffect(() => {
        const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits',config);

        promise.then((response) => {
            setHabits(response.data);
        });
        promise.catch(() => {
        return 'Please reload the page'
        })
    }, []);

    if (habits.length === 0) {
    return (
    <span>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</span>
    )};
}