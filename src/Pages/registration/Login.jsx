/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/myState";
import { useState } from "react";
import {toast} from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
 
const Login = () => {
 const {loading, setloading}= useStateContext();
 const navigate = useNavigate();
 const [userLogin, setuseLogin] = useState(
    {
        email:"",
        password:""
    }
 );
//  user login function
const userloginfunction= async()=>{
    //validation
    if(userLogin.email === "" || userLogin.password === "")
    {
        toast.error("All Fields are required");
    }
    setloading(true);
    try{
       const users= await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
        // console.log("This is information about id= ",users.user);
        try {
            const q = query(
                collection(fireDB, "user"),
                where('uid', '==', users?.user?.uid)
            );
            
            const data = onSnapshot(q, (QuerySnapshot) => {
                let user;
                QuerySnapshot.forEach((doc) => user = doc.data());
                localStorage.setItem("users", JSON.stringify(user) )
                setuseLogin({
                    email: "",
                    password: ""
                })
                toast.success("Login Successfully");
                setloading(false);
                
                if(user.role === "user") {
                    navigate('/user-dashboard');
                }else{
                    navigate('/admin-dashboard');
                }
            });
            return () => data;
        } catch (error) {
            // console.log("This is error= ",error);
            setloading(false);
            
        }
    } catch (error) {
        // console.log("This is error= ",error);
        setloading(false);
            toast.error("Login Failed");
    }
}




    
    return (
        <div className='flex items-center justify-center h-screen'>
            {/* Login Form  */}
            {loading && <Loader/>}
            <div className="px-5 py-6 border border-pink-100 shadow-md login_Form bg-pink-50 lg:px-8 rounded-xl">
                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-2xl font-bold text-center text-pink-500 '>
                        Login
                    </h2>
                </div>
                {/* Input Two  */}
                <div className="mb-3">
                    <input
                        type="email"
                        value={userLogin.email}
                        onChange={(e)=>{
                            setuseLogin(
                                {
                            ...userLogin,
                            email: e.target.value
                                }
                            )
                        }}
                        placeholder='Email Address'
                        className='px-2 py-2 placeholder-pink-200 border border-pink-200 rounded-md outline-none bg-pink-50 w-96'
                    />
                </div>
                {/* Input Three  */}
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        value={userLogin.password}
                        onChange={(e)=>{
                            setuseLogin(
                                {
                            ...userLogin,
                            password: e.target.value
                                }
                            )
                        }}
                        className='px-2 py-2 placeholder-pink-200 border border-pink-200 rounded-md outline-none bg-pink-50 w-96'
                    />
                </div>
                {/* Signup Button  */}
                <div className="mb-5">
                    <button
                        type='button'
                        onClick={userloginfunction}
                        className='w-full py-2 font-bold text-center text-white bg-pink-500 rounded-md hover:bg-pink-600 '
                    >
                        Login
                    </button>
                </div>
                <div>
                    <h2 className='text-black'>Don't Have an account <Link className='font-bold text-pink-500 ' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    );
}

export default Login;