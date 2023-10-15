const router = require('express').Router();
const { Posts, User, Comments } = require('../../models');

//Get a post
router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.findByPk(req.params.id,{
            include: [{ model: User }, { model: Comments }]});
        const postData = post.get({plain:true});
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Create a post
router.post('/', async (req, res) => {
    try {
        req.body.user_id = req.session.user_id; 
        const post = await Posts.create(req.body);
            res.status(200).json(post);        
    } catch (err) {
        res.status(500).json(err);
    }
});

//Update a Post
router.put('/:id', async (req, res) => {
    try {
        const post = await Posts.update(req.body, {
            where: {
                id: req.params.id,
            }
        });
        (post[0]) ? res.status(200).json({msg: 'Post successfully updated.'}) : res.status(400).json({msg: 'Post failed to update, check request.'});
    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete a post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Posts.destroy({
            where: {
                id: req.params.id,
            }
        });
        (post) ? res.status(200).json({ msg: 'Found and deleted Post.' }) : res.status(400).json({ msg: 'Post not found or has already been deleted.' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;