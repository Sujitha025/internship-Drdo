import React, { useState,useEffect } from 'react';
import toast,{Toaster} from 'react-hot-toast';
import styles from '../styles/Username.module.css'
import { useAuthStore } from '../store/store';
import { generateOTP, getUser } from '../helper/helper';
import { verifyOTP } from '../helper/helper';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';


export const Recovery = () => {


  const {username} = useAuthStore(state => state.auth);
  const [OTP,setOTP] = useState();
  const navigate = useNavigate(); 

  // async function details(){
  //   const data = await getUser(username);
  //   console.log(data);
  // }
  useEffect(() => {
    generateOTP(username).then((OTP) => {
        if (OTP) {
            getUser({ username }).then(({ data, error }) => {
                if (data) {
                    // User data retrieved successfully
                    console.log(data);
                    // Prepare the email data
                    const emailData = {
                        to_name: data.username,
                        text: `Your OTP is ${OTP}`,
                        to_email: data.email,
                        from_email: 'lakshmisujitha34@gmail.com'
                    };
                    // Send the email using emailjs
                    emailjs
                        .send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID2, emailData, {
                            publicKey: process.env.REACT_APP_PUBLIC_KEY,
                        })
                        .then(
                            () => {
                                console.log('Email sent successfully!');
                                toast.success('Email sent successfully!');
                            },
                            (error) => {
                                console.log('Failed to send email:', error.text);
                                toast.error('Failed to send email');
                            },
                        );
                } else {
                    // Error occurred while retrieving user data
                    console.error(error);
                    toast.error('Error while retrieving user data');
                }
            });
            return toast.success('OTP has been sent to your email!');
        } else {
            return toast.error('Problem while generating the OTP');
        }
    });
}, [username]);

  async function onSubmit(e){
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code : OTP })
      if(status === 201){
        toast.success('Verify Successfully!')
        return navigate('/reset')
      }  
    } catch (error) {
      return toast.error('Wront OTP! Check email again!')
    }
  }

 // handler of resend OTP
 function resendOTP(){

  let sentPromise = generateOTP(username);

  toast.promise(sentPromise ,
    {
      loading: 'Sending...',
      success: <b>OTP has been send to your email!</b>,
      error: <b>Could not Send it!</b>,
    }
  );

  sentPromise.then((OTP) => {
    console.log(OTP)
  });
  
}
return (
  <div className="container mx-auto">

    <Toaster position='top-center' reverseOrder={false}></Toaster>

    <div className='flex justify-center items-center h-screen'>
      <div className={styles.glass}>

        <div className="title flex flex-col items-center">
          <h4 className='text-5xl font-bold'>Recovery</h4>
          <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Enter OTP to recover password.
          </span>
        </div>

        <form className='pt-20' onSubmit={onSubmit}>

            <div className="textbox flex flex-col items-center gap-6">

                <div className="input text-center">
                  <span className='py-4 text-sm text-left text-gray-500'>
                    Enter 6 digit OTP sent to your email address.
                  </span>
                  <input onChange={(e) => setOTP(e.target.value) } className={styles.textbox} type="text" placeholder='OTP' />
                </div>

                <button className={styles.btn} type='submit'>Recover</button>
            </div>
        </form>

        <div className="text-center py-4">
          <span className='text-gray-500'>Can't get OTP? <button onClick={resendOTP} className='text-violet-600'>Resend</button></span>
        </div>

      </div>
      </div>
    </div>
  )
}