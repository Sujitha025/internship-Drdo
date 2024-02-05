import React from 'react';

import toast, {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik'; //for acessing the user data and validation
import { resetPasswordValidation } from '../helper/validate';
import styles from '../styles/Username.module.css'
import { resetPassword } from '../helper/helper';
import { useAuthStore } from '../store/store';
import { useNavigate,Navigate } from 'react-router-dom';
import useFetch from '../hooks/fetch.hook'
export const Reset = () => {

  const {username} = useAuthStore(state => state.auth);
  const navigate = useNavigate();
  const [{ isLoading, apiData, status, serverError }] = useFetch('createResetSession')
  const formik = useFormik({
    initialValues : {
      password: '',
      confirm_password: ''
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      let resetPromise = resetPassword({username,password:values.password})
      toast.promise(resetPromise, {
          loading: 'Updating...',
          success: <b>Reset Successfully...!</b>,
          error:<b>Could not Reset</b>
      });
      resetPromise.then(() => {
        navigate('/password');
      })
    }
  })

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  if(status && status !== 201) return <Navigate to={'/password'} replace={true}></Navigate>

  return (
    <div className="container mx-auto">
    <Toaster position='top-center' reverseOrder="false"></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass} style={{width:"50%"}}>

          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl text-violet-600 font-bold px-4'>Reset</h4>
            <div className='rounded pt-0 px-7 mt-4 h-2 bg-violet-600'></div>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                Enter new password.
            </span>
          </div>

          <form className="pt-20" onSubmit={formik.handleSubmit}>
            <div className='textbox flex flex-col items-center gap-6'>
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='New Password'/>
              <input {...formik.getFieldProps('confirm_password')} className={styles.textbox} type="text" placeholder='Confirm Password'/>
              <button className={styles.btn} type='submit'>Reset</button>
            </div>
          </form>

        </div>
      </div>
    </div> 
  )
}
