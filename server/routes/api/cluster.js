const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
//const auth = require('../../middleware/auth');

// const Post = require('../../models/Post');
const Cluster = require('../../models/Cluster');
// const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');
 
// @desc     Create a post 
router.post( '/', async(req, res) => {
  const {name, desc, addresses, userAddress} = req.body;
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
      res.json(cluster);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @desc     Edit a post 
router.post( '/edit', async(req, res) => {
  const {name, desc, addresses, userAddress, id} = req.body; 
      await Cluster.findByIdAndUpdate(id, { name: name, description: desc, addresses: addresses, userAddress: userAddress }, function (err, docs) {
          if (err){
            // console.error(err.message);
            res.status(500).send('Server Error');
          }
          else{
              // console.log("Updated User : ", docs);
              res.json(docs);
          }
      });  
  }
);


// @route    GET clusters 
router.get('/', async (req, res) => {
  try {
    const clusters = await Cluster.find(req.body.userAddress);
    res.json(clusters);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/cluster/:id 
router.get('/:id',  async (req, res) => {
   
  try {
    const cluster = await Cluster.findById(req.params.id);

    if (!cluster) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(cluster);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id',  async (req, res) => { //[checkObjectId('id')],
  try {
    const cluster = await Cluster.findById(req.params.id);

    if (!cluster) {
      return res.status(404).json({ msg: 'Post not found' });
    }
  
    await cluster.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', checkObjectId('id'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:id', checkObjectId('id'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has not yet been liked
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // remove the like
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
  '/comment/:id',
  
  checkObjectId('id'),
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await post.save();

    return res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;