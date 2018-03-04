const Stomp = require('stompjs');
const Googlehome = require('google-home-notifier');
const language = 'ja';
var ip = 'xx.xx.xx.xx'; //ここにIPを記載

Googlehome.device('', language);
Googlehome.ip(ip, language);

var client;  // stompクライアント

var stompFailureCallback = function (error) {
    console.log('STOMP: ' + error);
    client = Stomp.overWS('ws://localhost:8080/endpoint');
    setTimeout(stompConnect, 5 * 60 * 1000);
    console.log('STOMP: Reconecting in 5 minutes');
};

var stompSuccessCallBack = function (frame) {
    console.log('connected to Stomp');
    client.subscribe('/topic/notification', function (data) {

        var obj = JSON.parse(data.body);
        console.log("received message " + obj.message);

        Googlehome.notify(obj.message , function(res) {
            console.log(res);
        });

    });
}

var stompConnect = function() {
    client = Stomp.overWS('ws://localhost:8080/endpoint');
    console.log('connecting to Stomp');
    client.connect('', '', stompSuccessCallBack, stompFailureCallback);
}

stompConnect();
