$( document ).ready(function() {
	$('#message-form').submit(function() {
		$(this).ajaxSubmit({
			url: '/api/inbox/' + $('#friend-active').find('p.name').text(),
			method: 'POST',
			dataType: null,
			clearForm: true,
			success: createMessage
		});
		// must return false to prevent default browser behaviour
		return false;
	});

	$('.card-friend:not(#friend-active)').click(function() {
		$('.messages').css('display', 'block');
		$('#friend-active').removeAttr('id');
		$(this).attr('id', 'friend-active');
		$.ajax({
			url: '/api/inbox/' + $('#friend-active').find('p.name').text(),
			method: 'GET',
			success: createMessages
		});
	});
});

var createMessages = function(messages) {
	var messagesLatest = messages.reverse();
	for (i in messagesLatest) {
		createMessage(messagesLatest[i]);
	}
}

var createMessage = function(message) {
	var $newMessage = $('<div>').addClass('card-message');
	console.log(message);
	$newMessage.append(
		$('<img>').
		addClass('message-avatar').
		attr('src', message.avatar).
		attr('width', '64px').
		attr('height', '64px')
	);
	$newMessage.append(
		$('<p>').
		addClass('message-text').
		text(message.text)
	);
	$('.message-cards').prepend($newMessage);
}
