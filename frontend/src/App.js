import './App.css';
import {Routes,Route, Navigate} from "react-router-dom"
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import { useState } from 'react';
import RefresherHandler from './Pages/RefresherHandler';

function App() {
  const [isAunthaticated,setAuthenticated] = useState(false)

  const PrivateRoute = ({element}) => {
    return isAunthaticated ? element : <Navigate to={"/login"}/>
  }

  return (
    <div className="App">
      <RefresherHandler setIsAuthenticated={setAuthenticated}/>
      <Routes>
        <Route path='/' element={<Navigate to={"/login"}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<PrivateRoute element={<Home/>}/>}/>
      </Routes>
    </div>
  );
}

export default App;
