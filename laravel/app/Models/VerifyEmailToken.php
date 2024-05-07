<?php

namespace App\Models;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Customer;
use Illuminate\Database\Eloquent\Model;


class VerifyEmailToken extends Model
{
    protected $table = 'email_verify_tokens'; // Nombre de la tabla
    
    protected $fillable = ['mail', 'token', 'created_at', 'expires_at']; // Campos asignables

    public $timestamps = false; // No se crean campos de tiempo en la tabla
    
}

