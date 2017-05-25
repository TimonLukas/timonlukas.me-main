<template>
    <div id="notes">
        <breadcrumbs></breadcrumbs>
        <filebrowser v-if="isDirectory"></filebrowser>
        <fileshower v-if="!isDirectory"></fileshower>
    </div>
</template>

<script>
  import Breadcrumbs from './Breadcrumbs.vue';
  import Filebrowser from './Filebrowser.vue';
  import Fileshower from './Fileshower.vue';

  export default {
    components: {
      'breadcrumbs': Breadcrumbs,
      'filebrowser': Filebrowser,
      'fileshower': Fileshower
    },
    computed: {
      isDirectory () {
        const path = location.pathname;
        return path.substring(path.length - 1) === "/";
      }
    }
  }
</script>

<style>

</style>