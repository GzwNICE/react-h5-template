/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import intl from 'react-intl-universal';
import { NavBar, Icon, InputItem, Picker, List, TextareaItem, Button, Toast, Modal } from 'antd-mobile';
import { createForm } from 'rc-form';
import addressLine from '@/assets/images/home/AppStore.png';
import aliPay from '@/assets/images/ic_alipay@2x.png';
import weChat from '@/assets/images/ic_WeChatpay@2x.png';
import unIonPay from '@/assets/images/ic_unionpay@2x.png';
import styles from './index.less';

const Item = List.Item;
const alert = Modal.alert;
const { lang } = queryString.parse(window.location.search);
class GetPrize extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activityTurnId: this.props.match.params.activityTurnId,
    };
  }

  componentDidMount() {
    const { getInfo } = this.props;
    // getInfo({ activityTurnId: this.state.activityTurnId });
  }

  selectAdd = () => {
    this.props.history.push(`/addressList?activityTurnId=${this.state.activityTurnId}`);
  };

  handleSubmit = () => {
    const address = JSON.parse(localStorage.getItem('address')) || {};
    const { submitInfo, info } = this.props;
    if (!address.id && info.productType === 'SUBSTANCE') {
      return Toast.info(`${intl.get('prize.ph1')}`, 2);
    }
    this.props.form.validateFields((err, value) => {
      if (err) {
        return Toast.info(`${intl.get('prize.ph2')}`, 2);
      }
      const params = {
        activityTurnId: this.state.activityTurnId,
        receiveAddressId: info.productType === 'SUBSTANCE' ? address.id : null,
        verifyId: value.verifyId,
        ageInterval: value.ageInterval ? value.ageInterval[0] : '',
        education: value.education ? value.education[0] : '',
        job: value.job ? value.job[0] : '',
        income: value.income ? value.income[0] : '',
        companyName: value.companyName,
        companyAddress: value.companyAddress,
        directContact: value.directContact ? value.directContact[0] : '',
        directMobile: value.directMobile,
        indirectContact: value.indirectContact,
        indirectMobile: value.indirectMobile,
        rewardRulesId: info.appRewardRulesVO.rewardRulesId,
      };
      submitInfo(params).then(res => {
        if (res.code === 200) {
          this.props.history.push(`/awardResult?type=${info.productType}`);
        }
      });
    });
  };

  onLeftClick = () => {
    alert('是否放弃本次付款？', '您的订单在30分钟内未支付将被取消，请尽快完成支付', [
      {
        text: '放弃',
        onPress: () => {
          this.props.history.go(-1);
        },
      },
      {
        text: '继续',
      },
    ]);
  };

  render() {
    const { getFieldProps } = this.props.form;
    const config = JSON.parse(localStorage.getItem('configuration')) || {};
    const address = JSON.parse(localStorage.getItem('address')) || {};
    const { info } = this.props;
    return (
      <div className={styles.prize}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          className={styles.navBar}
          onLeftClick={this.onLeftClick}
        >
          确认订单
        </NavBar>
        <div className={styles.goodInfo}>
          <img
            src={addressLine}
            alt=""
            className={styles.goodPic}
          />
          <div className={styles.goodName}>
            <span className={`${styles.title} ${styles.line2}`}>
              50元联通话费充值卡
            </span>
            <span className={styles.price}>
              <i>{`${config.moneySymbol} 50 `}</i>
              <span></span>
            </span>
          </div>
          <span className={styles.quantity}>x1</span>
        </div>
        <List className={styles.payBox} renderHeader={() => '收货信息'}>
          <InputItem
            placeholder="请填写收货人姓名"
            clear
          >姓名</InputItem>
          <InputItem
            type="phone"
            placeholder="请填写手机号"
            clear
          >*手机号</InputItem>
        </List>
        <List className={styles.payBox}>
          <Item
            thumb={aliPay}
            extra={<Icon type="check-circle" color="#FF1C1C" />}
          >支付宝支付</Item>
          <Item
            thumb={weChat}
            extra={'敬请期待'}
          >微信支付</Item>
          <Item
            thumb={unIonPay}
            extra={'敬请期待'}
          >银行卡支付</Item>
        </List>
        <div className={styles.btnBox}>
          <span className={styles.bl}>合计：<span className={styles.bm}>¥<span className={styles.bn}>50</span></span></span>
          <Button type="primary" className={styles.submit} onClick={this.handleSubmit}>
            立即支付
          </Button>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  info: state.prize.data.prizeInfo,
  address: state.prize.data.address,
});

const mapDispatch = dispatch => ({
  getInfo: params => dispatch.prize.prizeInfo(params),
  submitInfo: params => dispatch.prize.submit(params),
});

export default connect(mapState, mapDispatch)(createForm()(GetPrize));
