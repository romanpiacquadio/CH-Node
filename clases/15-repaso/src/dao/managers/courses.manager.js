const coursesModel = require('../models/courses.schema')

class CoursesManager {
  getAllCourses = async () => {
    try {
      const allCourses = await coursesModel.find({})
      return allCourses
    } catch (error) {
      console.log("Error en getAllCourses", error)
    }
  }

  getCourseById = async (id) => {
    try {
      const course = await coursesModel.findById({_id: id});
      if(!course) {
        return null
      }
      return course
    
    } catch (error) {
      console.log("Error en getCourseById", error)
    }
  }

  createCourses = async (courseBody) => {
    try {
      const checkCourse = await coursesModel.findOne({
        title: `${courseBody.title.toLowerCase()}`
      });

      if(checkCourse) {
        return null
      }

      const newCourse = await coursesModel.create({
        ...courseBody,
        title: courseBody.title.toLowerCase()
      });

      return newCourse;

    } catch (error) {
      console.log("Error en createCoourses", error)
    }
  }
}

module.exports = CoursesManager