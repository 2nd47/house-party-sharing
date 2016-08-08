$( document ).ready(function() {
	$('#message-form').submit(function() {
		$(this).ajaxSubmit({
			url: '/api/inbox/' + $('#friend-active').find('p.name').text(),
			method: 'POST',
			dataType: null,
			clearForm: true,
			success: function(data) {
				if (data.success === true) {
					location.reload();
				}
			}
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
			success: function(messages) {
				console.log(messages);
			}
		});
	});
});
