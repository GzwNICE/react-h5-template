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
import prodJson from '@/assets/json/product.json';
import commentJson from '@/assets/json/comment.json';
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
      prodData: '',
      commentData: ''
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    // this.countFun();
    prodJson.map(i => {
      if (i.id === Number(this.state.id)) {
        this.setState({
          prodData: i
        })
        return
      }
    })
    commentJson.map(i => {
      if (i.id === Number(this.state.id)) {
        this.setState({
          commentData: i.comment
        })
        return
      }
    })
  }

  getDateStr(AddDayCount) {
    var  dd =  new  Date();
    dd.setDate(dd.getDate()+AddDayCount); //获取AddDayCount天后的日期
    var  y = dd.getFullYear();
    var  m = (dd.getMonth()+1)<10? "0" +(dd.getMonth()+1):(dd.getMonth()+1); //获取当前月份的日期，不足10补0
    var  d = dd.getDate()<10? "0" +dd.getDate():dd.getDate(); //获取当前几号，不足10补0
    return  y+ "/" +m+ "/" +d;
  }

  countFun = () => {
    let endTime = this.getDateStr(1);
    let end_time = new Date(`${endTime} 00:00:00`).getTime();
    let now_time = new Date().getTime();
    var remaining = (end_time - now_time);
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
      }
    }, 1000);
  };

  goSure = () => {
    const login = localStorage.getItem('mobile');
    if (login) {
      this.props.history.push(`/prize`);
    }else {
      this.props.history.push(`/login`);
    }
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
      prodData,
      commentData
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
        <div className={styles.infoBox}>
          <div className={styles.titleBox}>
            {prodData.name} {prodData.content}
          </div>
          <div className={styles.tipsBox}>
            <span className={styles.l}>温馨提示</span>
            <span className={styles.r}>支付成功后，该程序安装链接将以卡系统消息推送，可能会因网络有短暂延迟，请关注系统通知，及时查收！</span>
          </div>
        </div>
        {/* <div className={styles.shipBox}>
            <li><span className={styles.ll}>发货</span><span className={styles.rr}>上海 浦东新区</span></li>
            <li><span className={styles.ll}>运费</span><span className={styles.rr}>快递包邮</span></li>
            <li><span className={styles.ll}>服务声明</span><span className={styles.rr}>虚拟商品不支持七天无理由退货</span></li>
        </div>*/}
        {commentData.length > 0 ? (
          <div className={styles.postDetail}>
            <div className={styles.topTel}>
              <span className={styles.h3tle}>{`${intl.get('shoppingCart.posting')}（${commentData.length}）`}</span>
              <span
                className={styles.lockAll}
                onClick={() => this.props.history.push(`/single?productId=${this.state.id}`)}
              >
                {intl.get('shoppingCart.viewAll')} <Icon type="right" color="#ff5100" />
              </span>
            </div>
            <ShowCard
              data={commentData && commentData[0]}
            />
          </div>
        ): null}
        <div className={styles.shopDetail}>
          <h3 className={styles.h3tle}>{intl.get('product.productDetails')}</h3>
          {prodData.contentImg ? <img src={lcImg} alt="img"/> : null}
          <p className={styles.text} dangerouslySetInnerHTML={html}></p>
        </div>
        <div className={styles.buyGroup}>
          <Button type="primary" className={styles.rightBtn} onClick={this.goSure}>
            马上选择
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
