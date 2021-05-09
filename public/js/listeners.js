class Listeners {
	shareWeekListener() {
        // var week = new Date();
		$("#date").click(function () {
			let week = new Date($("#date").val());
		});
        return week;
	}
    
}

module.exports = Listeners;
