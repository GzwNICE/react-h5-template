/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
// import intl from 'react-intl-universal';
import Cookies from 'js-cookie';
import { NavBar, Carousel, Progress, NoticeBar, Button, Toast } from 'antd-mobile';
import { Link } from 'react-router-dom';
import navBack from '@/assets/images/navBack.png';
import priceBg from '@/assets/images/activity_bg_price.png';
import priceOpen from '@/assets/images/activity_pic_countdown.png';
import remind from '@/assets/images/remind.png';
import avatar from '@/assets/images/avatar_notlogin.png';
import winning from '@/assets/images/winning_crown.png';
import RaffleCode from '@/components/luckyCode';
import Participants from '@/components/participants';
import BuyGroup from '@/components/buyGroup';
import styles from './index.less';

const { lang } = queryString.parse(window.location.search);

class ProductDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      IPhoneX: Cookies.get('IPhoneX'),
      activityTurnId: this.props.match.params.activityTurnId,
      data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      current: 1,
      allCur: 0,
      visibleRaffle: false,
      visiblePartic: false,
      buyShow: false,
    };
  }

  componentDidMount() {
    const { getDetail } = this.props;
    getDetail({ activityTurnId: this.state.activityTurnId }).then(res => {
      if (res.code === 200) {
        this.setState({
          allCur: res.data.imgUrlList.length,
        });
      }
    });
  }

  componentDidUpdate() {
    if (this.state.buyShow) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

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

  visibleBuy = () => {
    console.log(123);
    this.setState({
      buyShow: !this.state.buyShow,
    });
  };

  render() {
    const { IPhoneX, current, allCur, visibleRaffle, visiblePartic, activityTurnId, buyShow } = this.state;
    const { detail } = this.props;
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
                <img
                  key={val}
                  src={val}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top', height: '3.75rem' }}
                />
              ))}
          </Carousel>
          <div className={styles.dotsBox}>{`${current}/${allCur}`}</div>
        </div>
        <div className={styles.openTips} style={{ backgroundImage: `url(${priceOpen})` }}>
          参与人次比例达到80%后自动开启限时夺宝
        </div>
        <div
          className={styles.openTips}
          style={{ backgroundImage: `url(${priceOpen})`, justifyContent: 'center' }}
        >
          开奖倒计时
          <span className={styles.time}>04</span>:<span className={styles.time}>59</span>:
          <span className={styles.time}>59</span>
        </div>
        <div className={styles.priceBox} style={{ backgroundImage: `url(${priceBg})` }}>
          <span className={styles.price}>
            <span className={styles.pPrice}>{detail.participatePrice}</span>
            <span>GO xu</span> / <span>奖券</span>
          </span>
          <div className={styles.remainBox}>
            <span>{`剩余${detail.remainingCount}人次`}</span>
            <Progress
              percent={detail.progressRate}
              position="normal"
              unfilled
              barStyle={{ border: '4px solid #FF5209', boxSizing: 'border-box' }}
              className={styles.progress}
            />
          </div>
        </div>
        <div className={styles.infoBox}>
          <div className={styles.titleBox}>
            <span className={styles.round}>{`第${detail.currentTurn}轮`}</span>
            {detail.activityName}
          </div>
          <div className={styles.moreBuy}>{`多买10张奖券可提升 ${detail.addWinRate}% 中奖率`}</div>
          <div className={styles.msgBox}>
            <NoticeBar icon={<img src={remind} alt="" width="14" />}>
              如何用6000VND拿走这件商品。
            </NoticeBar>
          </div>
          <div className={styles.viewLottery} onClick={this.viewLottery('visibleRaffle')}>
            查看我的抽奖码
          </div>
          <div className={styles.buyLottery}>
            <span className={styles.buyTimes}>{`已购买：${detail.buyCount}次`}</span>
            <span className={styles.lottery} onClick={this.viewLottery('visibleRaffle')}>
              查看我的抽奖码
            </span>
          </div>
          <div className={styles.winningBox}>
            <div className={styles.info}>
              <div className={styles.left}>
                <img src={avatar} alt="avatar" className={styles.avatar} />
                <img src={winning} alt="win" className={styles.winning} />
              </div>
              <ul className={styles.right}>
                <li>{`获奖者：${detail.winnerUserName}`}</li>
                <li>{`轮次：第${detail.currentTurn}轮`}</li>
                <li>{`本轮参与：${detail.winnerBuyCount}人次`}</li>
                <li>{`开奖时间：${detail.openTime}`}</li>
              </ul>
            </div>
            <div className={styles.winNum}>
              <span className={styles.num}>中奖号码 10000174</span>
              <Link
                to={{
                  pathname: `/rules/${activityTurnId}`,
                  search: `?lang=${lang}`,
                }}
                className={styles.rule}
              >
                计算规则
              </Link>
            </div>
          </div>
          <div className={styles.sweepstakes} onClick={this.viewLottery('visiblePartic')}>
            查看本期抽奖人员
          </div>
        </div>
        <div className={styles.shopDetail}>
          <h3 className={styles.h3tle}>商品详情</h3>
          <p className={styles.text}>{detail.content}</p>
          {detail.contentImgList
            ? detail.contentImgList.map(i => {
                return <img src="i" alt="img" key={i.index} />;
              })
            : null}
        </div>
        <div
          className={`${styles.snapped} ${IPhoneX === 'true' ? `${styles.snappedIPhone}` : null}`}
          onClick={this.visibleBuy}
        >
          立即抢购
        </div>
        <BuyGroup open={buyShow} onOpenChange={this.visibleBuy} />
        <div className={styles.newActBox}>
          <span className={styles.nextAct}>
            新一轮活动倒计时
            <span className={styles.time}>04</span>:<span className={styles.time}>59</span>:
            <span className={styles.time}>59</span>
          </span>
          <Button type="primary" className={styles.goNow}>立即前往</Button>
        </div>
        <RaffleCode visible={visibleRaffle} closeRaffle={this.closeRaffle('visibleRaffle')} />
        <Participants visible={visiblePartic} closeRaffle={this.closeRaffle('visiblePartic')} />
      </div>
    );
  }
}

const mapState = state => ({
  detail: state.product.data.detail,
});

const mapDispatch = dispatch => ({
  getDetail: params => dispatch.product.getDetail(params),
});

export default connect(mapState, mapDispatch)(ProductDetail);
