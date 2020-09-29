/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import intl from 'react-intl-universal';
import { NavBar, Icon, InputItem, Picker, List, TextareaItem, Button, Toast, Modal } from 'antd-mobile';
import { createForm } from 'rc-form';
import addressLine from '@/assets/images/home/AppStore.png';
import { getBaseUrl } from '@/utils/util';
import aliPay from '@/assets/images/ic_alipay@2x.png';
import weChat from '@/assets/images/ic_WeChatpay@2x.png';
import unIonPay from '@/assets/images/ic_unionpay@2x.png';
import prodJson from '@/assets/json/product.json';
import styles from './index.less';

const Item = List.Item;
const alert = Modal.alert;
const { lang } = queryString.parse(window.location.search);

const imagesContext = require.context('@/assets/images/home', false, /\.png$/);

class GetPrize extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activityTurnId: this.props.match.params.activityTurnId,
      prodData: ''
    };
  }

  componentDidMount() {
    prodJson.map(i => {
      if (i.id === Number(this.state.activityTurnId)) {
        this.setState({
          prodData: i
        })
        return
      }
    })
  }

  selectAdd = () => {
    this.props.history.push(`/addressList?activityTurnId=${this.state.activityTurnId}`);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!value.name) {
        return Toast.info('请填写收货人姓名', 2);
      } else if (!value.phone) {
        return Toast.info('请填写手机号', 2);
      } else if (value.phone.replace(/\s/g, '').length < 11) {
        return Toast.info('请填写正确的手机号', 2);
      } else {
        const user_mobile = localStorage.getItem('mobile');
        const goods_id = this.state.prodData.id;
        Toast.loading('loading...', 10);
        window.location.href = `${window.location.protocol}//${getBaseUrl()}/v1/alipay.php?goods_id=${goods_id}&user_mobile=${user_mobile}&t=${new Date().getTime()}`
      }
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
    const { prodData } = this.state;
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
          {prodData.img ? (
            <img
              src={imagesContext(prodData.img)}
              alt=""
              className={styles.goodPic}
            />
          ): null}
          <div className={styles.goodName}>
            <span className={`${styles.title} ${styles.line2}`}>
              {prodData.name}
            </span>
            <span className={styles.price}>
              <i>{`¥ ${prodData.spikePrice} `}</i>
              <span></span>
            </span>
          </div>
          <span className={styles.quantity}>x1</span>
        </div>
        <List className={styles.payBox} renderHeader={() => '收货信息'}>
          <InputItem
            {...getFieldProps('name')}
            placeholder="请填写收货人姓名"
            clear
            ref={el => (this.nameInput = el)}
            onClick={() => {
              this.nameInput.focus();
            }}
            onBlur={() => {
              window.scrollTo(0, 0);
            }}
          >*姓名</InputItem>
          <InputItem
            {...getFieldProps('phone')}
            type="phone"
            placeholder="请填写手机号"
            clear
            ref={el => (this.mobileInput = el)}
            onClick={() => {
              this.mobileInput.focus();
            }}
            onBlur={() => {
              window.scrollTo(0, 0);
            }}
          >*手机号</InputItem>
          <span className={styles.tips}>* 支付成功后，会员卡信息将以短信的形式发送到你的手机</span>
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
          <span className={styles.bl}>合计：<span className={styles.bm}>¥<span className={styles.bn}>{prodData.spikePrice}</span></span></span>
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
