import React,{ useState } from 'react';
import {Link , useNavigate} from 'react-router-dom';
import avatar from '../assets/avatar.png';
import toast,{Toaster} from 'react-hot-toast';
import {useFormik} from 'formik'; //for acessing the user data and validation
import {registerValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import { registerUser } from '../helper/helper';

import styles from '../styles/Username.module.css'


export const Register = () => {
  const navigate = useNavigate()
  const [file,setFile] = useState();
  const formik = useFormik({
    initialValues : {
      email:'',
      username:'',
      password: '',
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      values  = await Object.assign(values,{profile: file || ''});
      let registerPromise = registerUser(values)
      toast.promise(registerPromise,{
        loading: 'Creating...',
        success: <b>Register Successfully..!</b>,
        error : <b>Could not Register</b>
      });
      registerPromise.then(() => {navigate('/')});
    }
  })
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]); //pic is in e.target.files[0]
    console.log(e.target)
    setFile(base64);
  }
  return (
    <div className="container mx-auto">
    <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass} style={{width:"45%",paddingTop:'3em'}}>

          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl text-violet-600 font-bold'>Register</h4>
            {/* <div className='rounded pt-0 px-10 my-3 h-2 bg-violet-600'></div>  */}
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
            <label htmlFor="profile">
            <img src={file || avatar} alt="avatar" className={styles.profile_img}/>
            </label>
            <input onChange={onUpload} type="file" id="profile" name='profile' />
            </div>
            <div className='textbox flex flex-col items-center gap-6'>
            <input {...formik.getFieldProps('email')} className={styles.textbox} type="email" placeholder='Enter Your Email' required/>
              <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Enter Your Username' required/>
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='Enter Your Password' required/>
              <button className={styles.btn} type='submit'>Register</button>
            </div>

            
          </form>
          <div className=" ml-14 text-center py-4">
              <span className='text-gray-500'>Already Register? <Link className='text-violet-600' to="/">Login Now!</Link></span>
            </div>
        </div>
      </div>
    </div> 
  )
}
