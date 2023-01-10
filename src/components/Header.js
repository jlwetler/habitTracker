import logo from '../img/logo-name.JPG'
import { useContext } from 'react'
import UserContext from '../contexts/UserContext'
import styled from 'styled-components'

export default function Header() {
    const { user } = useContext(UserContext);

    return(
        <>
            <Top>
                <img src={logo} alt='logo'/>
                <Image src={user.image} alt='profile pic' />
            </Top> 
        </>

    );
}

const Top = styled.div `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 70px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background: #126BA5;
`;

const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;