module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        bitwise: true,
        camelcase: true,
        indent: 2,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        white: true,
        validthis: true,
        quotmark: 'single',
        globals: {
          'window': true,
          'jQuery': true,
          'document': true,
          'Image': true,
          'setTimeout': true,
          'clearTimeout': true,
          'event': true,
          'CanvasRenderingContext2D': true
        }
      },
      files: {
        src: ['./src/wScratchPad.js']
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      my_target: {
        files: {
          './wScratchPad.min.js': ['./src/wScratchPad.js']
       }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jshint', 'uglify']);
};