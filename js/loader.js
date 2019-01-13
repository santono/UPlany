loader=(function() {
    ajaxLoader=function () {
        $('body').append('<div id="loadingDiv"></div>');

        $('#loadingDiv')
                .append('<p id="loadingText"></p>')
            // src     .css('background', 'url(' + Xrm.Page.context.getServerUrl() + '/WebResources/new_ajax.gif) no-repeat 50% 25%')
                .css('background', 'url(img/ajaxwait.gif) no-repeat 50% 25%')
                .css('padding-top', '10vmin')
                .css('background-color', '#E5E5E5')
                .css('border', '3px solid #00008B')
                .css('height', '30vmin')
                .css('width', '30vmax')
                .css('opacity','0.7')
                .css('position','fixed')
                .css('left','35vmax')
                .css('top','35vmin')
//                .center()
//                .css('margin','0 auto')
                .hide(); // изначально скрываем сообщение

        $('#loadingText')
                .css('text-align', 'center')
                .css('font', '20px bolder')
                .css('font-family', 'Segoe UI, Tahoma, Arial');
    }

    ajaxFinished = function() {
        $('body').append('<div id="finishedDiv"></div>');

        $('#finishedDiv')
                .append('<p id="finishedText"></p>')
            // src     .css('background', 'url(' + Xrm.Page.context.getServerUrl() + '/WebResources/new_ajax.gif) no-repeat 50% 25%')
            //  correct     .css('background', 'url(resources/images/ajaxwait.gif) no-repeat 50% 25%')
                .css('padding-top', '10vmin')
                .css('background-color', '#E5E5E5')
                .css('border', '3px solid #00008B')
                .css('height', '30vmin')
                .css('width', '30vmax')
//                .center()
                .css('position','fixed')
                .css('left','35vmax')
                .css('top','35vmin')
//                .css('margin','0 auto')
                .hide(); // изначально скрываем сообщение

        $('#finishedText')
                .css('text-align', 'center')
                .css('font', '20px bolder')
                .css('font-family', 'Segoe UI, Tahoma, Arial');
    }
	hideLoader=function() {
        $('#loadingDiv').hide();
        $('#finishedDiv').hide();
	}
	initLoader=function() {
		ajaxLoader();
		ajaxFinished();
	}
    
    showWaitMessage=function (message) {
        $('#loadingText').text(message);
        $('#loadingDiv').show();
    }
    
	showFinishedMessage=function(result) {
        $('#finishedText').text(result);
        $('#finishedDiv').show();
        let idt=setTimeout(function() {
                  $('#finishedDiv').hide();
                  clearTimeout(idt);
                } , 500*3);
    }
	ajaxLoader();
	ajaxFinished();
	return {
		showWait: showWaitMessage,
		hideWait: hideLoader,
		showFinished:showFinishedMessage
	}
}());
