import styled from 'styled-components'
import axios from 'axios'
import { useState, useContext } from 'react'
import UserContext from '../contexts/UserContext'
import Loading from './Loading'

export default function AddHabit({ days, setDays, habits, setHabits, setAddNewHabit, getHabits}) {
    const [name, setName] = useState('');
    const { user } = useContext(UserContext);
    const [removeLoading, setRemoveLoading] = useState(false);
    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }

    function changeStatus(id) {
        (!days[id].isSelected) ? 
            setDays([...days], days[id].isSelected = true) : 
            setDays([...days], days[id].isSelected = false);

    }

    function createHabit() {
        setRemoveLoading(true);
        const selectedDays = [];
        days.filter(item => item.isSelected ? selectedDays.push(item.id) : null)

        const newHabit = {name, days: selectedDays}

        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', newHabit, config);

        promise.then((response) => {
            setHabits([...habits], response.data);
            setRemoveLoading(false);
            getHabits();
            setAddNewHabit(false);
        });
        promise.catch(() => {
            console.log('Erro ao cadastrar hábito');
            setRemoveLoading(false);
        })

        resetNewHabit();
    }

    function resetNewHabit() {
        setDays(days.map(d => {
            return { id: d.id, day: d.day, isSelected: false }
        }));
        setName("");
    }

    return(
        <NewHabitContainer>
            <input 
                type="text" 
                placeholder="nome do hábito" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                required
            />
            {days.map(({ day, id, isSelected }) => 
                <Day 
                    key={id} 
                    back={isSelected ? true : false} 
                    onClick={() => {changeStatus(id)}}
                > 
                    {day}
                </Day>
            )}
            <section>
                <Cancel onClick={() => setAddNewHabit(false)}>
                    Cancelar
                </Cancel>     
                <Save 
                disabled={!removeLoading ? false : true} 
                onClick={createHabit}
                >
                    {!removeLoading ? 'Salvar' : <Loading/>}
                </Save>
            </section>     
        </NewHabitContainer>
    );
}

const NewHabitContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 90vw;
    height: 180px;
    background: #fff; 
    padding: 13px;
    margin: 20px auto;
    border-radius: 5px;
    box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.3);
    input {
        font-family: 'Righteous';
        font-size:20px;
        width: 90vw;
        height: 45px;
    }
    section {
        width: 85vw;
        margin-top: 40px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
`;

const Day = styled.div `
    background: ${props => props.back ? 'gray' : 'white'};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    margin: 5px 5px 0 0;
    border-radius: 5px;
    border: 1px solid #000;
    cursor: pointer;
`;

const Cancel = styled.button `
    font-family: 'Righteous';
    border: none;
    background: #fff;
    color: #52B6FF;
    cursor: pointer;
`;

const Save = styled.button `
    font-family: 'Righteous';
    border: none;
    width: 84px;
    height: 35px;
    background: #52B6FF;
    color: white;
    border-radius: 5px;
    cursor: pointer;
`;
