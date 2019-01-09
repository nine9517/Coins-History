const express = require('express');
const router = express.Router();
const Coin = require('../models/Coins');

router.route('/').get(function (req, res) {
    Coin.find(function (err, coins){
        if(err){
          console.log(err);
        }
        else {
          res.render('page/coins', {coins: coins});
        }
      });
});
router.route('/edit/:id').get(function (req, res) {
    const id = req.params.id;
    Coin.findById(id, function (err, coin){
        res.render('page/edit', {coin: coin});
    });
  });
router.route('/create').get(function (req, res) {
    res.render('page/create');
});
router.route('/post').post(function (req, res) {
   const coin = new Coin(req.body);
   console.log(coin);
   coin.save()
     .then(coin => {
     res.redirect('/coins');
     })
     .catch(err => {
     res.status(400).send("unable to save to database");
     });
 });
 router.route('/update/:id').post(function (req, res) {
    Coin.findById(req.params.id, function(err, coin) {
      if (!coin)
        return next(new Error('Could not load Document'));
      else {
        coin.name = req.body.name;
        coin.price = req.body.price;
  
        coin.save().then(coin => {
            res.redirect('/coins');
        })
        .catch(err => {
              res.status(400).send("unable to update the database");
        });
      }
    });
  });
  router.route('/delete/:id').get(function (req, res) {
    Coin.findByIdAndRemove({_id: req.params.id},
         function(err, coin){
          if(err) res.json(err);
          else res.redirect('/coins');
      });
  });
module.exports = router;