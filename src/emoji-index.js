// Just showing my work here. This gets added into emoji-cheat-sheet.com.

jQuery(document).ready(function($) {
	var index;
	var pos = parseInt(localStorage.emojiPos) || 0;
	if (!localStorage.emojiIndex) {
		$.get('emoji-index.json', function(rsp) {
			index = rsp;
			localStorage.emojiIndex = JSON.stringify(rsp);
			setupEmojiUI();
		});
	} else {
		index = JSON.parse(localStorage.emojiIndex);
		setupEmojiUI();
	}

	$('.emojis').click(function(e) {
		if ($(e.target).find('.name').length > 0) {
			var name = $(e.target).find('.name').html().trim();
		} else if ($(e.target).hasClass('name')) {
			var name = $(e.target).html().trim();
		} else if ($(e.target).closest('li').length > 0) {
			var name = $(e.target).closest('li').find('.name').html().trim();
		} else {
			return;
		}
		var shortcutIndex = index[pos].shortcuts.indexOf(name);
		if (shortcutIndex == -1) {
			index[pos].shortcuts.push(name);
		} else {
			index[pos].shortcuts.splice(shortcutIndex, 1);
		}
		saveEmojiIndex();
		updateEmojiUI();
		updateShortcutUI();
	});

	function setupEmojiUI() {
		$(document.body).append(
			'<div id="emoji-index">' +
				'<div class="emoji-index--emoji"></div>' +
				'<div class="emoji-index--shortcuts"></div>' +
				'<a href="#" class="emoji-index--prev">&larr;</a> | ' +
				'<a href="#" class="emoji-index--log">log</a> | ' +
				'<a href="#" class="emoji-index--next">&rarr;</a>' +
			'</div>');
		$('#emoji-index').css('position', 'fixed');
		$('#emoji-index').css('text-align', 'center');
		$('#emoji-index').css('width', '200px');
		$('#emoji-index').css('background-color', '#dedede');
		$('#emoji-index').css('padding', '25px');
		$('#emoji-index').css('top', '50px');
		$('#emoji-index').css('right', '50px');
		$('.emoji-index--emoji').css('font-size', '72px');
		$('.emoji-index--prev').click(function(e) {
			e.preventDefault();
			pos--;
			if (pos < 0) {
				pos = index.length - 1;
			}
			localStorage.emojiPos = pos;
			updateEmojiUI();
		});
		$('.emoji-index--next').click(function(e) {
			e.preventDefault();
			if (e.shiftKey) {
				while (index[pos].shortcuts &&
				       index[pos].shortcuts.length > 0 &&
				       pos < index.length) {
					pos++;
				}
			} else {
				pos++;
			}
			if (pos == index.length) {
				pos = 0;
			}
			localStorage.emojiPos = pos;
			updateEmojiUI();
		});
		$('.emoji-index--log').click(function(e) {
			e.preventDefault();
			var min_index = {};
			$.each(index, function(i, emoji) {
				if (e.shiftKey) {
					// Hash output (only what's necessary to use shortcuts)
					if (emoji.shortcuts && emoji.shortcuts.length > 0) {
						$.each(emoji.shortcuts, function(j, shortcut) {
							min_index[shortcut] = emoji.emoji;
						});
					}
				} else {
					// Array output (include everything!)
					if (!emoji.shortcuts) {
						emoji.shortcuts = [];
					}
					if (!emoji.alt_names) {
						emoji.alt_names = [];
					}
				}
			});
			var json = (e.shiftKey) ? JSON.stringify(min_index)
			                        : JSON.stringify(index);
			console.log(json);
		});
		updateEmojiUI();
		updateShortcutUI();

		$(document).keypress(function(e) {
			if (e.keyCode == 37) { // left arrow
				$('.emoji-index--prev').trigger('click');
			} else if (e.keyCode == 39) { // right arrow
				$('.emoji-index--next').trigger('click');
			} else if (e.keyCode == 35) { // home
				pos = 0;
				localStorage.emojiPos = pos;
				updateEmojiUI();
			} else if (e.keyCode == 36) { // end
				pos = index.length - 1;
				localStorage.emojiPos = pos;
				updateEmojiUI();
			} else {
				console.log(e.keyCode);
			}
		});
	}

	function updateEmojiUI() {
		$('.emoji-index--emoji').html(index[pos].emoji);
		$('.emoji-index--emoji').attr('title', index[pos].title);
		if (index[pos].shortcuts && index[pos].shortcuts.length > 0) {
			$('.emoji-index--shortcuts').html(index[pos].shortcuts.join(', '));
		} else {
			$('.emoji-index--shortcuts').html('<i>no shortcuts</i>');
		}
	}

	function updateShortcutUI() {
		var lookup = {};
		$.each(index, function(i, emoji) {
			if (emoji.shortcuts) {
				$.each(emoji.shortcuts, function(j, shortcut) {
					lookup[shortcut] = i;
				});
				emoji.alt_names = [];
			}
		});
		$('.emojis .name').each(function(i, span) {
			var name = $(span).html().trim();
			if (typeof lookup[name] != 'undefined') {
				$(span).closest('li').css('opacity', 0.5);
				var p = lookup[name];
				index[p].alt_names = [];
				var alt = $(span).data('alternative-name');
				if (alt) {
					$.each(alt.split(','), function(j, alt_name) {
						index[p].alt_names.push(alt_name.trim());
					});
				}
			} else {
				$(span).closest('li').css('opacity', 1);
			}
		});
	}

	function saveEmojiIndex(minimal) {
		localStorage.emojiIndex = JSON.stringify(index);
	}
});
