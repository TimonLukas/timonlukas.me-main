<template>
    <div id="notes">
        <breadcrumbs></breadcrumbs>
        <filebrowser></filebrowser>
    </div>
</template>

<script>
  import Breadcrumbs from './Breadcrumbs.vue';
  import Filebrowser from './Filebrowser.vue';

  export default {
    components: {
      'breadcrumbs': Breadcrumbs,
      'filebrowser': Filebrowser
    }
  }
</script>

<style>

</style>