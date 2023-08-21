import React from 'react'
import { Router, Route, useHistory, Switch, withRouter } from './index'

function Detail() {
    return <div>
        <p>小册名称：《React进阶实践指南》</p>
        <p>作者：我不是外星人</p>
    </div>
}


function Home() {
    return <div>
        hello,world。
        let us learn React!
        <HomeOne />
    </div>
}

@withRouter
class HomeOne extends React.Component {
    RouteGo = () => {
        const { history } = this.props
        console.log('history', history);
        history.push('/detail')
    }
    render() {
        return <div>
            <p>测试HOC——withRouter</p>
            <button onClick={this.RouteGo} >跳转到详情页</button>
        </div>
    }
}

function List() {
    return <div>
        <li>React.js</li>
        <li>Vue.js</li>
        <li>nodejs</li>
    </div>
}


const menusList = [
    {
        name: '首页',
        path: '/home'
    },
    {
        name: '列表',
        path: '/list'
    },
    {
        name: '详情',
        path: '/detail'
    }
]
/**/
function Nav() {
    const history = useHistory()
    /* 路由跳转 */
    const RouterGo = (url) => history.push(url)
    const path = history.location.pathname
    return <div>
        {
            menusList.map((item => <span className={`nav ${item.path === path ? 'active' : ''}`} key={item.path}
                onClick={() => RouterGo(item.path)} >{item.name}</span>))
        }
    </div>
}

function Top() {
    // /* 路由监听 */
    // useListen((location)=>{
    //     console.log( '当前路由是：', location.pathname)
    // })
    console.log(111)
    return <div>--------top------</div>
}
function Index() {
    console.log('根组件渲染')
    return <Router>
        <Top />
        <Nav />
        <Switch>
            <Route component={Home} path="/home"></Route>
            <Route component={Detail} path="/detail" />
            <Route path="/list" render={(props) => <List {...props} />} />
        </Switch>
        <div>--------bottom------</div>
    </Router>
}

export default Index
