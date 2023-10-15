const router = require('express').Router();
const { Posts, Comments, User } = require('../models');
const withAuth = require('../utils/auth')

// Homepage Route
router.get('/', async (req, res, next) => {
    const posts = await Posts.findAll({
        include: [{ model: Comments }, { model: User }]})
      let postsData = [];
      if (posts === undefined || posts === null || posts.length === 0 ) {
        postsData = [];
      } else {
        postsData = posts.map((post) => post.get({ plain: true }));;
      } 
    res.render('home', {postsData, loggedIn: req.session.logged_in});
});

  //Member Dashboard route
router.get('/dashboard', withAuth, async (req, res, next) => { 
    const posts = await Posts.findAll({
      include: [{ model: Comments }, { model: User }], where:{user_id:req.session.user_id}});
      
      let postData = [];
      if (posts === undefined || posts.length === 0) {
        postData = [];
      } else {
        postData = posts.map((post) => post.get({ plain: true }));
      }      
      res.render('dashboard', {postData, loggedIn: req.session.logged_in});
});

//Login Route
router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the dashboard
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

//Signup route
router.get('/signup', (req, res) => {
  // If a session exists, redirect the request to the dashboard
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

// Post Route
router.get('/post/:id', withAuth, async (req, res, next) => {
    const posts = await Posts.findByPk(req.params.id, {include: [{ model: Comments }, { model: User }]});
      let postsData = [];
      if (posts === undefined || posts === null || posts.length === 0 ) {
        postsData = [];
      } else {
        postsData = posts.get({ plain: true });;
      } 
    res.render('post', {postsData, loggedIn: req.session.logged_in});
});

// New Post Route
router.get('/post/new', withAuth, async (req, res, next) => {
    res.render('newPost', {loggedIn: req.session.logged_in});
});

  module.exports = router;