module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            libs: {
                files: {
                    'build/js/lib/all.min.js': ['src/js/lib/jquery.min.js', 'src/js/lib/jquery.dataTables.min.js'],
                    'build/css/all.min.css': ['src/css/dataTables-jui.css', 'src/css/jquery-ui.custom.css']
                }
            }
        },
        copy: {
            html: {
                files: [
                    {
                        expand: true,
                        src: ['**'],
                        dest: 'build/html/',
                        cwd: 'src/html/'
                    }
                ]
            },
            toIO: {
                files: [
                    {
                        expand: true,
                        src: ['**'],
                        dest: '../tabulatedata.github.io/src/',
                        cwd: 'build/'
                    }
                ]
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
                    'build/js/tabulate-data.min.js': ['src/js/tabulate-data.js']
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
            tasks: ['jshint', 'concat:libs', 'uglify:mainjs', 'copy:html', 'copy:toIO']
        }
    });

    // load tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // run tasks
    grunt.registerTask('default', ['jshint', 'concat:libs', 'uglify:mainjs', 'copy:html', 'copy:toIO']);
};
