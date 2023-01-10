import { 
  BrowserRouter as Router, 
  Route, 
  Routes 
} from 'react-router-dom'
import React, { useState } from 'react'
import GlobalStyle from './globalStyles'
import UserContext from './contexts/UserContext'
import ProgressContext from './contexts/ProgressContext'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Habits from './components/Habits'
import Today from './components/Today'
import Historic from './components/Historic'

export default function App() {
  const [user, setUser] = useState({});
  const [progress, setProgress] = useState(0);
  
  return (
    <>
      <Router>
        <GlobalStyle/>
        <UserContext.Provider value={{ user, setUser }}>
          <ProgressContext.Provider value={{ progress, setProgress }}>    
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='cadastro' element={<SignUp />} />
              <Route path='habits' element={<Habits />} />
              <Route path='today' element={<Today />} />
              <Route path='historic' element={< Historic/>} />          
            </Routes>
          </ProgressContext.Provider>
        </UserContext.Provider>
      </Router>
    </>
  );
}

