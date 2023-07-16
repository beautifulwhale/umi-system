import React from 'react'

const TestComponent = () => {
  return <p>hello, react</p>
}

const JsxTest = () => {
  return <div>
  <span>模拟 babel 处理 jsx 流程。</span>
  <TestComponent />
</div>
}
export default JsxTest

// class Index extends React.Component{
//   status = false /* 状态 */
//   renderFoot=()=> <div> i am foot</div>
//   /* 控制渲染 */
//   controlRender=()=>{
//       const reactElement = (
//           <div style={{ marginTop:'100px' }} className="container"  >   
//                { /* element 元素类型 */ }
//               <div>hello,world</div>  
//               { /* fragment 类型 */ }
//               <React.Fragment>      
//                   <div>11</div>
//               </React.Fragment>
//               { /* text 文本类型 */ }
//               my name is alien       
//               { /* 数组节点类型 */ }
//               { toLearn.map(item=> <div key={item} >let us learn { item } </div> ) } 
//               { /* 组件类型 */ }
//               <TextComponent/>  
//               { /* 三元运算 */  }
//               { this.status ? <TextComponent /> :  <div>三元运算</div> }  
//               { /* 函数执行 */ } 
//               { this.renderFoot() }  
//               <button onClick={ ()=> console.log( this.render() ) } >打印render后的内容</button>
//           </div>
//       )
//       console.log(reactElement)
//       const { children } = reactElement.props
//       /* 第1步 ： 扁平化 children  */
//       const flatChildren = React.Children.toArray(children)
//       console.log(flatChildren)
//       /* 第2步 ： 除去文本节点 */
//       const newChildren = []
//       React.Children.forEach(flatChildren,(item)=>{
//           if(React.isValidElement(item)) newChildren.push(item)
//       })
//       /* 第3步，插入新的节点 */
//       const lastChildren = React.createElement(`div`,{ className :'last' } ,`say goodbye`)
//       newChildren.push(lastChildren)
      
//       /* 第4步：修改容器节点 */
//       const newReactElement =  React.cloneElement(reactElement,{} ,...newChildren )
//       return newReactElement
//   }
//   render(){
//       return this.controlRender()
//   }
// }

