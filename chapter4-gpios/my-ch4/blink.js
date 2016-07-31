//#A Import the onoff library
var onoff = require('onoff');

var Gpio = onoff.Gpio,
  //#B Initialize pin 4 to be an output pin
  led = new Gpio(4, 'out'),
  interval;


//#C This interval will be called every 2 seconds
interval = setInterval(function () {
  //#D Synchronously read the value of pin 4 and transform 1 to 0 or 0 to 1
  var value = (led.readSync() + 1) % 2;
  //#E Asynchronously write the new value to pin 4
  led.write(value, function() {
    console.log("Changed LED state to: " + value);
  });
}, 2000);


//#F Listen to the event triggered on CTRL^C
process.on('SIGINT', function () {
  clearInterval(interval);
  //#G  Cleanly close the GPIO pin before exiting
  led.writeSync(0);
  led.unexport();
  console.log('Bye, bye!');
  process.exit();
});

