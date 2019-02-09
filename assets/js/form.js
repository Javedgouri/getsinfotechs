// JavaScript Document
$(document).ready(function() {
	
	$('#contactForm #submit').click(function() {
		// Fade in the progress bar
		$('#contactForm #formProgress').hide();
		$('#contactForm #formProgress').html('Sending&hellip;');
		$('#contactForm #formProgress').fadeIn();
		
		// Disable the submit button
		// $('#contactForm #submit').attr("disabled", "disabled");
		
		// Clear and hide any error messages
		$('#contactForm .formError').html('');
		
		// Set temaprary variables for the script
		var isFocus=0;
		var isError=0;
		
		// Get the data from the form
		var name=$('#contactForm #name').val();
		var email=$('#contactForm #email').val();
		var abstract=$('#contactForm #abstract').val();
		var recaptcha=$('#contactForm .g-recaptcha-response').val();
		
		// Validate the data
		if(name=='') {
			$('#contactForm #errorName').html('This is a required field.');
			$('#contactForm #name').focus();
			isFocus=1;
			isError=1;
		}

		if(email=='') {
			$('#contactForm #errorEmail').html('This is a required field.');
			if(isFocus==0) {
				$('#contactForm #email').focus();
				isFocus=1;
			}
			isError=1;
		} else {
			var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if(reg.test(email)==false) {
				$('#contactForm #errorEmail').html('Invalid email address.');
				if(isFocus==0) {
					$('#contactForm #email').focus();
					isFocus=1;
				}
				isError=1;
			}
		}

		if(abstract=='') {
			$('#contactForm #errorAbstract').html('This is a required field.');
			if(isFocus==0) {
				$('#contactForm #abstract').focus();
				isFocus=1;
			}
			isError=1;
		}
		if(recaptcha=='') {
			$('#contactForm #errorrecaptcha').html('This is a required field.');
			if(isFocus==0) {
				$('#contactForm .g-recaptcha-response').focus();
				isFocus=1;
			}
			isError=1;
		}

		// Terminate the script if an error is found
		if(isError==1) {
			$('#contactForm #formProgress').html('');
			$('#contactForm #formProgress').hide();
			
			// Activate the submit button
			// $('#contactForm #submit').attr("disabled", "");
			
			return false;
		}
		
		$.ajaxSetup ({
			cache: false
		});
		
		var dataString = 'name='+ name + '&email=' + email + '&abstract=' + abstract;  
		$.ajax({
			type: "POST",
			url: "./php/submit-form-ajax.php",
			data: dataString,
			success: function(msg) {
				
				//alert(msg);
				
				// Check to see if the mail was successfully sent
				if(msg=='Mail sent') {
					// Update the progress bar
					$('#contactForm #formProgress').html('Your email has sent successfully.').delay(4000).fadeOut(800);
					
					// Clear the subject field and message textbox
					$('#contactForm #name').val('');
					$('#contactForm #email').val('');
					$('#contactForm #abstract').val('');
					$('.g-recaptcha-response').val('');
					grecaptcha.reset();
					//window.setTimeout(function(){location.reload()},2000)
				} else {
					$('#contactForm #formProgress').html('');
					alert('There was an error sending your email. Please try again.');
				}
				
				// Activate the submit button
				// $('#contactForm #submit').attr("disabled", "");
			},
			error: function(ob,errStr) {
				$('#contactForm #formProgress').html('');
				alert('There was an error sending your email. Please try again.');
				
				// Activate the submit button
				// $('#contactForm #submit').attr("disabled", "");
			}
		});
		
		return false;
	});
});