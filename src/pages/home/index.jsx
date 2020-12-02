import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { NavBar } from 'antd-mobile';
import TabBarBox from '@/components/tabBar';
import Hook from '@/components/hooks';
import styles from './index.less';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IPhoneX: Cookies.get('IPhoneX'),
      champion: [2015, 2017, 2018]
    };
  }

  // 组件挂载阶段
  componentWillMount() {
    //组件挂载前执行，还没有执行第一次渲染，不推荐此生命周期请求接口，如果接口请求速度过慢或有报错，会导致页面白屏，无法进行第一次渲染
    // 最新版本的react废弃了这个生命周期，但仍旧可以使用
    console.log(1);
  }

  componentDidMount() {
    //组件挂载后执行，再此生命周期之前会执行第一次render，通常用做初始化的接口请求
    console.log(3);
  }

  // 组件更新阶段
  componentWillReceiveProps(nextProps) {
    // 此生命周期中可以比较nextProps 和this.props的区别，针对需要的业务逻辑做判断，改变state
    // 新版本中已废弃，替换为getDerivedStateFromProps生命周期
    console.log(4);
  }

  shouldComponentUpdate(nextProps,nextState) {
    // 此生命周期内可以做渲染的性能优化，接收两个参数，最新的props和最新的state
    // 根据新的数据，做判断，决定更新还是不更新
    // 返回值为 true/false  true为继续渲染，否则停止渲染
    console.log(5);
    return true
  }

  componentWillUpdate(nextProps,nextState) {
    // 组件更新前，接受两个参数，最新的props和state
    // 新版已废弃，替换为getSnapshotBeforeUpdate生命周期
    console.log(6);
  }

  componentDidUpdate(prevProps,prevState) {
    // 组件更新后，再此生命周期之前会执行第二次render， 接收两个参数为旧的props和旧的state
    console.log(7);
  }

  // 组件卸载阶段
  componentWillUnmount() {
    // 组件销毁前执行此生命周期，通常用于清除定时和自定义事件，或数据清空恢复默认值
    console.log(8);
  }

  // 新增两个生命周期
  // getSnapshotBeforeUpdate(prevProps, prevState) { // 页面更新会执行此生命周期，参数为旧的props和state
  //   // 替换 componentWillUpdate 生命周期
  //   console.log(8);
  // }

  // getDerivedStateFromProps(nextProps, prevState) { // 针对componentWillReceiveProps中对state的更新做了一些优化
  //   // 替换componentWillReceiveProps
  //   console.log(9);
  // }

  handleClick = () => {
    const { homeRedux } = this.props
    homeRedux(30)
  }

  render() {
    console.log(2); // 组件真实渲染
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

        <Hook />
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
