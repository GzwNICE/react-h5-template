import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { NavBar, Icon } from 'antd-mobile';
import intl from 'react-intl-universal';

import styles from './index.less';

const { lang } = queryString.parse(window.location.search);
class Setting extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { requestAboutUs } = this.props;
    requestAboutUs();
  }
  render() {
    const { aboutUs } = this.props;
    return (
      <div className={styles.contentBox}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() => this.props.history.go(-1)}
        >
          {intl.get('user.aboutUs')}
        </NavBar>
        <div className={styles.userInfo}>
          <img className={styles.authorImg} src={aboutUs.url}></img>
          <div className={styles.imgEdit}>{aboutUs.content}</div>
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'row', marginLeft: '15px', marginTop: '20px' }}
        >
          <div style={{ color: '#333333', fontSize: '16px' }}>{intl.get('user.usMobile')}</div>
          <div style={{ color: '#4A90E2', fontSize: '16px', marginTop: '2px' }}>0327345842</div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  aboutUs: state.user.data.aboutUs,
});

const mapDispatch = dispatch => ({
  requestAboutUs: () => dispatch.user.getAboutUs(),
});

export default connect(mapState, mapDispatch)(Setting);
