import styled from 'styled-components'
import axios from 'axios'
import Header from './Header'
import Calendar from 'react-calendar'
import Menu from './Footer'
import { useState, useEffect, useContext } from 'react'
import '../styles/Calendar.css';
import UserContext from '../contexts/UserContext'

export default function Historic() {
    const { user } = useContext(UserContext);
    const [ history, setHistory ] = useState([]);
    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }  

    useEffect(()=>{
        const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily', config);
        promise.then((response)=> {
            setHistory(response.data); 
        })
    })

    return (
        <>
            <Header />
            <HistoricPage>
                <span>Histórico</span>
                <Calendar />
            </HistoricPage>
            
            <Menu />
        </>
    );
}

const HistoricPage=styled.div`
    margin: 100px 20px 20px 20px;
    font-size: 24px;
    & > span {
        color: #126BA5;
        font-weight: bold;
    }
`;