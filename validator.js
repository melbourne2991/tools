
     function valid(scope) {
         var valid = true;
         var required_text_fields   = $('input[type="text"].required');
         var required_radios        = $('input[type="radio"].required');
         var required_checkbox      = $('input[type="checkbox"]');
         var required_match         = $('input[type="text"][data-match-with]');
         var handleTextError = function(input) {
             var input = $(input);
             var error_element = input.data('text-error');
             console.log(error_element);

             $(error_element).show();
         }

         $('div.error').hide();

         var reqs = [required_checkbox,required_radios,required_match,required_text_fields];

         _.forEach(reqs, function(inputs) {
             var inputs = $(inputs);
             inputs.on('focus', function() {
                 $(this).removeClass('error');
                 if($(this).data('text-error') !== '') {
                     $($(this).data('text-error')).hide();
                 }
             })
         });


         $([required_checkbox,required_radios,required_match,required_text_fields]).on('focus', function() {
            $(this).removeClass('error');

             if($(this).data('text-error')) {
                 $($(this).data('text-error')).hide();
             }
         });

         _.forEach(required_text_fields, function(input, i) {
            var input = $(input);

             if(input.val().trim() === '' || !input.val()) {
                input.addClass('error');
                input.prop('placeholder', 'This field is required.');
                input.data('error-type', 'required');

                valid = false;
             }

         });

         _.forEach(required_match, function(input, i) {
             var input = $(input);
             var match = $(input.data('match-with'));

             if(input.val().toLowerCase().trim() !== match.val().toLowerCase().trim()) {
                 valid = false;

                 $(input).data('error-type', 'match');
                 $(match).data('error-type', 'match')

                 handleTextError(input);
             }
         });

         _.forEach(required_radios, function(radio, i) {
            var radio = $(radio);
            var name = radio.attr('name');
            var checked = false;

             _.forEach($('input[name="' + name +'"]'), function(same, i) {
                var same = $(same);

                if(same.prop('checked')) {
                    checked = true;
                }
             });

             if(!checked) {
                 valid = false;
                 handleTextError(radio);
             }
         });

         _.forEach(required_checkbox, function(checkbox, i) {
            var checkbox = $(checkbox);
            if(!checkbox.prop('checked')) {
                valid = false
                handleTextError(checkbox);
            }
         });

         return valid;
     }
 });