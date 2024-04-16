<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @viteReactRefresh
    @vite('resources/js/app.js')
    @vite('resources/css/app.css')
    <link rel="icon" type="image/png" href="../img/logocompleto.png">
    <title>Correo de Verificación Enviado</title>
    
</head>
<body>
    @extends($layout)
    @section ('content')
        <div class="bg-gray-100 flex justify-center items-center h-screen">
            <div class="bg-white p-8 rounded shadow-md max-w-md">
                <h1 class="text-2xl font-bold mb-4">¡Correo de Verificación Enviado!</h1>
                <p class="mb-4">Se ha enviado un correo electrónico a tu dirección de correo electrónico registrada.</p>
                <p class="mb-4">Por favor, verifica tu cuenta haciendo clic en el enlace proporcionado en el correo electrónico.</p>
                <p class="mb-4">Si no recibes el correo electrónico dentro de unos minutos, por favor verifica la carpeta de correo no deseado o spam.</p>
                <p>¡Gracias por registrarte!</p>
                <button onclick="location.href = '{{ url('Inicio') }}'" class="bg-blue-500 text-white px-4 py-2 rounded mt-4">Regresar</button>
            </div>
        </div>
    @endsection
</body>
</html>
