@extends('layout.basic')
@section('title', 'Details')

@section('content')
<section>
    <div class="text-center mb-10 m-5">
        <ul class="align-middle steps">
            <li class="step step-primary">Card Shop</li>
            <li class="step step-primary">Shipping address</li>
            <li class="step step-primary">Details</li>
            <li class="step">Payment</li>
        </ul>
    </div>
</section>
@if(session('message'))
    <div class="alert alert-success">
        {{ session('message') }}
    </div>
@endif
<section class="pt-12 pb-24 overflow-hidden bg-white">
    <div class="container px-4 mx-auto">
        <div class="flex flex-wrap justify-center -mx-4">
            <div class="w-full xl:w-9/12 2xl:w-8/12 px-4 mb-16 xl:mb-0">
                @foreach ($products as $product)
                <div class="relative flex w-full -mx-4 mb-8 pb-8 flex-wrap items-center justify-between border-b border-gray-200 border-opacity-40">
                    <div class="w-full md:w-1/2">
                        <div class="md:flex md:items-center">
                            <div class="relative w-full md:w-auto px-4 mb-6 xl:mr-10 md:mb-10 lg:mb-0">
                                <a class="block mx-auto max-w-max" href="#">
                                    <img src="{{ $product->productImages->first()->thumb ?? '' }}"/>
                                </a>
                                <button class="md:hidden absolute top-0 right-0 text-gray-300 hover:text-gray-400">
                                    <svg width="28" height="28" viewbox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="27" height="27" rx="13.5" stroke="currentColor"></rect><line x1="20.495" y1="8.49497" x2="8.49498" y2="20.495" stroke="currentColor" stroke-width="1.4"></line><line x1="19.505" y1="20.495" x2="7.50503" y2="8.49498" stroke="currentColor" stroke-width="1.4"></line></svg>
                                </button>
                            </div>
                            <div class="px-4 mb-6 lg:mb-0">
                                <a class="block mb-5 text-xl font-heading font-medium hover:underline" href="#">{{ $product->name }}</a>
                                <div class="flex flex-wrap">
                                    <p class="mr-4 text-sm font-medium">
                                        <span class="font-heading">Variant:</span>
                                        <span class="ml-2 text-gray-400">Grey</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="relative w-full md:w-auto px-4">
                        <span class="text-xl font-heading font-medium text-blue-500">
                            <span class="text-sm">$</span>
                            <span>{{
                                $product->getCheapestProductDetail()->formatted_price }}</span>
                        </span>
                        <button class="hidden lg:block absolute top-0 right-0 -mt-10 -mr-6 text-gray-300 hover:text-gray-400">
                            <svg width="28" height="28" viewbox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="27" height="27" rx="13.5" stroke="currentColor"></rect><line x1="20.495" y1="8.49497" x2="8.49498" y2="20.495" stroke="currentColor" stroke-width="1.4"></line><line x1="19.505" y1="20.495" x2="7.50503" y2="8.49498" stroke="currentColor" stroke-width="1.4"></line></svg>
                        </button>
                    </div>
                    <button class="hidden md:block lg:hidden absolute top-0 right-0 -mr-6 text-gray-300 hover:text-gray-400">
                        <svg width="28" height="28" viewbox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="27" height="27" rx="13.5" stroke="currentColor"></rect><line x1="20.495" y1="8.49497" x2="8.49498" y2="20.495" stroke="currentColor" stroke-width="1.4"></line><line x1="19.505" y1="20.495" x2="7.50503" y2="8.49498" stroke="currentColor" stroke-width="1.4"></line></svg>
                    </button>
                </div>
                @endforeach
            </div>
@php
    $shippingPrice=10;
@endphp
            <div class="w-full xl:w-3/12 px-4 ml-auto">
                <div class="py-10 bg-purple-600 rounded-3xl">
                    <div class="px-10 pb-8 mb-6 border-b border-white border-opacity-20">
                        <h2 class="mb-5 text-2xl font-heading font-medium text-white">Cart totals</h2>
                        <div class="flex justify-between items-center mb-3">
                            <h4 class="font-heading font-medium text-white text-opacity-50">Subtotal</h4>
                            <span class="text-xl font-heading font-medium text-white">
                                <span class="text-base">$</span>
                                <span>{{$carrito->total}}</span>
                            </span>
                        </div>
                        <div class="flex justify-between items-center">
                            <h4 class="font-heading font-medium text-white text-opacity-50">Shipping</h4>
                            <span class="text-xl font-heading font-medium text-white">
                                <span class="text-base">$</span>
                                <span>10,00</span>
                            </span>
                        </div>
                    </div>
                    <div class="px-10">
                        <div class="flex pb-4 mb-6 justify-between items-center border-b border-white border-opacity-20">
                            <h4 class="font-heading font-medium text-white">Total</h4>
                            <span class="text-xl font-heading font-medium text-white">
                                <span class="text-base">$</span>
                                <span>{{$carrito->total + $shippingPrice}}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="text-center px-10 mt-20 mb-20 ml-10 mr-10">
                    <a href="{{route('paymentMethod')}}" class="block py-5 px-10 w-full text-xl leading-6 font-medium tracking-tighter font-heading text-center bg-purple-600 hover:bg-indigo-800 text-white focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl">Checkout</a>
                </div>
            </div>           
        </div>
    </div>
</section>
@endsection
