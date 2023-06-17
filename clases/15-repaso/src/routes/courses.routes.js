const { Router } = require("express");


class Courses {
  path = '/courses';
  router = Router();

  constructor() {
    this.initCoursesRoutes();
  }

  initCoursesRoutes() {
    this.router.get(`${this.path}`, async (req, res) => {
      return res.json({
        message: 'Course path'
      })
    });
    
    this.router.get(`${this.path}/:courseId`, async (req, res) => {
      return res.json({
        message: 'Course GET'
      })
    });
    
    this.router.post(`${this.path}`, async (req, res) => {
      return res.json({
        message: 'Course POST'
      })
    });
    this.router.put(`${this.path}/:courseId`, async (req, res) => {
      return res.json({
        message: 'Course PUT'
      })
    });
    this.router.delete(`${this.path}/:courseId`, async (req, res) => {
      return res.json({
        message: 'Course DELETE'
      })
    });


  };


}

module.exports = Courses;