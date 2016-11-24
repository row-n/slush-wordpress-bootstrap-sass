/*
 * slush-wordpress-bootstrap-sass
 * https://github.com/row-n/slush-wordpress-bootstrap-sass
 *
 * Copyright (c) 2016, Rowan Parkinson
 * Licensed under the MIT license.
 */

'use strict';

var gulp        = require('gulp'),
    install     = require('gulp-install'),
    conflict    = require('gulp-conflict'),
    template    = require('gulp-template'),
    rename      = require('gulp-rename'),
    gutil       = require('gulp-util'),
    _           = require('underscore.string'),
    inquirer    = require('inquirer'),
    path        = require('path'),
    version     = 'v0.2.1';

function format(string) {
    var username = string.toLowerCase();
    return username.replace(/\s/g, '');
}

var defaults = (function () {
    var workingDirName = path.basename(process.cwd()),
      homeDir, osUserName, configFile, user;

    if (process.platform === 'win32') {
        homeDir = process.env.USERPROFILE;
        osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
    }
    else {
        homeDir = process.env.HOME || process.env.HOMEPATH;
        osUserName = homeDir && homeDir.split('/').pop() || 'root';
    }

    configFile = path.join(homeDir, '.gitconfig');
    user = {};

    if (require('fs').existsSync(configFile)) {
        user = require('iniparser').parseSync(configFile).user;
    }

    return {
        appName: workingDirName,
        userName: osUserName || format(user.name || ''),
        authorName: user.name || '',
        authorEmail: user.email || ''
    };
})();

gulp.task('default', function (done) {
    var prompts = [{
        name: 'appName',
        message: gutil.colors.red('What is the name of your project?'),
        default: defaults.appName
    }, {
        name: 'appDescription',
        message: gutil.colors.red('What is the description?'),
        default: 'An awesome Wordpress Bootstrap theme'
    }, {
        name: 'appVersion',
        message: gutil.colors.red('What is the version of your project?'),
        default: '0.1.0'
    }, {
        type: 'list',
        name: 'appProxy',
        message: gutil.colors.red('What is the proxy you want to use?'),
        choices: ['localhost/mySite', 'mySite.local'],
        default: 'localhost/mySite'
    }, {
        name: 'authorName',
        message: gutil.colors.red('What is the author name?'),
        default: defaults.authorName
    }, {
        name: 'authorEmail',
        message: gutil.colors.red('What is the author email?'),
        default: defaults.authorEmail
    }, {
        name: 'userName',
        message: gutil.colors.red('What is the github username?'),
        default: defaults.userName
    }, {
        type: 'confirm',
        name: 'moveon',
        message: gutil.colors.red('Continue?')
    }];

    gutil.log(
        '\n\n       . _____________________________________ .      \n'+
        '       |                    '+gutil.colors.yellow('____,')+'              |     \n'+
        '       |                    '+gutil.colors.yellow('\'._.\'\\')+'             |     \n'+
        '       |                 '+gutil.colors.magenta('_____')+gutil.colors.yellow('/\'-.\\')+'            |     \n'+
        '       |                '+gutil.colors.magenta('|    ')+gutil.colors.yellow('/')+gutil.colors.magenta(' |')+'               |     \n'+
        '       |                '+gutil.colors.magenta('|')+gutil.colors.blue('~~~')+gutil.colors.yellow('/')+gutil.colors.blue('~~')+gutil.colors.magenta('|')+'               |     \n'+
        '       |                '+gutil.colors.magenta('\\ ')+gutil.colors.green('()')+gutil.colors.magenta('   /')+'               |     \n'+
        '       |                 '+gutil.colors.magenta('\'.__.\'')+'                |     \n'+
        '       |                   '+gutil.colors.magenta('||')+'                  |     \n'+
        '       |                  '+gutil.colors.magenta('_||_')+'                 |     \n'+
        '       |                 '+gutil.colors.magenta('`----`')+'                |     \n'+
        '       |                                       |   \n'+
        '       |      ' + gutil.colors.yellow('Welcome to WP BootstrapSass')+'      |      \n'+
        '       |                 ' + gutil.colors.blue(version)+'                |      \n'+
        '       . _____________________________________ .        \n'
    );

    //Ask
    inquirer.prompt(prompts,
        function (answers) {
            if (!answers.moveon) {
                return done();
            }
            answers.appNameSlug = _.slugify(answers.appName);
            answers.appNameAltSlug = _.underscored(answers.appNameSlug);
            if (answers.appProxy == 'localhost/mySite') {
                answers.appProxy = 'localhost/' + answers.appNameSlug;
            } else if (answers.appProxy == 'mySite.local') {
                answers.appProxy = answers.appNameSlug + '.local';
            }
            gulp.src(__dirname + '/templates/**')
                .pipe(template(answers))
                .pipe(rename(function (file) {
                    if (file.basename[0] === '@') {
                        file.basename = '.' + file.basename.slice(1);
                    }
                }))
                .pipe(conflict('./'))
                .pipe(gulp.dest('./'))
                .pipe(install())
                .on('end', function () {
                    done();
                });
        });
});
