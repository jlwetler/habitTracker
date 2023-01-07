import { useState, useEffect, useContext } from 'react';
import HabitsContext from '../contexts/HabitsContext';
import UserContext from '../contexts/UserContext'; 
import axios from 'axios';
import styled from 'styled-components';
import Header from './Header';
import Menu from './Footer';
import AddHabit from './AddHabit';
import HabitsContainer from './HabitsContainer';

export default function Habits() {
    const [addNewHabit, setAddNewHabit] = useState(false);
    const { user } = useContext(UserContext);
    const { setHabits } = useContext(HabitsContext);
    const [days, setDays] = useState([
        { id: 0, day: "D", isSelected: false},
        { id: 1, day: "S", isSelected: false},
        { id: 2, day: "T", isSelected: false},
        { id: 3, day: "Q", isSelected: false},
        { id: 4, day: "Q", isSelected: false},
        { id: 5, day: "S", isSelected: false},
        { id: 6, day: "S", isSelected: false},
    ]);
    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }   

    function addHabit() {
        setAddNewHabit(true);
    }

    function getHabits() {
        const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits',config);

        promise.then((response) => {
            setHabits(response.data);
            console.log(response.data)
        });
        promise.catch(() => {
        return 'Please reload the page'
        })
    }

    useEffect(getHabits,[])

    return (
        <Body>
            <Header />
            <MyHabits>
                <span>Meus hábitos</span>
                <div onClick={addHabit}>+</div>
            </MyHabits>
            {addNewHabit && 
                <AddHabit 
                    days={days}
                    setDays={setDays}
                    addNewHabit={addNewHabit}
                    setAddNewHabit={setAddNewHabit}
                    getHabits={getHabits}
                />
            }
            <HabitsContainer days={days} setDays={setDays} getHabits={getHabits}/>
            <Menu />         
        </Body>
    );
}

const Body = styled.div `
    font-family: 'Righteous';
    padding-top: 20px;
    background: #E5E5E5;
    height: 100vh;
`;

const MyHabits = styled.div `
    margin: 70px 20px 20px 20px;
    font-size: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
        font-size: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 35px;
        background: #52B6FF;
        color: white;
        cursor: pointer;
    }
    span {
        color: #126BA5;
        font-weight: bold;
    }
`;

