$(document).ready(function() {
	var scaner_blocks = {};
	var amount_virus_total = 0;
	var amount_space_total = 0;
	var speed_total = 7;
	// run_scan();
	// new_run_scan();

	function new_run_scan() {
		$('.scaner_block:visible').each(function(indx, elem) {
			var speed = $(elem).attr('vr_speed');
			var number_virus = $(elem).find('.number_virus').html();
			var number_size = $(elem).find('.number_size').html();
			var percent_virus = $(elem).find('.percent_virus').html();
			if ($(elem).find('.number_virus').length != 0) {
				amount_virus_total += +number_virus;
				amount_space_total += +number_size;
			}
			checked_percent($(elem).find('.number_virus'), number_virus, speed);
			checked_percent($(elem).find('.number_size'), number_size, speed/11, true);
			checked_percent($(elem).find('.percent_virus'), percent_virus, speed);
			$(elem).find('.circle_loading').css('animation-delay', speed/2 + 's');
			$(elem).find('.circle').css('animation-duration', speed/2 + 's');
			$(elem).find('.anim_2').css('animation-duration', speed + 's');
			$(elem).find('.small_circle').css('animation-duration', speed + 's');
		});

		checked_percent($('.number_percent'), 100, speed_total);
		$('.number_sum_virus').html(amount_virus_total);
		setTimeout(function() {
			$('body,html').animate({scrollTop: $('.speed_block').offset().top}, 1000);
		}, speed_total*700);

		setTimeout(function() {
			$('.result_test').children('p').animate({opacity: 1}, 500);
			$('.result_test').children('.fountainG_box').hide();
		}, speed_total*950);

		setTimeout(function() {
			// $('.result_test_2').fadeIn(700);
			$('.result_test_2').children('p').animate({opacity: 1}, 500);
			$('.result_test_2').children('.fountainG_box').hide();
		}, speed_total*1300);

		setTimeout(function() {
			// $('.result_test_3').fadeIn(700);
			$('.result_test_3').children('p').animate({opacity: 1}, 500);
			$('.result_test_3').children('.fountainG_box').hide();
			$('.btn_result').fadeIn(700);
			$('body,html').animate({scrollTop: $('.btn_result').offset().top}, 3000);
		}, speed_total*1500);
	}

	$('.close_popup').click(function() {
		$('.popup_block').fadeOut();
		// $('.close_popup').removeClass('close_popup');
		$('span.close_popup').hide();
		$('span.close_popup').next().show();
		$('main').show();
		$('main').addClass('animation');
		// run_scan();
		new_run_scan();
	});
	if (window.innerWidth > 992) {
		// $('.btn_result').hover(
		// function(){
		//   $('.speedline').css('transform', 'rotate(46deg)')
		//   checked_percent($('.number_sum_size'), 100, .5); 
		// },
		// function(){
		//   $('.speedline').css('transform', 'rotate(-30deg)')
		//   checked_percent($('.number_sum_size'), 28, .5); 
		// });
		$('.btn_result').mouseenter(function(){
  		$('.speedline').css('transform', 'rotate(48deg)')
		  checked_percent($('.number_sum_size'), 100, .5);
		});
		$('.btn_result').mouseleave(function(){
  		$('.speedline').css('transform', 'rotate(-30deg)')
		  checked_percent($('.number_sum_size'), 18, .5);
		});

	}
});


function speed_line(space_total) {
		return 0 - 46 + (space_total * 0.5);
}

function checked_percent(elem, max, speed, rounding) {
	var k = 0;
	var time_total = speed / max * 900;
	(function timer() {
		if (rounding == true) {
			elem.html(k.toFixed(1));
		} else {
			elem.html(k);
		}
		if (k < max) {
			if (rounding == true) {
				k += 0.1;
			} else {
				k++;
			}
			setTimeout(timer, time_total);
		}
	}());
}

function randomamount(min, max, rounding) {
	var rand = min + Math.random() * (max + 1 - min);
	if (rounding == true) {
		rand = Math.floor(rand);
		return rand;
	} else {
		return +(rand.toFixed(1));
	}
}

