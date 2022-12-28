import { 
  BrowserRouter as Router, 
  Route, 
  Routes 
} from 'react-router-dom';
import React, { useState } from 'react';
import UserContext from './contexts/UserContext';
import HabitsContext from './contexts/HabitsContext';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Habits from './components/Habits';
import Today from './components/Today';
import Historic from './components/Historic';

export default function App() {
  const [user, setUser] = useState({});
  const [habits, setHabits] = useState([]);
  
  return (
    <>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <HabitsContext.Provider value={{ habits, setHabits }}>    
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='cadastro' element={<SignUp />} />
              <Route path='habits' element={<Habits />} />
              <Route path='today' element={<Today />} />
              <Route path='historic' element={< Historic/>} />          
            </Routes>
          </HabitsContext.Provider>
        </UserContext.Provider>
      </Router>
    </>
  );
}

