var gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
postcss = require("gulp-postcss");
autoprefixer = require("autoprefixer");
var sourcemaps = require('gulp-sourcemaps'); 
var browserSync = require('browser-sync').create(); 
cssbeautify = require('gulp-cssbeautify');
var beautify = require('gulp-beautify');

//_______ task for scss folder to css main style 
gulp.task('watch', function() {
	console.log('Command executed successfully compiling SCSS in assets.');
	 return gulp.src('src/assets/scss/**/*.scss') 
		.pipe(sourcemaps.init())                       
                .pipe(sass())
                .pipe(beautify.css({ indent_size: 4 }))
		.pipe(sourcemaps.write(''))   
		.pipe(gulp.dest('src/assets/css'))
		.pipe(browserSync.reload({
		  stream: true
	}))
})


//_______task for Dark
gulp.task('dark', function(){
        return gulp.src('src/assets/css/dark.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(beautify.css({ indent_size: 4 }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('src/assets/css'));
                     
})

//_______task for Transparent
gulp.task('transparent', function(){
        return gulp.src('src/assets/css/transparent-style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(beautify.css({ indent_size: 4 }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('src/assets/css'));
                     
})

//_______task for Boxed
gulp.task('boxed', function(){
        return gulp.src('src/assets/css/boxed.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(beautify.css({ indent_size: 4 }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('src/assets/css'));
                     
})      


//_______task for Skin-modes
gulp.task('skins', function(){
        return gulp.src('src/assets/css/skin-modes.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(beautify.css({ indent_size: 4 }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('src/assets/css'));                   
})

// _____default
gulp.task('default', gulp.series('watch', 'dark', 'transparent', 'boxed', 'skins'))

