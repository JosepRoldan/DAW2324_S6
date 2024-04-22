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

<body>
    <div id="header"></div>
    <div class="p-8">
        <div class="bg-white p-4 rounded-lg shadow-xl py-8 mt-12">
            <h4 class="text-4xl font-bold text-gray-800 tracking-widest uppercase text-center">FAQ</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-12 px-2 xl:px-12 mt-4">
                <div class="flex space-x-8 mt-8">
                <div class="bg-gray-100 p-6 rounded-lg shadow-md w-full">
                <h4 class="text-xl font-bold text-gray-700">How can I start creating my own designs?</h4>

                <p class="text-gray-600 my-2">You can begin by visiting our platform and exploring the available design options. Once you find a product you like, you can use our customization tools to add your own designs, text, or images. <span class="highlighted-word"><a href="url_of_another_page.html" class="text-blue-500 hover:underline">designs</a></span></p>
                
                </div>
                </div>

                <div class="flex space-x-8 mt-8">
                    <div class="bg-gray-100 p-6 rounded-lg shadow-md w-full">
                        <h4 class="text-xl font-bold text-gray-700">What kind of products can I customize on your platform?</h4>
                        <p class="text-gray-600 my-2">We offer a wide variety of products for customization, including t-shirts, mugs, caps, phone cases, among others. You can find the complete list of available products on our website.</p>
                    </div>
                </div>

                <div class="flex space-x-8 mt-8">
                    <div class="bg-gray-100 p-6 rounded-lg shadow-md w-full">
                        <h4 class="text-xl font-bold text-gray-700">What is the process for ordering and delivery of customized products?</h4>
                        <p class="text-gray-600 my-2">The ordering process is straightforward. Once you've customized your product and completed the payment, our team will proceed to produce it and ship it to the address you provided during the checkout process. The delivery time may vary depending on your location and the selected product.</p>
                    </div>
                </div>

                <div class="flex space-x-8 mt-8">
                    <div class="bg-gray-100 p-6 rounded-lg shadow-md w-full">
                        <h4 class="text-xl font-bold text-gray-700">Can I see samples of products before placing an order?</h4>
                        <p class="text-gray-600 my-2">Unfortunately, we currently do not offer physical samples of products. However, you can view digital representations of how your customized product will look before placing the order.</p>
                    </div>
                </div>

                <div class="flex space-x-8 mt-8">
                    <div class="bg-gray-100 p-6 rounded-lg shadow-md w-full">
                        <h4 class="text-xl font-bold text-gray-700">Do you offer discounts for large or recurring orders?</h4>
                        <p class="text-gray-600 my-2">Yes, we offer special discounts for large orders and for recurring customers. Please contact our customer service team for more information on available offers.</p>
                    </div>
                </div>

                <div class="flex space-x-8 mt-8">
                    <div class="bg-gray-100 p-6 rounded-lg shadow-md w-full">
                        <h4 class="text-xl font-bold text-gray-700">What payment methods do you accept?</h4>
                        <p class="text-gray-600 my-2">We accept a variety of payment methods, including credit cards, debit cards, and PayPal. You can find the complete list of payment options during the checkout process on our platform.</p>
                    </div>
                </div>
                <div class="flex space-x-8 mt-8">
                    <div class="bg-gray-100 p-6 rounded-lg shadow-md w-full">
                        <h4 class="text-xl font-bold text-gray-700">How long does it take to process and ship an order?</h4>
                        <p class="text-gray-600 my-2">The processing and shipping time may vary depending on the product and location. Typically, our customized products are shipped within [estimated delivery time].</p>
                    </div>
                </div>

                <!-- Add new question and answer here -->
                <div class="flex space-x-8 mt-8">
                    <div class="bg-gray-100 p-6 rounded-lg shadow-md w-full">
                        <h4 class="text-xl font-bold text-gray-700">Do you have any rewards or affiliate programs for regular customers?</h4>
                        <p class="text-gray-600 my-2">Yes, we offer a rewards program for regular customers where you can earn points with each purchase and redeem them for discounts on future orders. Additionally, we have an affiliate program that allows users to earn commissions by referring new customers to our platform.</p>
                    </div>
                </div>

                <!-- Add new question and answer here -->
                <div class="flex space-x-8 mt-8">
                    <div class="bg-gray-100 p-6 rounded-lg shadow-md w-full">
                        <h4 class="text-xl font-bold text-gray-700">What security measures do you have on your platform to protect user privacy?</h4>
                        <p class="text-gray-600 my-2">We take the privacy and security of our users very seriously. We use data encryption technologies to protect the personal and financial information of our customers, and we comply with all applicable data protection regulations.</p>
                    </div>
                </div>

                <!-- Add new question and answer here -->
                <div class="flex space-x-8 mt-8">
                    <div class="bg-gray-100 p-6 rounded-lg shadow-md w-full">
                        <h4 class="text-xl font-bold text-gray-700">How can I contact customer service if I have any questions or issues?</h4>
                        <p class="text-gray-600 my-2">You can contact our customer service team through our contact form on the website, via email, or through our social media channels. We're here to assist you with any questions or issues you may have.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="footer"></div>
</body>

</html>
