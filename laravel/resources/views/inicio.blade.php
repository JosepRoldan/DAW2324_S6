<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CustomAIze</title>
    @viteReactRefresh
    @vite('resources/js/app.js')
    @vite('resources/css/app.css')
    <link rel="icon" type="image/png" href="../img/logo.png">
</head>
<!-- <div class="text-red-500" id="head"></div> -->
@if(Session::has('token'))
<!-- EJEMPLO PARA MOSTRAR EL CONTENIDO DE LA VARIABLE DE SESION EN LA PLANTILLA BLADE <p>Bienvenido, {{ Session::get('token') }}</p> -->
    <input type="hidden" id="token" value="{{ Session::get('token') }}">
@endif
<!-- @if(Session::has('token'))
    <script>
        window.isLoggedIn = true; // Variable JavaScript que indica que el usuario está autenticado
    </script>
@else
    <script>
        window.isLoggedIn = false; // Variable JavaScript que indica que el usuario no está autenticado
    </script>
@endif
<script>
    window.isLoggedIn = {{ Auth::check() ? 'true' : 'false' }};
</script> -->
<body>
    <div id="header" class="z-40"></div>
    <div class="w-screen h-screen overflow-hidden relative bg-gradient-to-br from-blue-900 via-purple-600 to-cyan-400">
  <div class="relative max-w-screen-lg mx-auto grid grid-cols-12 h-full items-center">
    <div class="col-span-6">
      <h1 class="text-white font-extrabold text-5xl mb-8">Unleash Your Creativity with AI-Powered Designs</h1>
      <p class="text-white text-base">
        At CustomAIze, we blend cutting-edge technology with your imagination to bring your ideas to life. With our innovative platform, you can generate stunning designs using artificial intelligence and transform them into personalized products that reflect your style.
      </p>
      <a href="/daisy" class="mt-8 text-white uppercase py-4 text-base font-light px-10 border border-white hover:bg-white hover:bg-opacity-10 inline-block rounded">Start Creating</a>
    </div>
    <div class="col-span-6">
      <img src="img/logo.png" class="z-10 ml-20 max-w-full h-auto">
    </div>
  </div>
</div>

<div class="py-4 relative overflow-hidden bg-white">
  <div class="grid grid-cols-2 max-w-screen-lg mx-auto">
    <div class="py-20 bg-slate-100 relative before:absolute before:h-full before:w-screen before:bg-[#061F41] before:top-0 before:right-0">
      <div class="relative z-20 pl-5">
        <h2 class="text-white font-black text-5xl leading-snug mb-5">Why Choose CustomAIze?</h2>
        <p class="text-white text-sm">
        Innovative Technology: Our AI-powered design tools make creativity accessible to everyone, empowering you to express yourself like never before.<br>
        <br>
        Endless Possibilities: From quirky illustrations to sleek patterns, the possibilities are limitless. Explore new ideas and transform them into tangible products that make a statement.
        </p>
        <a href="/products" class="mt-8 text-white uppercase py-4 text-base font-light px-10 border border-white hover:bg-white hover:bg-opacity-10 inline-block rounded">See Products</a>
      </div>
    </div>
    <div class="w-full flex flex-col pl-16">
      <h2 class="text-[#64618C] text-center font-bold text-2xl max-w-xs mb-12 mt-10">Generated Image</h2>
      <div class="h-full mt-auto overflow-hidden relative">
        <img src="img/nutriadechill.png" class="pl-10 h-full w-full object-contain" alt="">
      </div>
    </div>
  </div>
</div>

<div id="footer"></div>
</body>


</html>
