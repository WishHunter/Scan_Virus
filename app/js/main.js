$(document).ready(function() {
	var scaner_blocks = {};
	var amount_virus_total = 0;
	var amount_space_total = 0;
	var speed_total = 0;
	// run_scan();
	function run_scan() {
		var amount_scaner = $('.scaner_block:visible').length;
		if (amount_scaner == 2) amount_scaner = 4;
		$('.scaner_block:visible').each(function(indx, elem) {
			console.log(amount_scaner);
			$(elem).addClass('virus' + (indx + 1));
			if (indx < amount_scaner/2) {
				scaner_blocks['virus' + (indx + 1)] = {
					amount_virus: randomamount(20, 50, true),
					amount_space: randomamount(20, 50, false),
					amount_speed: randomamount(3, 6, true)
				}
			} else {
				scaner_blocks['virus' + (indx + 1)] = {
					amount_virus: 0,
					amount_space: 0,
					amount_speed: randomamount(3, 6, true)
				}	
			};
			amount_virus_total += scaner_blocks['virus' + (indx + 1)].amount_virus;
			amount_space_total += scaner_blocks['virus' + (indx + 1)].amount_space;
			if (speed_total < scaner_blocks['virus' + (indx + 1)].amount_speed) {
				speed_total = scaner_blocks['virus' + (indx + 1)].amount_speed;
			}

			checked_percent($(elem).find('.number_virus'), scaner_blocks['virus' + (indx + 1)].amount_virus, scaner_blocks['virus' + (indx + 1)].amount_speed);
			checked_percent($(elem).find('.number_size'), scaner_blocks['virus' + (indx + 1)].amount_space, scaner_blocks['virus' + (indx + 1)].amount_speed/10, true);
			checked_percent($(elem).find('.percent_virus'), randomamount(50, 90, true), scaner_blocks['virus' + (indx + 1)].amount_speed);

			$(elem).find('.circle_loading').css('animation-delay', (scaner_blocks['virus' + (indx + 1)].amount_speed)/2 + 's');
			$(elem).find('.circle').css('animation-duration', (scaner_blocks['virus' + (indx + 1)].amount_speed)/2 + 's');
			$(elem).find('.anim_2').css('animation-duration', (scaner_blocks['virus' + (indx + 1)].amount_speed) + 's');
			$(elem).find('.small_circle').css('animation-duration', (scaner_blocks['virus' + (indx + 1)].amount_speed) + 's');
		});	

		checked_percent($('.number_percent'), 100, speed_total);
		checked_percent($('.number_sum_virus'), amount_virus_total, speed_total);
		checked_percent($('.number_sum_size'), amount_space_total, speed_total,); 
		checked_percent($('.number_percent_random'), randomamount(5, 30, true), speed_total); 
		
		setTimeout(function() {
			$('body,html').animate({scrollTop: $('.speed_block').offset().top}, 1000);
		}, speed_total*1000);

		setTimeout(function() {
			$('.scan_test').hide();
			$('.result_test').fadeIn();
		}, speed_total*1150);

		$('.speedline').css({
			'transform': 'rotate(' + speed_line(amount_space_total) + 'deg)',
			'animation-duration': speed_total
		});
	};

	$('.close_popup').click(function() {
		$('.popup_block').fadeOut();
		$('main').show();
		$('main').addClass('animation');
		run_scan();
	});
})

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