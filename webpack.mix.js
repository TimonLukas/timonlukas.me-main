let mix = require('laravel-mix');

mix.js('src/app.js', 'public/')
  .copy('src/index.html', 'public/')
  .copy('src/style.css', 'public/')
  .copyDirectory('src/favicon', 'public/favicon');
