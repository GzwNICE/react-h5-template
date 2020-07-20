/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import queryString from 'query-string';
// import md5 from 'md5';
import intl from 'react-intl-universal';
import { NavBar, Icon, List, Accordion, Card } from 'antd-mobile';
// import { Link } from 'react-router-dom';
// import { createForm } from 'rc-form';
import receiveBg from '@/assets/images/receive_pic_bg@2x.png';
import congratulation from '@/assets/images/receive_pic_congratulation@2x.png';
// import passwordOpen from '@/assets/images/passwordOpen.png';
import { numFormat } from '@/utils/util';
import styles from './index.less';

const Item = List.Item;

class PrizeSelection extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.activityTurnId,
      select: false,
      classN: 'styles.close',
    };
  }

  componentDidMount() {
    const { getLists } = this.props;
    getLists({ activityTurnId: this.state.id });
  }

  handlerFooterClick = () => {
    this.setState({
      select: !this.state.select,
    });
  };

  render() {
    const config = JSON.parse(localStorage.getItem('configuration')) || {};
    const { select, classN } = this.state;
    return (
      <div className={styles.selection}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          className={styles.navBar}
          onLeftClick={() => {
            this.props.history.go(-1);
          }}
        >
          领奖
        </NavBar>
        <div className={styles.content} style={{ backgroundImage: `url(${receiveBg})` }}>
          <img src={congratulation} alt="" className={styles.receiveBg} />
          <div className={styles.tips}>请在规定时间内领奖，超过规定时间没有领奖将视为自动放弃</div>
          <div className={styles.productInfo}>
            <img src={congratulation} alt="" className={styles.prodImg} />
            <ul className={styles.textBox}>
              <li className={styles.prodName}>
                商品名称 最多显示两行内容和两行信息 超出2行末尾点点点缩略显点点点缩略显点点点缩略显
              </li>
              <li className={styles.num}>数量：1</li>
              <li className={styles.price}>
                零售价：<span>{`${numFormat(1000000000)} ${config.moneySymbol}`}</span>
              </li>
            </ul>
          </div>
          <div className={styles.countDown}>
            兑换倒计时
            <span className={styles.time}>23</span>:<span className={styles.time}>59</span>:
            <span className={styles.time}>59</span>
          </div>
          <div className={styles.selectBox}>
            <Card>
              <Card.Header title="选择兑换方式" className={styles.cardHeader} />
              <Card.Body className={styles.cardBody}>
                <div className={styles.selectItem}>
                  <li className={styles.way}>兑换GO币</li>
                  <li className={styles.content}>
                    您将获得 <span className={styles.num}>8183 {config.moneyVirtualCn}</span>{' '}
                    <span className={styles.give}>赠送5%</span>
                  </li>
                  <li className={styles.tipText}>奖品兑换为GO币，可继续参与更多活动。</li>
                </div>
                {select ? (
                  <div>
                    <div className={styles.selectItem}>
                      <li className={styles.way}>领取奖品</li>
                      <li className={styles.tipText}>填写领奖信息，平台寄出奖品</li>
                    </div>
                    <div className={styles.selectItem}>
                      <li className={styles.way}>
                        兑换
                        <span> {`${numFormat(1000000)}${config.moneySymbol}`}</span>
                        <span className={styles.title}> (已扣除 5%税费/服务费)</span>
                      </li>
                      <li className={styles.tipText}>兑换成现金，直接提现到银行卡</li>
                    </div>
                  </div>
                ) : null}
              </Card.Body>
              <Card.Footer
                content={select ? `收起` : `更多方式`}
                extra={<Icon type={select ? `up` : `down`} />}
                className={styles.cardFooter}
                onClick={this.handlerFooterClick}
              />
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  rules: state.product.data.rules,
});

const mapDispatch = dispatch => ({
  getLists: params => dispatch.product.getRules(params),
});

export default connect(mapState, mapDispatch)(PrizeSelection);
