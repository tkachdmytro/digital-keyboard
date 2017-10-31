var digital_keyboard = {};
(function($){
    'use strict';

    $(document).ready(function(){
    	var jBody = $('body');
		digital_keyboard = {
			pin_code_length: 4,
			init: function(){
				var content_block = document.createElement("div");
				content_block.className = "content-block";
				jBody.prepend(content_block);

				var digital_keyboard_block = document.createElement("div");
				digital_keyboard_block.className = "digital-keyboard-block";
				content_block.prepend(digital_keyboard_block);
				//display-block
				var display_block = document.createElement("div");
				display_block.className = "display-block display-block-js visible";
				digital_keyboard_block.append(display_block);
         		
         		var input = document.createElement("input");
				input.className = "display display-js";
				input.setAttribute('type', 'text');
				input.setAttribute('size', '49');
				input.setAttribute('readonly', true);
				display_block.append(input);
				//buttons-block
				var buttons_block = document.createElement("div");
				buttons_block.className = "buttons_block";
				digital_keyboard_block.append(buttons_block);
				
				var ul = document.createElement("ul");
				buttons_block.append(ul);

				//controls button
				var control_button_cancel = document.createElement("div");
				control_button_cancel.className = "button control cancel cancel-js";
				control_button_cancel.innerHTML = "CANCEL";
				var control_button_clear = document.createElement("div");
				control_button_clear.className = "button control clear clear-js";
				control_button_clear.innerHTML = "CLEAR";
				var control_button_enter = document.createElement("div");
				control_button_enter.className = "button control enter enter-js";
				control_button_enter.innerHTML = "ENTER";
				var control_button_hide = document.createElement("div");
				control_button_hide.className = "button control hide hide-js";
				control_button_hide.innerHTML = "HIDE";

				var controls_button = [control_button_cancel, control_button_clear, control_button_enter, control_button_hide];

				var k = 1;
				var key = 0;
				for(var i = 1; i < 17; i++)	{
					var li = document.createElement("li");
					if(i%4 != 0){
						var simple_button = document.createElement("div");
						simple_button.className = "button";
						if(i != 13 && i != 15) {
							simple_button.className = "button button-js";
							simple_button.innerHTML = k;
							simple_button.setAttribute("data-value", k);
							simple_button.setAttribute("data-position", k);
						}
						if(i == 14){
							simple_button.className = "button button-js";
							simple_button.innerHTML = 0;
							simple_button.setAttribute("data-value", 0);
							simple_button.setAttribute("data-position", 0);
						}
						li.append(simple_button);
						k++;
					}else{
						key = i/4;
						li.append(controls_button[key-1]);
					}
					ul.append(li);	
				}
			},
			mixed:function(){

				var random_number = 0;
				var random_array = [];
				var max = 10;
				while (random_array.length < max) {
				    random_number = Math.floor(Math.random() * 10);
				    if (random_array.indexOf(random_number) == -1) {         
				        random_array.push(random_number);        
				    }
				}
				var new_value = 0;
				var current_button = {};
				for(var i = 0; i < 10; i++)	{
					current_button = $('.button-js[data-position='+i+']');
					new_value = random_array[i];
					//data() кешируется
					current_button.data('value', new_value).attr('data-value', new_value);
					current_button.text(new_value);
				
				}
			}
		};


    	digital_keyboard.init();

    	//button
		jBody.on('click', '.button-js', function(){
			var display = $('.display-js');
			var new_display_value = "";
			var currnet_display_value = display.val();
			if(currnet_display_value.length < digital_keyboard.pin_code_length){
				new_display_value = currnet_display_value + $(this).data("value");
				display.val(new_display_value);

				digital_keyboard.mixed();	
			}	
		});

		//Cancel
		jBody.on('click', '.cancel-js', function(){
			var display = $('.display-js');
			var currnet_display_value = display.val();	
			var new_display_value = currnet_display_value.slice(0,-1);
			display.val(new_display_value);
		});

		//Clear
		jBody.on('click', '.clear-js', function(){
			$('.display-js').val("");		
		});

		//Enter
		jBody.on('click', '.enter-js', function(){
			if($('.display-js').val().length > 0){
				alert($('.display-js').val());		
			}
		});

		//Hide
		jBody.on('click', '.hide-js', function(){
			var display = $('.display-js');
			if($('.display-block-js').hasClass('visible')) {
	            display.prop('type', 'password');
	            display.attr('type', 'password');
	            $('.display-block-js').removeClass('visible');
	        } else {
	            display.prop('type', 'text');
	            display.attr('type', 'text');
	            $('.display-block-js').addClass('visible');
	        }
		});
    })
})(jQuery);