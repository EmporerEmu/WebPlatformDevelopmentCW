// This function will allow the navbar to show the current page by changing css classes on the links
$(function ($) {
	let url = window.location.href;
	$("li a").each(function () {
		if (this.href === url) {
			$(this).closest("a").addClass("link-secondary");
			$(this).closest("a").removeClass("link-dark");
		}
	});
});
