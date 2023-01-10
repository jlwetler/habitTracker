import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useContext } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import ProgressContext from '../contexts/ProgressContext'
import 'react-circular-progressbar/dist/styles.css'

export default function Menu() {
    const { progress } = useContext(ProgressContext);
    return (
        <>
            <Link to='/today'>
                <Circle>
                    <CircularProgressbar
                        background
                        backgroundPadding={5} 
                        value={progress} 
                        text="Hoje"
                        styles={buildStyles({
                            textColor: 'white',
                            trailColor: '#52B6FF',
                            pathColor: 'white',
                            backgroundColor: '#52B6FF'
                        })} 
                    />
                </Circle>
            </Link>
            <Bottom>
                <Link to='/habits'>
                    <span>Hábitos</span>
                </Link>
                <Link to='/historic'>
                    <span>Histórico</span>
                </Link>
            </Bottom>
        </>
        
    );
}

const Bottom = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100vw;
    height: 70px;
    bottom: 0;
    left:0;
    padding: 36px;
    cursor: pointer;
    background: #fff;
    span {
        font-size: 24px;
        color: #52B6FF;
    }
`;  

const Circle = styled.div `
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 10px;
    left: calc((100vw - 90px)/2);
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: #52B6FF;
    color: white;
    font-size: 24px;
    z-index: 1;
`;