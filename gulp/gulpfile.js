//подключение пакетов
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');//конкатенация файлов
var uglify = require('gulp-uglifyjs');//сжатие js
var cssnano = require('gulp-cssnano');//для минификации CSS
var rename = require('gulp-rename');//переименовывание файлов
var del = require('del')//для удаления файлов и папок
var autoprefixer = require('gulp-autoprefixer');//для автоматического добавления префиксов

/*
ИСПОЛЬЗОВАНИЕ:
gulp- мониторинг изменения файлов в режиме реального времени
gulp scripts - сборка и сжатие всех библиотек JS
gulp clean - очистка папки dist
gulp sass - добавление префиксов
gulp build - построить проект
gulp css-libs - сжатие библиотек css
*/

//добавление префиксов в css
gulp.task('sass',function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '>1%','ie 8', 'ie 7'], {cascade:true}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});


//автоматический релоад
gulp.task('browser-sync',function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

//сборка и сжатие всех всех библиотек JS
gulp.task('scripts', function(){
	return gulp.src([//берем все необходимые библиотеки
		'app/libs/jqeury/dist/jquery.min.js',
		'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js'
		])
	.pipe(concat('libs.min.js'))//собираем их в новом файле libs.min.js
	.pipe(uglify())//сжимаем JS файл
	.pipe(gulp.dest('app/js'));//выгружаем в папку app/js
});

//сжатие библиотек css
gulp.task('css-libs',['sass'], function() {
	return gulp.src('app/css/libs.css')
		.pipe(cssnano())//сжатие
		.pipe(rename({suffix: '.min'}))//добаляем суффикс min
		.pipe(gulp.dest('app/css'));//выгружаем в папку
})

//наблюдение за файлами
gulp.task('watch',function() {
	gulp.watch('app/sass/**/*.sass',['browser-sync','sass']);//наблюдение за sass файлами
	gulp.watch('app/*.html',browserSync.reload);//наблюдение за HTML файлами
	gulp.watch('app/js/**/*.js',browserSync.reload);//наблюдение за JS файлами
});

//очистка папки dist
gulp.task('clean', function() {
	return del.sync('dist')
});

//сборка
gulp.task('build',['clean','sass','scripts'], function() {
	var buildCss = gulp.src([
			'app/css/main.css',
			'app/css/libs.min.css'
		])
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'))

});

//дефолт при вызове gulp
gulp.task('default',['watch']);

//очистка кэша
gulp.task('clear', function() {
	return cache.clearAll();
});