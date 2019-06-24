'use strict';

import * as mongoose from 'mongoose';

var CourseSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    duration: Number,
    distance: Number,
  },
  {usePushEach: true}
);

CourseSchema.index({userId: 1});

const Course = mongoose.model('Course', CourseSchema);
export default Course;
