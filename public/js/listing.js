$( document ).ready(function() {
	$('.actions').css('display', 'hidden');
	$('.reviews').css('display', 'hidden');

	$('#pruchase').submit(function () {
		$('.actions').css('display', 'block');
		$('.reviews').css('display', 'flex');
	});
}
