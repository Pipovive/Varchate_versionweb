<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChatbotController extends Controller
{
    public function chat(Request $request)
    {
        $message = $request->input('message');
        $context = $request->input('context', 'General');
        $apiKey = env('GEMINI_API_KEY');

        if (!$apiKey) {
            return response()->json(['error' => 'API Key not configured'], 500);
        }

        try {
            $response = Http::withoutVerifying()->withHeaders([
                'Content-Type' => 'application/json',
            ])->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key={$apiKey}", [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => "Eres 'Varchate Cat', el asistente oficial de Varchate. Contexto: El usuario está en '{$context}'. INSTRUCCIONES: Sé conciso, amigable y usa un tono gatuno. IMPORTANTE: Si ya saludaste antes o la conversación ya empezó, NO vuelvas a presentarte ni a decir 'Hola, soy Varchate Cat'. Ve directo a responder la duda. Usuario pregunta: {$message}"]
                        ]
                    ]
                ]
            ]);

            if ($response->failed()) {
                Log::error('Gemini API Error: ' . $response->body());
                return response()->json(['error' => 'Error al comunicarse con la IA'], 500);
            }

            $data = $response->json();
            $reply = $data['candidates'][0]['content']['parts'][0]['text'] ?? 'Lo siento, no pude procesar tu mensaje.';

            return response()->json(['reply' => $reply]);

        } catch (\Exception $e) {
            Log::error('Chatbot Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Error interno del servidor'], 500);
        }
    }
}
