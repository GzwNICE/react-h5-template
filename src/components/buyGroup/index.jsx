/* eslint-disable react/no-will-update-set-state */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';
import { Icon, Stepper, Radio, Button, Toast } from 'antd-mobile';
// import { Link } from 'react-router-dom';
import queryString from 'query-string';
import styles from './index.less';

const { lang } = queryString.parse(window.location.search);
class BuyGroup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      next: false,
      stepVal: 5,
      personValue: null,
      proportionValue: null,
    };
  }

  onOpenChange = () => {
    // this.setState({ open: !this.state.open });
    this.props.onOpenChange();
    this.setState({
      personValue: null,
      proportionValue: null,
      stepVal: 5,
    });
  };

  onChange = val => {
    this.setState({ stepVal: val });
  };

  onChangePer = value => {
    this.setState({
      personValue: value,
      proportionValue: null,
      stepVal: value,
    });
  };

  onChangeProp = value => {
    this.setState({
      proportionValue: value,
      personValue: null,
      stepVal: value,
    });
  };

  pay = () => {
    const { personValue, proportionValue } = this.state;
    if (!personValue && !proportionValue) {
      Toast.info('请选择购买人次或比例', 2);
    } else {
      Toast.loading('loading...', 0);
      console.log(123);
      this.setState({
        next: true,
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      const { data } = nextProps;
      if (data.remainingCount > this.state.stepVal) {
        return false;
      } else {
        this.setState({
          stepVal: data.remainingCount,
        });
      }
    }
  }

  render() {
    const { open, data, personData, proportionData } = this.props;
    const { stepVal, proportionValue, personValue, next } = this.state;
    const config = JSON.parse(localStorage.getItem('configuration')) || {};
    return (
      <div>
        <div className={`${open ? `${styles.buy} ${styles.buyShow}` : `${styles.buyNone}`}`}>
          {!next ? (
            <div className={styles.buyContent}>
              <div className={styles.topB}>
                <img src={data.thumbnailUrl} alt="" className={styles.prodPic} />
                <span className={styles.guide}>购买人次越多，赢率越大</span>
                <Icon type="cross" size="md" className={styles.close} onClick={this.onOpenChange} />
              </div>
              <div className={styles.buyNum}>
                <span className={styles.left}>购买人次</span>
                <Stepper
                  className={styles.step}
                  min={1}
                  max={data.remainingCount}
                  showNumber
                  value={stepVal}
                  onChange={this.onChange}
                />
              </div>
              <div className={styles.selectBox}>
                <span className={styles.selTle}>快捷选择</span>
                <div className={styles.personValue}>
                  <span className={styles.text}>人次</span>
                  <div className={styles.radioRows}>
                    {personData.map(i => (
                      <Radio
                        className={`${styles.radioItem} ${
                          personValue === i.value ? `${styles.radioItemS}` : null
                        }`}
                        style={data.remainingCount < i.label ? { color: '#cbcbcb' } : {}}
                        key={i.value}
                        checked={personValue === i.value}
                        onChange={() => this.onChangePer(i.value)}
                        disabled={data.remainingCount < i.value}
                      >
                        {i.label}
                      </Radio>
                    ))}
                  </div>
                </div>
                <div className={styles.personValue}>
                  <span className={styles.text}>比例</span>
                  <div className={styles.radioRows}>
                    {proportionData.map(i => (
                      <Radio
                        className={`${styles.radioItem} ${
                          proportionValue === i.value ? `${styles.radioItemS}` : null
                        }`}
                        style={data.remainingCount < i.value ? { color: '#cbcbcb' } : {}}
                        key={i.value}
                        checked={proportionValue === i.value}
                        onChange={() => this.onChangeProp(i.value)}
                        disabled={data.remainingCount < i.value}
                      >
                        {i.label}
                      </Radio>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.bottom}>
                <div>
                  <span className={styles.total}>合计：</span>
                  <span className={styles.price}>{`${stepVal * data.participatePrice} ${
                    config.moneyVirtualCn
                  }`}</span>
                </div>
                <Button type="primary" className={styles.pay} onClick={this.pay}>
                  确认支付
                </Button>
              </div>
            </div>
          ) : (
            <div className={`${open ? `${styles.buyNextContent}` : null}`}>
              <div className={styles.topB}>
                <span className={styles.guide}>确认结算</span>
                <Icon type="cross" size="md" className={styles.close} onClick={this.onOpenChange} />
              </div>
              <div className={styles.buyNum}>
                <li>
                  <span className={styles.left}>购买人次</span>
                  <span>100人次</span>
                </li>
                <li>
                  <span className={styles.left}>支付GO币</span>
                  <span>100</span>
                </li>
                <li>
                  <span className={styles.left}>我的余额</span>
                  <span>100</span>
                </li>
                <p>
                  <span>30s</span> 未支付订单自动取消
                </p>
              </div>
              <div className={styles.bottom}>
                <Button type="primary" className={styles.pay}>
                  确认支付
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default BuyGroup;
