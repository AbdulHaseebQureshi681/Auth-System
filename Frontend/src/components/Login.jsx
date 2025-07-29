import React from 'react'
import { useForm } from "react-hook-form"
import { NavLink ,useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const { register, reset, handleSubmit, formState:{errors} } = useForm({
        
        defaultValues: {
            email: '',
            password: '',
        }
    });

const handlesuccess= (msg)=>{
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
const handleerror= (msg)=>{
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
const onSubmit=async(e)=>{
    // const {name , email , password }= e
    try{
        const url = "http://localhost:8080/auth/login"
        const response = await fetch(url , {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: e.email, password: e.password})
        })
        const data = await response.json();
        console.log(data);
        const {message, success, error, name, jwttoken} = data;

        if(success){
            handlesuccess(message)
            localStorage.setItem('token',jwttoken)
            localStorage.setItem('LoggedInUser',name)
            setTimeout(() => {
                navigate('/home')
            }, 2000);
        }else if(error){
           handleerror(error.details[0].message)
        }else if (!success){
            
           handleerror(message)
        }
    }
    catch(err){

    }
    reset();
}

  return (
    <div className='Container' >
      <form onSubmit={handleSubmit(onSubmit)}>
  
        <div>
            <label>Email</label>
            <input type="text" {...register("email",{required: {value: true , message: "Email cannot be Empty"}, minLength:{value:6 , message: "Email must be atleast 6 character"}})}  />
        </div>
        <div>
            <label>Password</label>
            <input type="password" {...register("password",{required: {value: true , message: "Password Cannot be Empty"}, minLength:{value:3 , message: "Password must be atleast 3 character"}})}  />
        </div>
        <div>Don't Have an Account? <NavLink to='/signup' >Sign Up</NavLink> </div>
        <button type='submit' style={{ marginTop: '1.5rem' }}>Login</button>
        <div className="errors">
    <ul>
     
      {errors.email?.message && <li>{errors.email.message}</li>}
      {errors.password?.message && <li>{errors.password.message}</li>}
    </ul>
  </div>
      </form>
    </div>
  )
}

export default Login
