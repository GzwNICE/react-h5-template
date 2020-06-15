/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
// import intl from 'react-intl-universal';
import { NavBar, Carousel, Progress, NoticeBar, Button, Toast } from 'antd-mobile';
// import { Link } from 'react-router-dom';
import navBack from '@/assets/images/navBack.png';
import priceBg from '@/assets/images/activity_bg_price.png';
import priceOpen from '@/assets/images/activity_pic_countdown.png';
import remind from '@/assets/images/remind.png';
import avatar from '@/assets/images/avatar_notlogin.png';
import winning from '@/assets/images/winning_crown.png';
import RaffleCode from '@/components/luckyCode';
import Participants from '@/components/participants';

import styles from './index.less';

const { lang } = queryString.parse(window.location.search);

class ProductDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // id: this.props.match.params.activityTurnId,
      data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      current: 1,
      allCur: 0,
      visibleRaffle: false,
      visiblePartic: false,
    };
  }

  componentDidMount() {
    this.setState({
      allCur: this.state.data.length,
    });
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

  render() {
    const { current, allCur, visibleRaffle, visiblePartic } = this.state;
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
            {this.state.data.map(val => (
              <a
                key={val}
                href="http://www.alipay.com"
                style={{ display: 'inline-block', width: '100%', height: '3.75rem' }}
              >
                <img
                  src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top', height: '3.75rem' }}
                />
              </a>
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
            <span>1</span>GO xu / quay
          </span>
          <div className={styles.remainBox}>
            <span>剩余12人次</span>
            <Progress
              percent={40}
              position="normal"
              unfilled
              barStyle={{ border: '4px solid #FF5209', boxSizing: 'border-box' }}
              className={styles.progress}
            />
          </div>
        </div>
        <div className={styles.infoBox}>
          <div className={styles.titleBox}>
            <span className={styles.round}>第1轮</span>AirPods 苹果无线蓝牙耳机二代
          </div>
          <div className={styles.moreBuy}>多买10张奖券可提升 43.48% 中奖率</div>
          <div className={styles.msgBox}>
            <NoticeBar icon={<img src={remind} alt="" width="14" />}>
              如何用6000VND拿走这件商品。
            </NoticeBar>
          </div>
          <div className={styles.viewLottery} onClick={this.viewLottery('visibleRaffle')}>
            查看我的抽奖码
          </div>
          <div className={styles.buyLottery}>
            <span className={styles.buyTimes}>已购买：10次</span>
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
                <li>获奖者：张三</li>
                <li>轮次：第1轮</li>
                <li>本轮参与：18人次</li>
                <li>开奖时间：2019/10/03 13：00</li>
              </ul>
            </div>
            <div className={styles.winNum}>
              <span className={styles.num}>中奖号码 10000174</span>
              <Button className={styles.rule}>计算规则</Button>
            </div>
          </div>
          <div className={styles.sweepstakes} onClick={this.viewLottery('visiblePartic')}>
            查看本期抽奖人员
          </div>
        </div>
        <div className={styles.shopDetail}>
          <h3 className={styles.h3tle}>商品详情</h3>
          <p className={styles.text}>
            Families traveling with kids will find Amboseli national park a safari destination
            matched to no other, with less tourist traffic, breathtaking open spaces, easy access
            from Nairobi, the list is endless. The park described by writers as ‘ a home for the
            Gods’ covers 150sq mile south of Nairobi and lies just at the foot of Mt Kilimanjaro,
            Africa’s highest mountain at 5,895m. The park is currently on the{' '}
          </p>
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591872597136&di=095a9ae669cc4887911865732129117a&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg"
            alt="img"
          />
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591873066586&di=a940819a42658c278b439cee5bab52eb&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F9vo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F3b292df5e0fe99257d8c844b34a85edf8db1712d.jpg"
            alt="img"
          />
        </div>
        <div className={styles.snapped}>立即抢购</div>
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

const mapState = state => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(ProductDetail);
