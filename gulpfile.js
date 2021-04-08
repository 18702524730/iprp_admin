// Generated on 2016-07-19 using generator-angular 0.15.1
var timeVersion = new Date().getTime();
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var babel = require('gulp-babel');
var openURL = require('open');
var concat = require('gulp-concat');
var lazypipe = require('lazypipe');
var rimraf = require('rimraf');
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');
var domSrc = require('gulp-dom-src');
var jsmin = require('gulp-jsmin');
var minifyCss = require('gulp-minify-css');
var cheerio = require('gulp-cheerio');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();
var proxy = require('http-proxy-middleware');
var gutil = require('gulp-util');

var yeoman = {
  app: require('./bower.json').appPath || 'app',
  dist: './www/'
};

var isNeedMin = true;

var paths = {
  scripts: [yeoman.app + '/scripts/**/*.js'],
  styles: [yeoman.app + '/styles/**/*.css'],
  test: ['test/spec/**/*.js'],
  testRequire: [
    yeoman.app + '/bower_components/angular/angular.js',
    yeoman.app + '/bower_components/angular-mocks/angular-mocks.js',
    yeoman.app + '/bower_components/angular-resource/angular-resource.js',
    yeoman.app + '/bower_components/angular-cookies/angular-cookies.js',
    yeoman.app + '/bower_components/angular-sanitize/angular-sanitize.js',
    yeoman.app + '/bower_components/angular-route/angular-route.js',
    'test/mock/**/*.js',
    'test/spec/**/*.js'
  ],
  karma: 'karma.conf.js',
  views: {
    main: yeoman.app + '/index.html',
    files: [yeoman.app + '/views/**/*.html']
  }
};

////////////////////////
// Reusable pipelines //
////////////////////////

var lintScripts = lazypipe()
  .pipe($.jshint, '.jshintrc')
  .pipe($.jshint.reporter, 'jshint-stylish');

var styles = lazypipe()
  .pipe($.autoprefixer, 'last 1 version')
  .pipe(gulp.dest, '.tmp/styles');

///////////
// Tasks //
///////////

gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(styles());
});

gulp.task('lint:scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(lintScripts());
});

gulp.task('clean:tmp', function (cb) {
  rimraf('./.tmp', cb);
});

gulp.task('start:client', ['start:server', 'styles'], function () {
  openURL('https://localhost:9000');
});

gulp.task('start:server', function() {
  $.connect.server({
    root: [yeoman.app, '.tmp'],
    livereload: true,
    // Change this to '0.0.0.0' to access the server from outside.
    port: 9000
  });
});

gulp.task('start:server:test', function() {
  $.connect.server({
    root: ['test', yeoman.app, '.tmp'],
    livereload: true,
    port: 9001
  });
});

gulp.task('serve', function (cb) {
  runSequence('clean:tmp',
    ['lint:scripts'],
    ['start:client'],
    'watch', cb);
});


var config = {
  watchFiles: [ 'app/**/*.html', 'app/**/*.css', 'app/**/*.js' ]
}

// 设置代理
var middleware = [
  proxy('/iprp_operator', {// proxy middleware options
    target: 'https://testadmin.ipsebe.com', // target host
    // target: 'http://192.168.4.138:8081',
    // target: 'https://192.168.1.123:8382',
    changeOrigin: true,               // needed for virtual hosted sites
    ws: true,                         // proxy websockets
    pathRewrite: {
      //'^/api/old-path' : '/api/new-path',     // rewrite path
      '^/iprp_operator' : '/iprp_operator'           // remove base path
      // '^/iprp_operator' : '/'           // remove base path
    },
    router: {
      // when request.headers.host == 'dev.localhost:3000',
      // override target 'https://www.example.org' to 'https://localhost:8000'
      //'dev.localhost:3000' : 'https://localhost:8000'
    },
    cookieDomainRewrite: ""
  }),
  proxy('/portalsite-cnsebe', {// proxy middleware options
    target: 'https://testwww.ipsebe.com', // target host
    // target: 'http://192.168.4.138:8080',
    // target: 'https://192.168.1.123:8382',
    changeOrigin: true,               // needed for virtual hosted sites
    ws: true,                         // proxy websockets
    pathRewrite: {
      //'^/api/old-path' : '/api/new-path',     // rewrite path
      '^/portalsite-cnsebe' : ''           // remove base path
    },
    router: {
      // when request.headers.host == 'dev.localhost:3000',
      // override target 'https://www.example.org' to 'https://localhost:8000'
      //'dev.localhost:3000' : 'https://localhost:8000'
    },
    cookieDomainRewrite: ""
  }),
  proxy('/cz', {// proxy middleware options
    target: 'https://testcz.ipsebe.com', // target host
    // target: 'http://192.168.4.138:8080',
    // target: 'https://192.168.1.123:8382',
    changeOrigin: true,               // needed for virtual hosted sites
    ws: true,                         // proxy websockets
    pathRewrite: {
      //'^/api/old-path' : '/api/new-path',     // rewrite path
      '^/cz' : ''           // remove base path
    },
    router: {
      // when request.headers.host == 'dev.localhost:3000',
      // override target 'https://www.example.org' to 'https://localhost:8000'
      //'dev.localhost:3000' : 'https://localhost:8000'
    },
    cookieDomainRewrite: ""
  }),
  proxy('/partner', {// proxy middleware options
    target: 'https://testwww.ipsebe.com', // target host
    // target: 'http://192.168.4.138:8080',
    // target: 'https://192.168.1.123:8382',
    changeOrigin: true,               // needed for virtual hosted sites
    ws: true,                         // proxy websockets
    pathRewrite: {
      //'^/api/old-path' : '/api/new-path',     // rewrite path
      '^/partner' : '/partner'           // remove base path
    },
    router: {
      // when request.headers.host == 'dev.localhost:3000',
      // override target 'https://www.example.org' to 'https://localhost:8000'
      //'dev.localhost:3000' : 'https://localhost:8000'
    },
    cookieDomainRewrite: ""
  })
];

gulp.task('dev', function() {
  browserSync.init({
    port: 9000,
    files: config.watchFiles,
    server: {
        baseDir: "./app/"
    },
    middleware: middleware
  });
})

gulp.task('pro', ['build'], function() {
  browserSync.init({
    port: 9001,
    server: {
        baseDir: "./www/"
    },
    middleware: middleware
  });
})


gulp.task('test', ['start:server:test'], function () {
  var testToFiles = paths.testRequire.concat(paths.scripts, paths.test);
  return gulp.src(testToFiles)
    .pipe($.karma({
      configFile: paths.karma,
      action: 'watch'
    }));
});

// inject bower components
gulp.task('bower', function () {
  return gulp.src(paths.views.main)
    .pipe(wiredep({
      directory: yeoman.app + '/bower_components',
      ignorePath: '..'
    }))
  .pipe(gulp.dest(yeoman.app + '/views'));
});

///////////
// Build //
///////////

gulp.task('clean:dist', function (cb) {
  rimraf('./www', cb);
});


gulp.task('css-min', function() {
    return $.domSrc({
            file: paths.views.main,
            selector: 'link[data-concat!="false"]',
            attribute: 'href'
        })
        .pipe(concat('app.full.min.css'))
        .pipe(isNeedMin ? minifyCss({ keepSpecialComments: 0 }) : $.util.noop())
        .pipe(gulp.dest(yeoman.dist + 'css/'));
});

//压缩js
gulp.task('js-min', function() {
    return domSrc({
            file: paths.views.main,
            selector: 'script[data-concat!="false"]',
            attribute: 'src'
        })
        //.pipe( jsmin())
        .pipe($.ngAnnotate())
        .pipe($.jshint().on('error', function(err){
            gutil.log(err);
            this.emit('end');
        }))
        .pipe(babel({
          presets: ['es2015'],
          plugins:[
            //下面这行
            "transform-remove-strict-mode"
          ]
        }))
        .pipe(isNeedMin ? $.uglify().on('error', function(err){
            gutil.log(err);
            this.emit('end');
        }) : $.util.noop())
        .pipe(concat('app.full.min.js'))
        .pipe(gulp.dest(yeoman.dist + 'js/'));
});

//压缩js
gulp.task('js', function() {
    return gulp.src(yeoman.dist + 'js/app.full.min.js')
        .pipe(babel({
          presets: ['es2015'],
          plugins:[
            //下面这行
            "transform-remove-strict-mode"
          ]
        }))
        .pipe(isNeedMin ? $.uglify().on('error', function(err){
            gutil.log(err);
            this.emit('end');
        }) : $.util.noop())
        .pipe(gulp.dest(yeoman.dist + 'js/'));
});

//修改index.html <script src="bower_components/wangEditor/wangEditor.min.js"></script>
gulp.task('dom-munger', ['js-min', 'css-min'], function() {
    return gulp.src('./app/index.html')
        .pipe(cheerio(function($) {
            $('script',$('body')).remove();
            $('link[data-concat!="false"]').remove();
            $('head').append('<link id="allcss" rel="stylesheet" timeversion="'+ timeVersion +'" href="css/app.full.min.css?t=' + timeVersion + '" />');
            $('body').append('<script src="js/app.full.min.js?t=' + timeVersion + '"></script>'
              + '<script src="styles/js/layer/layer.js" data-concat="false"></script>'
              + '<script src="styles/js/layer/ng-layer.js" data-concat="false"></script>'
              + '<script src="styles/js/echarts.min.js" data-concat="false"></script><script src="styles/js/echarts/shine.js" data-concat="false"></script><script src="styles/js/bootstrap-select.js" data-concat="false"></script><script src="styles/js/i18n/defaults-zh_CN.min.js" data-concat="false"></script>'
              + '<script src="styles/js/wangEditor/wangEditor.min.js" data-concat="false"></script>');
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest(yeoman.dist))
});

gulp.task('ico', function() {
    return gulp.src(yeoman.app + '/sebe.ico')
        .pipe(gulp.dest(yeoman.dist));
});

gulp.task('images', function() {
    return gulp.src(yeoman.app + '/images/**')
        .pipe(gulp.dest(yeoman.dist + 'images/'));
});

gulp.task('styles', function() {
    return gulp.src(yeoman.app + '/styles/**')
        .pipe(gulp.dest(yeoman.dist + 'styles/'));
});

gulp.task('font', function() {
    return gulp.src(yeoman.app + '/styles/font/**')
        .pipe(gulp.dest(yeoman.dist + 'font/'));
});

gulp.task('fonts', function() {
    return gulp.src(yeoman.app + '/styles/fonts/**')
        .pipe(gulp.dest(yeoman.dist + 'fonts/'));
});

gulp.task('scripts', function() {
    return gulp.src(yeoman.app + '/scripts/**/*.html')
        .pipe(gulp.dest(yeoman.dist + 'scripts/'));
});

gulp.task('package', function() {
    return gulp.src(yeoman.app + '/package/**/*.html')
        .pipe(gulp.dest(yeoman.dist + 'package/'));
});


gulp.task('build', ['clean:dist'], function () {
  runSequence(['ico', 'images', 'styles', 'font', 'fonts', 'scripts', 'package', 'css-min', 'js-min', 'dom-munger']);
});

gulp.task('default', ['build']);
