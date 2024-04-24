<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CustomAIze</title>
    @viteReactRefresh
    @vite('resources/js/app.js')
    @vite('resources/css/app.css')
    <link rel="icon" type="image/png" href="../img/logo.png">
    <style>
        .fake-message {
    background-color: red;
    color: white;
    text-align: center;
    padding: 20px;
    top: 20px;
    right: 20px;
    z-index: 9999;
}

.fake-message button {
    color: white;
    font-weight: bold;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 1.5rem; /* Cambiar a una unidad relativa */
    margin-top: 2rem; /* Cambiar a una unidad relativa */
    position: absolute;
    top: 1rem; /* Cambiar a una unidad relativa */
    right: 1rem; /* Cambiar a una unidad relativa */
    padding: 0.5rem 1rem; /* Cambiar a una unidad relativa */
}

@media (max-width: 768px) {
    .fake-message button {
        font-size: 1.2rem; /* Tamaño de fuente más pequeño para pantallas pequeñas */
    }
}
    </style>
</head>
<!-- <div class="text-red-500" id="head"></div> -->
@if(Session::has('token'))
<!-- EJEMPLO PARA MOSTRAR EL CONTENIDO DE LA VARIABLE DE SESION EN LA PLANTILLA BLADE <p>Bienvenido, {{ Session::get('token') }}</p> -->
    <input type="hidden" id="token" value="{{ Session::get('token') }}">
@endif
<!-- @if(Session::has('token'))
    <script>
        window.isLoggedIn = true; // Variable JavaScript que indica que el usuario está autenticado
    </script>
@else
    <script>
        window.isLoggedIn = false; // Variable JavaScript que indica que el usuario no está autenticado
    </script>
@endif
<script>
    window.isLoggedIn = {{ Auth::check() ? 'true' : 'false' }};
</script> -->
<body>

<!-- First Section -->
    <div id="header" class="z-40"></div>
    <div class="fake-message">
    <p>This page is fake, for demonstration purposes only.</p>
    <button id="closeFakeMessage">x</button>
   </div>
    <div class="w-screen h-screen overflow-hidden relative">
  <img src="/img/inicio.gif" class="absolute inset-0 w-full h-full object-cover object-center z-0" alt="Animated GIF">
  <div class="max-w-screen-lg grid ml-24 grid-cols-12 h-full items-center relative z-10">
    <div class="col-span-12 md:col-span-6 px-0 md:px-6 text-white">  
      <h1 class="font-extrabold text-[#6F96A6] text-5xl md:text-6xl mb-8 tracking-wider">Unleash Your Creativity with AI-Powered Designs</h1>
      <a href="/daisy" class="mt-8 uppercase py-4 px-8 md:px-10 border border-white hover:bg-white hover:bg-opacity-10 inline-block rounded text-gray-400 font-semibold">Start Creating</a>
    </div>
  </div>
</div>


</div>

<!-- Carousel Section -->

<div class="m-10 mx-auto p-16 sm:p-24 lg:p-48 bg-white">
    
    <!-- Carousel Body -->
    <div class="relative rounded-lg block md:flex items-center bg-gray-100 shadow-xl" style="min-height: 19rem;">
      <div class="relative w-full md:w-2/5 h-full overflow-hidden rounded-t-lg md:rounded-t-none md:rounded-l-lg" style="min-height: 19rem;">
        <img class="absolute inset-0 w-full h-full object-cover object-center" src="https://stripe.com/img/v3/payments/overview/photos/missguided.jpg" alt="">
        <div class="absolute inset-0 w-full h-full bg-indigo-900 opacity-75"></div>
        <div class="absolute inset-0 w-full h-full flex items-center justify-center fill-current text-white">
          <svg class="w-full h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 239 120"><path d="M4.21 86.4V33.31h8.94l4 28.85.86 9.52.87-9.52 4-28.85h9.02V86.4h-5.19V42.83l-.87 7.22-5.19 36.35h-5.19l-5.2-36.93-.57-6.64V86.4zm35.79 0h6V33.31h-6zm114.24 0h6.06V33.31h-6.06zm46.16-24h5.48v-6.01h-5.48v-17h9.23v-6.08h-15.31V86.4h15.29v-6.06h-9.23zm-60-29.14v44.19a2.89 2.89 0 1 1-5.77 0V33.31h-6.34v44.14a9.23 9.23 0 1 0 18.46 0V33.31zm40.11 44.14V42.55a2.9 2.9 0 0 0-2.89-2.89h-2.88v41h2.88a3.68 3.68 0 0 0 2.89-3.18zm-3.21-44.09a9.12 9.12 0 0 1 9.23 9.24v34.9a9.12 9.12 0 0 1-9.23 9.24h-9.23V33.31h9.23m51.64 44.14v-34.9a2.89 2.89 0 0 0-2.88-2.89h-2.89v41h2.89a3.67 3.67 0 0 0 2.88-3.18zm-2.88-44.14a9.06 9.06 0 0 1 8.94 9.24v34.9a9.12 9.12 0 0 1-9.23 9.24h-9.23V33.31h9.52M89.31 57.55c-2.88-2.6-5.19-4.91-5.19-9.23v-5.77A2.89 2.89 0 0 1 87 39.66a3.1 3.1 0 0 1 2.89 2.89v6.05H96v-6.05a9.24 9.24 0 1 0-18.47 0v6.05c.58 6.93 4.62 10.68 7.5 13.56 2.89 2.6 5.2 4.91 5.2 9.24v6a2.89 2.89 0 1 1-5.77 0v-8.89h-6.11v8.94a9.23 9.23 0 1 0 18.46 0v-6c-.57-7.22-4.32-10.68-7.5-13.85m-25.1 0C61.33 55 59 52.64 59 48.32v-5.77a2.89 2.89 0 1 1 5.77 0v6.05h6.06v-6.05a9.24 9.24 0 1 0-18.47 0v6.05c0 6.93 4 10.68 6.93 13.56 2.88 2.6 5.19 4.91 5.19 9.24v6a2.89 2.89 0 0 1-2.88 2.89 3.1 3.1 0 0 1-2.89-2.89v-8.89h-5.46v8.94a9.23 9.23 0 1 0 18.46 0v-6c-.28-7.22-4.32-10.68-7.5-13.85m56.84-9.23v-5.82a9.24 9.24 0 1 0-18.47 0v34.9a9.45 9.45 0 0 0 9 9.24 6.63 6.63 0 0 0 6.34-4l2.89 4V62.45h-9.23v6.06h2.88v8.94a2.73 2.73 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89v-34.9a2.9 2.9 0 0 1 2.89-2.89 3.1 3.1 0 0 1 2.88 2.89v6.05h6.64z"></path></svg>
        </div>
      </div>
      <div class="w-full md:w-3/5 h-full flex items-center bg-gray-100 rounded-lg">
        <div class="p-12 md:pr-24 md:pl-16 md:py-12">
          <p class="text-gray-600"><span class="text-gray-900">Missguided</span> is a UK-based fashion retailer that has nearly doubled in size since last year. They integrated Stripe to deliver seamless checkout across mobile and web for customers in 100+ countries, all while automatically combating fraud.</p>
          <a class="flex items-baseline mt-3 text-indigo-600 hover:text-indigo-900 focus:text-indigo-900" href="">
            <span>Learn more about our users</span>
            <span class="text-xs ml-1">&#x279c;</span>
          </a>
        </div>
        <svg class="hidden md:block absolute inset-y-0 h-full w-24 fill-current text-gray-100 -ml-12" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="50,0 100,0 50,100 0,100" />
        </svg>
      </div>
      <button class="absolute top-0 mt-32 left-0 bg-white rounded-full shadow-md h-12 w-12 text-2xl text-indigo-600 hover:text-indigo-400 focus:text-indigo-400 -ml-6 focus:outline-none focus:shadow-outline">
        <span class="block" style="transform: scale(-1);">&#x279c;</span>
      </button>
      <button class="absolute top-0 mt-32 right-0 bg-white rounded-full shadow-md h-12 w-12 text-2xl text-indigo-600 hover:text-indigo-400 focus:text-indigo-400 -mr-6 focus:outline-none focus:shadow-outline">
        <span class="block" style="transform: scale(1);">&#x279c;</span>
      </button>
    </div>
    
    <!-- Carousel Tabs -->
    <div class="flex items-center pt-5 justify-between">
      <button class="px-2 opacity-50 hover:opacity-100 focus:opacity-100"><img class="w-full" src="https://stripe.com/img/v3/payments/overview/logos/kickstarter.svg" alt="" style="max-height: 60px;"></button>
      <button class="px-2 opacity-50 hover:opacity-100 focus:opacity-100"><img class="w-full" src="https://stripe.com/img/v3/payments/overview/logos/slack.svg" alt="" style="max-height: 60px;"></button>
      <button class="px-2 opacity-50 hover:opacity-100 focus:opacity-100"><img class="w-full" src="https://stripe.com/img/v3/payments/overview/logos/glossier.svg" alt="" style="max-height: 60px;"></button>
      <button class="px-2 opacity-50 hover:opacity-100 focus:opacity-100"><img class="w-full" src="https://stripe.com/img/v3/payments/overview/logos/charity_water.svg" alt="" style="max-height: 60px;"></button>
      <button class="px-2 opacity-100 hover:opacity-100 focus:opacity-100"><img class="w-full" src="https://stripe.com/img/v3/payments/overview/logos/missguided.svg" alt="" style="max-height: 60px;"></button>
    </div>
    
  </div>

<!-- Third Section -->
<div class="overflow-hidden bg-white">
    <div class="col-span-12 md:col-span-6 py-10 md:py-16 relative bg-[#141415]">
        <div class="relative z-20 pl-5 pr-3 md:pr-5"> <!-- Adjusted padding on the right side -->
            <h2 class="text-white font-black text-3xl md:text-5xl leading-snug mb-3 md:mb-5">Why Choose CustomAIze?</h2> <!-- Adjusted font size and margin bottom -->
            <p class="text-white text-lg md:text-base">
                <span class="font-bold">Innovative Technology:</span> Our AI-powered design tools make creativity accessible to everyone, empowering you to express yourself like never before.
                <br><br>
                <span class="font-bold">Endless Possibilities:</span> From quirky illustrations to sleek patterns, the possibilities are limitless. Explore new ideas and transform them into tangible products that make a statement.
            </p>
            <a href="/daisy" class="mt-6 md:mt-8 text-white uppercase py-3 md:py-4 px-8 md:px-10 border border-white hover:bg-white hover:bg-opacity-10 inline-block rounded">SEE ALL PRODUCTS</a>
        </div>
    </div>
</div>

<!-- Forth Section -->
<h2 class="text-center text-2xl md:text-5xl font-semibold text-gray-800 pt-16">Top Picks: Most Sold Products</h2>
<link rel="stylesheet" href="https://cdn.tailgrids.com/tailgrids-fallback.css" />

<!-- ====== Cards Section Start -->
@foreach($topPriorityProducts() as $product)
    <div class="w-full md:w-1/2 xl:w-1/3 px-4">
        <div class="bg-white rounded-lg overflow-hidden shadow-md mb-10">
            <!-- Imagen del producto -->
            <img src="{{ $product->productImages->first()->original ?? 'placeholder.jpg' }}" alt="image" class="w-full">
            <div class="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                <!-- Título del producto -->
                <h3>
                    <a href="{{ route('products.show', $product->id) }}" class="font-semibold text-dark text-xl sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] mb-4 block hover:text-primary">
                        {{ $product->name }}
                    </a>
                </h3>
                <!-- Descripción del producto -->
                <p class="text-base text-body-color leading-relaxed mb-7">
                    {{ $product->ENG_description ?? $product->CAT_description ?? $product->ESP_description }}
                </p>
                <!-- Enlace para ver detalles -->
                <a href="{{ route('products.show', $product->id) }}" class="inline-block py-2 px-7 border border-[#E5E7EB] rounded-full text-base text-body-color font-medium hover:border-primary hover:bg-primary hover:text-white transition">
                    View Details
                </a>
            </div>
        </div>
    </div>
@endforeach
         <div class="w-full md:w-1/2 xl:w-1/3 px-4">
            <div class="bg-white rounded-lg overflow-hidden shadow-md mb-10"> <!-- Aquí se agregó la clase 'shadow-md' para la sombra -->
               <img
                  src="https://cdn.tailgrids.com/1.0/assets/images/cards/card-01/image-02.jpg"
                  alt="image"
                  class="w-full"
                  />
               <div class="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                  <h3>
                     <a
                        href="javascript:void(0)"
                        class="
                        font-semibold
                        text-dark text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        mb-4
                        block
                        hover:text-primary
                        "
                        >
                     The ultimate UX and UI guide to card design
                     </a>
                  </h3>
                  <p class="text-base text-body-color leading-relaxed mb-7">
                     Lorem ipsum dolor sit amet pretium consectetur adipiscing
                     elit. Lorem consectetur adipiscing elit.
                  </p>
                  <a
                     href="javascript:void(0)"
                     class="
                     inline-block
                     py-2
                     px-7
                     border border-[#E5E7EB]
                     rounded-full
                     text-base text-body-color
                     font-medium
                     hover:border-primary hover:bg-primary hover:text-white
                     transition
                     "
                     >
                  View Details
                  </a>
               </div>
            </div>
         </div>
         <div class="w-full md:w-1/2 xl:w-1/3 px-4">
            <div class="bg-white rounded-lg overflow-hidden shadow-md mb-10"> <!-- Aquí se agregó la clase 'shadow-md' para la sombra -->
               <img
                  src="https://cdn.tailgrids.com/1.0/assets/images/cards/card-01/image-03.jpg"
                  alt="image"
                  class="w-full"
                  />
               <div class="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                  <h3>
                     <a
                        href="javascript:void(0)"
                        class="
                        font-semibold
                        text-dark text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        mb-4
                        block
                        hover:text-primary
                        "
                        >
                     Creative Card Component designs graphic elements
                     </a>
                  </h3>
                  <p class="text-base text-body-color leading-relaxed mb-7">
                     Lorem ipsum dolor sit amet pretium consectetur adipiscing
                     elit. Lorem consectetur adipiscing elit.
                  </p>
                  <a
                     href="javascript:void(0)"
                     class="
                     inline-block
                     py-2
                     px-7
                     border border-[#E5E7EB]
                     rounded-full
                     text-base text-body-color
                     font-medium
                     hover:border-primary hover:bg-primary hover:text-white
                     transition
                     "
                     >
                  View Product
                  </a>
               </div>
            </div>
         </div>
      </div>
   </div>
</section>

<div id="footer"></div>
<script>
   document.getElementById('closeFakeMessage').addEventListener('click', function() {
   this.parentNode.style.display = 'none';
   });
</script>
</body>


</html>
