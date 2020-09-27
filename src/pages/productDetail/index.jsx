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
import lcImg from '@/assets/images/liucheng.png';
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

const imagesContext = require.context('@/assets/images/home', false, /\.png$/);
class ProductDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      IPhoneX: Cookies.get('IPhoneX'),
      id: this.props.match.params.activityTurnId,
      countdown: false, //倒计时
      openH: '00',
      openM: '00',
      openS: '00',
      imgPre: false,
      imgList: [],
      imgIndex: 0,
      prodData: ''
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    prodJson.map(i => {
      if (i.id === Number(this.state.id)) {
        this.setState({
          prodData: i
        })
        return
      }
    })
  }

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

  goSure = () => {
    this.props.history.push(`/prize/1`);
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
      openH,
      openM,
      openS,
      imgPre,
      imgList,
      imgIndex,
      prodData
    } = this.state;
    const html = { __html: prodData.content };
    const { detail, showList } = this.props;
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
        {prodData.img ? (
          <div className={styles.carousel}>
            <img src={imagesContext(prodData.img)} alt="img" className={styles.carouselImg} />
          </div>
        ): null}
        <div className={styles.priceBox} style={{ backgroundImage: `url(${priceBg})` }}>
          <div className={styles.left}>
            <img src={xsms} alt="" className={styles.xsms}/>
            <span className={styles.price}>
              <span className={styles.msPrice}>¥ <span style={{ fontSize: '20px'}}>{prodData.spikePrice}</span></span>
              <span className={styles.odPrice}>{`¥${prodData.price}`}</span>
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
            {prodData.name}
          </div>
          <div className={styles.tipsBox}>
            <span className={styles.l}>温馨提示</span>
            <span className={styles.r}>该商品以卡密形式发放，下发时可能会有短暂延迟，请关注系统通知，及时查收！</span>
          </div>
        </div>
        <div className={styles.shipBox}>
            <li><span className={styles.ll}>发货</span><span className={styles.rr}>上海 浦东新区<span>{`库存：${prodData.stock}`}</span></span></li>
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
          {prodData.contentImg ? <img src={lcImg} alt="img"/> : null}
          <p className={styles.text} dangerouslySetInnerHTML={html}></p>
        </div>
        <div className={styles.buyGroup}>
          <div className={styles.left}>
            <span className={styles.hj}>合计：</span>
            <div>
              <span className={styles.jg}>¥<span style={{ fontSize: '20px'}}>{prodData.spikePrice}</span></span>
              <span className={styles.js}>{`已节省${prodData.price - prodData.spikePrice}元`}</span>
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
