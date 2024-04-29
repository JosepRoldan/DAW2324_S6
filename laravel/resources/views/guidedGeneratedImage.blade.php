<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-theme="">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Products</title>
    @viteReactRefresh
    @vite('resources/js/app.js')
    @vite('resources/css/app.css')
    <link rel="icon" type="image/png" href="../img/logocompleto.png">
</head>
@if(Session::has('token'))
<!-- EJEMPLO PARA MOSTRAR EL CONTENIDO DE LA VARIABLE DE SESION EN LA PLANTILLA BLADE <p>Bienvenido, {{ Session::get('token') }}</p> -->
    <input type="hidden" id="token" value="{{ Session::get('token') }}">
@endif
<body>
    <meta name="token" content="{{ csrf_token() }}">

</head>

<body>
    <div id="header"></div>

    <div class="flex mx-12" id="GenerateGuidedImage"></div>
    
    <div id="footer"></div>
</div>
</body>

</html>
