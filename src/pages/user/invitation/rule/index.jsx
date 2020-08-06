import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { NavBar, Icon } from 'antd-mobile';
import intl from 'react-intl-universal';
import styles from './index.less';

class Rule extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() => this.props.history.go(-1)}
        >
          {intl.get('shareRules.ruleTitle')}
        </NavBar>
        <div className={styles.content}>
        {intl.get('shareRules.rule1')}<br/><br/>
        {intl.get('shareRules.rule2')}<br/><br/>
        {intl.get('shareRules.rule3')} <br/><br/>
        {intl.get('shareRules.rule4')}<br/><br/>
        {intl.get('shareRules.rule5')}<br/> <br/>
        {intl.get('shareRules.rule6')} <br/> <br/>
        {intl.get('shareRules.ruleChange')}
        </div>
      </div>
    );
  }
}

const mapState = state => ({
});

const mapDispatch = dispatch => ({
});

export default connect(mapState, mapDispatch)(Rule);
