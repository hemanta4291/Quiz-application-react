import React from 'react'
import { signInWithGoogle } from '../features/auth/authSlice'
import { useDispatch } from 'react-redux'

const SignInWithGoogleProvider = () => {
    
    const dispatch = useDispatch()

    const signInWithGoogle1 = () => {
        dispatch(signInWithGoogle())
    }
    return (
        <button onClick={signInWithGoogle1} className='transition-all duration-1000 ease-out hover:bg-primary-25 bg-primary-600 px-4 py-3 text-white font-semibold rounded-md'>Sign in google</button>
    )
}

export default SignInWithGoogleProvider