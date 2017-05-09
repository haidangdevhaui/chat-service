var _cs = window._cs || {};
_cs.chatBox = "";
_cs.chatBox += "<div class=\"chat-window col-xs-5 col-md-3\" id=\"chat_window_1\">";
_cs.chatBox += "    <div class=\"col-xs-12 col-md-12\">";
_cs.chatBox += "    	<div class=\"panel panel-default\">";
_cs.chatBox += "            <div class=\"panel-heading top-bar\">";
_cs.chatBox += "                <div class=\"col-md-8 col-xs-8\">";
_cs.chatBox += "                    <span class=\"glyphicon glyphicon-envelope\"><\/span>  <span class=\"panel-title\">Chat Service<\/span>";
_cs.chatBox += "                <\/div>";
_cs.chatBox += "                <div class=\"col-md-4 col-xs-4\" style=\"text-align: right;\">";
_cs.chatBox += "                    <a href=\"#\"><span id=\"minim_chat_window\" class=\"glyphicon glyphicon-minus icon_minim\"><\/span><\/a>";
_cs.chatBox += "                    <a href=\"#\"><span class=\"glyphicon glyphicon-trash icon_trash\" data-id=\"chat_window_1\"><\/span><\/a>";
_cs.chatBox += "                <\/div>";
_cs.chatBox += "            <\/div>";
_cs.chatBox += "            <div class=\"panel-body msg_container_base\">";
_cs.chatBox += "                ";
_cs.chatBox += "            <\/div>";
_cs.chatBox += "            <div class=\"panel-footer\">";
_cs.chatBox += "                <div class=\"input-group\">";
_cs.chatBox += "                    <input id=\"btn-input\" type=\"text\" class=\"form-control input-sm chat_input\" placeholder=\"Write your message here...\" \/>";
_cs.chatBox += "                    <span class=\"input-group-btn\">";
_cs.chatBox += "                    <button class=\"btn btn-danger btn-sm\" id=\"btn-chat\"><span class=\"glyphicon glyphicon-ok\"></span> Send<\/button>";
_cs.chatBox += "                    <\/span>";
_cs.chatBox += "                <\/div>";
_cs.chatBox += "            <\/div>";
_cs.chatBox += "		<\/div>";
_cs.chatBox += "    <\/div>";
_cs.chatBox += "<\/div>";
_cs.styleCommon = '<link rel="stylesheet" href="'+_cs.n+'//'+ _cs.cl +'/assets/css/chatbox.css">';
_cs.styleBootstrap = '<link rel="stylesheet" href="'+_cs.n+'//'+ _cs.cl +'/assets/css/bootstrap.min.css">';
_cs.sv = _cs.sv ? _cs.sv : 'api-haidangdev.herokuapp.com';
(function() {
    var script = document.createElement("SCRIPT");
    script.src = _cs.n+'//'+ _cs.cl +'/assets/js/require.js';
    script.type = 'text/javascript';
    script.onload = function() {
        requirejs.config({
            paths: {
                jquery: 'http://code.jquery.com/jquery',
                io: _cs.n+'//'+ _cs.sv +'/socket.io/socket.io.js'
            }
        });
        requirejs(['jquery', 'io'], function($, io) {
            $('body').append(_cs.styleBootstrap);
            $('body').append(_cs.styleCommon);
            $('body').append(_cs.chatBox);
            $(document).on('click', '.panel-heading span.icon_minim', function(e) {
                var $this = $(this);
                if (!$this.hasClass('panel-collapsed')) {
                    $this.parents('.panel').find('.panel-body').slideUp('fast');
                    $this.addClass('panel-collapsed');
                    $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
                } else {
                    $this.parents('.panel').find('.panel-body').slideDown('fast');
                    $this.removeClass('panel-collapsed');
                    $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
                }
            });
            $(document).on('focus', '.panel-footer input.chat_input', function(e) {
                var $this = $(this);
                if ($('#minim_chat_window').hasClass('panel-collapsed')) {
                    $this.parents('.panel').find('.panel-body').slideDown('fast');
                    $('#minim_chat_window').removeClass('panel-collapsed');
                    $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
                }
            });
            $(document).on('click', '#new_chat', function(e) {
                var size = $(".chat-window:last-child").css("margin-left");
                size_total = parseInt(size) + 400;
                alert(size_total);
                var clone = $("#chat_window_1").clone().appendTo(".container");
                clone.css("margin-left", size_total);
            });
            $(document).on('click', '.icon_close', function(e) {
                $("#chat_window_1").remove();
            });
            $(document).on('click', '.icon_trash', function(e) {
                _cs.clearAllMessage();
            });
            _cs.appendMessage = function(type, msg) {
                var htmlMsg = '';
                if (type == 'send' || type == 'client') {
                    htmlMsg += '<div class="row msg_container base_sent">'
                    htmlMsg += '<div class="col-md-10 col-xs-10">'
                    htmlMsg += '<div class="messages msg_sent">'
                    htmlMsg += '<p>' + msg.text + '</p>'
                    htmlMsg += '<time datetime="2009-11-13T20:00">' + msg.timer + '</time>'
                    htmlMsg += '</div>'
                    htmlMsg += '</div>'
                    htmlMsg += '<div class="col-md-2 col-xs-2 avatar">'
                    htmlMsg += '<img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive ">'
                    htmlMsg += '</div>'
                    htmlMsg += '</div>'
                } else {
                    htmlMsg += '<div class="row msg_container base_receive">'
                    htmlMsg += '<div class="col-md-2 col-xs-2 avatar">'
                    htmlMsg += '<img src="' + _cs.AdminAvatar + '" class=" img-responsive ">'
                    htmlMsg += '</div>'
                    htmlMsg += '<div class="col-md-10 col-xs-10">'
                    htmlMsg += '<div class="messages msg_receive">'
                    htmlMsg += '<p>' + msg.text + '</p>'
                    htmlMsg += '<time datetime="2009-11-13T20:00">' + msg.timer + '</time>'
                    htmlMsg += '</div>'
                    htmlMsg += '</div>'
                    htmlMsg += '</div>'
                }
                $('.msg_container_base').append(htmlMsg);
                $('.msg_container_base').animate({
                    scrollTop: $('.msg_container_base').prop("scrollHeight")
                }, 'fast');
            }
            _cs.currentTimer = function() {
                var d = new Date();
                var timer = (d.getHours().toString().length == 1 ? '0' + d.getHours() : d.getHours()) + ':' + (d.getMinutes().toString().length == 1 ? '0' + d.getMinutes() : d.getMinutes()) + ':' + (d.getSeconds().toString().length == 1 ? '0' + d.getSeconds() : d.getSeconds());
                return timer;
            }
            _cs.clientStorage = function(){
                var current = Date.now();
                if(localStorage.getItem('CLientID')){
                    if(current < parseInt(localStorage.getItem('ClientIDExp'))){
                        return localStorage.getItem('ClientID');
                    }else{
                        var ClientID = Math.floor((Math.random() * 10000000000)),
                            ClientIDExp = current + 24*60*60*1000;
                    }
                }else{
                    var ClientID = Math.floor((Math.random() * 10000000000)),
                        ClientIDExp = current + 24*60*60*1000;
                }
                localStorage.setItem('CLientID', ClientID);
                localStorage.setItem('ClientIDExp', ClientIDExp);
                return ClientID;
            }
            _cs.loadMessage = function(){
                $.ajax({
                    url: _cs.n+'//'+ _cs.sv + '/api/chat-service/messages/'+_cs.ClientID,
                    type: 'get',
                    success: function(res){
                        _cs.isUsed = true;
                        for(var i = 0; i < res.length; i ++){
                            _cs.appendMessage(res[i].person, {
                                text: res[i].text,
                                timer: res[i].timer
                            });
                        }
                    }
                })
            }
            _cs.clearAllMessage = function(){
                if(!_cs.isUsed){
                    return;
                }
                $.ajax({
                    url: _cs.n+'//'+ _cs.sv + '/api/chat-service/messages/'+_cs.ClientID + '/empty',
                    type: 'get',
                    success: function(res){
                        $('.msg_container').not('.msg_default').remove();
                    }
                })
            }
            _cs.ClientID = _cs.clientStorage();
            _cs.AdminID = _cs.cr;
            _cs.ioConnect = _cs.n+'//'+ _cs.sv +'/chat_service';
            _cs.socket = io(_cs.ioConnect, {
                query: 'AdminID=' + _cs.AdminID + '&ClientID=' + _cs.ClientID + '&isClient=true'
            });
            _cs.socket.on('ClientReceivedMessage' + _cs.ClientID, function(msg) {
                _cs.isUsed = true;
                _cs.appendMessage('receive', msg);
            });
            _cs.socket.on('AdminStatus' + _cs.AdminID, function(info) {
                $('.panel-title').text(info.status == 0 ? 'Offline' : 'Online');
                if (info.status == 1) {
                    _cs.AdminName = info.AdminName;
                    _cs.AdminAvatar = info.AdminAvatar;
                    $('.msg_container_base').html('<div class="msg_default row msg_container base_receive"><div class="col-md-2 col-xs-2 avatar"><img src="' + info.AdminAvatar + '" class=" img-responsive "></div><div class="col-md-10 col-xs-10"><div class="messages msg_sent"><p>Hello! I\'m ' + info.AdminName + '.Can i help you?</p><time datetime="2009-11-13T20:00">' + _cs.currentTimer() + '</time></div></div></div>');
                    $('.panel-footer').show();
                } else {
                    var _sr = '<div class="row msg_container base_receive"><div class="col-md-12 col-xs-12"><div class="messages msg_sent"><p>Sorry guy!Now, we are offine, please leave a message for us!</p><hr/>';
                    _sr += '<form method="post" class="_cs_contact_form">';
                    _sr += '<input class="form-control" placeholder="enter your email" required name="email"/>';
                    _sr += '<input class="form-control" placeholder="enter your phone" required name="phone"/>';
                    _sr += '<textarea class="form-control" placeholder="content..." required name="content"></textarea>';
                    _sr += '<button class="btn btn-danger btn-group btn-group-justified"><span class="glyphicon glyphicon-send"></span> Send</button>';
                    _sr += '</form>';
                    _sr += '</div></div></div>';
                    $('.msg_container_base').html(_sr);
                    $('.panel-footer').hide();
                }
            })
            _cs.loadMessage();
            $('#btn-chat').click(function() {
                if($('#btn-input').val() == ''){
                    return;
                }
                var message = {
                    timer: _cs.currentTimer(),
                    text: $('#btn-input').val()
                }
                var btn = $(this);
                btn.attr('disabled', '');
                _cs.socket.emit('ClientSendMessage' + _cs.ClientID, message, function(msg) {
                    _cs.isUsed = true;
                    _cs.appendMessage('send', msg);
                    $('#btn-input').val('');
                    btn.removeAttr('disabled');
                });
            });
            $(document).on('submit', '._cs_contact_form', function(e){
                e.preventDefault();
                var data = 
                $.ajax({
                    url: _cs.n+'//'+ _cs.sv + '/api/chat-service/messages/offline',
                    type:'POST',
                    data: {
                        email: e.target.email.value,
                        phone: e.target.phone.value,
                        content: e.target.content.value
                    },
                    success: function(res){
                        $('._cs_contact_form').parent().append('Successfully!');
                        $('._cs_contact_form').remove();
                    }
                });
            });
        });
    }
    document.getElementsByTagName("head")[0].appendChild(script);
})();