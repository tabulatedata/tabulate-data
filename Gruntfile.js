module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            libs: {
                files: {
                    'src/js/lib/all.min.js': ['src/js/lib/jquery.min.js', 'src/js/lib/jquery.dataTables.min.js'],
                    'src/css/all.min.css': ['src/css/dataTables-jui.css', 'src/css/jquery-ui.custom.css']
                }
            }
        },
        copy: {
            all: {
                files: {
                    '../tabulatedata.github.io/src/': ['src/**/*']
                }
            }
        },
        jshint: {
            files: [
                'Gruntfile.js',
                'src/js/tabulate-data.js'
            ]
        },
        uglify: {
            mainjs: {
                files: {
                    'src/js/tabulate-data.min.js': ['src/js/tabulate-data.js']
                }
            }
        },
        watch: {
            files: [
                'src/html/*.html',
                'src/js/*.js',
                'src/js/lib/*.js',
                'src/css/*.css'
            ],
            tasks: ['jshint', 'concat:libs', 'uglify:mainjs', 'copy:all']
        }
    });

    // load tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // run tasks
    grunt.registerTask('default', ['jshint', 'concat:libs', 'uglify:mainjs', 'copy:all']);
};
