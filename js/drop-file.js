$(document).on('dragenter', '#dropfile', function() {
            $(this).css('border', '3px dashed red');
            return false;
});
 
$(document).on('dragover', '#dropfile', function(e){
            e.preventDefault();
            e.stopPropagation();
            $(this).css('border', '3px dashed red');
            return false;
});
 
$(document).on('dragleave', '#dropfile', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).css('border', '3px dashed #BBBBBB');
            return false;
});


$(document).on('drop', '#dropfile', function(e) {
            if(e.originalEvent.dataTransfer){
                       if(e.originalEvent.dataTransfer.files.length) {
                                   // Stop the propagation of the event
                                   e.preventDefault();
                                   e.stopPropagation();
                                   $(this).css('border', '3px dashed green');
                                   // Main function to upload
                                   upload(e.originalEvent.dataTransfer.files);
                       }  
            }
            else {
                       $(this).css('border', '3px dashed #BBBBBB');
            }
            return false;
});


function upload(files) {
            var f = files[0] ;

            // Only process image files.
            if (!f.type.match('image/jpeg')) {
                       alert(‘The file must be a jpeg image’) ;
                       return false ;
            }
            var reader = new FileReader();
 
            // When the image is loaded,
            // run handleReaderLoad function
            reader.onload = handleReaderLoad;
 
            // Read in the image file as a data URL.
            reader.readAsDataURL(f);            
}

function handleReaderLoad(evt) {
            var pic = {};
            pic.file = evt.target.result.split(',')[1];
 
            var str = jQuery.param(pic);
 
            $.ajax({
                       type: 'POST',
                       url: ‘url_to_php_script.php’,
                       data: str,
                       success: function(data) {
                                   do_something(data) ;
                       }
            });
}