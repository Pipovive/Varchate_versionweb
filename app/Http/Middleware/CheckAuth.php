<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckAuth
{
    public function handle(Request $request, Closure $next)
    {
        // Verificar si existe token en sesión o en cookies
        if (!session()->has('auth_token') && !$request->hasCookie('auth_token')) {
            // Redirigir a login si no está autenticado
            return redirect('/login')->with('message', 'Debes iniciar sesión para acceder');
        }

        return $next($request);
    }
}
