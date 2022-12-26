import { 
  BrowserRouter as Router, 
  Route, 
  Routes 
} from 'react-router-dom';
import './styles/reset.css';
import Login from './components/Login';
import './styles/styles';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
        </Routes>
      </Router>
    
    </>
  );
}

