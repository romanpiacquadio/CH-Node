const studentsModel = require('../models/students.schema');

class StudentManager {
  getAllStudents = async () => {
    try {
      const studentsArr = await studentsModel.find({});
      return studentsArr;
    } catch (error) {
      console.log("file: students.routes.js:42 ~ StudentsRoutes", error);
    }
  }

  getStudentById = async (id) => {
    try {
      const studentDetail = await studentsModel.find({ _id: id });
      return studentDetail;
    } catch (error) {
      console.log("file: students.routes.js:18 ~ StudentsManager", error);
    }
  }

  createStudent = async (bodyStudent) => {
    try {
      // TODO REVISAR SI EL ESTUDIANTE YA FUE CREADO
      const studentDetail = await studentsModel.findOne({
        dni: bodyStudent.dni
      });
      
      if (studentDetail && Object.keys(studentDetail).length !== 0) {
        return null
      }

      const newStudent = await studentsModel.create(bodyStudent);

      return newStudent;
    } catch (error) {
      console.log("file: student.manager.js:37 ~ StudentManager", error);
    }
  }
}

module.exports = StudentManager;