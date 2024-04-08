SET GLOBAL log_bin_trust_function_creators = 1;
# Sprint4Laravel
 Laravel, React, Tailwind

-Istalar docker
-Instalar sail
(Si uses docker en linux usa esta comanda)
docker context use default
(Crear un nou projecte en laravel)
curl -s https://laravel.build/example-app | bash
(Entrem a la carpeta del projecte que hem creat)
cd example-app
(Instalació de servei sail.Podem triar quin servei de base de dades ficar)(mysql, pgsql, mariadb, redis, memcached, meilisearch, typesense, minio, selenium, i mailpit)
curl -s "https://laravel.build/example-app?with=mysql,redis" | bash
(Ficar el servei de php up)
./vendor/bin/sail up
-Instalar tailwind 
-Instalar react
https://tailwindcss.com/docs/guides/vite
A la web indica també com crear un projecte amb vite i react pero este pas ens el saltem
Instalem el tailwind i l'executem

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Amb la segonda comanda se crearà el document de postcss.config.js mirem que tinguem el seguents plugins

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

Anem a afejir les rutes seguents per a que el tailwind busque les clases als ducuments amb les terminacions indicades: .blade.php / .js / .jsx

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

Anem a indicar els imports per el nostre full d'estils(en el nostre cas es el resources/css/app.css)

@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

A l'arxiu de vite (vite.config.js) hem de tindre les seguents linies per a que el tailwind funcione (ignorem les fletxes):

import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        react(),
        laravel([
            'resources/css/app.css', <--
            'resources/js/app.js', <--
        ]),
    ],
});

Si volem usar components que dona el taailwind potser hem de instalar un parell de dependencies extra:

npm install @headlessui/react @heroicons/react


Una vegada tenim el tailwind instalat anen a instalar el plugin de react per a poder introduir react a les nostres plantilles blade:
https://codea.app/blog/instalar-react-js-18-en-laravel-10-con-vite-js

Instalem react y el pluguin de vite amb react

npm install react@latest react-dom@latest
npm i @vitejs/plugin-react

Hem de tindre el document de configuració de vite (vite.config.js) amb el plugin de react y el import:

import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        react(),
        laravel([
            'resources/css/app.css',
            'resources/js/app.js',
        ]),
    ],
});

Una vegada hem acabat esta configuració ja podem crear plantilles react i usarles a les nostres plantilles blade. Per a poder crear de una nova hem de seguir els pasos que se mostren al link anterior. Recordem també importar el directori que conté les referencies a tailwind. 

.
.
.

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Plantilla react</title>
    @viteReactRefresh 
    @vite('resources/js/app.js')
    @vite('resources/css/app.css')
</head>

<body>

    <div class="text-red-500" id="codeareact"></div>

</body>

.
.
.

