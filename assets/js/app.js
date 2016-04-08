$(function(){

	// Allow the user to turn comments off
	$('.comments-toggle').on('click', function(event){
		$('span.com').toggle();
		$('.grid').masonry();
	});

	// Call prettprint manually
	prettyPrint();

	// To the top functionality
	$('#top-button').on('click', function(event){
		$('html, body').animate({scrollTop: 0}, "medium");
		return false;
	});

	// Get cheat sheet title
	var h4_array = $('h4 a').map(function(){
			   if ($(this).text().length > 0) {
					 	var name = $(this).attr('name');
						var cmd_cell = '<li><a href="' + $(this).attr('href') + '" data-name="'+ name +'">' + $(this).text() + '</a></li>';
			   		$('.sidebar-menu').append(cmd_cell);
			   		$('.mobile-cmd-cell').append(cmd_cell);
						$(this).closest('.cmd-description').attr('id', 'cmd-' + name);
	               return $(this).text();
			   }
  }).get();

	// Reorder sidebar list
	reorderList($('.sidebar-menu'));
	reorderList($('.mobile-cmd-cell'));
	function reorderList(ul) {
		var items = ul.find('li').get();
		items.sort(function(a,b){
		  var keyA = $(a).text();
		  var keyB = $(b).text();

		  if (keyA < keyB) return -1;
		  if (keyA > keyB) return 1;
		  return 0;
		});
		$.each(items, function(i, li){
		  ul.append(li);
		});
	}

	// Show or Hide Command Section
	$('.sidebar-menu li a').click(clickSidebarItem);
	$('.mobile-cmd-cell li a').click(clickSidebarItem);

	function clickSidebarItem() {
		var name = $(this).attr('data-name');
		var cmd_id = 'cmd-' + name;
		$('.focus-code').remove();
		$('.code-container').append('<section class="cmd-description focus-code">' + $('#' + cmd_id).html() + '</section>');
		$('.grid').fadeOut('slow');
		$('.focus-code').fadeIn('slow', function() {
			window.scrollTo(0, 0);
		});

		$('.active-link').removeClass('active-link');
		$(this).addClass('active-link');

		window.location.hash = name;

		$('[data-close]').trigger('click');
		return false;
	}

	// Click check all button
	$('.check-all-button').click(function () {
		$('.active-link').removeClass('active-link');
		$('.focus-code').remove();
		$('.grid').fadeIn('slow');
		$('[data-close]').trigger('click');
		location.hash = '';
	});

	// Masonry
	$('.grid').masonry({
	  // options...
	  itemSelector: '.grid-item'
	});

	// Fetch access website event
	var href = location.href;
	var anchor = href.split('#')[1];
	if (anchor) {
			$('[data-name=' + anchor + ']').trigger('click');
	}

	// Initialize foundation, or else!
	$(document).foundation();

	/**
   * Open External Links In New Window
   */
   function initExternalLink(){
      $('section a[href^="http://"], section a[href^="https://"]').each(function() {
         var a = new RegExp('/' + window.location.host + '/');
         if(!a.test(this.href) ) {
             $(this).click(function(event) {
                 event.preventDefault();
                 event.stopPropagation();
                 window.open(this.href, '_blank');
             });
         }
      });
  }

	initExternalLink();


});

