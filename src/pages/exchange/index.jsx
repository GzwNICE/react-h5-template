/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
// import md5 from 'md5';
import intl from 'react-intl-universal';
import { NavBar, Icon, List, InputItem, NoticeBar, Button, Checkbox, Modal, Toast } from 'antd-mobile';
// import { Link } from 'react-router-dom';
import { createForm } from 'rc-form';
import receiveBg from '@/assets/images/receive_pic_bg@2x.png';
import resultTips from '@/assets/images/resultTips.png';
// import passwordOpen from '@/assets/images/passwordOpen.png';
import { numFormat } from '@/utils/util';
import styles from './index.less';

const Item = List.Item;
const AgreeItem = Checkbox.AgreeItem;
class Exchange extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.activityTurnId,
      type: queryString.parse(window.location.search).type,
      select: false,
      classN: 'styles.close',
      protocol: false,
      modal: false,
      info: null,
    };
  }

  componentDidMount() {
    const { getInfo } = this.props;
    getInfo({ activityTurnId: this.state.id }).then(res => {
      if (res.code === 200) {
        this.setState({
          info: res.data,
        });
      }
    });
    console.log(this.state.type);
  }

  confirm = () => {
    const { type, id } = this.state;
    const { coinsFetch, cashFetch } = this.props;
    if (!this.state.protocol) {
      return Toast.info('请先阅读并同意奖品兑换协议', 2);
    }
    if (type === 'coins') {
      coinsFetch({
        activityTurnId: id,
      }).then(res => {
        if (res.code === 200) {
          this.props.history.push(`/changeResult?type=coins&money=${res.data.convertGoMoney}`);
        }
      });
      return;
    }
    if (type === 'cash') {
      this.props.form.validateFields((err, value) => {
        if (err) {
          return Toast.info(`${intl.get('prize.ph2')}`, 2);
        }
        console.log(value);
        const params = {
          activityTurnId: id,
          bankName: value.bankName,
          realName: value.realName,
          bankCardNum: value.bankCardNum,
        };
        cashFetch(params).then(res => {
          if (res.code === 200) {
            this.props.history.push(`/changeResult?type=cash`);
          }
        });
      });
    }
  };

  handlerFooterClick = () => {
    this.setState({
      select: !this.state.select,
    });
  };

  handlerCheck = () => {
    this.setState({
      protocol: !this.state.protocol,
    });
  };

  onClose = () => {
    this.setState({
      modal: false,
    });
  };

  render() {
    const { getFieldProps } = this.props.form;
    const config = JSON.parse(localStorage.getItem('configuration')) || {};
    const { select, classN, modal, type, info } = this.state;
    const prodInfo = (info && info.prizesProductVO) || {};
    const recycleInfo = (info && info.recycleInfoVO) || {};
    return (
      <div className={styles.exchange}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          className={styles.navBar}
          onLeftClick={() => {
            this.props.history.go(-1);
          }}
        >
          兑换
        </NavBar>
        <div className={styles.content}>
          <span className={styles.title}>奖品</span>
          <div className={styles.prodInfoBox}>
            <img src={prodInfo.imgUrl} alt="" className={styles.left} />
            <ul className={styles.textBox}>
              <li className={styles.prodName}>{prodInfo.productName}</li>
              <li className={styles.num}>数量：1</li>
              <li className={styles.price}>
                零售价：<span>{`${numFormat(prodInfo.marketPrice)} ${config.moneySymbol}`}</span>
              </li>
            </ul>
          </div>
          <span className={styles.title}>兑换详情</span>
          {type === 'coins' ? (
            <List className={styles.exchangeInfo}>
              <Item extra={`${numFormat(recycleInfo.productGoMoney)} ${config.moneyVirtualCn}`}>
                奖品价值
              </Item>
              <Item extra={`${recycleInfo.goGiveRate} %`}>额外赠送比例</Item>
              <Item extra={`${numFormat(recycleInfo.goGiveMoney)} ${config.moneyVirtualCn}`}>
                额外赠送数量
              </Item>
              <Item extra={`${numFormat(recycleInfo.convertGoMoney)} ${config.moneyVirtualCn}`}>
                您将获得
              </Item>
            </List>
          ) : (
            <div>
              <List className={styles.exchangeInfo}>
                <Item extra={`${numFormat(recycleInfo.marketPrice)} ${config.moneySymbol}`}>
                  市场零售价
                </Item>
                <Item extra={`${recycleInfo.serviceFeeRate} %`}>税费/服务费比例</Item>
                <Item extra={`${numFormat(recycleInfo.serviceFee)} ${config.moneySymbol}`}>
                  税费/服务费
                </Item>
                <Item extra={`${numFormat(recycleInfo.convertPrice)} ${config.moneySymbol}`}>
                  实际到账
                </Item>
              </List>
              <span className={styles.title}>银行卡信息</span>
              <List className={styles.cardInfo}>
                <InputItem
                  {...getFieldProps('realName', {
                    rules: [{ required: true }],
                  })}
                  placeholder="请输入真实姓名"
                  ref={el => (this.nameRef = el)}
                  onClick={() => {
                    this.nameRef.focus();
                  }}
                >
                  持卡人名字
                </InputItem>
                <InputItem
                  {...getFieldProps('bankName', {
                    rules: [{ required: true }],
                  })}
                  placeholder="请输入银行名称"
                  ref={el => (this.name2Ref = el)}
                  onClick={() => {
                    this.name2Ref.focus();
                  }}
                >
                  银行名称
                </InputItem>
                <InputItem
                  {...getFieldProps('bankCardNum', {
                    rules: [{ required: true }],
                  })}
                  placeholder="请输入银行卡号"
                  ref={el => (this.cardRef = el)}
                  onClick={() => {
                    this.cardRef.focus();
                  }}
                  className={styles.noBorder}
                >
                  卡号
                </InputItem>
              </List>
            </div>
          )}

          <NoticeBar
            icon={<img src={resultTips} alt="" className={styles.resultTips} />}
            className={styles.notice}
          >
            {type === 'coins'
              ? `确认兑换后，奖品将以 ${config.moneyVirtualCn} 的形式发放`
              : `兑换现金需要1-7个工作日的人工审核`}
          </NoticeBar>
          <Button type="primary" className={styles.confirm} onClick={this.confirm}>
            确认兑换
          </Button>
          <div className={styles.aggBox}>
            <AgreeItem onChange={this.handlerCheck}>
              <span className={styles.text}>
                我已同意
                <i
                  onClick={() => {
                    window.location.href =
                      'https://app-h5.winmybonus.com/#/agreement/service_0605?language=vi';
                  }}
                >
                  《奖品兑换协议》
                </i>
              </span>
            </AgreeItem>
          </div>
        </div>
        <Modal
          visible={modal}
          transparent
          maskClosable={false}
          title="确认信息"
          style={{ width: '312px' }}
        >
          <div className={styles.modalContent}>
            <p className={styles.text}>
              确认要兑换成 3716 GO币吗？一旦兑换成功后，将无法退换或切换其他兑换方式
            </p>
            <div className={styles.btnGroup}>
              <Button type="primary" className={styles.cancel} onClick={this.onClose}>
                取消
              </Button>
              <Button type="primary" className={styles.determine}>
                确定
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapState = state => ({
  // rules: state.product.data.rules,
});

const mapDispatch = dispatch => ({
  getInfo: params => dispatch.prize.getSelInfo(params),
  coinsFetch: params => dispatch.prize.coinsFetch(params),
  cashFetch: params => dispatch.prize.cashFetch(params),
});

export default connect(mapState, mapDispatch)(createForm()(Exchange));
