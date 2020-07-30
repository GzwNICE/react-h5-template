/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import { connect } from 'react-redux';
import { Icon, NavBar, Grid, Toast } from 'antd-mobile';
import Cookies from 'js-cookie';
import TabBarBox from '@/components/tabBar';
import CategoryCard from '@/components/categoryCard';
import styles from './index.less';

class CommodityPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      IPhoneX: Cookies.get('IPhoneX'),
      allClass: false,
      categoryActive: 0,
    };
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    const { getCategory } = this.props;
    getCategory().then(res => {
      if (res.code === 200 && res.data.length > 0) {
        this.handlerCatChange(res.data[0].categoryId);
      }
    });
  };

  handlerCatChange(id) {
    this.setState({
      categoryActive: id,
    });
    this.allClass(id);
    this.allProduct(id);
    this.categoryBox.scrollTop = 0;
  }

  allClass = id => {
    const { getChild } = this.props;
    Toast.loading('Loading...', 0);
    getChild({
      categoryId: id,
    }).then(() => {
      Toast.hide();
    });
  };

  allProduct = id => {
    Toast.loading('Loading...', 0);
    const { getProduct } = this.props;
    getProduct({
      categoryId: id,
    }).then(() => {
      Toast.hide();
    });
  };

  handlerClickAll = () => {
    this.setState({
      allClass: true,
    });
  };

  handleClickGrid = el => {
    document.getElementById(el.categoryId).scrollIntoView();
  };

  closeAllClass = () => {
    this.setState({
      allClass: false,
    });
  };

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
          {intl.get('commodity.allProducts')}
        </NavBar>
        <div className={styles.menuBox}>
          <div className={styles.left}>
            {category.map(i => {
              return (
                <div
                  className={`${styles.tabItem} ${
                    categoryActive === `${i.categoryId}` ? `${styles.tabItemActive}` : ``
                  }`}
                  key={i.categoryId}
                  onClick={() => this.handlerCatChange(i.categoryId)}
                >
                  <img src={i.imgUrl} alt="icon" />
                  <span>{i.categoryName}</span>
                </div>
              );
            })}
          </div>
          <div className={styles.right}>
            <div className={styles.allBar} onClick={this.handlerClickAll}>
              <span>{intl.get('commodity.allCategories')}</span>
              <Icon type={allClass ? 'down' : 'right'} color="#666666" />
            </div>
            {allClass ? (
              <div className={styles.allClass} onClick={this.closeAllClass}>
                <div className={styles.grid}>
                  <Grid
                    data={data}
                    columnNum="3"
                    hasLine={false}
                    activeStyle={false}
                    onClick={this.handleClickGrid}
                  />
                </div>
              </div>
            ) : null}
            <div
              className={styles.categoryItem}
              style={{ overflowY: allClass ? 'hidden' : 'scroll' }}
              ref={el => {
                this.categoryBox = el;
              }}
            >
              {productList.map(i => {
                return (
                  <div key={i.categoryId}>
                    <div className={styles.hade} id={i.categoryId}>
                      <img src={i.imgUrl} alt="" />
                      <span>{i.categoryName}</span>
                    </div>
                    {i.activityTurnVOList.map((t, index) => {
                      return (
                        <CategoryCard
                          key={t.activityTurnId}
                          data={t}
                          idEnd={i.activityTurnVOList.length - 1 === index}
                        />
                      );
                    })}
                  </div>
                );
              })}
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
