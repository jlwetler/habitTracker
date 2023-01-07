import styled from 'styled-components';
import Header from './Header';
import Menu from './Footer';
import { useState, useContext } from 'react';
import UserContext from '../contexts/UserContext'; 

export default function Historic() {
    const { user } = useContext(UserContext);

    return (
        <>
            <Header />
            <Menu />
        </>
    );
}