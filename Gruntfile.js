module.exports = function(grunt) {
  grunt.initConfig({
    clean: ['build'],
    babel: {
      options: {
        minified: true,
        comments: false,
        presets: ['es2015-node5', "stage-3"],
        plugins: ["babel-polyfill", "transform-promise-to-bluebird"]
      },
      dist: {
        files: [{
          expand: true,
          dest: 'build/',
          src: ['app/**/**.js', 'lib/**/**.js', 'config/**/**.js', 'test/**/**.js', 'server.js']
        }]
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          dest: 'build/',
          src: [
            'app/**/**.json',
            'lib/**/**.json',
            'config/**/**.json',
            'test/**/**.json',
            'test/fixtures/**/14**',
            'package.json'
          ]
        }]
      }
    },
    strip_code: {
      options: {
        blocks: [
          {start_block: "require('babel-register')", end_block: ";"}
        ]
      },
      your_target: {
        files: [
          {src: 'build/server.js', dest: 'build/server.js'},
          {src: 'build/test/index.js', dest: 'build/test/index.js'}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-strip-code');

  grunt.registerTask('default', ['clean', 'babel', 'copy', 'strip_code'])
}
