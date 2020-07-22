/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import intl from 'react-intl-universal';
import {
  NavBar,
  Icon,
  List,
  InputItem,
  NoticeBar,
  Button,
  Checkbox,
  Modal,
  Toast,
} from 'antd-mobile';
import { createForm } from 'rc-form';
import resultTips from '@/assets/images/resultTips.png';
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
    const { cashFetch } = this.props;
    if (!this.state.protocol) {
      return Toast.info(`${intl.get('exchange.pleaseReadAgree')}`, 2);
    }
    if (type === 'coins') {
      this.setState({
        modal: true,
      });
      return;
    }
    if (type === 'cash') {
      this.props.form.validateFields((err, value) => {
        if (err) {
          return Toast.info(`${intl.get('prize.ph2')}`, 2);
        }
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

  onDetermine = () => {
    const { id } = this.state;
    const { coinsFetch } = this.props;
    coinsFetch({
      activityTurnId: id,
    }).then(res => {
      if (res.code === 200) {
        this.props.history.push(`/changeResult?type=coins&money=${res.data.convertGoMoney}`);
      }
    });
  };

  render() {
    const { getFieldProps } = this.props.form;
    const config = JSON.parse(localStorage.getItem('configuration')) || {};
    const { modal, type, info } = this.state;
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
          {intl.get('payment.str_change_gocoin')}
        </NavBar>
        <div className={styles.content}>
          <span className={styles.title}>{intl.get('result.prize')}</span>
          <div className={styles.prodInfoBox}>
            <img src={prodInfo.imgUrl} alt="" className={styles.left} />
            <ul className={styles.textBox}>
              <li className={styles.prodName}>{prodInfo.productName}</li>
              <li className={styles.num}>{intl.get('prize.quantity')}：1</li>
              <li className={styles.price}>
                {intl.get('prize.retailPrice')}：
                <span>{`${numFormat(prodInfo.marketPrice)} ${config.moneySymbol}`}</span>
              </li>
            </ul>
          </div>
          <span className={styles.title}>{intl.get('order.dialogDetail')}</span>
          {type === 'coins' ? (
            <List className={styles.exchangeInfo}>
              <Item extra={`${numFormat(recycleInfo.productGoMoney)} ${config.moneyVirtualCn}`}>
                {intl.get('order.productGoMoney')}
              </Item>
              <Item extra={`${recycleInfo.goGiveRate} %`}>{intl.get('order.goGiveRate')}</Item>
              <Item extra={`${numFormat(recycleInfo.goGiveMoney)} ${config.moneyVirtualCn}`}>
                {intl.get('order.goGiveMoney')}
              </Item>
              <Item extra={`${numFormat(recycleInfo.convertGoMoney)} ${config.moneyVirtualCn}`}>
                {intl.get('prize.willGet')}
              </Item>
            </List>
          ) : (
            <div>
              <List className={styles.exchangeInfo}>
                <Item extra={`${numFormat(recycleInfo.marketPrice)} ${config.moneySymbol}`}>
                  {intl.get('exchange.parkedRetail')}
                </Item>
                <Item extra={`${recycleInfo.serviceFeeRate} %`}>
                  {intl.get('order.serviceFeeRate')}
                </Item>
                <Item extra={`${numFormat(recycleInfo.serviceFee)} ${config.moneySymbol}`}>
                  {intl.get('order.serviceFee')}
                </Item>
                <Item extra={`${numFormat(recycleInfo.convertPrice)} ${config.moneySymbol}`}>
                  {intl.get('order.convertPrice')}
                </Item>
              </List>
              <span className={styles.title}>{intl.get('exchange.bankCardInfo')}</span>
              <List className={styles.cardInfo}>
                <InputItem
                  {...getFieldProps('realName', {
                    rules: [{ required: true }],
                  })}
                  placeholder={intl.get('exchange.plh1')}
                  ref={el => (this.nameRef = el)}
                  onClick={() => {
                    this.nameRef.focus();
                  }}
                >
                  {intl.get('order.realName')}
                </InputItem>
                <InputItem
                  {...getFieldProps('bankName', {
                    rules: [{ required: true }],
                  })}
                  placeholder={intl.get('exchange.plh2')}
                  ref={el => (this.name2Ref = el)}
                  onClick={() => {
                    this.name2Ref.focus();
                  }}
                >
                  {intl.get('order.bankName')}
                </InputItem>
                <InputItem
                  {...getFieldProps('bankCardNum', {
                    rules: [{ required: true }],
                  })}
                  placeholder={intl.get('exchange.plh3')}
                  ref={el => (this.cardRef = el)}
                  onClick={() => {
                    this.cardRef.focus();
                  }}
                  className={styles.noBorder}
                >
                  {intl.get('order.bankCardNum')}
                </InputItem>
              </List>
            </div>
          )}

          <NoticeBar
            icon={<img src={resultTips} alt="" className={styles.resultTips} />}
            className={styles.notice}
          >
            {type === 'coins'
              ? `${intl.get('exchange.issue', { moneyVirtualCn: config.moneyVirtualCn })}`
              : `${intl.get('exchange.exchangeCash')}`}
          </NoticeBar>
          <Button type="primary" className={styles.confirm} onClick={this.confirm}>
            {intl.get('exchange.confirmExchange')}
          </Button>
          <div className={styles.aggBox}>
            <AgreeItem onChange={this.handlerCheck}>
              <span className={styles.text}>
                {intl.get('exchange.agreed')}
                <i onClick={() => this.props.history.push('/agreement/5')}>
                  {intl.get('exchange.prizeRedemption')}
                </i>
              </span>
            </AgreeItem>
          </div>
        </div>
        <Modal
          visible={modal}
          transparent
          maskClosable={false}
          title={intl.get('exchange.confirmInfo')}
          style={{ width: '312px' }}
        >
          <div className={styles.modalContent}>
            <p className={styles.text}>
              {intl.get('exchange.confirmRedeem', {
                value: numFormat(recycleInfo.convertGoMoney),
                moneyVirtualCn: config.moneyVirtualCn,
              })}
            </p>
            <div className={styles.btnGroup}>
              <Button type="primary" className={styles.cancel} onClick={this.onClose}>
                {intl.get('password.cancel')}
              </Button>
              <Button type="primary" className={styles.determine} onClick={this.onDetermine}>
                {intl.get('password.determine')}
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
