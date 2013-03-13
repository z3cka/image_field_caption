(function ($) {
  Drupal.behaviors.imageFieldCaption = {
    attach: function (context, settings) {
      var cap = {};
      // remove localStorage on fresh load
      // get number of images
      $.each($('table'), function() {
        if ($(this).attr('id').length > 0) {
          cap.field_name = $(this).attr('id').substring(0, $(this).attr('id').length - 10);
        }
      });
      cap.count = $('table > tbody > tr').length - 6;
      if (cap.count <= 0) {
        // remove all localStorage
        var i = 0;
//        while (localStorage.length >= 1) {
//          localStorage.removeItem(i);
//          i++;
//        }
      } else if (cap.count > 0) {
        for (var i = 0; i < localStorage.length; i++){
          var item = localStorage.getItem(i);
          $('#'+ cap.field_name +'-und-'+ i +'-caption').val(item);
        } 
      }
      // save captions in localStorage
      $('div.field-type-image textarea').blur(function(e) {
        cap.id = $(this).attr('id').replace(/\D/g,'');
        cap.text = $('#'+ $(this).attr('id')).val();
        localStorage.setItem(cap.id, cap.text);
      });
      // event for removing caption from removed image
      $('body.page-node-add div.field-type-image input.form-submit, ' +
        'body.page-node-edit div.field-type-image input.form-submit').mousedown(function(e) {
        var button = {};
        button.type = e.currentTarget.id.substring(e.currentTarget.id.length - 13);
        if (button.type == 'remove-button') {
          // get the button id
          button.id = $(this).attr('id').replace(/\D/g,'');
          cap.count_m1 = cap.count - 1;
          // if last item, just delete it
          if (button.id == cap.count_m1) {
            localStorage.removeItem(button.id);
          } else {
            //TODO: remove other items than the last one
            localStorage.removeItem(button.id);
            alert("Sorry, you may have to manually fix your captions. We're working on this!");
          }
        }
      });
    }
  };
})(jQuery);
