// Adding 'active' to nav link class on pages other than the root
// something like this:
$(function () {
  $('nav a[href^="/' + location.pathname.split("/")[1] + '"]').addClass(
    "active"
  );
});
