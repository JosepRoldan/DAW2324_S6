@extends('layout.basic')
@section('title', 'Shipping')

@section('content')
   <section>
        <div class="text-center mb-10 m-5">
            <ul class="align-middle steps">
                <li class="step step-primary">Card Shop</li>
                <li class="step step-primary">Details</li>
                <li class="step step-primary">Payment</li>
            </ul>
        </div>
    </section>
@php
    $shippingPrice = 10;
@endphp
<head>

</script>
      <script src="https://www.paypal.com/sdk/js?client-id=AUZhCdtjShVz3aPj-29oznCc8DHaY-fRbD9_83qAsarySyCRtDA41lKfkHC-PWglj8mC4YospxgDWzTX"></script>
</head>
  
<div id="paypal"></div>



@endsection
