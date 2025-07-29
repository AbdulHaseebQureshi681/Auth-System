import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink ,useNavigate} from 'react-router-dom';
import { toast} from 'react-toastify';

const Home = () => {
  const navigate = useNavigate();
  const [LoggedInUser, setLoggedInUser] = useState("")
  const [products, setProducts] = useState([])

  const handleerror = (msg) => {
    toast.error(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
    });
  }
  useEffect(() => {
     setLoggedInUser(localStorage.getItem('LoggedInUser'))
    }, [])
const fetchProducts= async ()=>{
  try{
    const url = "http://localhost:8080/products"
    const headers = {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem('token')
    }
    const response = await fetch(url, {headers})
    const data = await response.json()
    setProducts(data)
  }
  catch(err){
    handleerror(err)
  }
}
  useEffect(() => {
     fetchProducts();
  }, [])

  const handlesuccess = (msg) => {
    toast.success(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
    });
  }
  const handleLogout= (e)=>{
    localStorage.removeItem('token')
    localStorage.removeItem('LoggedInUser')
    handlesuccess("User Logged Out")
    setTimeout(() => {
      navigate('/login')
    }, 1000);
  }


  return (
    <>
    <div>
      {LoggedInUser}
    </div>
    <button onClick={handleLogout} >Logout</button>
    <div>
      {products && products.length > 0 && products.map((product ,index)=>(
        <div key={index}>
          <h1>{product.name}</h1>
          <h1>{product.price}</h1>
        </div>
      ))}
    </div>
    </>
  )
}

export default Home
