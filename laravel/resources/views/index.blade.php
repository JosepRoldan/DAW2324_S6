<!-- resources/views/clients/index.blade.php -->

<form method="POST" action="{{ route('clients.store') }}">
    @csrf
    <input type="text" name="name" placeholder="Nombre">
    <input type="text" name="surname" placeholder="Apellido">
    <input type="text" name="username" placeholder="Nombre de usuario">
    @error('username')
        <p>{{ $message }}</p>
    @enderror
    <input type="password" name="password" placeholder="Contraseña">
    <input type="email" name="mail" placeholder="Correo electrónico">
    <input type="text" name="phone" placeholder="Teléfono">
    <input type="text" name="address" placeholder="Dirección">
    <input type="text" name="postcode" placeholder="Código postal">
    <input type="number" name="idCountry" placeholder="ID del país">
    <!-- Puedes ocultar el campo membershipDate ya que se establecerá automáticamente en el controlador -->
    <button type="submit">Registrar cliente</button>
</form>

@foreach ($clients as $client)
    <p>{{ $client->username }}</p>
    <p>{{ $client->mail }}</p>
    <br>
@endforeach
