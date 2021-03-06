let mix = require('laravel-mix');

mix.js('src/app.js', 'public/')
  .copy('src/index.html', 'public/')
  .copy('src/style.css', 'public/')
  .copy('src/print.css', 'public/')
  .copyDirectory('src/images', 'public/images')
  .copyDirectory('src/favicon', 'public/favicon');
