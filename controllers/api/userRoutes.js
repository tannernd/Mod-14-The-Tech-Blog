const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

//user create/update/delete
router.post('/create', async (req, res) => {
    try {
        const user = await User.create(req.body);
        // sending back the user object only for testing purposes
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;

            res.status(200).json(user);
        });
        
    } catch (err) {
        res.status(500).json(err);
    }
});

//user login and logout
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res.status(400).json({ msg: 'Incorrect email or password, please try again.' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ msg: 'Incorrect email or password, please try again.' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, msg: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;