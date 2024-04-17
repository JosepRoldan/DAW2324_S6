@extends('layout.basic')
@section('title', 'Shipping')

@section('content')
    <section>
        <div class="text-center mb-10 m-5">
            <ul class="align-middle steps">
                <li class="step step-primary">Card Shop</li>
                <li class="step step-primary">Shipping address</li>
                <li class="step">Details</li>
                <li class="step">Payment</li>
            </ul>
        </div>
    </section>
@php
    $shippingPrice = 10;
@endphp
<head>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        fieldset label span {
            min-width: 125px;
        }
        fieldset .select::after {
            content: '';
            position: absolute;
            width: 9px;
            height: 5px;
            right: 20px;
            top: 50%;
            margin-top: -2px;
            background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='9' height='5' viewBox='0 0 9 5'><title>Arrow</title><path d='M.552 0H8.45c.58 0 .723.359.324.795L5.228 4.672a.97.97 0 0 1-1.454 0L.228.795C-.174.355-.031 0 .552 0z' fill='%23CFD7DF' fill-rule='evenodd'/></svg>");
            pointer-events: none;
        }
    </style>
</head>
@if(!$address)
    <div id="data" 
        data-address="{{ json_encode($address) }}" 
        data-customer="{{ $customer->toJson() }}">
    </div>
@endif

<div id="shoppingOrder"></div>

@endsection
