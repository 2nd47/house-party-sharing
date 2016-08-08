$( document ).ready(function() {
	$('#search-form').submit(function() {
		$(this).ajaxSubmit({
			url: '/api/search/',
			method: 'POST',
			success: createResults
		});
		// must return false to prevent default browser behaviour
		return false;
	});
});

var createResults = function(results) {
	for (i in results) {
		createResult(results[i]);
	}
}

var createResult = function(result) {
	if (!result) { return; }
	$('.results-search').empty();
	var $newResult = $('<div>').
		addClass('card').
	$newResult.append(
		$('<a>').
		attr('href', '/browse/' + listing._shortid)
	);
	var $details = $('<div>').addClass('details');
	$details.append(
		$('<p>').
		addClass('name').
		append(
			$('<a>').
			attr('href', '/browse/' + listing._shortid).
			text(listing.name)
		)
	);
	$details.append(
		$('<p>').
		addClass('designer').
		text(listing.designer)
	);
	$details.append(
		$('<p>').
		addClass('price').
		text(listing.price)
	);
	$details.append(
		$('<p>').
		addClass('distance').
		text('PLACEHOLDER')
	);
	$newResult.append($details);
	$('.results-search').append($newResult);
}
