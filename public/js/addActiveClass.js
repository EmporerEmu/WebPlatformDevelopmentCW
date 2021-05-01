$(function ($) {
	let url = window.location.href;
	$("li a").each(function () {
		if (this.href === url) {
			$(this).closest("a").addClass("link-secondary");
            $(this).closest("a").removeClass("link-dark")
		}
	});
});
