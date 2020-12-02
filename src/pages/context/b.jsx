import React, { Component } from 'react'
import { Consumer } from './index'

export default class B extends Component {
  render() {
    return (
      <div>
        <Consumer>
            {(name ) =>
                  <div style={{border:'1px solid green',width:'60%',margin:'50px auto',textAlign:'center'}}>
                  <p>孙组件。获取传递下来的值:{name}</p>
              </div>
            }
        </Consumer>
      </div>
    )
  }
}
