import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Menu() {
    
    return (
        <>
            <Link to='/today'>
                <Circle>Hoje</Circle>
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