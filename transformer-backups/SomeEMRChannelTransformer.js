logger.info('Beginning Allergy HL7 to XML transformation');

tmp['header']['fieldSeparator'] = msg['MSH']['MSH.1'].toString();
tmp['header']['encodingCharacters'] = msg['MSH']['MSH.2'].toString();
tmp['header']['sendingFacility'] = msg['MSH']['MSH.4']['MSH.4.1'].toString();
tmp['header']['recievingFacility'] = msg['MSH']['MSH.6']['MSH.6.1'].toString();
tmp['header']['messageType'] = msg['MSH']['MSH.9']['MSH.9.1'].toString();
tmp['header']['messageControlID'] = msg['MSH']['MSH.10']['MSH.10.1'].toString();
tmp['header']['messageProcessingID'] = msg['MSH']['MSH.11']['MSH.11.1'].toString();
tmp['header']['hl7Version'] = msg['MSH']['MSH.12']['MSH.12.1'].toString();

logger.info('Looping over ' + msg['AL1'].length() + ' allergies');
var allergies = new XMLList();
for(var i = 0; i < msg['AL1'].length(); i++) {
  var allergyXmlEntry =  new XML('<allergy/>');
  allergyXmlEntry['order'] = msg['AL1'][i]['AL1.1']['AL1.1.1'].toString();
  allergyXmlEntry['type'] = msg['AL1'][i]['AL1.2']['AL1.2.1'].toString();
  allergyXmlEntry['code'] = msg['AL1'][i]['AL1.3']['AL1.3.1'].toString();
  allergyXmlEntry['drugName'] = msg['AL1'][i]['AL1.3']['AL1.3.2'].toString();
  allergyXmlEntry['reaction'] = msg['AL1'][i]['AL1.5']['AL1.5.1'].toString();
  allergies += allergyXmlEntry;
}

tmp['allergies'] = new XML('<allergies/>').appendChild(allergies);

logger.info('Allergy HL7 to XML transformation complete');
