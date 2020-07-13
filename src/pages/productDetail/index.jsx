/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import intl from 'react-intl-universal';
import Cookies from 'js-cookie';
import { NavBar, Carousel, Progress, NoticeBar, Button, Toast } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { format } from '@/utils/util';
import navBack from '@/assets/images/navBack.png';
import priceBg from '@/assets/images/activity_bg_price.png';
import priceOpen from '@/assets/images/activity_pic_countdown.png';
import gift from '@/assets/images/activity_ic_gift.png';
import remind from '@/assets/images/remind.png';
import avatar from '@/assets/images/avatar_notlogin.png';
import winning from '@/assets/images/winning_crown.png';
import RaffleCode from '@/components/luckyCode';
import Participants from '@/components/participants';
import ReceiveAward from '@/components/receive';
import BuyGroup from '@/components/buyGroup';
import styles from './index.less';

const { lang } = queryString.parse(window.location.search);

class ProductDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      IPhoneX: Cookies.get('IPhoneX'),
      activityTurnId: this.props.match.params.activityTurnId,
      current: 1,
      allCur: 0,
      visibleRaffle: false,
      visiblePartic: false,
      visibleReceive: false,
      buyShow: false, //购买弹窗
      status: null, //活动状态
      // luckyCode: true, //查看抽奖码
      countdown: false, //倒计时
      openH: '00',
      openM: '00',
      openS: '00',
      personData: [],
      proportionData: [],
      nextH: '00',
      nextM: '00',
      nextS: '00',
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.initDetail();
    window.scrollTo(0, 0);
  }

  componentDidUpdate() {
    if (this.state.buyShow) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  // 详情页互相跳转，id发生变化，无法重新渲染组件，暂时使用刷新页面解决跳转不渲染问题
  componentWillReceiveProps(nextProps) {
    const thisId = this.props.match.params.activityTurnId;
    const nextId = nextProps.match.params.activityTurnId;
    if (thisId !== nextId) {
      console.log(3);
      window.location.reload();
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
  }

  initDetail = () => {
    Toast.loading('Loading...', 0);
    const { getDetail } = this.props;
    getDetail({ activityTurnId: this.state.activityTurnId }).then(res => {
      if (res.code === 200) {
        setTimeout(() => {
          Toast.hide();
        }, 200);
        this.setState({
          allCur: res.data.imgUrlList.length,
          status: res.data.status,
          personData: [
            { value: 20, label: 20 },
            { value: 50, label: 50 },
            { value: 80, label: 80 },
            { value: res.data.remainingCount, label: `${intl.get('product.baoWei')}` },
          ],
          proportionData: [
            { value: Math.floor(res.data.participateNum * 0.1), label: '10%' },
            { value: Math.floor(res.data.participateNum * 0.2), label: '20%' },
            { value: Math.floor(res.data.participateNum * 0.3), label: '30%' },
            { value: Math.floor(res.data.participateNum * 0.5), label: '50%' },
          ],
        });
        if (
          Number(res.data.waitStartTime) > 1000 &&
          (res.data.status === 1 || res.data.status === 7 || res.data.status === 10)
        ) {
          this.countFun(Number(res.data.waitStartTime), 'wait');
        }
        if (
          Number(res.data.countdownTime) > 1000 &&
          (res.data.status === 7 ||
            res.data.status === 4 ||
            res.data.status === 5 ||
            res.data.status === 6)
        ) {
          this.setState({
            countdown: true,
          });
          this.countFun(Number(res.data.countdownTime), 'open');
        }
        if (res.data.ifWin === 'yes' && res.data.orderStatus === 6) {
          this.setState({ visibleReceive: true });
        }
      }
    });
  };

  countFun = (time, type) => {
    var remaining = time;
    let timer = setInterval(() => {
      //防止出现负数
      if (remaining > 1000) {
        remaining -= 1000;
        let hour = Math.floor((remaining / 1000 / 3600) % 24);
        let minute = Math.floor((remaining / 1000 / 60) % 60);
        let second = Math.floor((remaining / 1000) % 60);
        if (type === 'open') {
          this.setState({
            openH: hour < 10 ? '0' + hour : hour,
            openM: minute < 10 ? '0' + minute : minute,
            openS: second < 10 ? '0' + second : second,
          });
        } else {
          this.setState({
            nextH: hour < 10 ? '0' + hour : hour,
            nextM: minute < 10 ? '0' + minute : minute,
            nextS: second < 10 ? '0' + second : second,
          });
        }
      } else {
        clearInterval(timer);
        this.setState({
          countdown: false,
        });
        this.initDetail();
      }
    }, 1000);
  };

  carBeforeChange = (form, to) => {
    this.setState({
      current: to + 1,
    });
  };

  closeRaffle = key => () => {
    this.setState({
      [key]: false,
    });
  };

  viewLottery = key => () => {
    this.setState({
      [key]: true,
    });
  };

  visibleBuy = type => {
    const token = localStorage.getItem('token');
    if (!token) {
      Toast.info(`${intl.get('product.pleaseLogin')}`, 2);
      setTimeout(() => {
        this.props.history.push(`/login`);
      }, 2000);
      return false;
    }
    this.setState({
      buyShow: !this.state.buyShow,
    });
    if (type === 'success') {
      console.log('tangchuang');
      this.initDetail();
    }
  };

  goPay = () => {
    this.props.history.push(`/payment`);
  };

  newActivity = id => {
    this.props.history.push(`/product/${id}`);
    console.log('xinid');
    this.initDetail();
  };

  handleConfirm = () => {
    const { getRules, getAwardInfo } = this.props;
    const id = this.state.activityTurnId;
    getRules({
      activityTurnId: id,
    }).then(res => {
      if (res.code === 200) {
        if (res.data.status === 0) {
          this.setState({
            visibleReceive: false,
          });
          this.props.history.push(`/prize/${id}`);
        } else {
          getAwardInfo({ activityTurnId: id }).then(res => {
            if (res.code === 200) {
              this.setState({
                visibleReceive: false,
              });
              this.props.history.push(`/awardResult?type=${res.data.productType}`);
            }
          });
        }
      }
    });
  };

  render() {
    const {
      IPhoneX,
      current,
      allCur,
      visibleRaffle,
      visiblePartic,
      activityTurnId,
      buyShow,
      visibleReceive,
      status,
      // luckyCode,
      countdown,
      personData,
      proportionData,
      nextH,
      nextM,
      nextS,
      openH,
      openM,
      openS,
    } = this.state;
    const { detail } = this.props;
    const { moneyVirtualCn, moneySymbol } = JSON.parse(localStorage.getItem('configuration'));
    const winData = {
      img: detail.thumbnailUrl,
      name: detail.productName,
      code: detail.winningNum,
    };
    return (
      <div className={styles.productPage}>
        <NavBar
          mode="light"
          icon={<img src={navBack} alt="icon" style={{ height: '30px' }} />}
          className={styles.navBar}
          onLeftClick={() => {
            this.props.history.go(-1);
          }}
        />
        <div className={styles.carousel}>
          <Carousel autoplay={false} infinite dots={false} beforeChange={this.carBeforeChange}>
            {detail.imgUrlList &&
              detail.imgUrlList.map(val => (
                <div key={val} className={styles.carouselItem}>
                  <img src={val} alt="img" className={styles.carouselImg} />
                </div>
              ))}
          </Carousel>
          <div className={styles.dotsBox}>{`${current}/${allCur}`}</div>
        </div>
        {status === 3 ? (
          <div className={styles.openTips} style={{ backgroundImage: `url(${priceOpen})` }}>
            {`${intl.get('product.participant')}${detail.panicBuyRatio}%${intl.get(
              'product.automatically'
            )}`}
          </div>
        ) : null}
        {countdown ? (
          <div
            className={styles.openTips}
            style={{ backgroundImage: `url(${priceOpen})`, justifyContent: 'center' }}
          >
            {intl.get('product.countdown')}
            <span className={styles.time}>{openH}</span>:
            <span className={styles.time}>{openM}</span>:
            <span className={styles.time}>{openS}</span>
          </div>
        ) : null}
        <div className={styles.priceBox} style={{ backgroundImage: `url(${priceBg})` }}>
          <span className={styles.price}>
            <span className={styles.pPrice}>{detail.participatePrice}</span>
            <span>{moneyVirtualCn}</span> / <span>{intl.get('home.personTime')}</span>
          </span>
          <div className={styles.remainBox}>
            <span>{`${intl.get('home.remaining')}${detail.remainingCount}${intl.get(
              'home.personTime'
            )}`}</span>
            <Progress
              percent={detail.progressRate}
              position="normal"
              unfilled
              barStyle={{
                backgroundColor: 'rgb(255,82,9)',
                border: 'none',
              }}
              className={styles.progress}
            />
          </div>
        </div>
        <div className={styles.infoBox}>
          <div className={styles.titleBox}>
            <span className={styles.round}>
              {intl.get('product.round', { currentTurn: detail.currentTurn })}
            </span>
            {detail.activityName}
          </div>
          <div className={styles.moreBuy}>{`${intl.get('home.BuyMore')} ${
            detail.addWinRate
          }% ${intl.get('home.oddsWinning')}`}</div>
          {(status === 8 || status === 9 || status === 10) && detail.partakeStatus === 'yes' ? (
            <div className={styles.msgBox}>
              {detail.ifWin === 'yes' ? (
                <NoticeBar
                  icon={detail.orderStatus === 0 ? null : <img src={gift} alt="" width="14" />}
                >
                  {detail.orderStatus === 0
                    ? `${intl.get('product.during')}`
                    : `${intl.get('product.winning')}`}
                </NoticeBar>
              ) : (
                <NoticeBar icon={<img src={remind} alt="" width="14" />}>
                  {intl.get('product.notWin')}
                </NoticeBar>
              )}
            </div>
          ) : null}
          {detail.partakeStatus === 'no' ? (
            <div className={styles.msgBox}>
              <NoticeBar icon={<img src={remind} alt="" width="14" />}>
                {intl.get('product.takeProduct', { moneySymbol: moneySymbol })}
              </NoticeBar>
            </div>
          ) : null}
          {detail.ifWin === 'yes' && detail.orderStatus === 6 ? (
            <div
              className={styles.viewLottery}
              onClick={() => {
                this.props.history.push(`/prize/${activityTurnId}`);
              }}
            >
              {intl.get('product.prizeNow')}
            </div>
          ) : null}
          {detail.partakeStatus === 'yes' && detail.ifWin === 'no' ? (
            <div className={styles.viewLottery} onClick={this.viewLottery('visibleRaffle')}>
              {intl.get('product.lotteryCode')}
            </div>
          ) : null}
          {(status === 7 || status === 2 || status === 3) &&
          status !== 9 &&
          detail.partakeStatus === 'yes' ? (
            <div className={styles.buyLottery}>
              <span className={styles.buyTimes}>
                {intl.get('product.bought', { buyCount: detail.buyCount })}
              </span>
              <span className={styles.lottery} onClick={this.viewLottery('visibleRaffle')}>
                {intl.get('product.lotteryCode')}
              </span>
            </div>
          ) : null}
          {detail.ifWin === 'yes' && (detail.orderStatus === 2 || detail.orderStatus === 3) ? (
            <div className={styles.buyFailure}>
              {detail.orderStatus === 2 ? (
                <span className={styles.failure}>{intl.get('product.received')}</span>
              ) : (
                <span className={styles.failure}>{intl.get('product.prizeWasReceived')}</span>
              )}
            </div>
          ) : null}
          {status === 8 || status === 9 || status === 10 ? (
            <div className={styles.winningBox}>
              <div className={styles.info}>
                <div className={styles.left}>
                  <img
                    src={detail.photoUrl ? detail.photoUrl : avatar}
                    alt="avatar"
                    className={styles.avatar}
                  />
                  <img src={winning} alt="win" className={styles.winning} />
                </div>
                <ul className={styles.right}>
                  <li>{`${intl.get('product.awardWinner')}：${detail.winnerUserName}`}</li>
                  <li>{intl.get('product.rounds', { currentTurn: detail.currentTurn })}</li>
                  <li>{`${intl.get('product.participateRound')}：${detail.winnerBuyCount}${intl.get(
                    'home.personTime'
                  )}`}</li>
                  <li>{`${intl.get('product.drawTime')}：${format(detail.openTime, 'str')}`}</li>
                </ul>
              </div>
              <div className={styles.winNum}>
                <span className={styles.num}>{`${intl.get('product.prizeNumber')} ${
                  detail.winningNum
                }`}</span>
                <Link
                  to={{
                    pathname: `/rules/${activityTurnId}`,
                  }}
                  className={styles.rule}
                >
                  {intl.get('product.calculationRules')}
                </Link>
              </div>
            </div>
          ) : null}

          <div className={styles.sweepstakes} onClick={this.viewLottery('visiblePartic')}>
            {intl.get('product.drawStaff')}
          </div>
        </div>
        <div className={styles.shopDetail}>
          <h3 className={styles.h3tle}>{intl.get('product.productDetails')}</h3>
          <p className={styles.text}>{detail.content}</p>
          {detail.contentImgList
            ? detail.contentImgList.map(i => {
                return <img src={i} alt="img" key={i} />;
              })
            : null}
        </div>
        {status && status !== 1 && status !== 7 && status !== 8 && status !== 9 && status !== 10 ? (
          <div
            className={`${styles.snapped} ${IPhoneX === 'true' ? `${styles.snappedIPhone}` : null}`}
            onClick={this.visibleBuy}
          >
            {intl.get('product.snapNow')}
          </div>
        ) : null}
        <BuyGroup
          open={buyShow}
          onOpenChange={this.visibleBuy}
          data={detail}
          personData={personData}
          proportionData={proportionData}
          goPay={this.goPay}
        />
        {status && (status === 1 || status === 10 || status === 9 || status === 7) ? (
          <div className={styles.newActBox}>
            {status === 9 ? (
              <span className={styles.nextAct}>{intl.get('product.newRound')}</span>
            ) : (
              <span className={styles.nextAct}>
                {intl.get('product.eventCountdown')}
                <span className={styles.time}>{nextH}</span>:
                <span className={styles.time}>{nextM}</span>:
                <span className={styles.time}>{nextS}</span>
              </span>
            )}
            <Button
              type="primary"
              className={styles.goNow}
              disabled={status === 1}
              onClick={() => this.newActivity(detail.nextActivityTurnId)}
            >
              {status === 1 ? `${intl.get('product.aboutStart')}` : `${intl.get('product.goNow')}`}
            </Button>
          </div>
        ) : null}
        {status === 5 || status === 8 ? (
          <div className={styles.newActBox}>
            <p>{intl.get('product.productEnded')}</p>
          </div>
        ) : null}
        <RaffleCode
          visible={visibleRaffle}
          closeRaffle={this.closeRaffle('visibleRaffle')}
          id={activityTurnId}
        />
        <Participants
          visible={visiblePartic}
          closeRaffle={this.closeRaffle('visiblePartic')}
          id={activityTurnId}
        />
        <ReceiveAward
          visible={visibleReceive}
          close={this.closeRaffle('visibleReceive')}
          data={winData}
          confirm={this.handleConfirm}
        />
      </div>
    );
  }
}

const mapState = state => ({
  detail: state.product.data.detail,
});

const mapDispatch = dispatch => ({
  getDetail: params => dispatch.product.getDetail(params),
  getRules: params => dispatch.product.existRules(params),
  getAwardInfo: params => dispatch.prize.result(params),
});

export default connect(mapState, mapDispatch)(ProductDetail);
