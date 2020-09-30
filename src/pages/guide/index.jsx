import React, { PureComponent } from 'react';
import emptyImg from '@/assets/images/Group.png';
import downArrow from '@/assets/images/down-arrow.png';
import downText from '@/assets/images/down-block-text.png';
import queryString from 'query-string';
import { Button } from 'antd-mobile';
import { isWeiXin } from '@/utils/util';
import styles from './index.less';

class Guide extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      channel_code: queryString.parse(window.location.search).channel_code,
    };
  }

  downLoad = () => {
    const { channel_code } = this.state;
    console.log(`${window.location.origin}/app/shop-${channel_code}-release.apk`);
    window.location.href = `${window.location.origin}/app/shop-${channel_code}-release.apk`;
  };

  render() {
    console.log(isWeiXin());
    return (
      <div className={styles.guidePage}>
        <img className={styles.emptyImg} src={emptyImg} />
        <Button type="primary" className={styles.button} onClick={this.downLoad}>
          下载APP
        </Button>
        <p className={styles.tips}>
          * 暂只支持安卓版本 <br />
          苹果版本正在上架中，敬请期待
        </p>
        {isWeiXin() ? (
          <div className={styles.shad}>
            <img src={downArrow} alt="" className={styles.tt} />
            <img src={downText} alt="" className={styles.bb} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Guide;
