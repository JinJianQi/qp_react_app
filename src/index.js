import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import serverPage from './serverPages/Index/Index';
import BaseRouter from './BaseRouter'
import { HashRouter, Route } from 'react-router-dom'

// 异步按需加载component
function asyncComponent(getComponent) {
    return class AsyncComponent extends React.Component {
        static Component = null;
        state = { Component: AsyncComponent.Component };

        componentDidMount() {
            if (!this.state.Component) {
                getComponent().then(({ default: Component }) => {
                    AsyncComponent.Component = Component
                    this.setState({ Component })
                })
            }
        }
        //组件将被卸载
        componentWillUnmount() {
            //重写组件的setState方法，直接返回空
            this.setState = (state, callback) => {
                return;
            };
        }
        render() {
            const { Component } = this.state
            if (Component) {
                return <Component {...this.props} />
            }
            return null
        }
    }
}
function load(component) {
    return import(`${component}`)
}

ReactDOM.render((

    <HashRouter>
        <Route path='/' exact component={asyncComponent(() => load('./BaseRouter'))}></Route>
        <Route path='/serverIndex' component={asyncComponent(() => load('./serverPages/Index/Index'))}></Route>
    </HashRouter>


), document.getElementById('root'));

// const routes = {
//     path: '/',
//     component: App,
//     childRoutes: [
//       { path: 'Kefu', component: Kefu },
//       { path: 'Index', component: Index },
//     ]
//   }

// React.render(<Router routes={routes} />, document.body)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
