/*
*	jQuery Tweet v0.1.1
*	written by Diego Peralta
*
*	Copyright (c) 2010 Diego Peralta (http://www.bahiastudio.net/)
*	Dual licensed under the MIT (MIT-LICENSE.txt)
*	and GPL (GPL-LICENSE.txt) licenses.
*	Built using jQuery library 
*
*	Options:
*		- before (string): HTML code before the tweet.
*		- after (string): HTML code after the tweet.
*		- tweets (numeric): number of tweets to display.
*		- username (string): filter to only tweets by a particular user. 
*			make this empty for the public timeline.
*	
*	Example: 
*	
*		<script charset="utf-8">
*   		$(document).ready(function() {
*      			$('#tweets').tweets({
*          			tweets:4,
*          			username: "diego_ar"
*      			});
*  		});
*		</script>
*
*/
(function($){
	$.fn.tweets = function(options) {
		$.ajaxSetup({ cache: true });
		var defaults = {
			tweets: 5,
			before: "<li>",
			after: "</li>",
			username: ""
		};
		var options = $.extend(defaults, options);
		return this.each(function() {
			var obj = $(this);
			$.getJSON('http://api.twitter.com/1/statuses/"+(options.username==""?"public":"user")+"_timeline.json?callback=?&screen_name='+encodeURIComponent(options.username),
		        function(data) {
		            $.each(data, function(i, tweet) {
		                if(tweet.text !== undefined) {
		                    $(obj).append(options.before+tweet.text+options.after);
		                }
		            });
		        }
		    );
		});
	};
})(jQuery);