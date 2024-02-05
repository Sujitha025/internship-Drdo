import React from 'react';
import {Link,useNavigate} from 'react-router-dom';
import avatar from '../assets/avatar.png';
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik'; //for acessing the user data and validation
import {usernameValidate } from '../helper/validate';
import { useAuthStore } from '../store/store';
import styles from '../styles/Username.module.css'

export default function Username() {

  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);

  const formik = useFormik({
    initialValues : {
      username : ''
    },
    validate : usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      setUsername(values.username);
      navigate('/password')
    }
  })
  return (
    <div className="container mx-auto">
    <Toaster position='top-center' reverseOrder="false"></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass} width={"45%"}>

          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl text-violet-600 font-bold'>Hello Again! </h4>
            {/* <div className='rounded pt-0 px-10 mt-4 h-2 bg-violet-600'></div> */}
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={avatar} alt="avatar" className={styles.profile_img}/>
            </div>
            <div className='textbox flex flex-col items-center gap-6'>
              <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Enter Your Username'/>
              <button className={styles.btn} type='submit'>Next</button>
            </div>

            <div className="text-center py-4">
              <span className='text-gray-500'>Not a Member? <Link className='text-violet-600' to="./register">Register Now!</Link></span>
            </div>
          </form>

        </div>
      </div>
    </div> 
  )
}
