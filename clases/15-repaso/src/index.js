const App = require("./app");
const baseRoute = require('./routes/base.routes')
const StudentsRoutes = require('./routes/students.routes')
const CoursesRoutes = require('./routes/courses.routes')

const app = new App([
  new baseRoute(),
  new StudentsRoutes(),
  new CoursesRoutes()
])


app.listen();