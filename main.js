'use strict';

var peer = new Peer({key: 'vu2ycuwq5axj38fr'});

peer.on('open', function(id) {
  console.log('My peer is: ' + id);
});

var conn = peer.connect('dest-peer-id');

conn.on('open', function() {
  conn.on('data', function(data) {
    console.log('received', data);
  });

  conn.send('hello!');
});

function mediaStream() {
  return navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true
  });
}

var call = peer.call('dest-peer-id', mediaStream);

peer.on('call', function(call) {
  call.answer(mediaStream);
});