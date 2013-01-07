/*
*	jQuery Tweet v0.2
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
*		- loader (bool): 
*		- avatar (bool):
*	
*	Example: 
*	
*		<script type="text/javascript" charset="utf-8">
*   		$(document).ready(function() {
*      			$('#tweets').tweets({
*          			tweets:4,
*          			username: "diego_ar",
*					avatar: true
*      			});
*  			});
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
			loader: true,
			avatar: true
		};
		var options = $.extend(defaults, options);
		function relative_time(time_value) {
			var parsed_date = Date.parse(time_value);
			var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
			var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
			var pluralize = function (singular, n) {
				return '' + n + ' ' + singular + (n == 1 ? '' : 's');
		};
			if(delta < 60) {
				return 'less than a minute ago';
			} else if(delta < (45*60)) {
				return 'about ' + pluralize("minute", parseInt(delta / 60)) + ' ago';
			} else if(delta < (24*60*60)) {
				return 'about ' + pluralize("hour", parseInt(delta / 3600)) + ' ago';
			} else {
				return 'about ' + pluralize("day", parseInt(delta / 86400)) + ' ago';
			}
		}
	    
		return this.each(function() {
			var obj = $(this);
			$.getJSON('http://search.twitter.com/search.json?callback=?&rpp='+options.tweets+'&q=from:'+options.username,
		        function(data) {
		            $.each(data.results, function(i, tweet) {
		                if(tweet.text !== undefined) {
		                    $(obj).append(options.before+'<img src="'+ tweet.profile_image_url +'" alt="">'+tweet.text+'<br/><small>'+relative_time(tweet.created_at)+'</small>'+options.after);
		                }
		            });
		        }
		    );
		});
	};
})(jQuery);