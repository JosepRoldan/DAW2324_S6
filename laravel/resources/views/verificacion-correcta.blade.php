<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificación de Correo Electrónico Incorrecta</title>
    @viteReactRefresh
    @vite('resources/js/app.js')
    @vite('resources/css/app.css')</head>
<body>
    @extends($layout)
    @section('content')
        <div class="flex items-center justify-center min-h-screen bg-gray-100">
            <div class="max-w-md px-6 py-8 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <h2 class="text-xl font-semibold text-gray-800">¡Confirmación de Correo Electrónico Exitosa!</h2>
                <p class="mt-2 text-gray-600">Tu correo electrónico ha sido confirmado correctamente.</p>
                <div class="mt-6">
                    <a href="{{ url('/') }}" class="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Volver a Inicio</a>
                </div>
            </div>
        </div>
    @endsection
</body>
</html>
