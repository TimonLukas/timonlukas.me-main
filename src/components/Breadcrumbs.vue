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
    const getUrlForElement = (parts, index, lastElementIsDirectory) => {
      const prefix = "/";
      const suffix = index === parts.length - 1 && !lastElementIsDirectory ? "" : "/";
      return prefix + parts.slice(0, index + 1).join("/") + suffix;
    };

    const getElementsFromPathString = (pathString) => {
        if(pathString === "") {
          return [];
        }

        const parts = pathString.split("/").slice(1); // Remove unneeded preceding empty array entry
        const lastPartIsDirectory = parts[parts.length - 1] === "";
        if(lastPartIsDirectory) {
          parts.splice(-1); // Remove unneeded empty trailing array entry
        }

        return parts.map((part, index) => {
          return {
            title: part,
            url: getUrlForElement(parts, index, lastPartIsDirectory)
          };
        });
    };

    export default {
      computed: {
        breadcrumbs () {
          const pathStringElements = getElementsFromPathString(decodeURIComponent(location.pathname));

          return [
            {
              url: "https://github.com/TimonLukas/Vorlesungen",
              title: "TimonLukas/Vorlesungen@Github"
            }
          ].concat(pathStringElements);
        }
      }
    }
</script>

<style>
    #breadcrumbs {
        background-color: rgb(242, 253, 251);
    }

    #breadcrumbs span.level-item:not(:last-child)::after {
        content: ">";
        margin-left: .75rem;
    }
</style>