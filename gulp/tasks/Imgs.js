import newer from "gulp-newer";
import webp from "gulp-webp";
import avif from "gulp-avif";
import imagemin from "gulp-imagemin";

const convert = () => {
  if ($.conf.noAvif) {
      let message = "'NoAvif' mode is on, please, make sure to have the right code in project/global/system/scripts/WebpAvifSupport.js";
      $.Alert(message);
  }

	let alreadyTransfered = ``;
	let nowTransfering = `png,jpg,jpeg`;
	let transfer;
	if($.conf.isProd || $.conf.isPreProd) {
		if($.conf.isAvif)
			transfer = $.gulp.src([`${$.path.imgs.src}*.{${nowTransfering}}`, `!${$.path.imgs.src}*.${alreadyTransfered}`])
				.pipe($.plumber($.conf.plumber))
				.pipe(newer($.path.imgs.dest))
				.pipe(avif($.conf.avif))
				.pipe($.gulp.dest($.path.imgs.dest));
		transfer = $.gulp.src([`${$.path.imgs.src}*.*`, `!${$.path.imgs.src}*.${alreadyTransfered}`])
			.pipe($.plumber($.conf.plumber))
			.pipe(newer($.path.imgs.dest))
			.pipe(webp($.conf.webp))
			.pipe($.gulp.dest($.path.imgs.dest));
	}
	nowTransfering += `gif,svg`;
	transfer = $.gulp.src([`${$.path.imgs.src}*.{${nowTransfering}}`, `!${$.path.imgs.src}*.${alreadyTransfered}`])
		.pipe($.plumber($.conf.plumber))
		.pipe(newer($.path.imgs.dest))
		.pipe($.gulpif($.conf.isProd, imagemin($.conf.imagemin)))
		.pipe($.gulp.dest($.path.imgs.dest));
	alreadyTransfered += nowTransfering;
		
	transfer = $.gulp.src([`${$.path.imgs.src}*.*`, `!${$.path.imgs.src}*.${alreadyTransfered}`])
		.pipe($.plumber($.conf.plumber))
		.pipe(newer($.path.imgs.dest))
		.pipe($.gulp.dest($.path.imgs.dest));

	$.browserSync.reload();
	
	return transfer;
}

export default convert;