const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
  
const Alert = require('../../models/Alert');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');
 
// Create a alert 
router.post( '/', async(req, res) => {
  const {type, description, minMax, amount, per, clusterName, recipients} = req.body;
    try { 
      let alert = await Alert.findOne({ type: type, description: description, minMax: minMax, amount: amount, per: per, clusterName: clusterName, recipients: recipients });
      if (alert) {
        return res .status(400) .json({ errors: [{ msg: 'Same Alert already exists' }] });
      }
      const newAlert = new Alert({ 
        type: type,  description: description, 
        minMax: minMax,  amount: amount, 
        per: per,  clusterName: clusterName, 
        recipients: recipients
      }); 
      alert = await newAlert.save();  
      res.json(alert);
    } 
    catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @desc Edit a Alert 
router.post( '/edit', async(req, res) => {
  const {type, description, minMax, amount, per, clusterName, recipients, id} = req.body;
      await Alert.findByIdAndUpdate(id, { type: type, description: description, minMax: minMax, amount: amount, per: per, clusterName: clusterName, recipients: recipients }, function (err, docs) {
          if (err){
            // console.error(err.message);
            res.status(500).send('Server Error');
          }
          else{ 
              res.json(docs);
          }
      });  
  }
);

// @route GET Alerts 
router.post('/all', async (req, res) => {
  try { 
    const alerts = await Alert.find({recipients: { $all: [req.body.email] } } ); 
    // console.log(alerts)
    res.json(alerts);
  } 
  catch (err) {
    console.error(err.message);
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
    res.json(alert);
  } catch (err) {
    // console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route GET api/Alert/getCount
router.post('/getCount',  async (req, res) => { 

  Alert.count({clusterName: req.body.clusterName}, function(err, result) {
    if (err) {
      console.log(err);
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
    // console.error(err.message);
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
    // console.error(err.message);

    res.status(500).send('Server Error');
  }
});
 

module.exports = router;
