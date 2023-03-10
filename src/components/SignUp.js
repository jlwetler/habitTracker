import styled from 'styled-components'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import logo from '../img/logo.JPG'
import Loading from './Loading'

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [removeLoading, setRemoveLoading] = useState(false);
    const navigate = useNavigate();

    function sendData() {
        setRemoveLoading(true);
        const body= {email, name, image, password} 
        
        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', body);

        promise.then(() => {
            setRemoveLoading(false);
            navigate('/');
        });
        promise.catch(() => {
            alert('Erro no cadastro');
            setRemoveLoading(false);
        });
    }
        
    return (
        <Container>
            <img src={logo} alt='logo' />
            <input 
                type="email" 
                placeholder="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required
            />
            <input 
                type="password" 
                placeholder="senha" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required
            />
            <input 
                type="text" 
                placeholder="nome" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                required
            />
            <input 
                type="url" 
                placeholder="foto" 
                value={image} 
                onChange={e => setImage(e.target.value)} 
                required
            />
            <Button 
                onClick={sendData}>{!removeLoading ? 'Cadastrar' : <Loading/>}
            </Button>
            <Link to='/' >
                <span>J?? tem uma conta? Fa??a login</span>
            </Link>
        </Container>
    );
}

const Container = styled.div `
    background: white;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
        span {
            color: #52B6FF;
        }
        input {
            width: 303px;
            height: 45px;
            border: 1px solid #000000;
            border-radius: 5px;
            margin-bottom: 10px;
        }
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
    cursor: pointer
`;