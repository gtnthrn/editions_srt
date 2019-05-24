

// Load the xml file using ajax 
    $.ajax({
        url: 'xml-file/test.xml',
        dataType: 'xml',
        method: 'get',
        success: function (xml) {
                // Parse the xml file and get data
            $(xml).find('body').each(function (){
                $('#contenu').append($(this).html());
            });
        },
        error: function (){
            $('#contenu').text('failed to load your file');
        }
    });

$(document).ajaxComplete(function(){ //wait ajax import is complete

    var beginFirst; //time at the first
    var silenceIntro = "";
    
    beginFirst = ($('p').first().attr('begin').slice(0, -1))*15; 
    
        for (var i = 0; i < beginFirst; i++) {
            silenceIntro = silenceIntro+". . ";
            }
    
    
    $('p').first().before("<span class='intro'>"+silenceIntro+"</span>");
        
    
    
    $( 'p' ).each(function() {
    
     	var begin;
     	var end;
     	var speakDuration;
     	var beginNext;
     	var space;
     	var num;
     	var height;
        var silence = "";
        var fontSize;
    
    
        num = ($(this).attr('id').substring(1)); // change attr 'id' to numeral value
        begin = ($(this).attr('begin').slice(0, -1)); // change attr 'begin' to numeral value
        end = ($(this).attr('end').slice(0, -1));	// change attr 'end' to numeral value
        beginNext = ($(this).next().attr('begin').slice(0, -1)); // time value at which the next 'p' begins
        speakDuration = (end - begin);	// calculate the sentence speakDuration
        space = (beginNext-end)*15; // ratio spacing
        fontSize = speakDuration*10; // ratio fontSize
        fontWeight = speakDuration*150; // ratio fontWeight
    
    
        $(this).css({'font-size': fontSize+'pt'});
        $(this).css({'font-weight': fontWeight});
    
    
    
        for (var i = 0; i < space; i++) {
            silence = silence+". . ";
            }
    
       $(this).after("<p class='space'>"+silence+"</p>");
    });

    
});





