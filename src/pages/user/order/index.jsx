/* eslint-disable react/destructuring-assignment */
// 我的订单列表
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import WaitOpen from '@/components/waitOpen';
import Win from '@/components/win';
import NoWin from '@/components/nowin';
import Empty from '@/components/empty';
import queryString from 'query-string';
import { NavBar, Icon, Tabs, Button } from 'antd-mobile';
import styles from './index.less';

class OrderList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // type: this.props.match.params.type
    };
  }

  componentDidMount() {
    const isLogin = localStorage.getItem('mobile');
    if (!isLogin) {
      this.props.history.push(`/login`);
      return;
    }
  }

  render() {
    return (
      <div className={styles.order}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#0091FF', position: 'fixed', top: 0, left: 0,  width: '100%' }}
          onLeftClick={() => this.props.history.go(-1)}
        >
          安装教程
        </NavBar>
        <div className={styles.content}>
          前提：
          <br />
          1、系统会检测大赢家为风险软件请忽视它，并授予插件安装权限；
          <br />
          2、您已成功完成支付并收到安装安装链接；
          <br />
          <br />
          详细步骤：
          <br />
          1、第一步 复制消息中心安装链接；
          <br />
          2、第二步 打开手机自带浏览器；
          <br />
          3、第三步
          在地址栏输入或黏贴消息中心的安装链接，立即前往打开，浏览器会自动跳转进入程序s网站安装界面，点击同意开始安装；
          <br />
          4、进入环境检测环节，如果是环境检测通过，则会出现下一步安装，点击下一步即可（如果环境检测没通过，就会出现打叉。这时就点击重新检测按钮需要重新检测运行环境）；
          <br />
          5、环境检测一直未通过，请点击进入手机权限目录，对任何需要的权限都进行允许，同时进入设置打开开发者模式，在重新运行安装；
          <br />
          6、配置授权好各种权限后，重新安装，按照程序提示点击下一步即可，根据引导直接下一步直到程序安装完成；
          <br />
          7、为了安全请把手机自带安装的各种杀毒软件、安全卫士关闭或者卸载，以免系统误删除该程序；
          <br />
          8、安装完成后进入程序会提示进行检测您手机安装的娱乐软件，请授权；
          <br />
          9、授权完成后，以后每次玩娱乐软件时自动打开就拥有了特殊技能了。
          <br />
        </div>
      </div>
    );
  }
}
export default OrderList;
