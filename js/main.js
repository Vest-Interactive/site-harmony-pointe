

function Site(params) {
	'use strict';

	var config = params || {};

	var $contactForm = $('#contact-form'),
		$modalForm = $('#modal-signup-form');

	var $window = $(window);

	Helpers();

	_parallax();
	_onePageNav();
	_modal();
	_forms();
	_toolbar();


	function _parallax() {
		// http://www.ianlunn.co.uk/plugins/jquery-parallax/
		$('#photo1').parallax('50%', '0.4');
		$('#photo2').parallax('50%', '0.4');
		$('#photo3').parallax('50%', '0.2');
		$('#photo4').parallax('50%', '0.3');
	}

	function _onePageNav() {
		// http://github.com/davist11/jQuery-One-Page-Nav
		$('#toolbar-links-full').onePageNav({
			currentClass: 'current',
			changeHash: false,
			scrollSpeed: 750,
			scrollOffset: 90,
			scrollThreshold: 0.5,
			filter: '',
			easing: 'swing',
			begin: function() {
			//I get fired when the animation is starting
			},
			end: function() {
			//I get fired when the animation is ending
			},
			scrollChange: function($currentListItem) {
			//I get fired when you enter a section and I pass the list item of the section
			}
		});
	}

	function _modal() {
		// Modal Settings
		$('.modal').modal({
			detachable: true,
			cloasable: true,
			transition: 'fade up',
			onApprove: function() {
				$('#modal-signup-form').submit();
				return false;
			}
		});


		// Event Handler
		// http://semantic-ui.com/modules/modal.html
		$('#package-btn').on('click', function() {
			$('.ui.form').trigger('reset');
			$('#modal-signup-form .field.error').removeClass('error');
			$('.ui.form.error').removeClass('error');
			$('.ui.modal').modal('show');
		});
	}

	function _forms() {

		// Modal Form
		$('#modalBtn').on('click', function(e){
			e.preventDefault();

			var $this = $('#modal-signup-form');  //$(this);

			var isValid = $this.valid();

			if(isValid){
				
				var contact = {
					type: 'modal',
					domain: 'brentwood',
					name: $this.find('.name').val(),
					email: $this.find('.email').val(),
					telephone: $this.find('.telephone').val()
				}

				$.ajax({
					type: 'POST',
					beforeSend: function(x) {
						if (x && x.overrideMimeType) {
							x.overrideMimeType("application/j-son;charset=UTF-8");
						}
					},
					dataType: "json",
					url: "ajax/contact.ajax.php",
					data: { contact : JSON.stringify(contact) },
					success: function(msg) {
						if (msg.hasOwnProperty('success')) {
							// Start auto downloading the pdf
							
							$('.ui.modal').modal('hide');
						}
					}
				});
			}
		});


		// Index Contact Form
		$('#formBtn').on('click', function(e){
			e.preventDefault();

			var $this = $contactForm;
			var isValid = $this.valid();

			if(isValid) {
			
				var contact = {
					type: 'index',
					domain: 'brentwood',
					name: $this.find('.name').val(),
					email: $this.find('.email').val(),
					telephone: $this.find('.telephone').val(),
					message: $this.find('#message').val()
				}

				// Send the email
				$.ajax({
					type: 'POST',
					beforeSend: function(x) {
						if (x && x.overrideMimeType) {
							x.overrideMimeType("application/j-son;charset=UTF-8");
						}
					},
					dataType: "json",
					url: "ajax/contact.ajax.php",
					data: { contact : JSON.stringify(contact) },
					success: function(msg) {
						if (msg.hasOwnProperty('success')) {							
							$contactForm.css('display', 'none');
							$('#contact-form-thankyou').fadeIn();
						}
					}
				});
			}
		});
	}

	function _toolbar() {
		$window.scroll(function() {
			var windowSize = $window.width(),
				$toolbar = $('#toolbar');

			if ($window.scrollTop() > 250) {
				$toolbar.addClass('fixed-toolbar');
			} else {
				$toolbar.removeClass('fixed-toolbar');
			}
		});

		// Mobile Navigation
		$('.toolbar-links-mobile select').change(function() {
			window.location = $(this).find("option:selected").val();
		})
	}

	function Helpers() {

		// Index Page Validation Rules
		$contactForm.validate({
			rules: {
				name: {
					required: true
				},
				email: {
					required: true
				}
			},
			messages: {
				name: "Please specify your name",
				email: "This must be a valid email"
			}
		});		
		
		$modalForm.validate({
			rules: {
				name: {
					required: true
				},
				email: {
					required: true
				}
			},
			messages: {
				name: "Please specify your name",
				email: "This must be a valid email"
			}
		});
	}

}