'use strict';

import * as mongoose from 'mongoose';

abstract class MiniBaseCtrl {

  abstract model: any;

  // Get for User
  getForUser = (req, res) => {
    const selector = JSON.parse(req.query.selector);
    this.model.find({ userId: selector.userId }, (err, docs) => {
      if (err) { return console.error(err); }
      res.status(200).json(docs);
    });
  }

/**
200 : document was upserted. Returns the upserted object (see notes below on merging)
400 : document did not pass validation
401 : client was invalid or not present
403 : permission denied to upsert
409 : another client was upserting same document. Try again.
410 : document was already removed and cannot be upserted
*/
  // Insert
  insert = (req, res) => {
// TODO: il faut ajouter une vérification du token pour vérifier sa validité et la concordance avec le userId des courses.

    if ( req.body._id != undefined)
      req.body._id = mongoose.Schema.Types.ObjectId(req.body._id);
    console.log ( 'body to insert : ' + JSON.stringify(req.body));
    const obj = new this.model(req.body);
    console.log ( 'object to insert : ' + JSON.stringify(obj));
    obj.save((err, item) => {
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        return res.status(409).send(err);
      }
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      return res.status(200).json(item);
    });
  }

  // Get by id
  get = (req, res) => {
    this.model.findOne({ _id: req.params.id }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    });
  }

  // Update by id
  update = (req, res) => {
    // TODO: il faut ajouter une vérification du token pour vérifier sa validité et la concordance avec le userId des courses.
    if ( req.body._id != undefined)
      req.body._id = mongoose.Schema.Types.ObjectId(req.body._id);
    console.log ( 'body to insert : ' + JSON.stringify(req.body));
    this.model.findOneAndUpdate({ _id: req.body._id }, req.body, (err,updated) => {
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        return res.status(400).send(err);
      }
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.status(200).json(updated);
    });
  }

  // Delete by id
  delete = (req, res) => {
    this.model.findOneAndRemove({ _id: req.params.id }, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  }
}

export default MiniBaseCtrl;
