/*Gulp*/
let gulp = require("gulp");
let loadPlugins = require("gulp-load-plugins")();

/*For CSS*/
let autoprefixer = loadPlugins.autoprefixer;
let postCSS = loadPlugins.postcss;
let cssnano = loadPlugins.cssnano;
let concatCSS = loadPlugins.concatCss;
let serve = require('browser-sync').create();

/*For JavaScript*/
let uglify = loadPlugins.uglify;

/*For images*/
let imagemin = loadPlugins.imagemin;
let pngquant = require('imagemin-pngquant');

/*For files*/
let rename = loadPlugins.rename;
let replace = loadPlugins.replace;
let sourceMaps = loadPlugins.sourcemaps;
let del = require('del');
let cache = loadPlugins.cache;
let rigger = loadPlugins.rigger;

/*For deploy*/
let deployFTP = loadPlugins.deployFtp;

const PATH = {
	app: "./app/",
	dist: "./dist/",
	css: "./app/css/",
	img: "./app/img/"	
}

gulp.task("css:dev", function() {
	return gulp.src(PATH.css + "**/*.css")
			.pipe(sourceMaps.init())
			.pipe(autoprefixer())
			.pipe(sourceMaps.write())
			.pipe(gulp.dest(PATH.dist + "css/"))
			.pipe(serve.stream());
})

gulp.task('img', function() {
    return gulp.src(PATH.app + "img/**/*")
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
    	}))
        .pipe(gulp.dest(PATH.dist + "img/"));
});

gulp.task("css:build", function() {
	return gulp.src(PATH.dist + "/css/main.css")
			.pipe(cssnano())
			.pipe(gulp.dest(PATH.dist + "css/"));
})

gulp.task('js:build', function () {
    return gulp.src(PATH.app + "js/main.js")
	        .pipe(rigger())
	        .pipe(gulp.dest(PATH.dist + "js/"))
	        .pipe(serve.reload({stream: true}));
});

gulp.task("html:dev", function() {
	return gulp.src(PATH.dist + "index.html")
				.pipe(serve.reload({stream: true}))
})

gulp.task('clear', function (callback) {
    return cache.clearAll();
})

gulp.task('serve', function() {
	serve.init({
		open: false,
		server: PATH.dist
	});

	gulp.watch(PATH.dist, serve.reload());
});

gulp.task('watch', function() {
	gulp.watch(PATH.app + "css/**/*.css", gulp.parallel('css:dev')); 
	gulp.watch(PATH.app + "js/*.js", gulp.parallel('js:build')); 
	gulp.watch(PATH.app + "img/**/*", gulp.parallel('img')); 
	gulp.watch(PATH.dist + "index.html", gulp.parallel('html:dev'));
});

gulp.task("dev", gulp.series(["css:dev", "js:build", "img", gulp.parallel(["watch", "serve"])]));

gulp.task("ftp:deploy", function(db) {
	//some code...
});