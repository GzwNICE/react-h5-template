import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { NavBar, Icon } from 'antd-mobile';
import logo from '@/assets/images/logo.png';
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
          style={{ backgroundColor: '#FF1C1C' }}
          onLeftClick={() => this.props.history.go(-1)}
        >
          {intl.get('user.aboutUs')}
        </NavBar>
        <div className={styles.userInfo}>
          <img className={styles.authorImg} src={logo}></img>
          <div className={styles.imgEdit}> 京东秒杀版 - 优选好商品，每天推出随机2小时限时秒杀活动，话费充值卡、加油卡、京东卡、手机、电脑、小家电、日用百货等等，随时随地帮你省钱，敬请关注。</div>
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
