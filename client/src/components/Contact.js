import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import contact from '../assets/contact-1.png';

const Contact = () => {
  const form = useRef();

const sendEmail = (e) => {
  e.preventDefault();
  console.log("success");
  emailjs
    .sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID1, form.current, {
      publicKey: process.env.REACT_APP_PUBLIC_KEY,
    })
    .then(
      () => {
        console.log('SUCCESS!');
      },
      (error) => {
        console.log('FAILED...', error.text);
      },
    );
};


return (
  <div className="bg-white flex flex-col-reverse md:flex-row py-12">
  <div className=" py-8 px-4 md:px-0 md:w-1/2">
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center text-violet-600 mb-8">Contact Us</h1>
      <div className="bg-amber-300 max-w-md mx-auto p-8 rounded-md shadow-md">
        <form ref={form} onSubmit={sendEmail}>
          <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
            <div className="flex flex-col flex-1">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
              <input type="text" id="name" name="name" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-orange-600" />
            </div>
            <div className="flex flex-col flex-1">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
              <input type="email" id="email" name="email" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-orange-600" />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
            <textarea id="message" name="message" rows="4" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-orange-600"></textarea>
          </div>
          <input type="submit" value="Submit" className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-700 cursor-pointer"/>
        </form>
      </div>
    </div>
  </div>
  <div className="md:w-1/2">
    <img src={contact} alt="contact" className="w-full h-auto md:h-full object-cover" style={{objectFit: 'cover'}} />
  </div>
</div>

);
// return (

//   <form ref={form} onSubmit={sendEmail}>
//     <label>Name</label>
//     <input type="text" name="from_name" />
//     <label>Email</label>
//     <input type="email" name="from_email" />
//     <label>Message</label>
//     <textarea name="message" />
//     <input type="submit" value="Send" />
//   </form>
// );
};
export default Contact;