import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUserWithEmailPassword, signInWithGoogle } from '../features/auth/authSlice'
import { Link } from 'react-router-dom'



const SignUp = () => {
  const {isLoading,error} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [passError, setPassError] = useState('')
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (password === rePassword) {
      dispatch(createUserWithEmailPassword({email,password}))
      console.log({ email, password })
    } else {
      setPassError('Password Not Match!')
    }

  }

  return (
    <div className='sign-in pb-[40px] mb-[40px]'>
      <div className='container mx-auto flex justify-center items-center h-[calc(100vh-6rem)]'>
        <div className='border border-gray-100 p-8 mx-auto w-full h-[550px] max-w-[650px] text-center bg-white flex items-center justify-center'>
          <div>
            <h2 className='text-center text-3xl pb-6'>Sign Up</h2>

            {passError && <p className='bg-red-600 p-1 text-white mb-2'>{passError}</p>}
            {error && <p className='bg-red-600 p-1 text-white mb-2'>{error}</p>}
            <form onSubmit={handleFormSubmit}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='border block border-gray-100 rounded-md h-12 my-4 p-3'
                placeholder='Enter Email'
                type='email'
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='border block border-gray-100 rounded-md h-12 my-4 p-3'
                placeholder='Password'
                type='password'
              />
              <input
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                className='border block border-gray-100 rounded-md h-12 my-4 p-3'
                placeholder='Repeat Password'
                type='password'
              />
              <button
                className='bg-primary-25 text-white rounded-md p-2 mt-3 px-4 w-full'
                type='submit'
              >
                Sign Up
              </button>
            </form>

            {
              isLoading && <div>Loading..................</div>
            }

            <Link className='block pt-4' to="/auth/sign-in">Already have account!</Link>
            <Link className='block pt-4' to="/">Back to home</Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SignUp