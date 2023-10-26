// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Registration from './components/registration/Registration';
import Login from './components/login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (  <div className='app'>
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<ProtectedRoute> <Dashboard/> </ProtectedRoute>} />
          {/* <ProtectedRoute path='/dashboard' component={Dashboard}  /> */}
        </Routes>
        </div>
    </Router>
  </div>
  );
}

export default App;
