<template>
    <div class="box" id="fileshower">
        <spinner v-show="showSpinner"></spinner>
        <div v-show="!showSpinner" v-html="content" id="markdown"></div>
    </div>
</template>

<script>
  import axios from 'axios';
  import Spinner from './Spinner.vue';

  export default {
    components: {
      "spinner": Spinner
    },
    watch: {
      content () {
        const processMarkdown = () => {
          console.log("processMarkdown");
          const r = new Remarkable({
            html: true
          });

          const markdown = document.querySelector("#markdown");
          const content = markdown.innerHTML;
          markdown.innerHTML = r.render(content);

          const headings = document.querySelectorAll("#markdown h1, #markdown h2, #markdown h3, #markdown h4, #markdown h5, #markdown h6");
          const occurences = {};
          headings.forEach(heading => {
            const text = heading.textContent;
            let processed = text
              .toLowerCase()
              .replaceAll(" ", "-")
              .replaceAll(".", "")
              .replaceAll(",", "")
              .replaceAll("'", "")
              .replaceAll('"', "")
              .replaceAll("(", "")
              .replaceAll(")", "")
              .replaceAll("=", "-");

            if(typeof occurences[processed] !== "undefined") {
              processed += "-" + occurences[processed]++;
            } else {
              occurences[processed] = 1;
            }

            heading.id = processed;
          });

          this.isDocumentReady = true;
        };

        if(window.mathjaxHasLoaded !== true) {
          window.addEventListener("mathjax", () => {
            processMarkdown();
          });
        } else {
          processMarkdown();
        }
      }
    },
    data () {
      return {
        isDocumentReady: false
      };
    },
    computed: {
      showSpinner () {
        return this.content === null || !this.isDocumentReady;
      }
    },
    asyncComputed: {
      content () {
        const basePath = "https://raw.githubusercontent.com/TimonLukas/Vorlesungen/master/";
        const filePath = location.pathname.replace("/Vorlesungen/", "");
        const path = basePath + filePath;

        return new Promise((resolve, reject) => {
          axios.get(path).then(result => {
            if (result.status !== 200) {
              reject();
            }

            resolve(result.data);
          });
        });
      }
    }
  }
</script>

<style>
    #markdown {
        padding-left: 2em;
        padding-right: 2em;
        margin-top: 1em;
    }
</style>