import Header from './Header';
import Menu from './Footer';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../contexts/UserContext'; 
import DayJS from "dayjs";
import "dayjs/locale/pt-br";

export default function Today() {
    const { user } = useContext(UserContext);
    const date = DayJS().locale('pt-br').format("DD/MM");
    const weekday = DayJS().locale('pt-br').format("dddd").replace("-feira", "");
    const [ todayHabits, setTodayHabits ] = useState([]);
    const [ progress, setProgress] = useState(0);
    const [ record, setRecord ] = useState([]);
    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }   

    
    function getTodayHabits() {
        const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today',config);

        promise.then((response) => {
            setTodayHabits(response.data);
            setRecord(response.data.map((item) => item.highestSequence ));
        });
        promise.catch(() => {
        return 'Please reload the page'
        })
    }

    useEffect(getTodayHabits,[]);
    setTimeout(getProgress, 100);

    function getProgress() {
        if(todayHabits.length !== 0) {
            setProgress(Math.round(todayHabits.reduce((value, item) => 
            (item.done ? value+=1 : value+=0),0) / todayHabits.length * 100));
        }
    }
        

    function check(habit, i) {
        if(!habit.done) {
            setTodayHabits([...todayHabits], habit.done = true, habit.currentSequence += 1);
            
            if (habit.currentSequence > habit.highestSequence) {
                setTodayHabits([...todayHabits], habit.highestSequence = habit.currentSequence)
            }

            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/check`, "", config);
            promise.then(() => {
                getProgress()
            })
            promise.catch(() => {
                console.log('erro')
            })
        } else {
            if( record[i] < habit.currentSequence && habit.currentSequence === habit.highestSequence) {
                setTodayHabits([...todayHabits], habit.highestSequence -= 1);
            }
            setTodayHabits([...todayHabits], habit.done = false, habit.currentSequence -= 1);

            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/uncheck`, "", config);
            promise.then(() => {
                getProgress()
            })
            promise.catch(() => {
                console.log('erro')
            })
        }
    }



    return (
        <>
            <Header />
            <TodayHabits>
                <span>{weekday}, {date}</span>
                {progress === 0 ? 
                    <div>Nenhum hábito concluído ainda</div> : 
                    <div>{progress}% dos hábitos concluídos</div>
                }   
                {todayHabits.map((habit, i) =>
                    <HabitContainer key={habit.id} habit={habit}>
                            <section>
                                <h1 className='title'>{habit.name}<br/></h1>
                                <p>Sequência atual: <span>{habit.currentSequence} dias</span></p>
                                <p>Seu recorde: {habit.highestSequence} dias<br/></p>
                            </section>
                            <Checkbox onClick={() => check(habit, i)} checked={habit.done}/>       
                    </HabitContainer>
                )}
            </TodayHabits> 
            <Menu />
        </>
    );

}

const TodayHabits = styled.div `
    margin: 0 20px 20px 20px;
    font-size: 24px;
    background: #E5E5E5;

    & > span {
        color: #126BA5;
        font-weight: bold;
    }
    & > div {
        margin-top: 10px;
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
        color: ${({habit}) => habit.done ? 'green' : 'gray' };
    }

    p {
        margin-bottom: 5px;
        font-size: 16px;
        color: gray;
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