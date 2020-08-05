import React, { PureComponent } from 'react';
// import { Link } from 'react-router-dom';
import { NavBar, Toast, Icon, Button, WhiteSpace, Stepper } from 'antd-mobile';
import ShowCard from '@/components/showCard';
import styles from './index.less';

class SingleRecord extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const data1 = Array.from(new Array(5)).map(() => ({
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
    }));
    return (
      <div className={styles.singleRecord}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          className={styles.navBar}
          onLeftClick={() => {
            this.props.history.go(-1);
          }}
        >
          晒单记录
        </NavBar>
        <div className={styles.list}>
          {data1.map(index => {
            return (
              <div className={styles.listItem} key={index}>
                <ShowCard />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default SingleRecord;
