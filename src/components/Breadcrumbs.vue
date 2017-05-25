<template>
    <div class="box level" id="breadcrumbs">
        <div class="level-left">
            <span class="level-item" v-for="element in breadcrumbs">
                <a :href="element.url">{{ element.title }}</a>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
      computed: {
        breadcrumbs () {
          const elements = [
            {
              url: "https://github.com/TimonLukas/Vorlesungen",
              title: "TimonLukas/Vorlesungen@Github"
            }
          ];

          return elements;
        }
      }
    }
</script>

<style>
    #breadcrumbs span.level-item:not(:last-child)::after {
        content: ">";
        margin-left: .75rem;
    }
</style>