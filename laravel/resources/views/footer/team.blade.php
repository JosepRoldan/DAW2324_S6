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
<section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
            <div>
                <img class="object-center object-cover h-auto w-full" src="https://i.pinimg.com/736x/15/78/66/1578667107aa4e2200fa2c3d79b9fa76.jpg" alt="photo">
            </div>
            <div class="text-center py-8 sm:py-6">
                <p class="text-xl text-gray-700 font-bold mb-2">Dany Bailey</p>
                <p class="text-base text-gray-400 font-normal">Software Engineer</p>
            </div>
        </div>
        <div class="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
            <div>
                <img class="object-center object-cover h-auto w-full" src="https://i.pinimg.com/736x/15/78/66/1578667107aa4e2200fa2c3d79b9fa76.jpg" alt="photo">
            </div>
            <div class="text-center py-8 sm:py-6">
                <p class="text-xl text-gray-700 font-bold mb-2">Lucy Carter</p>
                <p class="text-base text-gray-400 font-normal">Graphic Designer</p>
            </div>
        </div>
        <div class="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
            <div>
                <img class="object-center object-cover h-auto w-full" src="https://i.pinimg.com/736x/15/78/66/1578667107aa4e2200fa2c3d79b9fa76.jpg" alt="photo">
            </div>
            <div class="text-center py-8 sm:py-6">
                <p class="text-xl text-gray-700 font-bold mb-2">Jade Bradley</p>
                <p class="text-base text-gray-400 font-normal">Dev Ops</p>
            </div>
        </div>
        <div class="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
            <div>
                <img class="object-center object-cover h-auto w-full" src="https://i.pinimg.com/736x/15/78/66/1578667107aa4e2200fa2c3d79b9fa76.jpg" alt="photo">
            </div>
            <div class="text-center py-8 sm:py-6">
                <p class="text-xl text-gray-700 font-bold mb-2">Dany Bailey</p>
                <p class="text-base text-gray-400 font-normal">Software Engineer</p>
            </div>
        </div>
        <div class="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
            <div>
                <img class="object-center object-cover h-auto w-full" src="https://i.pinimg.com/736x/15/78/66/1578667107aa4e2200fa2c3d79b9fa76.jpg" alt="photo">
            </div>
            <div class="text-center py-8 sm:py-6">
                <p class="text-xl text-gray-700 font-bold mb-2">Lucy Carter</p>
                <p class="text-base text-gray-400 font-normal">Graphic Designer</p>
            </div>
        </div>
        <div class="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
            <div>
                <img class="object-center object-cover h-auto w-full" src="https://i.pinimg.com/736x/15/78/66/1578667107aa4e2200fa2c3d79b9fa76.jpg" alt="photo">
            </div>
            <div class="text-center py-8 sm:py-6">
                <p class="text-xl text-gray-700 font-bold mb-2">Jade Bradley</p>
                <p class="text-base text-gray-400 font-normal">Dev Ops</p>
            </div>
        </div>
    </div>
</section>
<div id="footer"></div>
</body>

</html>
