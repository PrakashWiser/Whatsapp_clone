import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Eye, EyeOff, Loader, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import AuthImagePattern from '../components/AutnImagePatten'
import Alert from "../lib//SwalAlert"

const SignUpPage = () => {
    const [isShowPassword, setIsShowPassword] = useState()
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: ""
    })
    const { signup, isSigningUp } = useAuthStore()

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.fullName.trim()) {
            Alert.error("Full Name is required");
            return false;
        }
        if (!formData.email.trim()) {
            Alert.error("Email is required");
            return false;
        }
        if (!emailRegex.test(formData.email.trim())) {
            Alert.error("Enter a valid email address");
            return false;
        }
        if (!formData.password.length > 6) {
            Alert.error("Password Must be at 6 character");
            return false;
        }
        if (!formData.password.trim()) {
            Alert.error("Password is required");
            return false;
        }
        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        const success = validateForm()
        if (success === true) signup(formData)
    }
    return (
        <div className='min-h-screen grid lg:grid-cols-2'>
            <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
                <div className='w-full max-w-md space-y-8'>
                    <div className='text-ceter mb-8'>
                        <div className='flex flex-col items-center gap-2 group'>
                            <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                                <MessageSquare className='size-6 text-primary' />
                            </div>
                            <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
                            <p className='text-base-content/60'>Get Started With Your Free Account</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text font-medium'>FullName</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                                    <User className='size-5 text-base-content/40' />
                                </div>
                                <input
                                    type='text'
                                    name='fullName'
                                    className='input input-bordered w-full pl-10'
                                    placeholder='John Doe'
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text font-medium'>Email</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                                    <Mail className='size-5 text-base-content/40' />
                                </div>
                                <input
                                    type='email'
                                    name='email'
                                    className='input input-bordered w-full pl-10'
                                    placeholder='you@example.com'
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text font-medium'>Password</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='size-5 text-base-content/40' />
                                </div>
                                <input
                                    type={isShowPassword ? "text" : "password"}
                                    name='password'
                                    className='input input-bordered w-full pl-10'
                                    placeholder='******'
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button type='button' className='absolute inset-y-0 right-0 pr-3 flex items-center' onClick={() => setIsShowPassword(!isShowPassword)}>
                                    {isShowPassword ? <EyeOff className='size-5 text-base-content/40 ' /> : <Eye className='size-5 text-base-content/40 ' />}
                                </button>
                            </div>
                        </div>
                        <button className='btn btn-primary w-full ' disabled={isSigningUp} type='submit' >
                            {isSigningUp ? (
                                <>
                                    <Loader2 className='size-5 animate-spin' />
                                </>
                            ) : ("Create Account")}
                        </button>
                    </form>
                    <div className='text-center'>
                        <p className='text-base-content/60'>
                            Alreay Have An Account?{""}
                            <Link to="/login" className='link link-primary'>
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <AuthImagePattern
                subtitle="Connect With Firends Share Moments and Stay in touch With Your Loved Onec."
                title="Jion Our Community" />
        </div>
    )
}

export default SignUpPage 