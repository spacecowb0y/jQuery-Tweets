/*
*	jQuery Tweet v0.1
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
*	
*	Example: 
*	
*		<script type="text/javascript" charset="utf-8">
*   		$(document).ready(function() {
*      			$('#tweets').tweets({
*          			tweets:4,
*          			username: "diego_ar"
*      			});
*  			});
*		</script>
*
*/
(function($){
	$.fn.tweets = function(options) {
		$.ajaxSetup({ cache: true });
		var linkfyTweet = function linkfyTweet(text){
			var regexpUrl = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
			var regexpUser = /[\@]+([A-Za-z0-9-_]+)/gi;
			var regexpHash = /(?:^| )[\#]+([A-Za-z0-9-_]+)/gi;
			text = text.replace(regexpUrl,'<a href=\"$1\">$1</a>');
			text = text.replace(regexpUser,'<a href=\"http://twitter.com/$1\">@$1</a>');
			text = text.replace(regexpHash,' <a href="http://search.twitter.com/search?q=&tag=$1&lang=all&from='+'a'+'">#$1</a>');
			return text;
		};
		var defaults = {
			tweets: 5,
			before: "<li>",
			after: "</li>"
		};
		var options = $.extend(defaults, options);
		return this.each(function() {
			var obj = $(this);
			$.getJSON('http://search.twitter.com/search.json?callback=?&rpp='+options.tweets+'&q=from:'+options.username,
		        function(data) {
		            $.each(data.results, function(i, tweet) {
		                if(tweet.text !== undefined) {
		                	var avatar = '<a href="http://twitter.com/'+tweet.from_user+'" class="avatar"><img src="' + tweet.profile_image_url + '" /></a>';
		                    $(obj).append(options.before+avatar+linkfyTweet(tweet.text)+'<div style="clear:both" />'+options.after);
		                }
		            });
		        }
		    );
		});
	};
})(jQuery);