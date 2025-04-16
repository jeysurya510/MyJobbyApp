import {Route, Redirect, Switch} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Jobs from './components/Jobs'
import JobItems from './components/JobItems'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/jobs" component={Jobs} />
    <Route exact path="/jobs/:jobid" component={JobItems} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App

// These are the lists used in the application. You can move them to any component needed.
