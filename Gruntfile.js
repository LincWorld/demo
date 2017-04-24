"use strict";
var path = require('path');
module.exports = function (grunt) {
    require(path.join(__dirname, 'utils/compile.js'))(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON(path.join(__dirname, 'package.json')),
        compile: {
            main: {
                options: {
                    outputDir: path.join(__dirname, "/out/")
                },
                files: [{
                    expand: true,
                    cwd: path.join(__dirname, '/views/'),
                    src: ['*.html', '!layout.html'],
                    dest: path.join(__dirname, '/out/')
				}]
            }
        },
        watch: {
            main: {
                files: "*.html",
                tasks: [
                    'compile'
                ],
                options: {
                    cwd: path.join(__dirname, '/views/'),
                    spawn: false,
                    message: "Changes updated.",
                    debounceDelay: 500,
                }
            },
            css: {
                files: "*.scss",
                tasks: [
                    'sass'
                ],
                options: {
                    cwd: path.join(__dirname, '/assets/css/'),
                    spawn: false,
                    message: "Changes updated.",
                    debounceDelay: 500,
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'out/assets/css/style.css': 'assets/css/style.scss',
                    'out/assets/css/normalize.css': 'assets/css/normalize.scss'
                }
            }

        },
        clean: {
            views: [
			"./out/*.html",
			]
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-sass');
    grunt.registerTask('default', [
        'compile',
        'sass'
    ]);
    grunt.registerTask('full', [
        'compile',
        'sass'
    ]);
};
