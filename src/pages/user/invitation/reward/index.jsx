import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { NavBar, Icon, Toast } from 'antd-mobile';
import intl from 'react-intl-universal';
import styles from './index.less';

class Reward extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    return (
      <div >
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() => this.props.history.go(-1)}
        >
          我的奖励
        </NavBar>
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Reward);
