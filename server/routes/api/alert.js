const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');  
const Alert = require('../../models/Alert');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');

const email2Wallet = async(email) => { 
  try {  
    const user = await User.findOne({email: email}); 
    if (!user) {  
      return '';
    } 
    return user.address;
  }
  catch (err) { 
    return '';
  } 
}

const emails2Wallets = async(emails) => {
  let wallets = [];
  for(var i in emails)
  {
    const wallet = await email2Wallet(emails[i]); 
    wallets.push(wallet)
  } 
  return wallets;
}

const wallet2Email = async(address) => { 
  try {  
    const user = await User.findOne({address: address});  
    if (!user) {  
      return '';
    } 
    return user.email;
  }
  catch (err) { 
    return '';
  } 
} 

const wallets2Emails = async(wallets) => {
  let emails = [];
  for(var i in wallets)
  {
    const email = await wallet2Email(wallets[i]); 
    emails.push(email)
  } 
  return emails;
}


// Create a alert 
router.post( '/', async(req, res) => {
  const {type, description, clusterName, recipients} = req.body;
  // console.log(req.body)
    try { 
      let alert = await Alert.findOne({ type: type, description: description, clusterName: clusterName, recipients: recipients });
      if (alert) {
        return res .status(400) .json({ errors: [{ msg: 'Same Alert already exists' }] });
      }

      let recipientWallets = await emails2Wallets(recipients); 

      const newAlert = new Alert({ 
        type: type,      description: description, 
        clusterName: clusterName, 
        recipients:      recipientWallets
      }); 
      alert = await newAlert.save();  
      res.json(alert);
    } 
    catch (err) {
      console.error("createAlert Err: " + err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @desc Edit a Alert 
router.post( '/edit', async(req, res) => {
  const {type, description, clusterName, recipients, id} = req.body;
  console.log(recipients);
  const recipients_ = await emails2Wallets(recipients);
  await Alert.findByIdAndUpdate(id, 
    { type: type, description: description, clusterName: clusterName, recipients: recipients_ }, 
    function (err, docs) 
    {
      if (err) {
        console.error("updateAlert Err: " + err.message);
        res.status(500).send('Server Error');
      }
      else res.json(docs); 
    });  
  }
);

// @route GET Alerts 
router.post('/all', async (req, res) => { 
   
  try { 
    const alerts = await Alert.find({recipients: { $all: [req.body.address] } } ); 
    if(alerts)
    { 
      let alerts_ = []; 


      for(var i in alerts) {
        const alert = alerts[i];
        const {recipients} = alert; 
        const recipients_ = await wallets2Emails(recipients); 
        alert.recipients = recipients_; 
        alerts_.push(alert);
      }

      res.json(alerts_);
    }
    else res.json({ msg: 'alerts empty.' });
  } 
  catch (err) {
    console.error("getAlerts Err: " + err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/Alert/:id 
router.get('/:id',  async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({ msg: 'Alert not found' });
    } 

    let {recipients} = alert;
 
    let recipients_ = await wallets2Emails(recipients);

    alert.recipients = recipients_;
  
    res.json(alert);
  } catch (err) {
    console.error("getAlertById Err: " + err.message);
    res.status(500).send('Server Error');
  }
});


// @route GET api/Alert/getCount
router.post('/getCount',  async (req, res) => { 

  Alert.count({clusterName: req.body.clusterName}, function(err, result) {
    if (err) {
      console.log("getAlertCountByClusterName Err: " + err);
      res.status(500).send('Server Error');
    } else {
      res.json( result );
    }
  });

  // try {
  //   const alertCnt = Alert.find( { clusterName: req.body.clusterName } ).count();
  //   console.log(alertCnt)
     
  //   if (!alertCnt) {
  //     return res.status(404).json({ msg: 'Alert not found' });
  //   }
  //   res.json(alertCnt);
  // } catch (err) {
  //   // console.error(err.message);
  //   res.status(500).send('Server Error');
  // }
});



// @route    POST api/Alert/:userAddress 
router.post('/:userAddress',  async (req, res) => {
  try {  
    const user = await User.findOne({address: req.params.userAddress});
    if (!user) {  
      return res.json({email: null});
    } 
    return res.json(user);
  } catch (err) {
    console.error("getUserByAddress Err: " + err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/Alert/:id 
router.delete('/:id',  async (req, res) => { //[checkObjectId('id')],
  try {
    const alert = await Alert.findById(req.params.id);

    if (!alert) {
      return res.status(404).json({ msg: 'Post not found' });
    }
  
    await alert.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error("deleteAlertById" + err.message); 
    res.status(500).send('Server Error');
  }
});
 

module.exports = router;
