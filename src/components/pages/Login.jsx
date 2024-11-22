import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    

    const loginHandle = async () => {

        const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/auth/login`, {    
            method : 'POST',
            headers : {
                'content-type': 'application/json'
            },
            body : JSON.stringify({email,password})
        });

        const loginData = await res.json();
        if(loginData.success){
            navigate('/home')
            toast.success(loginData.success)
            localStorage.setItem('token', loginData.token)
        }else{
            toast.error(loginData.error);
        }
        setEmail("");
        setPassword("");

    }

    return (
        <div className=' bg-gradient-to-b from-blue-500 to-green-500 h-screen flex justify-center items-center'>

            <div className=' bg-[#badbc1] shadow-md px-10 py-10 rounded-xl '>

                <div className="">
                    <h1 className='text-center text-black text-xl mb-4 font-bold'>Login</h1>
                </div>

                <div>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name='email'
                        className=' bg-[#beb9b1] border border-green-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none'
                        placeholder='Email'
                    />
                </div>

                <div>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className='bg-[#beb9b1] border border-green-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none'
                        placeholder='Password'
                    />
                </div>

                <div className=' flex justify-center mb-3'>
                    <button
                    onClick={loginHandle}
                        className=' bg-green-700 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                        Login
                    </button>
                </div>

                <div>
                    <h2 className='text-black'>Don't have an account <Link className=' text-red-700 font-bold' to={'/'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Login