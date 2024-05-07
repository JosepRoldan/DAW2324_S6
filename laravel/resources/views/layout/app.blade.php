<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Mi Sitio')</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <!--Favicon-->
    <link rel="icon" type="image/png" href="../img/logocompleto.png">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @if(Session::has('token'))
        <!-- EJEMPLO PARA MOSTRAR EL CONTENIDO DE LA VARIABLE DE SESION EN LA PLANTILLA BLADE <p>Bienvenido, {{ Session::get('token') }}</p> -->
        <input type="hidden" id="token" value="{{ Session::get('token') }}">
    @endif
    <script src="https://cdn.userway.org/widget.js" data-account="6lyLjka116"></script>
    <script src="{{ asset('js/app.js') }}"></script>
    @viteReactRefresh
    @vite('resources/js/app.js')
    @vite('resources/css/app.css')
</head>
<body>
    
    <header id = "header"></header>

    <main>
        @yield('content')
    </main>

    <footer id = "footer">
    </footer>
</body>
</html>