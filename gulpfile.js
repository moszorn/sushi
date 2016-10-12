/**
 * 
 */
var gulp = require("gulp"),
    $ = require('gulp-load-plugins')();

const config = {
    styles:{
        src:["./src/styles/**/*.less"],
        srcDirectory:["./src/styles/**/*.{less,css}"],
        dest:"./public/styles",
        autoprefix:["last 2 versions"]
    },
    scripts:{
        src:["./js/*.js"],
        dest:"./src"
    }

};

gulp.task('dev:scripts', ()=>{
   return gulp
       .src(config.scripts.src)      
       .pipe(gulp.dest(config.scripts.dest))
       .pipe($.livereload());
});

gulp.task("dev:styles",()=>{
    return gulp
        .src(config.styles.src)        
        .pipe(gulp.dest(config.styles.dest))
        .pipe($.livereload());
});

//gulp.task("dev",gulp.parallel("dev:scripts","dev:styles"));
gulp.task("dev",gulp.parallel("dev:scripts"));

gulp.task("watch",gulp.series("dev",
    ()=>{
        $.livereload.listen();
        // gulp.watch(config.styles.src,gulp.series("dev:styles"));
       // gulp.watch(config.styles.srcDirectory,gulp.series("dev:styles"));
        gulp.watch(config.scripts.src,gulp.series("dev:scripts"));
    }
));


