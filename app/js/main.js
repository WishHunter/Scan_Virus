$(document).ready(function() {
	$('.close_popup').click(function() {
		$('.popup_block').fadeOut();
		$('main').show();
		$('main').addClass('animation');
		run_scan();
	});

	var amount_scaner = $('.scaner_block').length;
	console.log(amount_scaner);
	var scaner_blocks = {};
	var amount_virus_total = 0;
	var amount_space_total = 0;
	var speed_total = 4;

	function run_scan() {
		$('.scaner_block:visible').each(function(indx, elem) {
			$(elem).addClass('virus' + (indx + 1));
			if ((indx + 1) < 4) {
				scaner_blocks['virus' + (indx + 1)] = {
					amount_virus: randomamount(20, 50, true),
					amount_space: randomamount(20, 50, false)
				}
			} else {
				scaner_blocks['virus' + (indx + 1)] = {
					amount_virus: 0,
					amount_space: 0
				}	
			};
			amount_virus_total += scaner_blocks['virus' + (indx + 1)].amount_virus;
			amount_space_total += scaner_blocks['virus' + (indx + 1)].amount_space;
			checked_percent($(elem).find('.number_virus'), scaner_blocks['virus' + (indx + 1)].amount_virus, speed_total)
			checked_percent($(elem).find('.number_size'), scaner_blocks['virus' + (indx + 1)].amount_space, speed_total/10, true)
			checked_percent($(elem).find('.percent_virus'), randomamount(50, 90, true), speed_total);
		});	

		checked_percent($('.number_percent'), 100, speed_total);
		checked_percent($('.number_sum_virus'), amount_virus_total, speed_total);
		checked_percent($('.number_sum_size'), amount_space_total, speed_total,); 
		checked_percent($('.number_percent_random'), randomamount(5, 30, true), speed_total); 
	
		$('.speedline').css('transform', 'rotate(' + speed_line(amount_space_total) + 'deg)');
	};
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