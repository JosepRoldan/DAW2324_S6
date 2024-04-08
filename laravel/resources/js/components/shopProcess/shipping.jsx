import React from "react";
import { createRoot } from 'react-dom/client';

const Shipping = () => {
    return <div  className="container mx-auto  max-w-7xl">
        <section className="pt-12 pb-24">
          <div className="px-4 mx-auto">    
            <div className="flex flex-wrap justify-end lg:justify-start -mx-4 pb-14 mb-14 xl:pb-28 xl:mb-24 border-b border-black border-opacity-10">
              <div className="w-full lg:w-8/12 xl:w-9/12 px-4 mb-10 lg:mb-0">
                <div className="flex flex-wrap -mx-4">
                  <div className="w-full md:w-1/2 px-4 mb-6">
                    <div className="lg:max-w-sm">
                      <div className="mb-8">
                        <label className="block mb-4 text-lg text-darkBlueGray-400">Your name:</label>
                        <input className="w-full px-5 py-3 text-lg leading-9 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" type="text"/>
                      </div>
                      <div className="mb-8">
                        <label className="block mb-4 text-lg text-darkBlueGray-400">Country:</label>
                        <input className="w-full px-5 py-3 text-lg leading-9 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" type="text"/>
                      </div>
                      <div className="mb-8">
                        <label className="block mb-4 text-lg text-darkBlueGray-400">Address:</label>
                        <input className="w-full px-5 py-3 text-lg leading-9 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" type="text"/>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-4">
                    <div className="lg:max-w-sm">
                      <div className="mb-8">
                        <label className="block mb-4 text-lg text-darkBlueGray-400">Surname:</label>
                        <input className="w-full px-5 py-3 text-lg leading-9 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" type="text"/>
                      </div>
                      <div className="mb-8">
                        <label className="block mb-4 text-lg text-darkBlueGray-400">State:</label>
                        <input className="w-full px-5 py-3 text-lg leading-9 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" type="text"/>
                      </div>
                      <div className="mb-14 md:w-36">
                        <label className="block mb-4 text-lg text-darkBlueGray-400">Zip code:</label>
                        <input className="w-full px-5 py-3 text-lg leading-9 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" type="text"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-4/12 xl:w-3/12 px-4">
                <div className="pt-11 pb-11 bg-purple-500 rounded-3xl">
                  <div className="border-b border-opacity-20">
                    <div className="px-10 pb-7">
                      <h3 className="mb-5 text-3xl text-white font-heading font-medium">Cart totals</h3>
                      <p className="flex items-center justify-between leading-8 font-heading font-medium" href="#">
                        <span className="text-white text-opacity-70">Subtotal</span>
                        <span className="flex items-center text-xl text-white">
                          <span className="mr-3 text-base">€</span>
                          <span>710,70</span>
                        </span>
                      </p>
                      <p className="flex items-center justify-between leading-8 font-heading font-medium" href="#">
                        <span className="text-white text-opacity-70">Shipping</span>
                        <span className="flex items-center text-xl text-white">
                          <span className="mr-3 text-base">€</span>
                          <span>10</span>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="px-10 pt-5 mb-7">
                    <div className="pb-5 border-b border-opacity-30">
                      <p className="flex items-center justify-between leading-8 font-heading font-medium" href="#">
                        <span className="text-white">Total</span>
                        <span className="flex items-center text-xl text-white">
                          <span className="mr-3 text-base">€</span>
                          <span>720,70</span>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="px-10 mx-auto md:max-w-max"><a className="block py-5 px-10 w-full text-xl leading-6 font-medium tracking-tighter font-heading text-center bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" href="{{ route('details') }}">Continue</a></div>
                </div>
              </div>
            </div>    
          </div>
        </section>        
    </div>;
};

if (document.getElementById("shipping")) {
    const root = createRoot(document.getElementById("shipping"));
    root.render(<Shipping />);
}