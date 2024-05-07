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

    <style>
        .zoom-container {
            overflow: hidden;
            position: relative;
            cursor: zoom-in;
            /* Opcional: Cambia el cursor para indicar que el elemento es zoomable */
            width: 500px;
            /* Define un ancho fijo */
            height: 333px;
            /* Define un alto fijo */
        }

        .zoom-container img {
            position: absolute;
            transition: transform 0.25s ease;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .highlighted {
            border: 4px solid #ffa500;
            /* Cambia el color según prefieras */
            box-shadow: 0 0 8px #ffa500;
            /* Opcional: agrega una sombra para mayor énfasis */
        }
    </style>
</head>
<!-- <div class="text-red-500" id="head"></div> -->

<div id="header"></div>

<body>
    <div class="bg-white">
        <div id="header"></div>
        <div class="mx-auto px-4 py-10 sm:px-6 lg:px-8 xl:max-w-7xl">

            <div class="pt-6">
                <div class="ml-7">
                    <nav class="flex" aria-label="Breadcrumb">
                        <ol role="list" class="flex items-center space-x-4">

                            <li>
                                <div class="flex items-center">

                                    <a href="{{ route('products.index') }}"
                                        class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">@lang('products.products')</a>
                                </div>
                            </li>
                            <li>
                                <div class="flex items-center">
                                    <svg class="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20"
                                        fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <p class="ml-4 text-sm font-medium text-gray-700">{{
                                        $product->name }}</>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>
                <!-- Image gallery -->
                <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-6 lg:gap-x-8 lg:px-8">

                    <div class="lg:grid lg:gap-y-8 col-span-1">
                        @foreach($productImages as $image)
                        <div
                            class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg cursor-pointer small-image-container {{ $loop->first ? 'highlighted' : '' }}">
                            <img src="{{ $image->original }}" alt="{{ $product->productName }}"
                                class="h-full w-full object-cover object-center small-image" />
                        </div>
                        @endforeach
                    </div>
                    <div
                        class="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:col-span-3 sm:overflow-hidden sm:rounded-lg zoom-container">
                        <img src="{{ $productImages->first()->original }}" alt="{{ $product->productName }}"
                            class="h-full w-full object-cover object-center" id="mainImage" />
                    </div>



                    <!-- Product info -->
                    <div class="lg:col-span-2 lg:border lg:border-gray-200 rounded-lg lg:p-8">
                        <h1 class="text-2xl mb-3 font-bold tracking-tight text-gray-900 sm:text-3xl">{{ $product->name
                            }}</h1>
                        <p class="mt-6 text-gray-900">
                            @if( App::getLocale() == 'es' )
                            {{ $product->ESP_description }}
                            @elseif( App::getLocale() == 'cat' )
                            {{ $product->CAT_description }}
                            @else
                            {{ $product->ENG_description }}
                            @endif
                        </p>

                        <!-- Product Information Section -->
                        <div class="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 class="text-3xl tracking-tight text-gray-900">{{ $product['price'] }}</h2>

                            <!-- Variants Selector -->
                            <div class="mt-10">

                                <div class="mt-4">
                                    <label for="variantSelect" class="block text-sm font-medium text-gray-700">@lang('products.choose_variant')</label>
                                    <select id="variantSelect" name="variantSelect"
                                        class="mt-1 block w-full py-2 pl-3 pr-10 text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                        @foreach($productVariants as $variant)
                                        <option class="text-gray-900" value="{{ $variant->variantName }}"
                                            data-variant-id="{{ $variant->id }}"
                                            data-price="{{ $variant->price }}">
                                            {{ $variant->name }} - {{ $variant->formatted_price }}
                                        </option>
                                        @endforeach
                                    </select>
                                    <div id="priceDisplay"
                                        class="text-2xl mb-3 mt-5 font-bold tracking-tight text-gray-900 sm:text-3xl">
                                        {{ $productVariants->first()->formatted_price }}
                                    </div>
                                </div>
                            </div>

                            <!-- Add to Bag Button -->
                            <button
                                onclick="agregarProducto({id: '{{ $product->id }}', name: '{{ $product->name }}', image: '{{ $productImages[0]->original }}', price: '{{ $productVariants->first()->price }}', quantity: 1})"
                                class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-700 px-8 py-3 text-base font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                @lang('products.add_to_cart')
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="footer"></div>
    </div>

</body>
<script>
    document.addEventListener('DOMContentLoaded', function () {
        const container = document.querySelector('.zoom-container');
        const img = container.querySelector('img');

        container.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = container.getBoundingClientRect();
            const x = ((e.pageX - left) / width) * 100;
            const y = ((e.pageY - top) / height) * 100;

            img.style.transformOrigin = `${x}% ${y}%`;
            img.style.transform = 'scale(2)';
        });

        container.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
            img.style.transformOrigin = 'center center';
        });

        const images = document.querySelectorAll('.small-image-container');


        images.forEach(image => {
            image.addEventListener('click', function () {
                // Remover la clase highlighted de todas las imágenes pequeñas
                images.forEach(img => img.classList.remove('highlighted'));

                // Actualizar la imagen principal
                const smallImg = this.querySelector('.small-image'); // Seleccionar la imagen dentro del contenedor
                mainImage.src = smallImg.src; // Usar el src de la imagen encontrada

                // Agregar la clase highlighted a la imagen clicada
                this.classList.add('highlighted');
            });
        });

        document.getElementById('variantSelect').addEventListener('change', function () {
            var selectedVariant = this.options[this.selectedIndex];
            var price = selectedVariant.getAttribute('data-price');
            document.getElementById('priceDisplay').textContent = price + ' €';

        });

        
    });

    const products = JSON.parse(localStorage.getItem('products')) || [];

    function agregarProducto(producto) {
    // Obtener la lista de productos del Local Storage
    let productos = JSON.parse(localStorage.getItem('products')) || [];

    // Get variant price
    var variantSelect = document.getElementById('variantSelect');
    var selectedVariant = variantSelect.options[variantSelect.selectedIndex];
    producto.price = selectedVariant.getAttribute('data-price');
    producto.idVariant = selectedVariant.getAttribute('data-variant-id');
    
    const cartButton = document.getElementById('cartButton');
    
    // Verificar si el producto ya existe en la lista
    const productoExistente = productos.find(item => item.id === producto.id && item.idVariant === producto.idVariant);

    if (productoExistente) {
        // Si el producto ya existe, mostrar un mensaje o realizar alguna acción
        console.log('El producto ya está en la lista.');
        return; // No agregamos el producto nuevamente
    }

    // Agregar el producto seleccionado a la lista
    productos.push(producto);

    // Guardar la lista actualizada en el Local Storage
    localStorage.setItem('products', JSON.stringify(productos));
    cartButton.click();
}

</script>

</html>