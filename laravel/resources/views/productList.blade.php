<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Products</title>
    @viteReactRefresh
    @vite('resources/js/app.js')
    @vite('resources/css/app.css')
    <link rel="icon" type="image/png" href="../img/logocompleto.png">
</head>

<body class="font-roboto">
    <div>
        <div id="header"></div>
        <div class="bg-white">
            <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div id="breadCrumbs"></div>
                <div id="searchInput"></div>
                <div class="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    <div id="filtre"></div>
                    <div class="grid col-span-3 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                        @foreach($products as $product)
                        <div key="{{ $product->idProduct }}" class="group relative">
                            <div class="relative h-[350px] sm:h-[450px]">
                                <img src="{{ $product->img_1 }}" alt="{{ $product->productName }}" class="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0" />

                                <img src="{{ $product->img_2 }}" alt="{{ $product->productName }}" class="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100" />
                            </div>
                            <div class="mt-4 flex justify-between">
                                <div>
                                    <h3 class="text-sm text-gray-700">
                                        <a href="{{ route('show', ['product' => $product->idProduct]) }}">
                                            <span aria-hidden="true" class="absolute inset-0"></span>
                                            {{ $product->productName }}
                                        </a>
                                    </h3>
                                    <!-- <p class="mt-1 text-sm text-gray-500">{{ $product->description }}</p> -->
                                </div>
                                @if ($product->variants->isNotEmpty())
                                <p class="text-sm font-medium text-gray-900">{{ $product->variants->first()->price }} €</p>
                                @endif
                            </div>
                        </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>

</html>
