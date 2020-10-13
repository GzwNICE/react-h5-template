/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { NavBar, Icon } from 'antd-mobile';

import styles from './index.less';

class Help extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const qList = [
      {
        title: '怎么下发安装链接？',
        content:
          '充值成功后，系统会自动推送对应套餐类型的安装链接；',
      },
      {
        title: '购买套餐后可以拥有全部的外挂程序吗？',
        content:
          '是的，购买成功并安装成功后，在规定时间内享有全部外挂程序的使用权限；',
      },
      {
        title: '没收到安装链接怎么办？',
        content: '1、系统可能因为网络延迟胡等原因，推送会有一点延迟，请耐心等待；2、一直没收到首先确认自己是否购买服务成功？3、确认购买成功后却一直没收到，请联系客服；',
      },
      {
        title: '是否适配全部的娱乐娱乐软件？',
        content:
          '是的，只要娱乐软件里面有我们提供外挂程序服务的都可以使用；前提你要按照教程完成安装，并授权给我们程序；',
      },
      {
        title: '怎么安装和授权？',
        content:
          '详细安装和授权教程请看安装教程',
      },
      {
        title: '无法获取娱乐软件权限怎么办？',
        content:
          '亲，一般是不会发生这种情况，如果发生该情况请卸载重新安装或者联系客服；',
      }
    ];
    return (
      <div className={styles.help}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          className={styles.navBar}
          style={{ backgroundColor: '#0091FF' }}
          onLeftClick={() => this.props.history.go(-1)}
        >
          帮助中心
        </NavBar>
        {qList.map(i => {
          return (
            <div className={styles.qItem} key={i.title}>
              <div className={styles.title}>{i.title}</div>
              <div className={styles.content}>{i.content}</div>
            </div>
          )
        })}
      </div>
    );
  }
}

export default Help;
