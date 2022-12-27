import Header from './Header';
import Menu from './Footer';
import { useState, useContext } from 'react';
import UserContext from '../contexts/UserContext'; 

export default function Today() {
    const { user, setUser } = useContext(UserContext);

    return (
        <>
            <Header />
            <Menu />
        </>
    );

}