<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="utf-8">
        <title>@lang('passwords.password_recovery')</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @viteReactRefresh
        @vite('resources/js/app.js')
        @vite('resources/css/app.css')
        <link rel="icon" type="image/png" href="../img/logocompleto.png">
        <script>
            function validarFormulario() {
                var nuevaContraseña = document.getElementById("nueva_contraseña").value;
                var confirmarContraseña = document.getElementById("confirmar_contraseña").value;

                if (nuevaContraseña !== confirmarContraseña) {
                    alert("Las contraseñas no coinciden.");
                    return false;
                }
                return true;
            }
        </script>
    </head>

    @extends($layout)
    @section('content')
        <body class="bg-gray-100 w-full">
            <div class=" my-10 flex flex-col items-center justify-center">
                <div class="bg-slate-200 w-2/4 text-center p-8 rounded shadow-md ">
                    <h1 class=" text-black text-2xl mb-2 ">@lang('passwords.password_recovery')</h1>
                    <form action="{{ route('password.reset') }}" method="POST" onsubmit="return validarFormulario();">
                        @csrf <!-- Agrega el token CSRF -->
                        <input type="hidden" name="token" value="{{ $token }}"> <!-- Agrega un campo oculto para el token -->

                        <label class=" text-slate-800 " for="nueva_contraseña">@lang('passwords.new_password'):</label><br>
                        <input class=" text-slate-800 border-slate-400 " type="password" id="nueva_contraseña" name="nueva_contraseña" required><br><br>

                        <label class=" text-slate-800 " for="confirmar_contraseña">@lang('passwords.confirm_new_password'):</label><br>
                        <input class=" text-slate-800 border-slate-400 " type="password" id="confirmar_contraseña" name="confirmar_contraseña" required><br><br>

                        <button class=" text-slate-800 p-3 rounded-md bg-slate-300 " type="submit">@lang('passwords.change_password')</button>
                    </form>
                </div>
            </div>
        </body>
    @endsection
</html>
