import { useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Menu from './Footer';
import AddHabit from './AddHabit';
import HabitsContainer from './HabitsContainer';

export default function Habits() {
    const [newHabit, setNewHabit] = useState("");
    const [addNewHabit, setAddNewHabit] = useState(false);
    const [days, setDays] = useState([
        { day: "D", id: 0, isSelected: false},
        { day: "S", id: 1, isSelected: false},
        { day: "T", id: 2, isSelected: false},
        { day: "Q", id: 3, isSelected: false},
        { day: "Q", id: 4, isSelected: false},
        { day: "S", id: 5, isSelected: false},
        { day: "S", id: 6, isSelected: false},
    ]);

    function addHabit() {
        setAddNewHabit(true);
    }

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
                    newHabit={newHabit}
                    setNewHabit={setNewHabit} 
                    addNewHabit={addNewHabit}
                    setAddNewHabit={setAddNewHabit}
                />
            }
            <HabitsContainer />
            <Menu />         
        </Body>
    );
}

const Body = styled.div `
    background: #E5E5E5;
    height: 100vh;
`;

const MyHabits = styled.div `
    margin: 80px 20px 20px 20px;
    font-size: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 35px;
        background: #52B6FF;
        color: white;
    }
    span {
        color: #126BA5
    }
`;

