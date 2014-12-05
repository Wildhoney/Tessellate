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
        },
        copy: {
            vendor: {
                expand: true,
                flatten: true,
                src: ['module/*'],
                dest: 'example/vendor/tessellate',
                filter: 'isFile'
            },
            release: {
                src: 'releases/<%= pkg.version %>.zip',
                dest: 'releases/master.zip'
            }

        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('build', ['uglify', 'cssmin', 'copy']);
    grunt.registerTask('default', ['test', 'build']);

};