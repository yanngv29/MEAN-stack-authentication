import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';

import Course from '../models/course';
import BaseCtrl from './base';

export default class CourseCtrl extends BaseCtrl {
  model = Course;

  getCoursesForUser = (req, res) => {
    console.log('userId is : ' + req.params.userId)
  this.model.find({ userId: req.params.userId }, (err, courses) => {
    if(err) {return res.status(500).json(err);}
    if (!courses) { return res.sendStatus(404); }

    return res.status(200).json(courses);
  });
}
}
