var express = require('express');
var xmlparser = require('express-xml-bodyparser');
var request = require('request');
var server = express();
server.use(xmlparser());

sampleXMLMessage = '';
sampleXMLMessage += '<?xml version="1.0" encoding="UTF-8"?>';
sampleXMLMessage += '<hl7Message>';
sampleXMLMessage += '  <header>';
sampleXMLMessage += '    <fieldSeparator>|</fieldSeparator>';
sampleXMLMessage += '    <encodingCharacters>^~\&amp;</encodingCharacters>';
sampleXMLMessage += '    <sendingFacility>Facility A</sendingFacility>';
sampleXMLMessage += '    <recievingFacility>Facility B</recievingFacility>';
sampleXMLMessage += '    <messageType>ALLERGY</messageType>';
sampleXMLMessage += '    <messageControlID>Q479004375T431430612</messageControlID>';
sampleXMLMessage += '    <messageProcessingID>P28F82APF18A8FJ2AO</messageProcessingID>';
sampleXMLMessage += '    <hl7Version>2.3</hl7Version>';
sampleXMLMessage += '  </header>';
sampleXMLMessage += '  <allergies>';
sampleXMLMessage += '    <allergy>';
sampleXMLMessage += '      <order>1</order>';
sampleXMLMessage += '      <type>DRUG</type>';
sampleXMLMessage += '      <code>00000543</code>';
sampleXMLMessage += '      <drugName>TYLENOL</drugName>';
sampleXMLMessage += '      <reaction>HIVES</reaction>';
sampleXMLMessage += '    </allergy>';
sampleXMLMessage += '    <allergy>';
sampleXMLMessage += '      <order>2</order>';
sampleXMLMessage += '      <type>DRUG</type>';
sampleXMLMessage += '      <code>00000239</code>';
sampleXMLMessage += '      <drugName>IBUPROFEN</drugName>';
sampleXMLMessage += '      <reaction>HIVES</reaction>';
sampleXMLMessage += '    </allergy>';
sampleXMLMessage += '  </allergies>';
sampleXMLMessage += '</hl7Message>'.replace(/\s+/g, ' ').trim();

server.post('/allergy', function(req, res) {
  res.send('Success');
  console.info('XML payload recieved, updating AllergyTracker internal database with: \n', req.rawBody);
});

console.info('Starting AllergyTrackerServer on port 9001');
server.listen(9001);

function sender() {
  console.info('Sending message to AllergyTracker Mirth Channel');

  request({
    method: 'POST',
    url: 'http://127.0.0.1:9000',
    body: sampleXMLMessage,
    headers: { 'Content-Type': 'application/xml' }
  });
}

// After 5 seconds, send an XML message
setTimeout(sender, 5000);
