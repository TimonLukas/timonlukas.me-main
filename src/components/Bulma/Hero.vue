<template>
    <section class="hero">
        <div class="hero-body">
            <div class="container">
                <slot name="title" class="title"></slot>
                <slot name="subtitle" class="subtitle"></slot>
            </div>
        </div>
    </section>
</template>

<script>
    export default {

    }
</script>

<style>
    .hero {
        background-color: inherit;
    }

    .hero .container {
        max-width: 100%;
    }
</style>