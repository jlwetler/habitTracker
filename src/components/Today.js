import Header from './Header';
import Menu from './Footer';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../contexts/UserContext'; 
import DayJS from "dayjs";
import "dayjs/locale/pt-br";

export default function Today() {
    const { user, setUser } = useContext(UserContext);
    const date = DayJS().locale('pt-br').format("DD/MM");
    const weekday = DayJS().locale('pt-br').format("dddd").replace("-feira", "");
    const [ todayHabits, setTodayHabits ] = useState([]);
    const [ checked, setChecked] = useState(false);
    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }   

    
    function getTodayHabits() {
        const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today',config);

        promise.then((response) => {
            setTodayHabits(response.data);
            console.log(response.data)
        });
        promise.catch(() => {
        return 'Please reload the page'
        })
    }

    useEffect(getTodayHabits,[])

    function check(habit) {
        if(!habit.done) {
            setTodayHabits([...todayHabits], habit.done = true, habit.currentSequence += 1);
            
            if (habit.currentSequence > habit.highestSequence) {
                setTodayHabits([...todayHabits], habit.highestSequence = habit.currentSequence)
            }

            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/check`, "", config);
            promise.then(response => {
                console.log('ok')
            })
            promise.catch(() => {
                console.log('erro')
            })
        } else {
            setTodayHabits([...todayHabits], habit.done = false, habit.currentSequence -= 1);
            const promise2 = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/uncheck`, "", config)
        }
    }

    return (
        <Body>
            <Header />
            <TodayHabits>
                <span>{weekday}, {date}</span>   
                {todayHabits.map(habit =>
                    <HabitContainer key={habit.id}>
                            <section>
                                <h1 className='title'>{habit.name}<br/></h1>
                                <span>Sequência atual: {habit.currentSequence} dias<br/></span>
                                <span>Seu recorde: {habit.currentSequence} dias<br/></span>
                            </section>
                            <Checkbox onClick={() => check(habit)} checked={habit.done}></Checkbox>             
                    </HabitContainer>
                )}
            </TodayHabits> 
            <Menu />
        </Body>
    );

}

const Body = styled.div `
    padding-top: 20px;
    background: #E5E5E5;
    height: 100vh;
    font-family: 'Roboto';
`;

const TodayHabits = styled.div `
    margin: 80px 20px 20px 20px;
    font-size: 24px;
    background: #E5E5E5;

    span {
        color: #126BA5;
        font-weight: bold;
    }
`;

const HabitContainer = styled.div `
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    width: 90vw;
    height: 90px;
    background: #fff; 
    padding: 10px;
    margin: 20px auto;
    border-radius: 5px;

    span {
        margin-bottom: 5px;
        font-size: 16px;
        font-weight: normal;
    }

    .title {
        font-size: 26px;
        margin-bottom: 6px;
    }
`;

const Checkbox = styled.div `
    background: ${({checked}) => checked ? 'green' : 'lightgray' };
    width: 70px;
    height: 70px;
    display: flex;
    border-radius: 5px;
    cursor: pointer;
`;