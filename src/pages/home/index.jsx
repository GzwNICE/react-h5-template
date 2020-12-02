import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { NavBar } from 'antd-mobile';
import TabBarBox from '@/components/tabBar';
import styles from './index.less';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IPhoneX: Cookies.get('IPhoneX'),
      champion: [2015, 2017, 2018]
    };
  }

  handleClick = () => {
    const { homeRedux } = this.props
    homeRedux(30)
  }

  render() {
    const { homeData } = this.props //props来源于redux
    const { champion } = this.state //state来源于页面自身管理的状态
    console.log(`我是首页redux中获取的props： ${homeData.name} ${homeData.achievement}`);
    console.log(`我是首页的state： ${champion}`);
    return (
      <div className={styles.homePage}>
        <NavBar className={styles.navbar}>首页</NavBar>
        <div>{`${homeData.name} NBA2015-2016年常规赛 ${homeData.achievement}`}</div>
        <div>{`${homeData.name} 获得三次总冠军分别是：`}</div>
        <span>
          {champion.map(i => {
            return `${i},`
          })}
        </span>
        <div onClick={this.handleClick} className={styles.btn}>点击改变MVP数据</div>
        {/* 父组件传值给子组件，自定义props名，值可以是任意内容，包括state和props  */}
        <TabBarBox selectedTab="homePage" />
      </div>
    );
  }
}

const mapStateToProps = state => ({ // Props
  homeData: state.home.homeData
  //redux中首页的数据关连到首页，都在此获取，homeData定义在 /models/home.js 中的state中，可以定义多个数据，分别引入，处理不同的逻辑，如果单纯做数据展示，不推荐使用redux
});

const mapDispatchToProps = dispatch => ({ // 页面中的接口请求和改变redux中props值
  homeRedux: params => dispatch.home.changeHomeData(params),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
