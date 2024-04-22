<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>@lang('passwords.password_recovery')</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @viteReactRefresh
    @vite('resources/js/app.js')
    @vite('resources/css/app.css')
    <link rel="icon" type="image/png" href="../img/logocompleto.png">
</head>
<body class="bg-gray-100">
    <div id="header"></div>
    <div class="min-h-screen flex items-center justify-center">
        <div class="max-w-md w-full py-12 px-4 sm:px-6 lg:px-8">
            <div>
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    @lang('passwords.password_recovery')
                </h2>
            </div>
            <form class="mt-8 space-y-6" action="{{ route('password.email') }}" method="POST">
                @csrf
                <input type="hidden" name="remember" value="true">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="email-address" class="sr-only">@lang('passwords.email')</label>
                        <input id="email-address" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="@lang('passwords.email')">
                    </div>
                </div>

                <div>
                    <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        @lang('passwords.send_recovery_email')
                    </button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>
