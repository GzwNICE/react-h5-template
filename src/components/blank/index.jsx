import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import message from '@/assets/images/nomessage.png';
import styles from './index.less';

export class Blank extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className={styles.blankBox}>
        <img src={message} alt=""/>
        <span className={styles.text}>暂无订单</span>
        <Button type="primary" className={styles.btn} onClick={this.goSure}>
          去首页
        </Button>
      </div>
    )
  }
}

export default Blank

