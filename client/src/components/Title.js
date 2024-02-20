import React from 'react'
import styles from '../styles/Home.module.css'
import people from '../assets/people.png';
import { Link,useNavigate } from 'react-router-dom';
export const Title = () => {
  const navigate = useNavigate();
  function go(){
    navigate('/hero');
  }
  return (

    <div id="home" className={`${styles.container} flex flex-col md:flex-row`}>
    <div className={styles.imageContainer}>
      <img src={people} alt="People" className="w-full h-full object-cover" />
    </div>
    <div className={styles.titleContainer}>
      <div className="container text-center mx-auto">
        <h1 className="text-4xl mx-auto mt-20 font-bold mb-4">Your Visa Journey Begins Here</h1>
        <h2 className="text-2xl mb-4">Fast, Reliable Application Assistance.</h2>
        <p className="text-lg">Are you ready to begin?</p>
            <button onClick={go}className="bg-teal-400 text-white py-2 px-6 mt-4 rounded-full hover:bg-teal-600 transition duration-300">
              Begin
            </button>
        
      </div>
    </div> 
  </div>
  )
}
