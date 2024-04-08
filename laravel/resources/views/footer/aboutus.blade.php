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
<!-- <div class="text-red-500" id="head"></div> -->

<body>
<div id="header"></div> 
<div class="py-16">  
  <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
      <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
        <div class="md:5/12 lg:w-5/12 flex justify-center items-center">
          <img src="/img/logo.webp" alt="image" loading="lazy" width="" height="">
        </div>
        <div class="md:7/12 lg:w-6/12">
          <h2 class="text-2xl text-white font-bold md:text-4xl">Welcome to CustomAIze where imagination meets innovation!</h2>
          <p class="mt-6 text-white"> At CustomAIze, we've harnessed the power of artificial intelligence to offer you a simple yet powerful platform. Unleash your imagination, create stunning images, and seamlessly integrate them into various products like mugs, shirts, and more.</p>
          <p class="mt-4 text-white"> Our goal is to redefine personal expression, making it easier than ever for you to bring your ideas to life. With CustomAIze, you have the tools to craft unique designs that reflect your individual style. Whether it's customizing your favorite mug or adding a personal touch to a shirt, our platform provides a canvas for your creativity.</p>
          <p class="mt-4 text-white"> Join us on this journey where AI and artistry converge. Explore the possibilities, personalize your world, and make every moment uniquely yours. Welcome to CustomAIze where your creativity knows no limits.</p>
        </div>
      </div>  
  </div>
</div>
<div id="footer"></div>
</body>


</html>
