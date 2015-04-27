(function($)
{

	window.email = {
	    enableResponsiveViews: function () {
	        $(".col-unscrollable").css("height", "100%");
	        $('#email_list').parent().parent().parent().parent().parent().parent().css("overflow", "auto");
	        //alert(document.documentElement.clientHeight + "," + window.screen.availHeight + "," + window.screen.height + "," + $("#email_list").parent().css("height"));
			$('.email .email-item-list .list-group-item').on('click', function(e){
				e.preventDefault();
				$('#email_details').addClass('open');
				$('#email_list').addClass('hidden-xs hidden-sm');
				$('#email_list').parent().parent().parent().parent().parent().parent().css("overflow", "hidden");
				scrollTo('#email_details');
			});
			$('#close-email-details').on('click', function(){
				$('#email_details').removeClass('open');
				$('#email_list').removeClass('hidden-xs hidden-sm');
				$('#email_list').parent().parent().parent().parent().parent().parent().css("overflow","auto");
			});
		},
	    disableResponsiveViews: function () {
	        $('#email_list').parent().parent().parent().parent().parent().parent().css("overflow", "hidden");
	        //alert(document.documentElement.clientHeight + "," + window.screen.availHeight + "," + window.screen.height + "," + $("#email_list").parent().css("height"));
			$('.email .email-item-list .list-group-item').off('click');
			$('#close-email-details').off('click');
			$('#email_details').removeClass('open');
			$('#email_list').removeClass('hidden-xs hidden-sm');
			setTimeout(function () {
			    $(".col-unscrollable").height(document.documentElement.clientHeight - 40);
			}, 100);
			
		}
	};
	function scrollTo(id) {
	    if ($(id).length)
	        $('html,body').animate({ scrollTop: $(id).offset().top }, 'slow');
	}
	// $(window).setBreakpoints({
	// 	distinct: false,
	// 	breakpoints: [
	// 		992
	// 	]
    // });
	$(window).setBreakpoints({
	    distinct: false,
	    breakpoints: [768, 992]
	});
	
	$(window).bind('exitBreakpoint992',function() {
		window.email.enableResponsiveViews();
	});

	$(window).bind('enterBreakpoint992',function() {
		window.email.disableResponsiveViews();
	});

	$(window).on('load', function () {
		if ($(window).width() <= 991)
			window.email.enableResponsiveViews();
	});

})(jQuery);