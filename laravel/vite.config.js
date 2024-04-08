import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        react(),
        laravel([
            'resources/css/app.css',
            'resources/js/app.js',
            'resources/css/shipping.css',
            'resources/css/customerArea.css',            
            'resources/css/paymentMethod.css',
        ]),
    ],
});