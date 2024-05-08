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
                    <h2 class="text-3xl text-center font-bold mb-10">Accessibility</h2>
                    <h3 class="text-lg font-semibold mb-2">General</h3>
                    <p class="mb-4">UserWay strives to ensure that its services are accessible to people with disabilities. UserWay has invested a significant amount of resources to help ensure that its website is made easier to use and more accessible for people with disabilities, with the strong belief that every person has the right to live with dignity, equality, comfort and independence.</p>
                    <h3 class="text-lg font-semibold mb-2">Accessibility on UserWay</h3>
                    <p class="mb-4">The UserWay Accessibility Widget that is powered by a dedicated accessibility server. The software allows the site to improve its compliance with the Web Content Accessibility Guidelines (WCAG 2.1).</p>
                    <h3 class="text-lg font-semibold mb-2">Enabling the Accessibility Menu</h3>
                    <p class="mb-4">UserWay’s accessibility menu can be enabled by clicking the accessibility menu icon that appears on the corner of the page. After triggering the accessibility menu, please wait a moment for the accessibility menu to load in its entirety.</p>
                    <h3 class="text-lg font-semibold mb-2">Disclaimer</h3>
                    <p class="mb-4 mt-2">In an ongoing effort to continually improve and remediate accessibility issues, we also regularly scan UserWay with UserWay’s Accessibility Scanner to identify and fix every possible accessibility barrier on our site. Despite our efforts to make all pages and content on UserWay fully accessible, some content may not have yet been fully adapted to the strictest accessibility standards. This may be a result of not having found or identified the most appropriate technological solution.</p>
                    <h3 class="text-lg font-semibold mb-2">Here For You</h3>
                    <p class="mb-4 mt-2">If you are experiencing difficulty with any content on CusmtomAIze’s website, widget, any of its services or require assistance with any part of our site or software, please contact us during normal business hours as detailed below and we will be happy to assist.</p>
                </div>
            </div>
        </div>
    </div>
@endsection
</body>


</html>
