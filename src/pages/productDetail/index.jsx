/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
// import intl from 'react-intl-universal';
import { NavBar, Carousel, Progress, Button, Toast } from 'antd-mobile';
// import { Link } from 'react-router-dom';
import navBack from '@/assets/images/navBack.png';
import priceBg from '@/assets/images/activity_bg_price.png';
import priceOpen from '@/assets/images/activity_pic_countdown.png';
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

  render() {
    const { current, allCur } = this.state;
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
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(ProductDetail);
