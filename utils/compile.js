'use strict';
var config = require('config');
var path = require('path');
var fs = require('fs');
var nunjucks = require("nunjucks");
var env = new nunjucks.Environment(new nunjucks.FileSystemLoader(path.join(__dirname, "../views/")));
nunjucks.configure({
    autoescape: true
});
module.exports = function (grunt) {
    grunt.registerMultiTask(
        'compile',
        'compile.',
        function () {
            var done = this.async();
            var gruntFiles = this.files;
            var items = {};
            var clusterCount = 0;
            gruntFiles.forEach(function (o) {
                clusterCount++;
                var res = env.render(path.basename(o.src[0]), {
                    config: config
                }, function (err, res) {
                    fs.writeFile(o.dest, res, {
                            flag: 'w'
                        },
                        function (err) {
                            if (err) {
                                return done(err);
                            }
                            clusterCount--;
                        });
                });
            });
            var It = setInterval(function () {
                if (clusterCount === 0) {
                    clearInterval(It);
                    return done();
                }
            }, 2000);
        }
    );
};
