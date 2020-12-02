import React, { Component } from 'react';
import { connect } from 'react-redux';
import A from './a'
export const {Provider, Consumer} = React.createContext();

export class Context extends Component {
  render() {
    const name = 'jay111ce0129'
    return (
      <div>
        <Provider value={name}>
            <div style={{border:'1px solid red',width:'80%',margin:'50px auto',textAlign:'center'}}>
                <p>父组件定义的值:{name}</p>
                <A />
            </div>
        </Provider>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Context);
