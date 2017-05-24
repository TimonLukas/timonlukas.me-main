<template>
    <div class="box">
        <spinner v-show="showSpinner"></spinner>
    </div>
</template>

<script>
  import axios from 'axios';

  import Spinner from './Spinner.vue';

  export default {
    components: {
      'spinner': Spinner
    },
    computed: {
      showSpinner () {
        return typeof this.items === "undefined";
      }
    },
    asyncComputed: {
      items() {

      }
    }
  }
</script>

<style>

</style>