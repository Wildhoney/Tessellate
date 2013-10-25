module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['module/Tessellate.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> by <%= pkg.author %> created on <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'module/Tessellate.js',
                dest: 'dist/<%= pkg.buildName %>.min.js'
            }
        },
        cssmin: {
            combine: {
                files: {
                    'dist/<%= pkg.buildName %>.css': ['module/Tessellate.css']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('build', ['uglify', 'cssmin']);
    grunt.registerTask('default', ['jshint', 'cssmin', 'uglify']);

};