(function ($) {
  Drupal.behaviors.imageFieldCaption = {
    attach: function (context, settings) {
      // remove localStorage on fresh load
      // count number of images
      var image_count = $('table > tbody > tr').length;
      if (image_count == 0) {
        // remove all localStorage
        for (var i = 0; i < localStorage.length; i++) {
          localStorage.removeItem(i);
        }
      } else if (image_count > 0) {
        for (var i = 0; i < localStorage.length; i++){
          var item = localStorage.getItem(i);
          $('#edit-field-image-und-'+ i +'-caption').val(item);
        } 
      }
      // save captions in localStorage
      $('div.field-type-image input.form-submit').on('mousedown',function(e) {
        var button_type = e.currentTarget.id.substring(e.currentTarget.id.length - 13);
//        console.log(button_type);i
        
        // get the caption id
        var capids = $(this).attr('id').replace(/\D/g,'');

        if (button_type == 'upload-button') {
          var capids_m1 = capids-1;
          // set the value of the captions
          localStorage.setItem(capids_m1,  $('#edit-field-image-und-'+ capids_m1 +'-caption').val());
        }
        //TODO: add remove button case
        if (button_type == 'remove-button') {
          // remove that row from localStorage on mousedown
          //localStorage.removeItem(capids);
          // re-arrange the keys to match the new set of images 
          //by re-saving all values of keys higher than the removed key with the value of key +1
//          for (capids; capids < localStorage.length; capids++) {
//            if...
//            var capids_p1 = capids + 1;
//            console.log(capids_p1);
//            var capids_p1_val = localStorage.getItem(capids_p1);
//            console.log(capids_p1_val);
//          }
          // remove the last item

        }

        //TODO: add re-order case (may just work, needs more testing)
      });
    }
  };

  $(document).ajaxComplete(function(e) {
    // set the value of the captions from localStorage
    for (var i = 0; i < localStorage.length; i++){
      var item = localStorage.getItem(i);
      $('#edit-field-image-und-'+ i +'-caption').val(item);
    }
  });
})(jQuery);
