import React, { PureComponent } from 'react';
// import { Link } from 'react-router-dom';
import { Badge, Grid } from 'antd-mobile';
import hotImg from '@/assets/images/label_hot.png';
import like from '@/assets/images/like.png';
import liked from '@/assets/images/liked.png';
import styles from './index.less';

class ShowCard extends PureComponent {
  preview(url) {
    console.log(url);
  }

  render() {
    // const { data, idEnd } = this.props;
    const data1 = Array.from(new Array(5)).map(() => ({
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
    }));
    return (
      <div className={styles.showCard}>
        <div className={styles.head}>
          <img src={hotImg} alt="" className={styles.userPic} />
          <div className={styles.rightBox}>
            <p className={styles.userName}>Larry</p>
            <p className={styles.prodName}>【第80轮】Air Pods苹果无线蓝牙耳机</p>
          </div>
        </div>
        <div className={styles.content}>
          <Badge
            text="置顶"
            style={{
              padding: '1px 3px',
              backgroundColor: '#febd52',
              borderRadius: 2,
              marginRight: '6px',
              zIndex: 0,
            }}
          />
          <Badge
            text="精华"
            style={{
              padding: '1px 3px',
              backgroundColor: '#fd7f4a',
              borderRadius: 2,
              marginRight: '6px',
              zIndex: 0,
            }}
          />
          <span className={styles.text}>
            地振高冈，一派西山千古秀,地振高冈，一派西山千古秀地振高冈，一派西山千古秀
          </span>
        </div>
        <Grid
          data={data1}
          columnNum={4}
          hasLine={false}
          className={styles.imgBox}
          activeStyle={false}
          renderItem={dataItem => (
            <div style={{ marginRight: '0.1rem' }}>
              <img
                src={dataItem.icon}
                className={styles.imgItem}
                alt=""
                onClick={() => this.preview(dataItem.icon)}
              />
            </div>
          )}
        />
        <div className={styles.foot}>
          <div className={styles.left}>
            <img src={like} alt="" />
            <span>76298</span>
          </div>
          <span className={styles.time}>2019/12/02 13:00</span>
        </div>
      </div>
    );
  }
}

export default ShowCard;
