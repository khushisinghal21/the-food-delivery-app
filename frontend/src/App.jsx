
import './App.css';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home/Home.jsx';
import ContactPage from './pages/ContactPage/ContactPage.jsx';
import Menu from './pages/Menu/Menu';
import AboutPage from './pages/AboutPage/AboutPage.jsx';
import Cart from './pages/Cart/Cart';
import SignUp from './components/SignUp/SignUp.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/about' element={<AboutPage />} />
      
        <Route path='/menu' element={<Menu />} />
        <Route path='/login' element={<Home />}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>

        <Route path='/cart' element={< PrivateRoute>
        <Cart></Cart>
        
        </PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
