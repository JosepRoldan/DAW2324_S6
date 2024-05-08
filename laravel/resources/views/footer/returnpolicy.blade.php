<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CustomAIze</title>
    @viteReactRefresh
    @vite('resources/js/app.js')
    @vite('resources/css/app.css')
    <link rel="icon" type="image/png" href="../img/logocompleto.png">
</head>
<!-- <div class="text-red-500" id="head"></div> -->

<body>
@extends($layout)

@section('content')


<div class="container mx-auto py-10 px-5">
        <div class="max-w-6xl mx-auto bg-white text-gray-800 rounded-lg shadow-md overflow-hidden">
            <div class="p-4 sm:p-6">
                <div>
                    <h2 class="text-3xl text-center font-bold mb-10">Return Policy</h2>
                    <h3 class="text-lg font-semibold mb-2">Address and contact:</h3>
                    <p class="mb-4">Affordable phones S.L.</p>
                    <p class="mb-4">Avenida de Singapur, 33</p>
                    <p class="mb-4">27032, Valencia, Spain</p>
                    <p class="mb-4">info@affordablephones.mail</p>
                    <p class="mb-4">690120001</p>
                    <h3 class="text-lg font-semibold mb-2">Warranty:</h3>
                    <p class="mb-4">All our products come with a 3-year warranty, provided that any defects do not result from misuse of the product.</p>
                    <h3 class="text-lg font-semibold mb-2">Return period:</h3>
                    <p class="mb-4">To initiate a return, it will be necessary to do so within 30 days after the purchase.</p>
                    <h3 class="text-lg font-semibold mb-2">Return process:</h3>
                    <p class="mb-4">Send an email to info@affordablephones.mail with the subject "Return: Order Number" that includes a copy of the purchase receipt we sent to the address you provided, the return method you prefer, and a photo of the product in your possession.</p>
                    <p class="mb-4 mt-2">Once we receive the email, you will receive a label that you will need to print and attach to the package, present it at your local post office, and send it.</p>
                    <p class="mb-4 mt-2">Documents required for a return: You must attach the purchase receipt and a photo of the product in your possession.</p>
                    <h3 class="text-lg font-semibold mb-2">Return costs:</h3>
                    <p class="mb-4">Free during the first 14 days, thereafter, if the returned value is less than €10, you will only be responsible for the shipping costs indicated by the carrier.</p>
                    <h3 class="text-lg font-semibold mb-2">Non-returnable products:</h3>
                    <p class="mb-4">Customized cases made to order are not eligible for return.</p>
                    <h3 class="text-lg font-semibold mb-2">Return method:</h3>
                    <p class="mb-4">Replacement with a product of the same value or a refund of the purchase amount excluding the original shipping costs.</p>
                </div>
            </div>
        </div>
    </div>
@endsection
</body>


</html>