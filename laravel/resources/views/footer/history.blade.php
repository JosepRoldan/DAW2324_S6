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
<div id="header"></div> 
<div class="flex justify-center items-center p-20">
    <h1 class="text-3xl font-bold mb-5">Coming Soon...</h1>
</div>
<div id="footer" class="fixed bottom-0 w-full"></div>
</body>


</html>
