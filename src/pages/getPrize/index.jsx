/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import intl from 'react-intl-universal';
import { NavBar, Icon, InputItem, Picker, List, TextareaItem, Button, Toast, Modal } from 'antd-mobile';
import { createForm } from 'rc-form';
// import addressLine from '@/assets/images/home/AppStore.png';
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
        const channel_code = localStorage.getItem('AppId');
        const goods_id = this.state.prodData.id;
        Toast.loading('loading...', 10);
        // console.log(`${window.location.protocol}//${getBaseUrl()}/v1/alipay.php?goods_id=${goods_id}&user_mobile=${user_mobile}&channel_code=${channel_code}&t=${new Date().getTime()}`);
        window.location.href = `${window.location.protocol}//${getBaseUrl()}/v1/alipay.php?goods_id=${goods_id}&user_mobile=${user_mobile}&channel_code=${channel_code}&t=${new Date().getTime()}`
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
    const cardList = [
      {
        price: '1.00',
        oldPrice: 500,
        title: '体验卡（ 1天 ）',
        content: '只限新用户，只允许绑定1个手机设备',
      },
      {
        price: 1000,
        oldPrice: 1200,
        title: '日卡（ 1天 ）',
        content: '只限新用户，只允许绑定1个手机设备',
      },
      {
        price: 1888,
        oldPrice: 2500,
        title: '周卡（ 7天 ）',
        content: '只允许绑定1个手机设备',
      },
      {
        price: 3888,
        oldPrice: 5000,
        title: '月卡（ 30天 ）',
        content: '只允许绑定1个手机设备',
      },
      {
        price: 8888,
        oldPrice: 10000,
        title: '季卡（ 90天 ）',
        content: '只允许绑定1个手机设备',
      },

    ]
    return (
      <div className={styles.prize}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          className={styles.navBar}
          onLeftClick={this.onLeftClick}
        >
          开通会员
        </NavBar>
        <div className={styles.goodInfo}>
          <span className={styles.title}>*请确认您已年满18岁，合理安排娱乐时间</span>
          {cardList.map(i => {
            return (
              <div className={styles.cardItem} key={i.price}>
                <div className={styles.top}>
                  <div className={styles.ttL}>
                    <span className={styles.tLName}>{i.title}</span>
                    <span className={styles.tLIcon}>{i.price === '1.00' ? `新用户首次专享`: `限时折扣`}</span>
                  </div>
                  <span className={styles.ttR}>{`¥ ${i.price}`}</span>
                </div>
                <div className={styles.bottom}>
                  <span className={styles.bll}>{i.content}</span>
                  <span className={styles.brr}>{`¥ ${i.oldPrice}`}</span>
                </div>
              </div>
            )
          })}
        </div>
        <div className={styles.tipsBox}>
          <span>温馨提示：</span>
          <p>1、新注册用户只允许买一次1天体验卡，同时只允许绑定1个手号和1台手机设备；<br />
          2、其他套餐只允许绑定1个手机号和1台手机设备；<br />
          3、不允许绑定多台设备，如果违规，账号会自动被封禁处理.<br />
          4、安装链接以消息推送到设备上，请收到安装链接后请按照引导安装授权；</p>
        </div>
        <List className={styles.payBox}>
          <Item
            thumb={aliPay}
            extra={<Icon type="check-circle" color="#40D622" />}
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
        <Button type="primary" className={styles.submit} onClick={this.handleSubmit}>
          立即支付
        </Button>
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
