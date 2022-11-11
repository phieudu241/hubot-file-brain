var fs = require('fs');
var path = require('path');

module.exports = function (robot) {
  var brainPath, data, error;
  brainPath = process.env.FILE_BRAIN_PATH || '/var/hubot';
  brainPath = path.join(brainPath, 'brain-dump.json');

  robot.respond(/brain load/i, function (msg) {
    robot.brain.emit('loaded', robot.brain.data);
    return msg.send('Brain loaded');
  });

  if (process.env.TRIGGER_BRAIN_LOAD_TIMEOUT) {
    setTimeout(function () {
      robot.brain.emit('loaded', robot.brain.data);
    }, process.env.TRIGGER_BRAIN_LOAD_TIMEOUT * 1000);
  }

  try {
    data = fs.readFileSync(brainPath, 'utf-8');
    if (data) {
      robot.brain.mergeData(JSON.parse(data));
    }
  } catch (_error) {
    error = _error;
    if (error.code !== 'ENOENT') {
      console.log('Unable to read file', error);
    }
  }
  return robot.brain.on('save', function (data) {
    return fs.writeFileSync(brainPath, JSON.stringify(data), 'utf-8');
  });
};
