logger.info('Beginning Allergy XML to HL7 transformation');

tmp['MSH']['MSH.1'] = msg['header']['fieldSeparator'].toString();
tmp['MSH']['MSH.2'] = msg['header']['encodingCharacters'].toString();
tmp['MSH']['MSH.4'] = msg['header']['sendingFacility'].toString();
tmp['MSH']['MSH.6'] = msg['header']['recievingFacility'].toString();
tmp['MSH']['MSH.9'] = msg['header']['messageType'].toString();
tmp['MSH']['MSH.10'] = msg['header']['messageControlID'].toString();
tmp['MSH']['MSH.11'] = msg['header']['messageProcessingID'].toString();
tmp['MSH']['MSH.12'] = msg['header']['hl7Version'].toString();

logger.info('Looping over ' + msg['allergies']['allergy'].length() + ' allergies');
var al1SegmentList = new XMLList();
for(var i = 0; i < msg['allergies']['allergy'].length(); i++) {
  var newSegment = new XML('<AL1/>');
  newSegment['AL1.1'] = msg['allergies']['allergy'][i]['order'].toString();
  newSegment['AL1.2'] = msg['allergies']['allergy'][i]['type'].toString();
  newSegment['AL1.3'] = msg['allergies']['allergy'][i]['code'].toString() + '^';
  newSegment['AL1.3']['AL1.3.1'] = msg['allergies']['allergy'][i]['drugName'].toString();
  newSegment['AL1.5'] = msg['allergies']['allergy'][i]['reaction'].toString();
  logger.info('adding new AL1 segment with the order of ' + (i+1));
  al1SegmentList += newSegment;
}
tmp['AL1'] = al1SegmentList;
logger.info('Allergy XML to HL7 transformation complete');
