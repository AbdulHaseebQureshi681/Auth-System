import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import RefreshHandler from './components/RefreshHandler'

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false)

  const PrivateRoute = ({element}) => {
    if(!isAuthenticated){
      return <Navigate to="/login" />
    }
    return element
  }
  return (
    <>
      <div className="app-container">
        <RefreshHandler setisAuthenticated={setisAuthenticated} />
        <Routes>
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/home' element={<PrivateRoute element={<Home/>} />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
        </Routes>
      </div>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
