import React, { useState } from 'react'
import { Await, Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../../context/myState';
import toast from 'react-hot-toast';
import {collection, addDoc, Timestamp} from "firebase/firestore"
import {createUserWithEmailAndPassword} from "firebase/auth"
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from '../../components/loader/Loader';
function Signup() {
    
    
   const {loading, setloading} = useStateContext();
    
//   console.log("loading.l",useStateContext());
  
   //navigate 
   const navigate= useNavigate();
   //user sigup state
   const [usersingnup, setusersingnup]=useState(
   {
    name:"",
    email:"",
    password:"",
    role:"user",
   }
   );
    //user sigup function
    const userSignupFunction = async ()=>{
        
        if(usersingnup.name ===""|| usersingnup.email === ""||usersingnup.password==="" )
        {
            toast.error("All firld are required.")
            
        }
        setloading(true);
            
    try {
        const users= await createUserWithEmailAndPassword(auth, usersingnup.email, usersingnup.password);
        //create user object
        const user = {
            name: usersingnup.name,
            email: users.user.email,
            uid: users.user.uid,        
            role: usersingnup.role,
            time: Timestamp.now(),
            date: new Date().toLocaleString(
                "en-US",-
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                })
        }
        
        //create user Refrence.
        const userRefrence = collection(fireDB, "user")

                        // Add User Detail
                    addDoc(userRefrence, user);
                    setusersingnup({
                        name: "",
                        email: "",
                        password: ""
                    })
        
                    toast.success("Signup Successfully");

                    setloading(false);
                    navigate('/login')
    } catch (error) {
        console.log(error);
        setloading(false);
    }
    }   
    console.log("loading.2",loading);
   
  return (
   
    <div className='flex items-center justify-center h-screen'>
    {/* Login Form  */}
    {loading && <Loader/>}
    <div className="px-5 py-6 border border-pink-100 shadow-md login_Form bg-pink-50 lg:px-8 rounded-xl">
        {/* Top Heading  */}
        <div className="mb-5">
            <h2 className='text-2xl font-bold text-center text-pink-500 '>
            Signup
            </h2>
        </div>
        {/* Input One  */}
        <div className="mb-3">
            <input
                type="text"
                placeholder='Full Name'
                value={usersingnup.name}
                onChange={(e) =>{
                   setusersingnup({
                    ...usersingnup,
                    name: e.target.value
                   })
                   
                } }
                className='px-2 py-2 placeholder-pink-200 border border-pink-200 rounded-md outline-none bg-pink-50 w-96'
            />
        </div>
        {/* Input Two  */}
        <div className="mb-3">
            <input
                type="email"
                placeholder='Email Address'
                value={usersingnup.email}
                onChange={(e) =>{
                   setusersingnup({
                    ...usersingnup,
                    email: e.target.value
                   })
                   
                } }
                className='px-2 py-2 placeholder-pink-200 border border-pink-200 rounded-md outline-none bg-pink-50 w-96'
            />
        </div>
        {/* Input Three  */}
        <div className="mb-5">
            <input
                type="password"
                placeholder='Password'
                value={usersingnup.password}
                onChange={(e) =>{
                   setusersingnup({
                    ...usersingnup,
                    password: e.target.value
                   })
                   
                } }
                className='px-2 py-2 placeholder-pink-200 border border-pink-200 rounded-md outline-none bg-pink-50 w-96'
            />
        </div>
        {/* Signup Button  */}
        <div className="mb-5">
            <button
                type='button'
                onClick={userSignupFunction}
                className='w-full py-2 font-bold text-center text-white bg-pink-500 rounded-md hover:bg-pink-600 '
            >
                signup
               
            </button>
        </div>
        <div>
            <h2 className='text-black'>Have an account <Link className='font-bold text-pink-500 ' to={'/login'}>Login</Link></h2>
        </div>
    </div>
</div>
        );
    }
    // <Link className='font-bold text-pink-500 ' to={'/login'}>Login</Link >

export default Signup