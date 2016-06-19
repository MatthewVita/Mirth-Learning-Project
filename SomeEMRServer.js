var net = require('net');
var mllp = require('mllp-node');

var sampleHL7Message = '';
sampleHL7Message += 'MSH|^~&||Facility B||Facility A|||ALLERGY|Q47900293T431430612|P923FAS89DFJ2ADSF|2.3\r\n';
sampleHL7Message += 'AL1|1|DRUG|00000983^AMPICILLIN||RASH\r\n';
sampleHL7Message += 'AL1|2|DRUG|00000741^OXYCODONE||HYPOTENSION\r\n';

console.info('Starting SomeEMRServer on port 9003');
var server = new mllp.MLLPServer('127.0.0.1', 9003);

server.on('hl7', function(data){
  console.info('HL7 message recieved, updating internal database with: \n' + data.split('\r').join('\n'));
});

function sender() {
  // TODO: make pull request for `mllp-node` to allow for proper
  // sending of MLLP messages... these character wrappers are a
  // workaround for now.
  var VT = String.fromCharCode(0x0b);
  var FS = String.fromCharCode(0x1c);
  var CR = String.fromCharCode(0x0d);

  var client = net.connect({
      port: 9002
  }, function () {
    console.info('Sending message to SomeEMR Mirth Channel');
    client.write(VT + sampleHL7Message + FS + CR);
  });

  client.on('data', function () {
    client.end();
  });
}

// After 3 seconds, send an HL7 message
setTimeout(sender, 3000);
