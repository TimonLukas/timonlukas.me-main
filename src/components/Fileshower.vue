<template>
    <div class="box" id="fileshower">
        <spinner v-show="showSpinner"></spinner>
        <div v-show="!showSpinner" v-html="content" id="markdown"></div>
    </div>
</template>

<script>
  import axios from 'axios';
  import Spinner from './Spinner.vue';

  const replaceCommentsWithToc = (content) => {
    if (content.indexOf("<!--") !== -1) {
      const startTagStart = content.indexOf("<!--");
      const startTagEnd = content.indexOf("-->") + "-->".length;

      const contentWithStartTagReplaced = `${content.substring(0, startTagStart)}<div class="toc">${content.substring(startTagEnd)}`;

      const endTagStart = contentWithStartTagReplaced.indexOf("<!-- tocstop -->");
      const endTagEnd = endTagStart + "<!-- tocstop -->".length;
      return `${contentWithStartTagReplaced.substring(0, endTagStart)}</div>${contentWithStartTagReplaced.substring(endTagEnd)}`;
    }

    return content;
  };

  const slugify = (text) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/--+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  };

  export default {
    components: {
      "spinner": Spinner
    },
    watch: {
      content () {
        (() => {
          const parts = location.pathname.split("/");
          const lastPart = parts[parts.length - 1];
          const realFileName = decodeURIComponent(lastPart);

          document.title = `${realFileName} - TimonLukas.me`;
        })();

        const processMarkdown = () => {
          const r = new Remarkable({
            html: true
          });

          const markdown = document.querySelector("#markdown");

          const contentWithToc = replaceCommentsWithToc(markdown.innerHTML);
          markdown.innerHTML = r.render(contentWithToc);

          document.querySelectorAll("#markdown table").forEach(node => node.classList.add("table"));

          const headings = document.querySelectorAll("#markdown h1, #markdown h2, #markdown h3, #markdown h4, #markdown h5, #markdown h6");
          const occurences = {};
          headings.forEach(heading => {
            const text = heading.textContent;
            let processed = slugify(text);

            if (typeof occurences[processed] !== "undefined") {
              processed += "-" + occurences[processed]++;
            } else {
              occurences[processed] = 1;
            }

            heading.id = processed;
          });

          this.isDocumentReady = true;
        };

        window.addEventListener("mathjax", () => {
          processMarkdown();
        });

        MathJax.Hub.Configured();
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
        const cacheBuster = "?" + Date.now().valueOf();
        const path = basePath + filePath + cacheBuster;

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
    #fileshower {
        padding-bottom: 3em;
    }

    #markdown {
        padding-left: 2em;
        padding-right: 2em;
        margin-top: 1em;
    }

    #markdown table {
        display: block;
    }

    #markdown th, #markdown td {
        border: 1px solid #dbdbdb;
    }

    #markdown h1 {
        font-weight: 600;
        border-bottom: 1px solid #dbdbdb;
        padding-bottom: .3em;
        font-size: 2.25em;
    }

    #markdown h2 {
        font-weight: 600;
        border-bottom: 1px solid #dbdbdb;
        padding-bottom: .3em;
        font-size: 1.75em;
    }

    #markdown h3 {
        font-weight: 600;
        font-size: 1.5em;
    }

    #markdown h4 {
        font-weight: 600;
        font-size: 1.25em;
    }

    #markdown h5 {
        font-weight: 600;
        font-size: 1em;
    }
</style>