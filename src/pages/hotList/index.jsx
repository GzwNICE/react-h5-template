/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
// 首页人气列表
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ActivityCard from '@/components/activityCard';
import prodJson from '@/assets/product.json';
import { Flex } from 'antd-mobile';
import styles from './index.less';

class HotList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      prodJson: prodJson
    };
  }

  componentDidMount() {
    const from = this.props.showOff;
    if (from === 'home') {
      let arr = []
      this.state.prodJson.map(i => {
        if (i.show && i.show === 'home') {
          arr.push(i)
        }
      })
      this.setState({
        prodJson: arr
      })
      return
    }
  }

  render() {
    const { prodJson } = this.state;
    return (
      <div className={styles.hotPage}>
        <Flex wrap="wrap" justify="between">
          {prodJson.map(i => {
            return (
              <div key={i.id} className={styles.hotItem}>
                <ActivityCard data={i} hot />
              </div>
            );
          })}
        </Flex>
      </div>
    );
  }
}

export default HotList
