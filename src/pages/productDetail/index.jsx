/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import intl from 'react-intl-universal';
import Cookies from 'js-cookie';
import { NavBar, Carousel, Progress, Button, Toast, Badge, Icon } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { format } from '@/utils/util';
import navBack from '@/assets/images/navBack.png';
import priceBg from '@/assets/images/activity_bg_price.png';
import priceOpen from '@/assets/images/activity_pic_countdown.png';
import gift from '@/assets/images/activity_ic_gift.png';
import remind from '@/assets/images/remind.png';
import avatar from '@/assets/images/avatar_notlogin.png';
import winning from '@/assets/images/winning_crown.png';
import shoppingcart from '@/assets/images/ic_shoppingcart@2x.png';
import xsms from '@/assets/images/label@2x.png';
import RaffleCode from '@/components/luckyCode';
import Participants from '@/components/participants';
import ReceiveAward from '@/components/receive';
import BuyGroup from '@/components/buyGroup';
import ShowCard from '@/components/showCard';
import ImgPreview from '@/components/imgPreview';
import prodJson from '@/assets/product.json';
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
      imgPre: false,
      imgList: [],
      imgIndex: 0,
    };
  }

  componentDidMount() {
    this.initDetail();
    window.scrollTo(0, 0);
  }

  componentDidUpdate() {
    if (this.state.buyShow || this.state.imgPre) {
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
      window.location.reload();
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
  }

  initShowData = () => {
    const { getShowList, detail } = this.props;
    getShowList({
      productId: detail.productId,
      page: 1,
      size: 1,
    });
  };

  initDetail = () => {
    const { getDetail, getConf } = this.props;
    getDetail({ activityTurnId: this.state.activityTurnId }).then(res => {
      if (res.code === 200) {
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
        this.initShowData();
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
        getConf();
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
      this.initDetail();
    }
  };

  addCart = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      Toast.info(`${intl.get('product.pleaseLogin')}`, 2);
      setTimeout(() => {
        this.props.history.push(`/login`);
      }, 2000);
      return false;
    }
    const { addShop, getConf } = this.props;
    addShop({
      activityTurnId: this.state.activityTurnId,
      buyCount: 1,
    }).then(res => {
      if (res.code === 200) {
        Toast.success('添加成功!', 2);
        getConf();
      }
    });
  };

  goSure = () => {
    this.props.history.push(`/prize/1`);
  };

  newActivity = id => {
    this.props.history.push(`/product/${id}`);
    this.initDetail();
  };

  handleConfirm = () => {
    const { getRules, getAwardInfo, getAwardRules } = this.props;
    const id = this.state.activityTurnId;
    getAwardRules({
      activityTurnId: id,
    }).then(res => {
      if (res.code === 200) {
        if (res.data.status === 0) {
          //有领奖规则，跳转领奖页填写信息
          this.setState({
            visibleReceive: false,
          });
          this.props.history.push(`/prize/${id}`);
          return;
        }
        if (res.data.status === 1) {
          // 无领奖规则，直接领取奖品，跳转领奖结果页
          getAwardInfo({ activityTurnId: id }).then(res => {
            if (res.code === 200) {
              this.setState({
                visibleReceive: false,
              });
              this.props.history.push(`/awardResult?type=${res.data.productType}`);
            }
          });
          return;
        }
        if (res.data.status === 2) {
          // 有回收规则，跳转领奖方式选择页
          this.props.history.push(`/prizeSelection/${id}`);
          return;
        }
      }
    });
  };

  onLikeClick = (id, like) => {
    const { userStart } = this.props;
    userStart({
      topicId: id,
      likeStatus: like ? 0 : 1,
    }).then(res => {
      if (res.code === 200) {
        this.initShowData();
      }
    });
  };

  imgPreview = (list, index) => {
    this.setState({
      imgList: list,
      imgIndex: index,
      imgPre: true,
    });
  };

  cancelPreview = () => {
    this.setState({
      imgList: [],
      imgIndex: 0,
      imgPre: false,
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
      imgPre,
      imgList,
      imgIndex,
    } = this.state;
    const { detail, homeSys, showList } = this.props;
    const config = JSON.parse(localStorage.getItem('configuration')) || {};
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
        </div>
        <div className={styles.priceBox} style={{ backgroundImage: `url(${priceBg})` }}>
          <div className={styles.left}>
            <img src={xsms} alt="" className={styles.xsms}/>
            <span className={styles.price}>
              <span className={styles.msPrice}>¥ <span style={{ fontSize: '20px'}}>9.9</span></span>
              <span className={styles.odPrice}>¥50</span>
            </span>
          </div>
          <div className={styles.right}>
            <span className={styles.djs}>倒计时:</span>
            <div>
              <span className={styles.time}>{openH}</span>:
              <span className={styles.time}>{openM}</span>:
              <span className={styles.time}>{openS}</span>
            </div>
          </div>
        </div>
        <div className={styles.infoBox}>
          <div className={styles.titleBox}>
            商品名称最多显示2行显示不下就...来结尾商品名称最多显示2行显示不下就...来结尾
          </div>
          <div className={styles.tipsBox}>
            <span className={styles.l}>温馨提示</span>
            <span className={styles.r}>该商品以卡密形式发放，下发时可能会有短暂延迟，请关注系统通知，及时查收！</span>
          </div>
        </div>
        <div className={styles.shipBox}>
            <li><span className={styles.ll}>发货</span><span className={styles.rr}>上海 浦东新区</span></li>
            <li><span className={styles.ll}>运费</span><span className={styles.rr}>快递包邮</span></li>
            <li><span className={styles.ll}>服务声明</span><span className={styles.rr}>虚拟商品不支持七天无理由退货</span></li>
        </div>
        {showList.total > 0 ? (
          <div className={styles.postDetail}>
            <div className={styles.topTel}>
              <span className={styles.h3tle}>{`${intl.get('shoppingCart.posting')}（${showList.total}）`}</span>
              <span
                className={styles.lockAll}
                onClick={() => this.props.history.push(`/single?productId=${detail.productId}`)}
              >
                {intl.get('shoppingCart.viewAll')} <Icon type="right" color="#ff5100" />
              </span>
            </div>
            <ShowCard
              data={showList.rows[0]}
              onLikeClick={this.onLikeClick}
              preview={this.imgPreview}
            />
          </div>
        ) : null}
        {imgPre ? (
          <ImgPreview show={imgPre} data={imgList} index={imgIndex} cancel={this.cancelPreview} />
        ) : null}
        <div className={styles.shopDetail}>
          <h3 className={styles.h3tle}>{intl.get('product.productDetails')}</h3>
          <p className={styles.text}>{detail.content}</p>
          {detail.contentImgList
            ? detail.contentImgList.map(i => {
                return <img src={i} alt="img" key={i} />;
              })
            : null}
        </div>
        <div className={styles.buyGroup}>
          <div className={styles.left}>
            <span className={styles.hj}>合计：</span>
            <div>
              <span className={styles.jg}>¥<span style={{ fontSize: '20px'}}>9.90</span></span>
              <span className={styles.js}>已节省42.1元</span>
            </div>
          </div>
          <Button type="primary" className={styles.rightBtn} onClick={this.goSure}>
            立即抢购
          </Button>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  detail: state.product.data.detail,
  homeSys: state.home.data.homeSys,
  showList: state.product.data.showList,
});

const mapDispatch = dispatch => ({
  getDetail: params => dispatch.product.getDetail(params),
  getRules: params => dispatch.product.existRules(params),
  getAwardRules: params => dispatch.product.awardRule(params),
  getAwardInfo: params => dispatch.prize.result(params),
  getConf: params => dispatch.home.fetchConf(params),
  addShop: params => dispatch.shopCart.addShop(params),
  getShowList: params => dispatch.product.getShowList(params),
  userStart: params => dispatch.product.userStart(params),
});

export default connect(mapState, mapDispatch)(ProductDetail);
