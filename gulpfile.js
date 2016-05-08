var gulp = require("gulp");
var gutil = require("gulp-util");
var del = require("del");
var sass = require("gulp-sass");
var minifyCSS = require("gulp-minify-css");
var useref = require("gulp-useref");
var ngHtml2Js = require("gulp-ng-html2js");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var gulpif = require("gulp-if");
var ngAnnotate = require("gulp-ng-annotate");
var jshint = require("gulp-jshint");
var browserSync = require("browser-sync");

var deploymentDir = "dist";
var applicationName = "alpimaTest";

gulp.task("clean", function () {
    del([deploymentDir]).then(function () {

    });
});

gulp.task("build-template-cache", ["clean"], function (cb) {
    gulp.src("./app/views/*.html")
        .pipe(ngHtml2Js({
            moduleName: applicationName,
            prefix: "app/views/"
        }))
        .pipe(concat("templateCache.js"))
        //.pipe(gulp.dest(deploymentDir))
        .pipe(gulp.dest("./app"))
        .on("end", cb);

});

gulp.task("lint", function () {
    return gulp.src("app/**/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

gulp.task("build-resources", ["clean", "build-template-cache"], function (cb) {

    var assets = useref.assets();

    gulp.src("index.html")
        .pipe(assets)
        .pipe(gulpif("app.js", ngAnnotate()))
        .pipe(gulpif("app.js", uglify()))
        .pipe(gulpif("app.css", minifyCSS({keepBreaks: true, advanced: false, aggressiveMerging: false})))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest(deploymentDir))
        .on("end", cb);

});

gulp.task("build", ["clean", "config", "assets", "build-resources" ], function () {


});

gulp.task("config", function(){

    gulp.src("config.json")
        .pipe(gulp.dest(deploymentDir));

    gulp.src("menu.json")
        .pipe(gulp.dest(deploymentDir));
});

gulp.task("assets", function(){
    gulp.src("assets/*")
        .pipe(gulp.dest(deploymentDir + "/assets"))
});

gulp.task("default", ["build"]);

gulp.task("build-css", function (cb) {
    gulp.src("app/styles/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/styles"))
        .on("end", cb);

});

gulp.task('serve:dist', ['build'], function () {
    browserSync.instance = browserSync.init("*", {
        startPath: '/', server: { baseDir: deploymentDir }
    });
});
