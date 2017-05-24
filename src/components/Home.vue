<template>
    <div class="box" id="home">
        <article class="media">
            <figure class="media-left">
                <p class="image is-128x128">
                    <img src="https://avatars2.githubusercontent.com/u/18093957">
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h2><strong>Herzlich Willkommen</strong> auf meiner Website!</h2>
                    <p>
                        Hier liegen meine Vorlesungsnotizen und ähnliches - kleine Projekte, die ich umsetzen will und gebrauchen kann :) vielleicht findet ihr es ja nützlich!
                    </p>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
  import Hero from './Bulma/Hero.vue';
  import Message from './Bulma/Message.vue';

  export default {
    components: {
      'b-hero': Hero,
      'b-message': Message
    }
  }
</script>

<style>
    @media screen and (max-width: 500px) {
        #home .media {
            display: block;
        }

        #home .media p.image {
            margin: auto;
        }

        #home .media .media-content {
            margin-top: 30px;
        }
    }
</style>