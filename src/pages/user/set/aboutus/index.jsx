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
    const { requestData } = this.props;
    requestData({ url: '/home/about/us/get/info' });
  }

  render() {
    const { resultData } = this.props;
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
          <img className={styles.authorImg} src={resultData.url}></img>
          <div className={styles.imgEdit}>{resultData.content}</div>
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'row', marginLeft: '15px', marginTop: '20px' }}
        >
          <div style={{ color: '#333333', fontSize: '16px' }}>{intl.get('user.usMobile')}</div>
          <a
            style={{ color: '#4A90E2', fontSize: '16px', marginLeft: '5px' }}
            href="tel:0327345842"
          >
            0327345842
          </a>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  resultData: state.user.data.resultData,
});

const mapDispatch = dispatch => ({
  requestData: params => dispatch.user.getAboutUs(params),
});

export default connect(mapState, mapDispatch)(Setting);
