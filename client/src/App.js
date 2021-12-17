// React Elements
import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
// Components
import NavigationMenu from './components/NavigationMenu';
import Home from './components/Home';
import LandingPage from './components/LandingPage'
import ErrorPage from './components/ErrorPage';
import About from "./components/About";
import NewCourse from './components/NewCourse';
import RegisterCourse from './components/RegisterCourse';
import LecturerCourses from './components/LecturerCourses';
import StudentCourses from './components/StudentCourses';
import CourseParticipants from './components/CourseParticipants';
import Reports from './components/Reports';
import Register from './components/Register';
// Images
import background from "./Images/background.jpg"

class App extends React.Component {
    constructor(props) {
        super(props);
        sessionStorage.clear();
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="App">
                
                {/* Font Style Set from google API */}
                <link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet" />

                <Router>
                    <NavigationMenu />
                    <img alt='' src={background} style={{ position: 'absolute', width: '100vw', height: '100vh', repeat: 'no-repeat', left: 0, top: 0, bottom: 0, right: 0, zIndex: -1 }} />

                    <Switch>
                        {/* Landing Path */}
                        <Route exact path="/" component={LandingPage} />

                        {/* Website Components */}
                        <Route path="/home" component={Home} />
                        <Route path="/About" component={About} />
                        <Route path="/NewCourse" component={NewCourse} />
                        <Route path="/RegisterCourse" component={RegisterCourse} />
                        <Route path="/LecturerCourses" component={LecturerCourses} />
                        <Route path="/StudentCourses" component={StudentCourses} />
                        <Route path="/Reports" component ={Reports} />
                        <Route path="/Register" component={Register} />
                        <Route path="/CourseParticipants/:name" component={CourseParticipants} />

                        {/* Default handling with error page */}
                        <Route component={ErrorPage} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
