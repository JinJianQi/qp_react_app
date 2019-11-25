import React from 'react'
import { HashRouter, Route, withRouter } from 'react-router-dom'
import Index from './pages/Index/Index'
import App from './App'
import Kefu from './pages/Kefu/Kefu';
import Update from './pages/Update/Update';
import Info from './pages/Info/Info';
class BaseRouter extends React.Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <App>
                        <Route path='/' exact component={Index}></Route>
                        <Route path='/Update' component={Update}></Route>
                        <Route path='/Kefu' component={Kefu}></Route>
                        <Route path='/Info' component={Info}></Route>
                    </App>
                </HashRouter>
            </div>
        )
    }
}


export default withRouter(BaseRouter)