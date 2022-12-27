import styled from 'styled-components';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import UserContext from '../contexts/UserContext'; 
import logo from "../img/logo.JPG";
import Loading from './Loading';


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [removeLoading, setRemoveLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    
    function sendLogin() {
        setRemoveLoading(true);
        const body = {email, password}
        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login', body);

        promise.then((response) => {
            setUser(response.data);
            navigate('/today');
        });
        promise.catch(() => {
            console.log('deu ruim');
            setRemoveLoading(false);
        });
    }

    return (
        <Container>
            <img src={logo} alt='logo' />
            <Input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} required/>
            <Input type="password" placeholder="senha" value={password} onChange={e => setPassword(e.target.value)} required/>
            <Button disabled={!removeLoading ? false : true} onClick={sendLogin}>{!removeLoading ? 'Entrar' : <Loading/>}</Button>
            <Link to='/cadastro' >
                <span>Não tem uma conta? Cadastre-se</span>
            </Link>
        </Container>
    );
}

const Container = styled.div `
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
        span {
            color: #52B6FF;
        }
`;

const Input = styled.input `
    width: 303px;
    height: 45px;
    border: 1px solid #000000;
    border-radius: 5px;
    margin-bottom: 10px;
`;

const Button = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    background: #52B6FF;
    border-radius: 5px;
    color:white;
    width: 303px;
    height: 45px;
    margin-bottom: 10px;
    cursor: pointer;
    disabled {
        opacity: 0.1;
    }
`;