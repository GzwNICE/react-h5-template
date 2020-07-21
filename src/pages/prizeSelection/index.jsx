/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import queryString from 'query-string';
// import md5 from 'md5';
import intl from 'react-intl-universal';
import { NavBar, Icon, List, Accordion, Card } from 'antd-mobile';
// import { Link } from 'react-router-dom';
// import { createForm } from 'rc-form';
import receiveBg from '@/assets/images/receive_pic_bg@2x.png';
import congratulation from '@/assets/images/receive_pic_congratulation@2x.png';
// import passwordOpen from '@/assets/images/passwordOpen.png';
import { numFormat } from '@/utils/util';
import styles from './index.less';

const Item = List.Item;

class PrizeSelection extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.activityTurnId,
      select: false,
      info: null,
      openH: 0,
      openM: 0,
      openS: 0,
    };
  }

  componentDidMount() {
    const { getInfo } = this.props;
    getInfo({ activityTurnId: this.state.id }).then(res => {
      if (res.code === 200) {
        this.setState({
          info: res.data,
        });
        this.countFun(res.data.countdownTime);
      }
    });
  }

  countFun = time => {
    var remaining = time;
    let timer = setInterval(() => {
      //防止出现负数
      if (remaining > 1000) {
        remaining -= 1000;
        let hour = Math.floor((remaining / 1000 / 3600) % 24);
        let minute = Math.floor((remaining / 1000 / 60) % 60);
        let second = Math.floor((remaining / 1000) % 60);
        this.setState({
          openH: hour < 10 ? '0' + hour : hour,
          openM: minute < 10 ? '0' + minute : minute,
          openS: second < 10 ? '0' + second : second,
        });
      } else {
        clearInterval(timer);
      }
    }, 999);
  };

  handlerFooterClick = () => {
    this.setState({
      select: !this.state.select,
    });
  };

  goExchange = type => {
    console.log(type);
    const id = this.state.id;
    this.props.history.push(`/exchange/${id}?type=${type}`);
  };

  goPrize = () => {
    const id = this.state.id;
    this.props.history.push(`/prize/${id}`);
  };

  render() {
    const config = JSON.parse(localStorage.getItem('configuration')) || {};
    const { select, openH, openM, openS, info } = this.state;
    const prodInfo = (info && info.prizesProductVO) || {};
    const recycleInfo = (info && info.recycleInfoVO) || {};
    return (
      <div className={styles.selection}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          className={styles.navBar}
          onLeftClick={() => {
            this.props.history.go(-1);
          }}
        >
          领奖
        </NavBar>
        <div className={styles.content} style={{ backgroundImage: `url(${receiveBg})` }}>
          <img src={congratulation} alt="" className={styles.receiveBg} />
          <div className={styles.tips}>请在规定时间内领奖，超过规定时间没有领奖将视为自动放弃</div>
          <div className={styles.productInfo}>
            <img src={prodInfo.imgUrl} alt="" className={styles.prodImg} />
            <ul className={styles.textBox}>
              <li className={styles.prodName}>{prodInfo.productName}</li>
              <li className={styles.num}>数量：1</li>
              <li className={styles.price}>
                零售价：<span>{`${numFormat(prodInfo.marketPrice)} ${config.moneySymbol}`}</span>
              </li>
            </ul>
          </div>
          <div className={styles.countDown}>
            兑换倒计时
            <span className={styles.time}>{openH}</span>:<span className={styles.time}>{openM}</span>:
            <span className={styles.time}>{openS}</span>
          </div>
          <div className={styles.selectBox}>
            <Card>
              <Card.Header title="选择兑换方式" className={styles.cardHeader} />
              <Card.Body className={styles.cardBody}>
                <div className={styles.selectItem} onClick={() => this.goExchange('coins')}>
                  <li className={styles.way}>兑换{config.moneyVirtualCn}</li>
                  <li className={styles.content}>
                    您将获得{' '}
                    <span className={styles.num}>
                      {recycleInfo.convertGoMoney} {config.moneyVirtualCn}
                    </span>{' '}
                    <span className={styles.give}>{`赠送${recycleInfo.goGiveRate}%`}</span>
                  </li>
                  <li className={styles.tipText}>奖品兑换为GO币，可继续参与更多活动。</li>
                </div>
                {select ? (
                  <div>
                    <div className={styles.selectItem} onClick={this.goPrize}>
                      <li className={styles.way}>领取奖品</li>
                      <li className={styles.tipText}>填写领奖信息，平台寄出奖品</li>
                    </div>
                    <div className={styles.selectItem} onClick={() => this.goExchange('cash')}>
                      <li className={styles.way}>
                        兑换
                        <span>
                          {' '}
                          {`${numFormat(recycleInfo.convertPrice)}${config.moneySymbol}`}
                        </span>
                        <span
                          className={styles.title}
                        >{` (已扣除 ${recycleInfo.serviceFeeRate}% 税费/服务费)`}</span>
                      </li>
                      <li className={styles.tipText}>兑换成现金，直接提现到银行卡</li>
                    </div>
                  </div>
                ) : null}
              </Card.Body>
              <Card.Footer
                content={select ? `收起` : `更多方式`}
                extra={<Icon type={select ? `up` : `down`} />}
                className={styles.cardFooter}
                onClick={this.handlerFooterClick}
              />
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  rules: state.product.data.rules,
});

const mapDispatch = dispatch => ({
  getInfo: params => dispatch.prize.getSelInfo(params),
});

export default connect(mapState, mapDispatch)(PrizeSelection);
