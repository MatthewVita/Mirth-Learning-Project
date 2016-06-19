# Mirth Learning Project

A trivial example project for my learning about Mirth.

## Overview

Summary: Foobar Hospital System is integrating AllergyTracker application (trivial application for this demo). Currently, patient records live in a EMR called SomeEMR. When an allergy is entered into this the EMR, the AllergyTracker needs to update its database with this new allergy. Similarly, when an allergy is entered into AllergyTracker, SomeEMR needs to update its database with this new allergy. This integration must be engineered with the future in mind because Foobar Hospital System is currently evaluating YetAnotherEMR which they wish to implement into their hospital system. This additional EMR will also need up-to-date allergy information by synchronizing with the other two medical systems.

Technical Overview: SomeEMR "speaks” HL7 via MLLP, both inbound and outbound. AllergyTracker "speaks” XML via HTTP, both inbound and outbound. YetAnotherEMR will "speak” JSON via HTTP inbound and HL7 via MLLP outbound.

Solution: The integration team has determined that Mirth, an interface engine, will be a good fit for synchronizing these systems. Messages from SomeEMR to AllergyTracker will be handled on a Mirth channel that listens for the HL7 message, transforms it to XML, and performs an HTTP POST. Messages from AllergyTracker to SomeEMR will be handled on a Mirth channel that recieves HTTP POST XML requests, transforms it to HL7, and publishes the message. In the future, a new channel can be added for YetAnotherEMR that transform messages and the existing channels will be given an additional destination which will route messages to all necessary receiving systems to ensure data is synchronized.

## Notes
- SomeEMR and AllergyTracker are mocked out in the sense that they don't actually have a database or anything functional.
- Only type of HL7 messages passed around are patient allergies.
- After 3 seconds, SomeEMR sends an HL7 message to Mirth, which goes to AllergyTracker.
- After 5 seconds, AllergyTracker POSTs an XML payload to Mirth, which goes to SomeEMR.
- Transformers are backed up in their own JavaScript files for demonstration purposes. Best to edit them in Mirth using the built in editor.
- The data/use case are totally bogus. I plan on sending this around to some friends that are familiar with Mirth and HL7 so that they can provide a more realistic use case. Would ultimately like for this to serve as a good educational resource for those starting out with Mirth.
- Need to mock out "YetAnotherEMR" to demonstrate multiple destinations.
- `node-mllp` package needs to provide a better way to send messages. A workaround is in place, but I plan on submitting a PR to fix this the right way.

## Setup

Setup Mirth on your machine, login into admin console, and import/deploy channels (they live in `channel-exports/` dir):

```
wget http://downloads.mirthcorp.com/connect/3.4.0.8000.b1959/mirthconnect-3.4.0.8000.b1959-unix.sh && \
chmod +x mirthconnect-3.4.0.8000.b1959-unix.sh && \
sudo ./mirthconnect-3.4.0.8000.b1959-unix.sh
```

Assuming Node is installed, run `npm install` to install the project depedencies. Once complete, run `node AllergyTrackerServer.js` and, in a new tab, run `node SomeEMRServer.js`. The output should be:

##### End-to-End Message sending via mocked out medical systems:

![img](https://raw.githubusercontent.com/MatthewVita/Mirth-Learning-Project/master/screenshots/end-to-end-example.PNG)

##### HL7 to XML transformation results:
![img](https://raw.githubusercontent.com/MatthewVita/Mirth-Learning-Project/master/screenshots/hl7-to-xml.PNG)

##### XML to HL7 transformation results:
![img](https://raw.githubusercontent.com/MatthewVita/Mirth-Learning-Project/master/screenshots/xml-to-hl7.PNG)

## License
MIT
