'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

console.clear();

Vue.component('file-upload', {

  template: '\n<div class="file-upload">\n  <label class="file-upload__label">\n    <slot></slot>\n    <input ref="input" @change="loadFiles" accept=".svg" class="file-upload__input" type="file" />\n  </label>\n  <div class="file-upload__overlay"></div>\n</div>\n',

  data: function data() {
    return {
      dragging: false
    };
  },

  // mounted(){
  //   document.addEventListener("dragenter", function(){ fileDrag.className = 'dragenter'; });
  //   document.addEventListener('dragover',function(e){ e.preventDefault(); /* Essential! */ });
  //   document.addEventListener("drop", FileDragDrop);
  //   fileDrag.addEventListener("dragleave", FileDragReset);
  // },

  methods: {
    loadFiles: function loadFiles(e) {
      var _this = this;

      e = e || window.event;
      this.dragLeave(e);

      var files = Array.from(e.target.files || e.dataTransfer.files || this.$ref.input.files),
          len = files.length,
          i = 0,
          completed = [];

      files.forEach(function (file) {
        var reader = new FileReader();
        reader.onloadend = function (ev) {
          _this.$emit('load', reader.result, reader, file);
          //completed.push(reader.result);
          //if ( completed.length >= files.length ) { this.$emit('loaded',completed); }
        };
        reader.readAsText(file);
        //reader.readAsDataURL(file);
      });
    },
    dragOver: function dragOver(e) {
      e.preventDefault(); /* Essential */
    },
    dragEnter: function dragEnter() {
      this.dragging = true;
    },
    dragLeave: function dragLeave(e) {
      this.dragging = false;e.preventDefault();
    }
  }
});

new Vue({
  el: '.svg-bg',
  data: function data() {
    return {
      input: '<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'26\' height=\'26\' viewBox="0 0 8 8">\n  <circle cx="1" cy="1" r="1" opacity=\'0.25\' />\n  <circle cx="5" cy="5" r="1" opacity=\'0.25\' />\n</svg>'
    };
  },

  computed: {
    output: function output() {
      var url = this.encodeSVG(this.optimized);
      document.body.style.backgroundImage = url;
      var msg = 'background-image: ' + url + ';' + '<br >/* SVG encoded with https://github.com/davidsonbpe/ */';
      return msg;
    },
    optimized: function optimized() {
      return this.input.replace(/\<\?xml.+\?\>/g, '').replace(/(\<\!DOCTYPE(.*?)\>)/g, '').replace(/([\s\n]+)/g, ' ');
    }
  },

  methods: {
    loaded: function loaded(f) {
      console.log('file loaded!', typeof f === 'undefined' ? 'undefined' : _typeof(f), f);
      this.input = f;
    },
    copy: function copy() {
      var range = document.createRange();
      range.selectNode(this.$refs.output);
      window.getSelection().addRange(range);

      try {
        // Now that we've selected the anchor text, execute the copy command 
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copy email command was ' + msg);
      } catch (err) {
        console.log('Oops, unable to copy');
      }

      // Remove the selections - NOTE: Should use
      // removeRange(range) when it is supported 
      window.getSelection().removeAllRanges();
    },
    encodeSVG: function encodeSVG(svg) {
      svg = svg + '';
      var b64 = encodeURIComponent(svg.replace(/\<\?xml.+\?\>|\<\!DOCTYPE.+]\>/g, '')).replace(/%20/g, " ").replace(/%3D/g, "=")
      // Additional optimizations thanks to https://codepen.io/tigt/post/optimizing-svgs-in-data-uris
      .replace(/%3A/g, ':') // ditto colons
      .replace(/%2F/g, '/') // ditto slashes
      .replace(/%22/g, "'"); // replace quotes with apostrophes (may break certain SVGs)
      return 'url("data:image/svg+xml;charset=utf-8,' + b64 + '")';
    }
  }
});