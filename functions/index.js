const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

admin.initializeApp(functions.config().firebase);

exports.hello = functions.https.onRequest((request, response) => {
    response.send("Contact Server: OK");
});

exports.addMessage = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if(req.method != 'POST'){
      res.status(403).send("Method not allowed");
      res.end();
    }else{
      req.body = req.body || {};
      res.status(200).send("Message received: OK");
      res.end();
      const message = JSON.parse(req.body);    
      admin.database().ref('/messages').push(message);//.then( (status) => { console.log(status); });
    }
  });
    
});