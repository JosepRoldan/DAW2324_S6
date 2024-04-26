import { viteReactRefresh } from '@vitejs/plugin-react-refresh';
import { vite } from '@vitejs/plugin-vite';
import { createRoot } from 'react-dom/client';
import React from 'react';

export default function Head() {
  return (
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>CustomAIze</title>
      {viteReactRefresh}
      {vite('resources/js/app.js')}
      {vite('resources/css/app.css')}
      <script type="module">import './resources/js/app.js';</script>
      <link rel="stylesheet" type="text/css" href="./resources/css/app.css" />
    </head>
  );
}

if (document.getElementById('head')) {
  const root = createRoot(document.getElementById('head'));
  root.render(<Head />);
}