/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import intl from 'react-intl-universal';
import { NavBar, Icon, Card } from 'antd-mobile';
import receiveBg from '@/assets/images/receive_pic_bg@2x.png';
import congratulation from '@/assets/images/receive_pic_congratulation@2x.png';
import { numFormat } from '@/utils/util';
import styles from './index.less';

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
          {intl.get('prize.receiveAward')}
        </NavBar>
        <div className={styles.content} style={{ backgroundImage: `url(${receiveBg})` }}>
          <img src={congratulation} alt="" className={styles.receiveBg} />
          <div className={styles.tips}>{intl.get('prize.pleaseClaimPrize')}</div>
          <div className={styles.productInfo}>
            <img src={prodInfo.imgUrl} alt="" className={styles.prodImg} />
            <ul className={styles.textBox}>
              <li className={styles.prodName}>{prodInfo.productName}</li>
              <li className={styles.num}>{intl.get('prize.quantity')}：1</li>
              <li className={styles.price}>
                {intl.get('prize.retailPrice')}：
                <span>{`${numFormat(prodInfo.marketPrice)} ${config.moneySymbol}`}</span>
              </li>
            </ul>
          </div>
          <div className={styles.countDown}>
            {intl.get('prize.exchangeCountdown')}
            <span className={styles.time}>{openH}</span>:
            <span className={styles.time}>{openM}</span>:
            <span className={styles.time}>{openS}</span>
          </div>
          <div className={styles.selectBox}>
            <Card>
              <Card.Header title={intl.get('prize.chooseMethod')} className={styles.cardHeader} />
              <Card.Body className={styles.cardBody}>
                <div className={styles.selectItem} onClick={() => this.goExchange('coins')}>
                  <li className={styles.way}>
                    {intl.get('payment.go_convert', { moneyVirtualCn: config.moneyVirtualCn })}
                  </li>
                  <li className={styles.content}>
                    {intl.get('prize.willGet')}{' '}
                    <span className={styles.num}>
                      {numFormat(recycleInfo.convertGoMoney)} {config.moneyVirtualCn}
                    </span>{' '}
                    <span className={styles.give}>{`${intl.get('prize.giveAway')}${
                      recycleInfo.goGiveRate
                    }%`}</span>
                  </li>
                  <li className={styles.tipText}>
                    {intl.get('prize.exchangeToGOCoins', { moneyVirtualCn: config.moneyVirtualCn })}
                  </li>
                </div>
                {select ? (
                  <div>
                    <div className={styles.selectItem} onClick={this.goPrize}>
                      <li className={styles.way}>{intl.get('result.prizeCollection')}</li>
                      <li className={styles.tipText}>{intl.get('prize.fillInfo')}</li>
                    </div>
                    {recycleInfo.convertPrice ? (
                      <div className={styles.selectItem} onClick={() => this.goExchange('cash')}>
                        <li className={styles.way}>
                          {intl.get('payment.str_change_gocoin')}
                          <span>
                            {' '}
                            {`${numFormat(recycleInfo.convertPrice)}${config.moneySymbol}`}
                          </span>
                          <span className={styles.title}>{`${intl.get('prize.deducted', {
                            serviceFeeRate: recycleInfo.serviceFeeRate,
                          })}`}</span>
                        </li>
                        <li className={styles.tipText}>{intl.get('prize.convertCash')}</li>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </Card.Body>
              <Card.Footer
                content={select ? `${intl.get('prize.putAway')}` : `${intl.get('prize.moreWays')}`}
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
