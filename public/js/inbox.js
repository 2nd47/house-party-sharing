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
	for (i in messages) {
		createMessage(messages[i]);
	}
}

var createMessage = function(message) {
	var $newMessage = $('<div>').addClass('card-message');
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
	$('.messages').prepend($newMessage);
}
