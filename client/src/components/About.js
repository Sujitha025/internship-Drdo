import React from 'react'

const About = () => {
  return (
    <div className="bg-violet-100 py-20 px-10 md:px-0 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-violet-600 mb-14">About Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
          <div className="p-6 bg-white shadow-md rounded-lg h-auto md:h-full">
            <h2 className="text-2xl font-bold text-violet-600 mb-4">Our Vision</h2>
            <p className="text-lg text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus bibendum tortor sit amet magna ultrices eleifend.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg h-auto md:h-full">
            <h2 className="text-2xl font-bold text-violet-600 mb-4">Our Values</h2>
            <p className="text-lg text-gray-700">
              Sed mattis nec dui at feugiat. Integer eget est at metus varius accumsan ac ac nibh. Sed vel dapibus justo, et iaculis odio.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg h-auto md:h-full">
            <h2 className="text-2xl font-bold text-violet-600 mb-4">Our Team</h2>
            <p className="text-lg text-gray-700">
              Ut nec tortor at lorem consequat fermentum sit amet id ipsum. Nulla facilisi. Integer ut arcu odio.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg h-auto md:h-full">
            <h2 className="text-2xl font-bold text-violet-600 mb-4">Our Goals</h2>
            <p className="text-lg text-gray-700">
              Duis ac lectus elit. Pellentesque sollicitudin aliquet nisl, ut commodo magna dapibus vel. Sed nec turpis at enim accumsan tincidunt.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg h-auto md:h-full">
            <h2 className="text-2xl font-bold text-violet-600 mb-4">Our Product</h2>
            <p className="text-lg text-gray-700">
              Duis ac lectus elit. Pellentesque sollicitudin aliquet nisl, ut commodo magna dapibus vel. Sed nec turpis at enim accumsan tincidunt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About