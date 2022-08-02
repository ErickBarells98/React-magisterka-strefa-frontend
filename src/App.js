import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/home/index';
import NotFound from './components/error/NotFound';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Login from './components/auth/Login';
import { UserContextProvider } from './context/UserContext';


function App() {
  return (
   
    <BrowserRouter>

      <UserContextProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>

        <Route path="*" element={<NotFound/>}></Route>
      </Routes>

      <Footer/>
      </UserContextProvider>
      
    </BrowserRouter>

  );
}

export default App;
