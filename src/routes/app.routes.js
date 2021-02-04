import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import StartPage from '../pages/StartPage'
import StepOnePage from '../pages/StepOnePage'
import StepTwoPage from '../pages/StepTwoPage'
import EndPage from '../pages/EndPage'

export const AppRoutes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/start" component={StartPage} />
                <Route exact path="/stepone" component={StepOnePage} />
                <Route exact path="/steptwo" component={StepTwoPage} />
                <Route exact path="/end" component={EndPage} />
                <Redirect to="/start" />
            </Switch>
        </Router>
    )
}
