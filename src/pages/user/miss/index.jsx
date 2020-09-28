import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import intl from 'react-intl-universal';
import queryString from 'query-string';
import emptyImg from '@/assets/images/integralBlank.png';
import { NavBar, Icon } from 'antd-mobile';
import styles from './index.less';

class MissPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: queryString.parse(window.location.search).title
    }
  }

  render() {
    const { title } = this.state;
    return (
      <div className={styles.missPage}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF1C1C' }}
          onLeftClick={() => this.props.history.go(-1)}
        >
          {title}
        </NavBar>
        <div className={styles.box}>
          <img className={styles.emptyImg} src={emptyImg} />
        <div className={styles.emptyInfo}>敬请期待</div>
        <div className={styles.emptyText}>程序员正在建设中…</div>
      </div>
      </div>
    );
  }
}

export default MissPage;
