const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
  
const Cluster = require('../../models/Cluster');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');
 
// @desc Edit a cluster 
router.post( '/edit', async(req, res) => {
  const {name, desc, addresses, userAddress, id} = req.body; 
      await Cluster.findByIdAndUpdate(id, { name: name, description: desc, addresses: addresses, userAddress: userAddress }, function (err, docs) {
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

// @route GET emails 
router.get('/', async (req, res) => {
  try { 
    let users = await User.find(); 
    res.json(users);
  } 
  catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/cluster/:userAddress 
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

// @route    DELETE api/cluster/:id 
router.delete('/:id',  async (req, res) => { //[checkObjectId('id')],
  try {
    const cluster = await Cluster.findById(req.params.id);

    if (!cluster) {
      return res.status(400).json({ msg: 'Cluster not found' });
    }
  
    await cluster.remove();

    res.status(400).json({ msg: 'Cluster removed' });
  } catch (err) {
    // console.error(err.message);

    res.status(500).send('Server Error');
  }
});
 

module.exports = router;
