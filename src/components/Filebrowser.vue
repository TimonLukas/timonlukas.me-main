<template>
    <div class="box" id="filebrowser">
        <spinner v-show="showSpinner"></spinner>
        <ul id="content" v-show="!showSpinner">
            <li v-for="item in items">
                <a :href="item.url">
                    <i class="fa" :class="item.icon"></i>
                    {{ item.name }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
  import axios from 'axios';

  import Spinner from './Spinner.vue';

  const getIconFromExtension = (extension) => {
    switch(extension) {
      case "pdf":
        return "file-pdf-o";
      case "md":
        return "file-text-o";
      default:
        if(extension === "") {
          return "folder-o";
        }

        return "file-o";
    }
  };

  export default {
    components: {
      'spinner': Spinner
    },
    computed: {
      showSpinner () {
        return this.items === null;
      }
    },
    asyncComputed: {
      items() {
        const basePath = "https://api.github.com/repos/TimonLukas/Vorlesungen/contents";
        const additionalPath = location.pathname.replace("/Vorlesungen/", "");
        const path = basePath + additionalPath;

        return new Promise((resolve, reject) => {
          axios.get(path).then((result) => {
            if(result.status !== 200) {
              reject();
            }

            const files = result.data.map(entry => {
              const extension = entry.type === "file" ? entry.name.substring(entry.name.indexOf(".") + 1) : "";

              return {
                name: entry.name,
                url: entry.type === "file" ? entry.name : entry.name + "/",
                icon: "fa-" + getIconFromExtension(extension)
              }
            });

            resolve(files);
          });
        });
      }
    }
  }
</script>

<style>
    #filebrowser ul {
        list-style-type: none;
        margin-top: 0;
    }

    #filebrowser ul li:not(:last-child) {
        border-bottom: 1px solid rgba(0, 209, 178, 0.15);
        padding-bottom: .3em;
    }

    #filebrowser ul li:not(:first-child) {
        padding-top: .3em;
    }

    #filebrowser ul li a {
        display: block;
    }

    #filebrowser ul li i {
        margin-right: .5em;
    }
</style>