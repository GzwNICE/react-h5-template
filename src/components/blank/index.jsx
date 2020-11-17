import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import { Link } from 'react-router-dom';
import message from '@/assets/images/nomessage.png';
import styles from './index.less';

export class Blank extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className={styles.blankBox}>
        <img src={message} alt=""/>
        <span className={styles.text}>暂无订单</span>
        <Link
          to={{
            pathname: '/',
          }}
          className={styles.btn}
        >去首页</Link>
      </div>
    )
  }
}

export default Blank

