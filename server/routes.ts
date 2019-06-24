import * as express from 'express';

import UserCtrl from './controllers/user';
import User from './models/user';
import CourseCtrl from './controllers/course';
import MiniCourseCtrl from './controllers/course.mini';
import Course from './models/course';

export default function setRoutes(app) {

  const router = express.Router();

  const userCtrl = new UserCtrl();

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  const courseCtrl = new CourseCtrl();

  // courses
  // router.route('/courses').get(courseCtrl.getAll);
  router.route('/courses/:userId').get(courseCtrl.getCoursesForUser);
  router.route('/courses/count').get(courseCtrl.count);
  router.route('/course').post(courseCtrl.insert);
  router.route('/course/:id').get(courseCtrl.get);
  router.route('/course/:id').put(courseCtrl.update);
  router.route('/course/:id').delete(courseCtrl.delete);

  const miniCourseCtrl = new MiniCourseCtrl();

  router.route('/db/courses').get(miniCourseCtrl.getCoursesForUser);
  router.route('/db/courses').post(miniCourseCtrl.insert);
  router.route('/db/courses').patch(miniCourseCtrl.update);



  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
