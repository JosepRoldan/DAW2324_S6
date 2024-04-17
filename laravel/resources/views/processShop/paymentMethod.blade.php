@extends('layout.basic')
@section('title', 'Payment')

@section('content')
<section>
    <div class="text-center mb-10 m-5">
        <ul class="align-middle steps">
            <li class="step step-primary">Card Shop</li>
            <li class="step step-primary">Shipping address</li>
            <li class="step step-primary">Details</li>
            <li class="step step-primary">Payment</li>
        </ul>
    </div>
</section>
@php
    $shippingPrice=10;
@endphp

        <div>
            <div class=" flex ml-10 ">
                <div class="m-10 w-2/3">
                    <div class=" bg-purple-600 rounded pt-4 pb-3">
                        <div class="m-4">
                            <h1 class=" text-2xl  text-white mb-3 ">Método de pago</h2>
                            <hr class=" border-slate-600 mb-10">
                            <form class=" w-2/4 transform translate-x-2/4    ">
                                <input class=" rounded w-full mb-2 " required placeholder="Titular" type="text" id="cardholder" name="cardholder">
                                <input class=" rounded w-full mb-2 " required placeholder="Numero de tarjeta" type="text" id="cardnumber" name="cardnumber">
                                <div class=" flex ">
                                    <input class=" rounded w-2/4 mr-2 " required placeholder="CVV" type="text" id="cvv" name="cvv">
                                    <input class=" rounded w-2/4 ml-2 " required placeholder="MM/YY" type="text" id="expiration" name="expiration">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            <div class=" border-2 rounded"></div>
            <div class=" mr-10 w-1/3 ">
                <div class=" m-10 ">
                    <div class=" border-2 border-slate-200 bg-slate-50 rounded-lg w-full p-10">
                        <div>
                            <h2 class="text-xl text-slate-600">Summary</h2>
                            <div class="ml-4 mt-4 mb-4">
                                <a class="text-slate-600">Subtotal: </a>
                                <a class=" text-right font-bold ">{{$carrito->total}} €</a>
                            </div>
                            <hr class=" border-dashed border-2 border-t-0 border-slate-600">
                            <div class="ml-4 w-full mt-4">
                                <a class=" text-slate-600">Total (Taxes and transport included ): </a>
                                <a class=" text-right font-bold ">{{($carrito->total+$shippingPrice)}} €</a>
                            </div>
                        </div>
                    </div>
                    <a href="{{ route('paymentMethod') }}" class=" text-center btn btn-1 pl-6 pr-6 p-2 mt-6">Save & Continue</a>
                </div>
            </div>
        </div>
@endsection