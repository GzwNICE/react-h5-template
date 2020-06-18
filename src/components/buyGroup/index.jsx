import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';
import { Drawer, Icon, Stepper, Radio, Button } from 'antd-mobile';
// import { Link } from 'react-router-dom';
import queryString from 'query-string';
import hotImg from '@/assets/images/label_hot.png';
import styles from './index.less';

const { lang } = queryString.parse(window.location.search);

class BuyGroup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      stepVal: 20,
      personValue: 0,
      proportionValue: null,
    };
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden';
  }

  onOpenChange = () => {
    // this.setState({ open: !this.state.open });
    this.props.onOpenChange();
  };

  onChange = val => {
    console.log(val);
    this.setState({ stepVal: val });
  };

  onChangePer = value => {
    this.setState({
      personValue: value,
    });
  };

  onChangeProp = value => {
    this.setState({
      proportionValue: value,
    });
  };

  render() {
    const open = this.props.open;
    const { stepVal, personValue, proportionValue } = this.state;
    const personData = [
      { value: 0, label: '20' },
      { value: 1, label: '50' },
      { value: 2, label: '80' },
      { value: 3, label: '包尾' },
    ];
    const proportionData = [
      { value: 0, label: '10%' },
      { value: 1, label: '20%' },
      { value: 2, label: '30%' },
      { value: 3, label: '50%' },
    ];
    // const sidebar = (

    // );
    return (
      <div className={`${open ? `${styles.buy} ${styles.buyShow}` : `${styles.buyNone}`}`}>
        <div className={`${open ? `${styles.buyContent}` : null}`}>
          <div className={styles.topB}>
            <img src={hotImg} alt="" className={styles.prodPic} />
            <span className={styles.guide}>购买人次越多，赢率越大</span>
            <Icon type="cross" size="md" className={styles.close} onClick={this.onOpenChange} />
          </div>
          <div className={styles.buyNum}>
            <span className={styles.left}>购买人次</span>
            <Stepper className={styles.step} showNumber value={stepVal} onChange={this.onChange} />
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
                    key={i.value}
                    checked={personValue === i.value}
                    onChange={() => this.onChangePer(i.value)}
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
                    key={i.value}
                    checked={proportionValue === i.value}
                    onChange={() => this.onChangeProp(i.value)}
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
              <span className={styles.price}>20 GO币</span>
            </div>
            <Button type="primary" className={styles.pay}>
              确认支付
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default BuyGroup;
