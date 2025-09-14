import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './routes/PrivateRoutes'
import Expenses from './pages/Expenses'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Register/>}/>
      <Route path="/register" element={<Register/>}/>

    <Route
      path='/expenses'
      element={
        <PrivateRoute>
          <Expenses/>
        </PrivateRoute>
      }
    />
    </Routes>
 <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
  )
}

export default App
