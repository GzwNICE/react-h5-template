import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Empty from '@/components/empty';
import queryString from 'query-string';
import { NavBar, Icon, Button } from 'antd-mobile';
import styles from './index.less';

class MissPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: queryString.parse(window.location.search).title,
    };
  }

  handlerPush = url => {
    this.props.history.push('/home');
  };

  render() {
    const { title } = this.state;
    return (
      <div className={styles.missPage}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#0091FF' }}
          onLeftClick={() => this.props.history.go(-1)}
        >
          {title}
        </NavBar>
        <div>
          <Empty text="空空如也" />
          <Button type="primary" className={styles.goHome} onClick={this.handlerPush}>去首页</Button>
        </div>
      </div>
    );
  }
}

export default MissPage;
