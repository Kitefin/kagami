const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
  
const Cluster = require('../../models/Cluster');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');
 
// Create a cluster 
router.post( '/', async(req, res) => {
  const {name, desc, addresses, userAddress, email} = req.body;
    try { 
      let cluster = await Cluster.findOne({ name: name, userAddress: userAddress });
      if (cluster) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Cluster Name already exists' }] });
      }
      const newCluster = new Cluster({ 
        name: name,
        description: desc,
        addresses: addresses,
        userAddress: userAddress
      }); 
      cluster = await newCluster.save();

      let user = await User.findOne({ address: userAddress });
       
      if(user)
      { 
        return res.json(user);
      }
      const newUser = new User({ 
        email: email,
        address: userAddress
      }); 
      user = await newUser.save();
       
      res.json(user);
    } 
    catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @desc Edit a cluster 
router.post( '/edit', async(req, res) => {
  const {name, desc, addresses, userAddress, id, email} = req.body; 
      await Cluster.findByIdAndUpdate(id, { name: name, description: desc, addresses: addresses, userAddress: userAddress }, function (err, docs) {
          if (err){ 
            res.status(500).send('Server Error');
          }
          else {
            const filter = {address: userAddress};
            const update = {email: email};
            User.findOneAndUpdate(filter, update)
            .then(doc => res.json(doc))
            .catch(err => res.status(500).send('Server Error'))
          }
      });  
  }
);

// @route GET clusters 
router.get('/', async (req, res) => {
  try {
    const clusters = await Cluster.find( req.body.userAddress ); 
    res.json(clusters);
  } 
  catch (err) {
    console.error("getClusters Err: " + err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/cluster/:id 
router.get('/:id',  async (req, res) => {
  try {
    const cluster = await Cluster.findById(req.params.id);
    if (!cluster) {
      return res.status(404).json({ msg: 'Cluster not found' });
    }
    res.json(cluster);
  } catch (err) {
    // console.error(err.message);
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
      return res.status(404).json({ msg: 'Post not found' });
    }
  
    await cluster.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    // console.error(err.message);

    res.status(500).send('Server Error');
  }
});
 

module.exports = router;
