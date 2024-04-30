<?php
return [
    'mail' => [
        'mail' => env('SENDGRID_API_KEY', ''),
    ],
    'paypal' => [
        'client_id' => env('PAYPAL_CLIENT_ID', ''),
    ],
    'fastapi' => [  
        'url' => env('FASTAPI_URL', ''),
        'user'=> env('FASTAPI_USER',''),
        'password' => env('FASTAPI_PASSWORD','')
    ]
    // Otras configuraciones personalizadas aquí...
];