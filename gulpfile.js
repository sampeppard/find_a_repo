// Javascript

var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var utililities = require("gulp-util");
var del = require("del");
var jshint = require("gulp-jshint");

var buildProduction = utililities.env.production;


// Server For Live Reloading

var browserSync = require("browser-sync").create();


//Bower Components

var lib = require('bower-files')({
  "overrides":{
    "bootstrap" : {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});

gulp.task("bowerJS", function() {
    return gulp.src(lib.ext("js").files)
        .pipe(concat("vendor.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("build/js"));
});

gulp.task("bowerCSS", function() {
    return gulp.src(lib.ext("css").files)
        .pipe(concat("vendor.css"))
        .pipe(gulp.dest("build/css"));
});

gulp.task("bower", ["bowerJS", "bowerCSS"]);



//Javascript Components

gulp.task("concatInterface", function() {
    return gulp.src(["./js/*_interface.js"])
        .pipe(concat("allConcat.js"))
        .pipe(gulp.dest("./tmp"));
});

gulp.task("jsBrowserify", ["concatInterface"], function() {
    return browserify({ entries: ["./tmp/allConcat.js"]})
        .bundle()
        .pipe(source("app.js"))
        .pipe(gulp.dest("./build/js"));
});

gulp.task("minifyScripts", ["jsBrowserify"], function() {
    return gulp.src("build/js/app.js")
        .pipe(uglify())
        .pipe(gulp.dest("build/js"));
});

gulp.task("clean", function() {
    return del(["build", "tmp"]);
});

gulp.task("build", ["clean"], function() {
    if (buildProduction) {
        gulp.start("minifyScripts");
    } else {
        gulp.start("jsBrowserify");
    }
    gulp.start("bower");
});

// Linter

gulp.task("jshint", function() {
    return gulp.src(["js/*.js"])
        .pipe(jshint())
    .pipe(jshint.reporter("default"));
});


// Server For Live Reloading

gulp.task("jsReload", ["jsBrowserify", "jshint"], function(){
    browserSync.reload();
});

gulp.task("bowerReload", ["bower"], function() {
    browserSync.reload();
});

gulp.task("htmlReload", function() {
    browserSync.reload();
});


gulp.task("serve", function() {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "index.html"
        }
    });
    gulp.watch(["js/*.js"], ["jsReload"]);
    gulp.watch(["bower.json"], ["bowerReload"]);
    gulp.watch(["*.html"], ["htmlReload"]);
});
