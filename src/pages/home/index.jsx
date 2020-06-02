import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import intl from 'react-intl-universal';
import styles from './index.less';

class Home extends PureComponent {
  render() {
    return (
      <div className={styles.home}>
        <div className={styles.box}>{intl.get('home.title')}</div>
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Home);
