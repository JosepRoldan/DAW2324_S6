<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CustomAIze</title>
    @viteReactRefresh
    @vite('resources/js/app.js')
    @vite('resources/css/app.css')
</head>
<div id="header"></div>
<body>
    <div class="bg-white">
        <div id="header"></div>

        <div class="pt-6">
            <div class="ml-7">
                <div id="breadCrumbs"></div>
            </div>
            <!-- Image gallery -->
            <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-6 lg:gap-x-8 lg:px-8">

                <div class="lg:grid lg:gap-y-8 col-span-1">
                    <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                        <img src="{{ $product->img_1 }}" alt="{{ $product->productName }}"
                            class="h-full w-full object-cover object-center" />
                    </div>
                    <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                        <img src="{{ $product->img_2 }}" alt="{{ $product->productName }}"
                            class="h-full w-full object-cover object-center" />
                    </div>
                    <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                        <img src="{{ $product->img_3 }}" alt="{{ $product->productName }}"
                            class="h-full w-full object-cover object-center" />
                    </div>
                </div>
                <div class="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:col-span-3 sm:overflow-hidden sm:rounded-lg">
                    <img src="{{ $product->img_1 }}" alt="{{ $product->productName }}"
                        class="h-full w-full object-cover object-center" />
                </div>

                <!-- Product info -->
                <div class="lg:col-span-2 lg:border lg:border-gray-200 rounded-lg lg:p-8">
                    <h1 class="text-2xl mb-3 font-bold tracking-tight text-gray-900 sm:text-3xl">{{
                        $product->productName }}</h1>
                    <p>{{ $product->description }}</p>

                    <!-- Options -->
                    <div class="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 class="sr-only">Product information</h2>
                        <p class="text-3xl tracking-tight text-gray-900">{{ $product['price'] }}</p>
                        <!-- Colors -->

                        <!-- Sizes -->
                        <div class="mt-10">
                            <div class="flex items-center justify-between">
                                <h3 class="text-sm font-medium text-gray-900">Variants</h3>
                            </div>

                            <div class="mt-4 sm:col-span-8 lg:col-span-4">
                                <select id="variantSelect" name="variantSelect"
                                    class="block w-full py-2 pl-3 pr-10 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                    @foreach($variants as $variant)
                                    <option value="{{ $variant->variantName }}" data-price="{{ $variant->price }}">{{
                                        $variant->variantName }}</option>
                                    @endforeach
                                </select>
                                <h1 id="priceDisplay"
                                    class="text-2xl mb-3 mt-5 font-bold tracking-tight text-gray-900 sm:text-3xl">Price
                                    {{ $variants->first()->price }} €</h1>
                            </div>

                        </div>
                        <button onclick="agregarProducto({id: '{{ $product->idProduct }}', name: '{{ $product->productName }}', image: '{{ $product->img_1 }}', price: '{{ $variants->first()->price }}', quantity: 1, variant: '{{ $variant->variantName }}'})" class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-700 px-8 py-3 text-base font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Add to bag
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div id="footer"></div>
    </div>

</body>
<script>
    document.getElementById('variantSelect').addEventListener('change', function () {
        var selectedVariant = this.options[this.selectedIndex];
        var price = selectedVariant.getAttribute('data-price');
        document.getElementById('priceDisplay').textContent = price + ' €';

    });

    const products = JSON.parse(localStorage.getItem('products')) || [];

    function agregarProducto(producto) {

        // Obtener la lista de productos del Local Storage
        const products = JSON.parse(localStorage.getItem('products')) || [];

        // Verificar si la variante del producto ya existe en la lista
        const existingProduct = products.find((p) => p.variant === producto.variant);

        // Si la variente ya existe, no hacer nada
        if (existingProduct) {
            return;
        }

        // Agregar el producto seleccionado a la lista
        products.push(producto);
        
        // Guardar la lista actualizada en el Local Storage
        localStorage.setItem('products', JSON.stringify(products));

    }
</script>

</html>