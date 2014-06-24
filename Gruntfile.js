module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'public/css/app.css'  : 'public/sass/app.scss'
                }
            }
        },
        watch: {
            sass: {
                files: ['public/sass/*.sass', 'public/sass/*.scss'],
                tasks: ['sass'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
};