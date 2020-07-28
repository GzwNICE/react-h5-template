/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import CategoryCard from '@/components/CategoryCard';
import { Icon, NavBar, Grid } from 'antd-mobile';
import Cookies from 'js-cookie';
import TabBarBox from '@/components/tabBar';
import resultTips from '@/assets/images/ic_shoppingcart@2x.png';
import styles from './index.less';

class CommodityPage extends PureComponent {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      IPhoneX: Cookies.get('IPhoneX'),
      allClass: false,
    };
  }

  componentDidMount() {}

  render() {
    const { IPhoneX, allClass } = this.state;
    const data = Array.from(new Array(7)).map((_val, i) => ({
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
      text: `name${i}`,
    }));
    return (
      <div
        className={styles.CommodityPage}
        style={{ paddingBottom: IPhoneX === 'true' ? '64px' : '50px' }}
      >
        <NavBar mode="dark" className={styles.navBar}>
          全部商品
        </NavBar>
        <div className={styles.menuBox}>
          <div className={styles.left}>
            <div className={`${styles.tabItem} ${styles.tabItemActive}`}>
              <img src={resultTips} alt="icon" />
              <span>数码产品</span>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.allBar}>
              <span>全部分类</span>
              <Icon type="right" color="#666666" />
            </div>
            {allClass ? (
              <div className={styles.allClass}>
                <div className={styles.content}>
                  <div className={styles.grid}>
                    <Grid data={data} columnNum="3" hasLine={false} activeStyle={false} />
                  </div>
                </div>
              </div>
            ) : null}
            <div className={styles.categoryItem}>
              <div className={styles.hade}>
                <img src={resultTips} alt="" />
                <span>电脑</span>
              </div>
              <CategoryCard />
            </div>
          </div>
        </div>
        <div
          className={`${styles.tBar} ${IPhoneX === 'true' ? `${styles.tBarIPhone}` : null}`}
          ref={this.myRef}
        >
          <TabBarBox selectedTab="commodityPage" />
        </div>
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(CommodityPage);
