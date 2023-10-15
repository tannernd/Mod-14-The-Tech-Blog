const router = require('express').Router();
const { Posts, User, Comments } = require('../../models');

//Get a comment
router.get('/:id', async (req, res) => {
    try {
        const comment = await Comments.findByPk(req.params.id,{
            include: [{ model: User }, { model: Posts }]});
        const commentData = comment.get({plain:true});
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Create a comment, id is the blog post id
router.post('/:id', async (req, res) => {
    try {
        req.body.post_id = req.params.id;
        req.body.user_id = req.session.user_id; 
        const comment = await Comments.create(req.body);
            res.status(200).json(comment);        
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;