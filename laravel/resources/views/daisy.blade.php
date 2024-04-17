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

<body>
    <meta name="token" content="{{ csrf_token() }}">

</head>

<body>
    @extends($layout)

    @section('content')
    <div class="flex items-center justify-center h-screen mx-10" id="MostrarImagen"></div>
    @endsection

</div>
</body>

</html>
