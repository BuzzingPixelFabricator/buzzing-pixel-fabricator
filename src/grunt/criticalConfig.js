/* globals module */

module.exports = function(grunt) {
    var request = require('request');
    var deasync = require('deasync');
    var assets = grunt.fabConfig.assets;
    var destination = grunt.fabConfig.critical.destination;
    var protocol = grunt.option('https') === true ? 'https://' : 'http://';
    var baseUrl = protocol + grunt.option('baseUrl') + '/';
    var jsonUri = grunt.option('jsonUri');
    var criticalConfig = {};
    var requestUrl = deasync(function(url, cb) {
        var userAgent = {
            'User-Agent':
                'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36'
        };
        request({
            url: url,
            json: true,
            header: userAgent
        }, function(err, resp, body) {
            cb(null, body);
        });
    });
    var sep = '/';
    var optionUri = grunt.option('uri');
    var json;

    if (optionUri) {
        // Check if option URI is true boolean
        if (optionUri === true) {
            optionUri = '';
        }

        criticalConfig[1] = {
            options: {
                css: [
                    assets + '/css/style.min.css'
                ],
                width: 1920,
                height: 1500,
                minify: true
            },
            src: baseUrl + optionUri,
            dest: destination + sep + optionUri + '/style.min.css'
        };
    } else if (grunt.option('baseUrl') && jsonUri) {
        json = requestUrl(baseUrl + jsonUri);

        for (var i = 0; i < json.length; i++) {
            if (json[i]) {
                sep = '/';
            } else {
                sep = '';
            }

            criticalConfig[i + 1] = {
                options: {
                    css: [
                        assets + '/css/style.min.css'
                    ],
                    width: 1920,
                    height: 1500,
                    minify: true
                },
                src: baseUrl + json[i],
                dest: destination + sep + json[i] + '/style.min.css'
            };
        }
    }

    // Set grunt config for critical
    grunt.fabInitConfig.critical = criticalConfig;
};
