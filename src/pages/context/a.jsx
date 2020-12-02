import React, { Component } from 'react'
import { Consumer } from './index'
import B from './b'

export default class A extends Component {
  render() {
    return (
      <div>
        <Consumer>
        {( name ) =>
            <div style={{ border: '1px solid blue', width: '60%', margin: '20px auto', textAlign: 'center' }}>
                <p>子组件。获取父组件的值:{name}</p>
                {/* 孙组件内容 */}
                <B />
          </div>
        }
      </Consumer>
      </div>
    )
  }
}
