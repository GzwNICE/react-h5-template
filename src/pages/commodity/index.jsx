/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import { connect } from 'react-redux';
import { Icon, NavBar, Grid, Toast } from 'antd-mobile';
import Cookies from 'js-cookie';
import TabBarBox from '@/components/tabBar';
import HotList from '@/pages/hotList';
import CategoryCard from '@/components/categoryCard';
import styles from './index.less';

class CommodityPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { IPhoneX, allClass, categoryActive } = this.state;
    const { category, childList, productList } = this.props;
    const data = childList.map(i => ({
      icon: i.imgUrl,
      text: i.categoryName,
      categoryId: i.categoryId,
    }));
    return (
      <div
        className={styles.CommodityPage}
        style={{ paddingBottom: IPhoneX === 'true' ? '64px' : '50px' }}
      >
        <NavBar mode="dark" className={styles.navBar}>
          全部商品
        </NavBar>
        <div className={styles.tabs}>
            <HotList />
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

const mapState = state => ({
  category: state.commodity.data.category,
  childList: state.commodity.data.childList,
  productList: state.commodity.data.productList,
});

const mapDispatch = dispatch => ({
  getCategory: params => dispatch.commodity.getCategory(params),
  getChild: params => dispatch.commodity.getChild(params),
  getProduct: params => dispatch.commodity.getProduct(params),
});

export default connect(mapState, mapDispatch)(CommodityPage);
