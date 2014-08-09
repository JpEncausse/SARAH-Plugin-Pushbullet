
var pusher = false;

exports.init = function(SARAH){
  if (pusher) return;
  
  var config = SARAH.ConfigManager.getConfig();
      config = config.modules.pushbullet;
      
  var PushBullet = require('./lib/pushbullet');
  pusher = new PushBullet(config.key);
  
  var stream = pusher.stream();
  
  stream.on('connect', function() {
    console.log('Connect to pushbullet stream');
  });
  
  stream.on('close', function() {
     console.log('Pushbullet stream closed');
     console.log('Try to reconnect...');
     stream.connect();
  });  
  
  stream.on('error', function(error) {
    console.log('Pushbullet stream error:', error);
  });
  
  stream.on('push', function(push) {
    console.log('Pushbullet stream push:', push);
    SARAH.run('pushbullet', push); // forward to pushbullet
  });
  
  stream.connect();
}

exports.action = function(data, callback, config, SARAH){
  callback(data);
}
