<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@lang('passwords.authentication_error')</title>
    @viteReactRefresh
    @vite('resources/js/app.js')
    @vite('resources/css/app.css')
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
    <div id="header"></div>
    <div class="bg-white, h-1">
        <h1>Error</h1>
        <p>{{ session('error') }}</p>
    </div>
</body>
</html>
