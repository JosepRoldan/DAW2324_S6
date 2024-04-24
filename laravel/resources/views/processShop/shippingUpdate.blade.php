@extends('layout.basic')
@section('title', 'Shipping')

@section('content')
    <section>
        <div class=" text-center mb-10 m-5">
            <ul class=" align-middle steps">
                <li class="step step-primary">Card Shop</li>
                <li class="step step-primary">Shipping address</li>
                <li class="step">Details</li>
                <li class="step">Payment</li>
            </ul>
        </div>
    </section>
@php
    $shippingPrice=10;
@endphp
      <section class="pt-12 pb-24 container mx-auto">
        <form method="POST" action="{{ route('update.shipping.data') }}">
        @method('PUT')
        @csrf
          <div class="px-4 ">    
            <input name = 'idCustomers' value ='{{ $customer->idCustomers }}' type ="hidden" />
            <div class="flex flex-wrap justify-end lg:justify-start -mx-4 pb-14 mb-14 xl:pb-28 xl:mb-24 border-b border-black border-opacity-10">
              <div class="w-full lg:w-8/12 xl:w-9/12 px-4 mb-10 lg:mb-0">
              <div class="flex flex-wrap -mx-4">
                <div class="w-full md:w-1/2 px-4 mb-6">
                    <div class="lg:max-w-sm">
                        <div class="mb-8">
                            <label class="block mb-4 text-lg text-darkBlueGray-400">Your name:</label>
                            <input class="w-full px-5 py-3 text-lg leading-9 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" name = 'name' type="text" value='{{ $customer->name }}' />
                        </div>
                        <div class="mb-8">
                            <label class="block mb-4 text-lg text-darkBlueGray-400">Country:</label>
                            <input class="w-full px-5 py-3 text-lg leading-9 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" type="text" name = 'country' value='{{ $customer->country }}'/>
                        </div>
                        <div class="mb-8">
                            <label class="block mb-4 text-lg text-darkBlueGray-400">Address:</label>
                            <input class="w-full px-5 py-3 text-lg leading-9 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" type="text" name = 'address' value='{{ $customer->address }}'/>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-1/2 px-4">
                  <div class="lg:max-w-sm">
                    <div class="mb-8">
                      <label class="block mb-4 text-lg text-darkBlueGray-400">Surname:</label>
                      <input class="w-full px-5 py-3 text-lg leading-9 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" type="text" name = 'surname' value='{{ $customer->surname }}'/>
                    </div>
                    <div class="mb-8">
                      <label class="block mb-4 text-lg text-darkBlueGray-400">State:</label>
                      <input class="w-full px-5 py-3 text-lg leading-9 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" type="text" name = 'state' value='{{ $customer->state }}'/>
                    </div>
                    <div class="mb-8">
                      <label class="block mb-4 text-lg text-darkBlueGray-400">City:</label>
                      <input class="w-full px-5 py-3 text-lg leading-9 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" type="text" name = 'city' value='{{ $customer->city }}'/>
                    </div>
                    <div class="mb-14 md:w-36">
                      <label class="block mb-4 text-lg text-darkBlueGray-400">Zip code:</label>
                      <input class="w-full px-5 py-3 text-lg leading-9 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" type="text" name = 'postcode' value='{{ $customer->postcode }}'/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-4 mx-auto md:max-w-max">
                <div class="inline-block mr-2">
                    <button type="submit" class="block py-5 px-10 w-full text-xl leading-6 font-medium tracking-tighter font-heading text-center bg-purple-600 hover:bg-indigo-800 text-white focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl">Update</button>
                </div>
                <div class="inline-block">
                    <a href="{{route('details')}}" class="block py-5 px-10 w-full text-xl leading-6 font-medium tracking-tighter font-heading text-center bg-purple-600 hover:bg-indigo-800 text-white focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl">Continue</a>
                </div>
              </div>
            </div>
        </form>
              <div class="w-full md:w-1/2 lg:w-4/12 xl:w-3/12 px-4">
                <div class="pt-11 pb-11 bg-purple-600 rounded-3xl">
                  <div class="border-b border-opacity-20">
                    <div class="px-10 pb-7">
                      <h3 class="mb-5 text-3xl text-white font-heading font-medium">Cart totals</h3>
                      <p class="flex items-center justify-between leading-8 font-heading font-medium" href="#">
                        <span class="text-white text-opacity-70">Subtotal</span>
                        <span class="flex items-center text-xl text-white">
                          <span class="mr-3 text-base">€</span>
                          <span>{{$carrito->total}}</span>
                        </span>
                      </p>
                      <p class="flex items-center justify-between leading-8 font-heading font-medium" href="#">
                        <span class="text-white text-opacity-70">Shipping</span>
                        <span class="flex items-center text-xl text-white">
                          <span class="mr-3 text-base">€</span>
                          <span>{{$shippingPrice}}</span>
                      </p>
                    </div>
                  </div>
                  <div class="px-10 pt-5 mb-7">
                    <div class="pb-5 border-b border-opacity-30">
                      <p class="flex items-center justify-between leading-8 font-heading font-medium" href="#">
                        <span class="text-white">Total</span>
                        <span class="flex items-center text-xl text-white">
                          <span class="mr-3 text-base">€</span>
                          <span>{{$carrito->total + $shippingPrice}}</span>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>    
          </div>
        </section>        
@endsection