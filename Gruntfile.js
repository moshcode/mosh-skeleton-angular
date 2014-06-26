module.exports = function(grunt) {
  // Include all dependencies from package.json
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: {
      css: '<%= pkg.paths.global %><%= pkg.paths.css %>',
      img: '<%= pkg.paths.global %><%= pkg.paths.img %>',
      js: '<%= pkg.paths.global %><%= pkg.paths.js %>',
      sass: '<%= pkg.paths.global %><%= pkg.paths.sass %>',
      less: '<%= pkg.paths.global %><%= pkg.paths.less %>',
    },
    autoprefixer: {
      basic: {
        expand: true,
        cwd: '<%= dirs.css %>',
        src: '*.css',
        dest: '<%= dirs.css %>'
      }
    },
    compass: {
      options: {
        basePath: '<%= pkg.paths.global %>',
        cssDir: '<%= pkg.paths.css %>',
        imagesDir: '<%= pkg.paths.img %>',
        sassDir: '<%= pkg.paths.sass %>',
        relativeAssets: true
      },
      basic: {}
    },
    cssmin: {
      basic: {
        expand: true,
        cwd: '<%= dirs.css %>',
        src: ['*.css', '!*.min.css'],
        dest: '<%= dirs.css %>',
        ext: '.min.css'
      }
    },
    less: {
      basic: {
        expand: true,
        cwd: '<%= dirs.less %>',
        src: ['*.less', '!_*.less'],
        dest: '<%= dirs.css %>',
        ext: '.css'
      }
    },
    uglify: {
      basic: {
        files: {
          '<%= dirs.js %>default.min.js': ['<%= dirs.js %>_plugins.js', '<%= dirs.js %>default.js']
        }
      }
    },
    watch: {
      sass: {
        files: ['<%= dirs.sass %>*.scss'],
        tasks: ['compass:basic', 'newer:autoprefixer:basic', 'newer:cssmin:basic']
      },
      less: {
        files: ['<%= dirs.less %>*.less'],
        tasks: ['less:basic', 'newer:autoprefixer:basic', 'newer:cssmin:basic']
      },
      livereload: {
        files: [
          'application/**/*.phtml',
          '<%= dirs.css %>*.min.css',
          '<%= dirs.img %>**/*.{png,jpg,gif}',
          '<%= dirs.js %>**/*.min.js'
        ],
        options: {
          livereload: true
        }
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['less:basic', 'newer:autoprefixer:basic', 'newer:cssmin:basic', 'uglify:basic', 'watch']);
  grunt.registerTask('compile', ['less:basic', 'newer:autoprefixer:basic', 'newer:cssmin:basic', 'uglify:basic']);
};