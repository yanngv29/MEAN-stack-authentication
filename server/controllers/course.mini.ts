import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';

import Course from '../models/course';
import MiniBaseCtrl from './base.mini';

export default class MiniCourseCtrl extends MiniBaseCtrl {
  model = Course;

  getCoursesForUser = (req, res) => {
    const selector = JSON.parse(req.query.selector);
    console.log('searching courses for userId : ' + selector.userId);
  this.model.find({ userId: selector.userId }, (err, courses) => {
    if(err) {return res.status(500).json(err);}
    if (!courses) { return res.sendStatus(404); }

    return res.status(200).json(courses);
  });
}
}
