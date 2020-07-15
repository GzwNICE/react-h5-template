/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import intl from 'react-intl-universal';
import { NavBar, Icon, Result, Button, Toast } from 'antd-mobile';
// import { createForm } from 'rc-form';
// import { getBaseUrl } from '@/utils/util';
import copy from 'copy-to-clipboard';
import receiveSuccess from '@/assets/images/receiveSuccess.png';
// import passwordOpen from '@/assets/images/passwordOpen.png';
import styles from './index.less';

class AwardResults extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: queryString.parse(window.location.search).type, //SUBSTANCE->实体；VIRTUAL->虚拟；COIN->虚拟币
    };
  }

  handleCopy = value => {
    if (copy(value)) {
      Toast.info(`${intl.get('result.copySuccess')}`, 2);
    } else {
      Toast.info(`${intl.get('result.copyError')}`, 2);
    }
  };

  goBack = () => {
    this.props.history.push('/home');
  };

  render() {
    const { type } = this.state;
    const { prize } = this.props;
    const config = JSON.parse(localStorage.getItem('configuration')) || {};
    return (
      <div className={styles.result}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={this.goBack}
        >
          {intl.get('result.prizeCollection')}
        </NavBar>
        <div className={styles.resultContent}>
          <Result
            img={<img src={receiveSuccess} className={styles.successPic} alt="" />}
            title={intl.get('result.prizeCollection')}
            message={
              <div>
                {type === 'SUBSTANCE' ? (
                  <p className={styles.textTips}>
                    {intl.get('result.tpi1')} <br />
                    {intl.get('result.tpi2')}
                  </p>
                ) : type === 'COIN' ? (
                  <p className={styles.monH2}>{`${intl.get('result.prize')} ${
                    config.moneyVirtualCn
                  } X ${prize.coinCount}`}</p>
                ) : (
                  <p>{prize.productName}</p>
                )}
              </div>
            }
          />
          {type === 'COIN' ? (
            <div>
              <p className={styles.monTips}>{intl.get('result.tpi3', {moneyVirtualCn: config.moneyVirtualCn})}</p>
              <p className={styles.monTips} style={{ marginTop: '10px' }}>{intl.get('result.tpi2')}</p>
            </div>
          ) : null}
          {type === 'VIRTUAL' ? (
            <div className={styles.virtual}>
              <div className={styles.virBox}>
                {prize.cardNum ? (
                  <p className={styles.li}>
                    {intl.get('result.cardNumber')}：
                    <span className={styles.num}>{prize.cardNum}</span>
                    <span className={styles.copy} onClick={() => this.handleCopy(prize.cardNum)}>
                      {intl.get('result.copy')}
                    </span>
                  </p>
                ) : null}
                <p className={styles.li}>
                  {intl.get('result.camille')}：
                  <span className={styles.num}>{prize.cardSecret}</span>
                  <span className={styles.copy} onClick={() => this.handleCopy(prize.cardSecret)}>
                    {intl.get('result.copy')}
                  </span>
                </p>
              </div>
              <p className={styles.virTips}>{intl.get('result.tpi4')}</p>
              <p className={styles.virTips2}>{intl.get('result.tpi2')}</p>
            </div>
          ) : null}
          <Button type="primary" className={styles.backButton} onClick={this.goBack}>
            {intl.get('payment.back')}
          </Button>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  prize: state.prize.data.prize,
});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(AwardResults);
