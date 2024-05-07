<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
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
<body>

<!-- First Section -->
<div id="header" class="z-40"></div>
<div class="fake-message">
<p>@lang('home.fake')</p>
  <button id="closeFakeMessage">x</button>
</div>
<div class="w-screen h-screen overflow-hidden relative">
  <img src="/img/inicio.gif" class="absolute inset-0 w-full h-full object-cover object-center z-0" alt="Animated GIF">
  <div class="grid ml-24 grid-cols-12 h-full items-center relative z-10">
    <div class="col-span-12 md:col-span-12 px-0 md:px-6 text-white">  
      <h1 class="font-extrabold text-[#6F96A6] text-3xl md:text-4xl lg:text-5xl mb-2 md:mb-1 lg:mb-2 tracking-wider text-left leading-tight md:leading-normal lg:leading-tight">@lang('home.Unleash Your Creativity')</h1>
      <h1 class="font-extrabold text-[#6F96A6] text-3xl md:text-4xl lg:text-5xl mb-2 md:mb-1 lg:mb-2 tracking-wider text-left leading-tight md:leading-normal lg:leading-tight">@lang('home.with AI-Powered')</h1>
      <h1 class="font-extrabold text-[#6F96A6] text-3xl md:text-4xl lg:text-5xl mb-2 md:mb-1 lg:mb-2 tracking-wider text-left leading-tight md:leading-normal lg:leading-tight">@lang('home.Designs')</h1>
      <a href="/daisy" class="mt-2 md:mt-4 uppercase py-4 px-8 md:px-10 border border-white hover:bg-white hover:bg-opacity-10 inline-block rounded text-gray-400 font-semibold">@lang('home.Start Creating')</a>
    </div>
  </div>
</div>


<!-- Carousel Section -->
<h2 class="text-center text-2xl md:text-5xl font-semibold text-gray-800 pt-8 md:pt-16">@lang('home.Comunity Creations')</h2>
<main class="grid min-h-screen w-full place-content-center bg-white grid-cols-1 md:grid-cols-2">
    <!-- Texto a la derecha -->
    <div class="text-center text-xl md:pr-8 md:pl-16 mt-20">
    <p id="carouselQuote" class="text-black"></p>
</div>


    <!-- Carousel a la izquierda -->
    <div class="relative mx-auto max-w-2xl overflow-hidden rounded-md bg-gray-100 p-2 sm:p-4 md:pl-8">
        <div class="absolute right-5 top-5 z-10 rounded-full bg-gray-600 px-2 text-center text-sm text-white">
            <span id="currentIndex"></span>/<span id="totalImages"></span>
        </div>

        <button onclick="previous()" class="absolute left-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 shadow-md">
            <i class="fas fa-chevron-left text-2xl font-bold text-gray-500"></i>
        </button>

        <button onclick="forward()" class="absolute right-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 shadow-md">
            <i class="fas fa-chevron-right text-2xl font-bold text-gray-500"></i>
        </button>

        <div class="relative h-80 flex justify-center items-center" style="width: 30rem">
            <img id="carouselImage" class="rounded-sm max-h-full max-w-full" :src="images[currentIndex].url" :alt="images[currentIndex].alt" />
        </div>
    </div>
</main>

<!-- Third Section -->
<div class="mx-auto my-0 md:my-8 h-[300px] w-[1400px] flex flex-col justify-center rounded-lg bg-[#141415] text-white shadow-xl" style="border: 2px solid #4A5568;">
  <h2 class="text-white font-black text-3xl md:text-5xl leading-snug mb-6 text-center">@lang('home.whyChooseCustomAIze')</h2>
  <p class="text-white text-lg md:text-base ml-8">
    <span class="font-bold">@lang('home.Innovative Technology')</span>@lang('home.ai')
    <br><br>
    <span class="font-bold">@lang('home.Endless Possibilities')</span>@lang('home.patterns')
  <div class="mt-4 ml-4 px-4"> <!-- Reducido el margen vertical -->
    <a href="/products" class="text-white uppercase py-2 md:py-3 px-6 md:px-8 border border-white hover:bg-white hover:bg-opacity-10 inline-block rounded text-sm md:text-base">@lang('home.products')</a>
  </div>
  <div class="relative flex justify-center space-x-3"></div>
</div>




<!-- Forth Section -->
<h2 class="text-center text-2xl md:text-5xl font-semibold text-gray-800 pt-8 md:pt-16">@lang('home.toppicks')</h2>
<link rel="stylesheet" href="https://cdn.tailgrids.com/tailgrids-fallback.css" />

<!-- ====== Cards Section Start -->
<div class="mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    @foreach($topPriorityProducts as $product)
        <div class="w-full px-4">
            <div class="bg-white rounded-lg overflow-hidden shadow-md mb-10">
                <!-- Imagen del producto -->
                <img src="{{ $product->productImages->first()->original ?? 'https://cdn.tailgrids.com/1.0/assets/images/cards/card-01/image-02.jpg' }}" alt="image" class="w-full">
                <div class="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                    <!-- Título del producto -->
                    <h3>
                        <a href="{{ route('products.show', $product->id) }}" class="font-semibold text-dark text-xl sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] mb-4 block hover:text-primary">
                            {{ $product->name }}
                        </a>
                    </h3>
                    <!-- Descripción del producto -->
                    <p class="text-base text-body-color leading-relaxed mb-7">
                    @if( App::getLocale() == 'es' )
                            {{ $product->ESP_description }}
                            @elseif( App::getLocale() == 'cat' )
                            {{ $product->CAT_description }}
                            @else
                            {{ $product->ENG_description }}
                            @endif
                    </p>
                    <!-- Enlace para ver detalles -->
                    <a href="{{ route('products.show', $product->id) }}" class="inline-block py-2 px-7 border border-[#E5E7EB] rounded-full text-base text-body-color font-medium hover:border-primary hover:bg-primary hover:text-white transition">
                        @lang('home.View Product')
                    </a>
                </div>
            </div>
        </div>
    @endforeach
</div>


<div id="footer"></div>
<script>
   document.getElementById('closeFakeMessage').addEventListener('click', function() {
   this.parentNode.style.display = 'none';
   });
</script>

<script>
    let currentIndex = 0;
    const images = [
        { url: "/img/FotosInicio/FinishedProduct1.png", alt: "Image 1" },
        { url: "/img/FotosInicio/FinishedProduct2.png", alt: "Image 2" },
        { url: "/img/FotosInicio/FinishedProduct3.png", alt: "Image 3" },
    ];
    const texts = [
        { quote: "❝A monkey wearing vibrant sunglasses and colorful headphones dances energetically amidst a jungle rave. The bright hues of its fur blend with the neon lights that illuminate the festive atmosphere.❞" },
        { quote: "❝On a tropical beach, an unsuspecting girl basks in the sun, oblivious to the dangers lurking around her. Meanwhile, tigers stealthily emerge from the nearby jungle, poised to strike. Adding to the surreal scene is an elephant with unusually long legs, striding purposefully toward the action, creating an atmosphere of suspense and wonder.❞" },
        { quote: "❝In the vast and silent expanse of outer space, a giant bear calmly strolls across the dusty surface of the moon. Its large footprints leave a distinctive mark on the lunar landscape, while stars and planets shimmer in the dark backdrop of the cosmos. The bear appears to be curiously exploring its new surroundings, unaware of the lack of gravity that surrounds it.❞" },
    ];

    function showImage(index) {
        document.getElementById("carouselImage").src = images[index].url;
        document.getElementById("carouselImage").alt = images[index].alt;
        document.getElementById("carouselQuote").innerText = texts[index].quote;
        currentIndex = index;
    }

    function previous() {
        if (currentIndex > 0) {
            showImage(currentIndex - 1);
        }
    }

    function forward() {
        if (currentIndex < images.length - 1) {
            showImage(currentIndex + 1);
        }
    }

    // Mostrar la primera imagen y texto al cargar la página
    showImage(currentIndex);
</script>

</body>


</html>
