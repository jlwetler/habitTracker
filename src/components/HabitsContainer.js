import { useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import UserContext from '../contexts/UserContext'; 
import HabitsContext from '../contexts/HabitsContext';
import trash from "../img/trash.JPG";

export default function HabitsContainer({ days, setDays, getHabits }) {
    const { user } = useContext(UserContext);
    const { habits } = useContext(HabitsContext);
    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }    

    function deleteHabit(id) {
        if(window.confirm("Are you sure you want to delete this habit?")) {
            const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,config);
            promise.then(response => {
                getHabits();
                console.log(habits)
            })
            promise.catch(() => {
                return 'Please reload the page'
            })
        }
    }

    function getHabitsDays(day, id) {
        if( day.includes(id) ) return true;
        return false;
    }

    if (habits.length === 0) {
        return (
        <NoHabitsMessage>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</NoHabitsMessage>
        )
    }
        return (
            <AllHabits>
                {habits.map(h => 
                    <HabitContainer>
                        <span>{h.name}</span>
                        <div>
                            {days.map(({ day, id, isSelected }) => 
                                <Day key={id} back={getHabitsDays(h.days, id) ? true : false}> 
                                        {day}
                                </Day>
                            )}
                            <img src={trash} key={h.id} alt='delete' onClick={() => deleteHabit(h.id)}/>
                        </div>           
                    </HabitContainer>
                )}
            </AllHabits>
        );
}

const NoHabitsMessage = styled.div`
    font-size: 24px;
    margin: 10px 25px;
`;

const AllHabits = styled.div `
    background: #E5E5E5;
    padding-bottom: 100px;
`;

const HabitContainer = styled.div `
    font-size: 20px;
    width: 90vw;
    height: 90px;
    background: #fff; 
    padding: 10px;
    margin: 20px auto;
    border-radius: 5px;
    div {
        display: flex;
        margin-top: 10px;
    }
    img {
        width: 40px;
        margin-left: 65px;
        cursor: pointer;
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