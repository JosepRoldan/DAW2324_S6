<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CustomAIze</title>
  @viteReactRefresh
  @vite('resources/js/app.js')
  @vite('resources/css/app.css')
  <link rel="icon" type="image/png" href="../img/logocompleto.png">
</head>

<body class="font-roboto">
  @extends($layout)

@section('content')



  <div class="bg-white flex flex-col justify-center items-start min-h-screen">
    <div class="w-full py-4 mt-10 flex justify-center">
      <h1 class="text-3xl font-bold uppercase text-gray-900">@lang('products.products')</h1>
    </div>
    <div class="flex flex-col lg:flex-row px-4 py-7 sm:px-6 lg:px-8 mx-4 sm:mx-10 md:mx-20 lg:mx-0 self-stretch">
      <div class="lg:w-1/4 mr-8 mb-8 lg:mb-0 lg:mr-8">
        <form id="filterForm" action="{{ route('products.index') }}" method="GET">
          <div class="bg-gray-100 mt-10 p-7 rounded-md shadow-md ">
            <h2 class="mb-7 text-2xl font-extrabold text-center underline uppercase text-gray-900">
              @lang('products.filters')</h2>
            <h3 class="text-lg font-bold text-center text-gray-900">@lang('products.categories')</h3>
            <div class="flex flex-wrap gap-4 justify-center mt-2">
              <button id="all" type="button" onclick="selectCategory(event)" class="category-button transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                @lang('products.all')
              </button>

              <button id="wallDecoration" type="button" onclick="selectCategory(event)" class="category-button transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                @lang('products.wall_decoration')
              </button>

              <button id="homeLifestyle" type="button" onclick="selectCategory(event)" class="category-button transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                @lang('products.home_lifestyle')
              </button>

              <button id="photoGifts" type="button" onclick="selectCategory(event)" class="category-button transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                @lang('products.photo_gifts')
              </button>
            </div>

            <h2 class="mt-10 text-lg font-bold text-center text-gray-900">@lang('products.price')</h2>
            <!-- range -->
            <div class="mt-3 flex justify-center items-center">
              <div x-data="range(0, @json($maxPrice), 300)" x-init="initializeRange()" class="relative max-w-xl w-full">
                <div>
                  <!-- Min Price Range Input -->
                  <input type="range" step="1" min="0" max="300" id="minPriceRange" x-model="minprice" class="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-50" disabled>

                  <!-- Max Price Range Input -->
                  <input type="range" step="1" min="0" max="300" x-on:input="maxtrigger" id="maxPriceRange" x-model="maxprice" class="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer">

                  <div class="relative z-10 h-2">
                    <!-- Background bar -->
                    <div class="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-50"></div>
                    <!-- Active range bar -->
                    <div class="absolute z-20 top-0 bottom-0 rounded-md bg-indigo-300" x-bind:style="'right:'+ (100 - maxthumb) +'%; left:'+ minthumb +'%'"></div>
                    <!-- Min thumb -->
                    <div class="absolute z-30 w-6 h-6 top-0 left-0 bg-gray-400 rounded-full -mt-2 -ml-3" x-bind:style="'left: '+ minthumb +'%'"></div>
                    <!-- Max thumb -->
                    <div class="absolute z-30 w-6 h-6 top-0 right-0 bg-indigo-300 rounded-full -mt-2 -mr-3" x-bind:style="'right: '+ (100 - maxthumb) +'%'"></div>
                  </div>
                </div>

                <div class="flex justify-between items-center py-5">
                  <!-- Min price text input -->
                  <div>
                    <input type="text" maxlength="5" x-model="minprice" name="min_price" disabled class="px-3 py-2 border border-gray-300 rounded w-24 text-center bg-gray-100 text-gray-500 cursor-not-allowed">
                  </div>
                  <!-- Max price text input -->
                  <div>
                    <input type="text" maxlength="5" x-on:input="maxtrigger" x-model="maxprice" name="max_price" id="max_price" class="px-3 py-2 border border-gray-200 text-black rounded w-24 text-center">
                  </div>
                </div>
              </div>


            </div>
          </div>
        </form>
      </div>
      @if($products->isEmpty())
      <div class="bg-white pt-10 flex justify-center ml-32">
        <h2 class="text-2xl font-bold text-gray-900">@lang('products.no_products')</h2>
      </div>
      @else
      <div class="w-3/4">
        <div class="grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          @foreach($products as $product)
          <div class="relative m-7 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg hover:bg-gray-100">
            <a href="{{ route('products.show', ['product_id'=>$product->id]) }}" class="group relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
              <!-- Imagen principal (mostrar siempre) -->
              <img src="{{ $product->productImages->first()->thumb ?? '' }}" alt="Imagen principal del producto {{ $product->name }}" class="absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-300 ease-in-out {{ $product->productImages->count() > 1 ? 'group-hover:opacity-0' : '' }}" />
              <!-- Segunda imagen (mostrar al pasar el mouse, si existe) -->
              @if($product->productImages->count() > 1 && $product->productImages->skip(1)->first())
              <img src="{{ $product->productImages->skip(1)->first()->thumb ?? '' }}" alt="Imagen secundaria del producto {{ $product->name }}" class="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
              @endif
            </a>

            <div class="mt-4 px-5 pb-5">
              <a href="{{ route('products.show', ['product_id'=>$product->id]) }}" class="block hover:underline">
                <h5 class="text-xl font-semibold tracking-tight text-slate-900">{{ $product->name }}</h5>
              </a>
              <div class="mt-2 mb-5 flex items-center justify-between">
                <p class="text-lg text-gray-700">
                  @lang('products.from') <span class="ml-1 text-2xl font-bold text-slate-900">{{
                    $product->getCheapestProductDetail()->formatted_price }}</span>
                </p>
              </div>
              <a href="{{ route('products.show', ['product_id'=>$product->id]) }}" class="inline-flex items-center justify-center w-full rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                <span class="font-bold mr-2">@lang('products.show_variants') </span> ({{ $product->variant_count }})
              </a>
            </div>
          </div>
          @endforeach
        </div>
      </div>
      @endif
    </div>
  </div>


  @endsection




  <style>
    input[type=range]::-webkit-slider-thumb {
      pointer-events: all;
      width: 24px;
      height: 24px;
      -webkit-appearance: none;
      /* @apply w-6 h-6 appearance-none pointer-events-auto; */
    }
  </style>

  <script>
    function selectCategory(event) {
      const allButton = document.getElementById("all");
      const isAllButton = event.target.id === "all";

      if (!isAllButton) {
        // Cambia cualquier botón que no sea "All" a verde si es azul, y viceversa
        toggleButtonColor(event.target);
        // Verifica si algún botón está en verde, si no, "All" vuelve a verde
        checkAndAdjustAllButton();
      } else {
        // Si se presiona "All", resetea todos los botones a azul
        document.querySelectorAll(".category-button").forEach(button => {
          button.classList.remove("bg-green-500", "hover:bg-green-700");
          button.classList.add("bg-blue-500", "hover:bg-blue-700");
        });
        // Asegura que "All" se mantiene en verde
        allButton.classList.add("bg-green-500", "hover:bg-green-700");
        allButton.classList.remove("bg-blue-500", "hover:bg-blue-700");
      }
    }

    function toggleButtonColor(button) {
      // Cambia el color del botón a verde si es azul, y viceversa
      if (button.classList.contains("bg-blue-500")) {
        button.classList.replace("bg-blue-500", "bg-green-500");
        button.classList.replace("hover:bg-blue-700", "hover:bg-green-700");
      } else {
        button.classList.replace("bg-green-500", "bg-blue-500");
        button.classList.replace("hover:bg-green-700", "hover:bg-blue-700");
      }
      // document.getElementById('filterForm').submit();
    }

    function checkAndAdjustAllButton() {
      const allButton = document.getElementById("all");
      const otherButtons = document.querySelectorAll(".category-button:not(#all)");
      const anyButtonIsGreen = Array.from(otherButtons).some(button =>
        button.classList.contains("bg-green-500")
      );

      if (!anyButtonIsGreen) {
        allButton.classList.add("bg-green-500", "hover:bg-green-700");
        allButton.classList.remove("bg-blue-500", "hover:bg-blue-700");
      } else {
        allButton.classList.remove("bg-green-500", "hover:bg-green-700");
        allButton.classList.add("bg-blue-500", "hover:bg-blue-700");
      }
    }

    function range(initialMinPrice, initialMaxPrice, max) {
      return {
        min: 0,
        max: max,
        minprice: initialMinPrice,
        maxprice: initialMaxPrice,
        minthumb: (initialMinPrice / max) * 100,
        maxthumb: (initialMaxPrice / max) * 100,

        initializeRange() {
          this.mintrigger();
          this.maxtrigger();
        },

        mintrigger() {
          this.minprice = Math.min(this.minprice, this.maxprice - 1);
          this.minthumb = (this.minprice / this.max) * 100;
        },

        maxtrigger() {
          this.maxprice = Math.max(this.maxprice, this.minprice + 1);
          this.maxthumb = (this.maxprice / this.max) * 100;
        }
      }
    }



    document.getElementById('maxPriceRange').addEventListener('change', function() {
      document.getElementById('filterForm').submit();
    });

    document.getElementById('max_price').addEventListener('change', function() {
      document.getElementById('filterForm').submit();
    });
  </script>
  <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>



</body>

</html>