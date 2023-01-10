import { useState, useEffect, useContext } from 'react'
import UserContext from '../contexts/UserContext'
import axios from 'axios'
import styled from 'styled-components'
import Header from './Header'
import Menu from './Footer'
import AddHabit from './AddHabit'
import HabitsContainer from './HabitsContainer'

export default function Habits() {
    const [addNewHabit, setAddNewHabit] = useState(false);
    const { user } = useContext(UserContext);
    const [ habits, setHabits ] = useState([]);
    const [days, setDays] = useState([
        { id: 0, day: "D", isSelected: false },
        { id: 1, day: "S", isSelected: false },
        { id: 2, day: "T", isSelected: false },
        { id: 3, day: "Q", isSelected: false },
        { id: 4, day: "Q", isSelected: false },
        { id: 5, day: "S", isSelected: false },
        { id: 6, day: "S", isSelected: false },
    ]);
    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }   

    function getHabits() {
        const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits',config);

        promise.then((response) => {
            setHabits(response.data);
        });
        promise.catch(() => {
            return 'Please reload the page'
        })
    }

    useEffect(getHabits,[])

    return (
        <>
            <Header />
            <MyHabits>
                <span>Meus hábitos</span>
                <div onClick={() => setAddNewHabit(!addNewHabit)}>
                    +
                </div>
            </MyHabits>
            {addNewHabit && 
                <AddHabit 
                    days={days}
                    setDays={setDays}
                    habits={habits}
                    setHabits={setHabits}
                    setAddNewHabit={setAddNewHabit}
                    getHabits={getHabits}
                />
            }
            <HabitsContainer 
                days={days} 
                habits={habits}
                getHabits={getHabits}
            />
            <Menu />         
        </>
    );
}


const MyHabits = styled.div `
    margin: 100px 20px 20px 20px;
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
        border-radius: 5px;
    }
    span {
        color: #126BA5;
        font-weight: bold;
    }
`;

