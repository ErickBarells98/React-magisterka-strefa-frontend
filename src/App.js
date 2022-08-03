import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/home/index';
import NotFound from './components/error/NotFound';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { UserContextProvider } from './context/UserContext';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
   
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>

      <Footer/>
      </UserContextProvider>

      <ReactQueryDevtools />

    </QueryClientProvider>
    </BrowserRouter>

  );
}

export default App;
