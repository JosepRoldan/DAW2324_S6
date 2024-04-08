<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Perfil de Usuario</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      text-align: center;
    }
    .user-profile {
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 20px;
      margin-bottom: 20px;
    }
    label {
      font-weight: bold;
    }
    .btn {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Perfil de Usuario</h1>
    <div class="user-profile">
      <div>
        <label for="nombre">Nombre:</label>
        <span id="nombre">Juan Pérez</span>
      </div>
      <div>
        <label for="email">Email:</label>
        <span id="email">juan@example.com</span>
      </div>
      <div>
        <label for="direccion">Dirección:</label>
        <span id="direccion">Calle Principal, 123</span>
      </div>
      <div>
        <label for="telefono">Teléfono:</label>
        <span id="telefono">555-1234</span>
      </div>
      <div>
        <label for="fecha-nacimiento">Fecha de Nacimiento:</label>
        <span id="fecha-nacimiento">01/01/1990</span>
      </div>
      <div style="margin-top: 20px;">
        <a href="#" class="btn">Editar Perfil</a>
      </div>
    </div>
  </div>
</body>
</html>

