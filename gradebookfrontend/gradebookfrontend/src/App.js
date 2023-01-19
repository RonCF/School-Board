import { Route, Routes } from 'react-router-dom';

import { Classes } from './pages/classes/classes';
import { Login } from './pages/login/login';
import { AssignmentPage } from './pages/assignments/assignments';
import { EditAssignmentPage } from './pages/editassignmentpage/editassignmentpage';
import { Signup } from './pages/signup/signup';
import { Admin } from './pages/teacheradminpage/createassignmentspage';
import { PageNotFound } from './pages/pageNotFound/pageNotFound';

function App() {
  return (
    <div>
      <h1>Ronward</h1>
      <Routes>
        <Route path="/" element={ <Login/> }/>
        <Route path="/signup" element={ <Signup/> }/>

        <Route path="/classes/:classId/:studentname/:username/:user_type" element={ <Classes/> }/>
        <Route path="/assignments/:studentname/:classname" element={ <AssignmentPage/> }/>
        <Route path="/admin/:classname/:class_id" element={ <Admin/> }/>
        <Route path="/edit/:assignmentname/:studentname/:classname/:currentStatus/:currentGrade" element={ <EditAssignmentPage/> }/>

        <Route path="*" element={ <PageNotFound/> }/>
      </Routes>
    </div>
  );
}

export default App;
