import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { glob } from 'glob';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
                'resource/css/email_verificado.css',
                'resource/js/email_verificado.js',
                ...glob.sync('resources/css/**/*.css'),
                ...glob.sync('resources/js/**/*.js'),
            ].filter(file =>
                !file.includes('_') &&
                !file.includes('/modules/')
            ),
            refresh: true,
        }),
    ],
    server: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8001',
                changeOrigin: true,
            }
        }
    }
});
