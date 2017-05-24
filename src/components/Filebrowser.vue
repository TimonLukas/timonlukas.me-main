<template>
    <div>
        <div class="box" v-show="showBreadcrumbs">
            <breadcrumbs></breadcrumbs>
        </div>
        <div class="box">
            <spinner></spinner>
        </div>
    </div>
</template>

<script>
  import Breadcrumbs from './Breadcrumbs.vue';
  import Spinner from './Spinner.vue';

  export default {
    components: {
      'breadcrumbs': Breadcrumbs,
      'spinner': Spinner
    },
    computed: {
      showBreadcrumbs () {
        return location.pathname !== '/vorlesungen';
      }
    }
  }
</script>

<style>

</style>