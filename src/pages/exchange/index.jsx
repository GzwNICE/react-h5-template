/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import queryString from 'query-string';
// import md5 from 'md5';
import intl from 'react-intl-universal';
import { NavBar, Icon, List, InputItem, Card } from 'antd-mobile';
// import { Link } from 'react-router-dom';
import { createForm } from 'rc-form';
import receiveBg from '@/assets/images/receive_pic_bg@2x.png';
import congratulation from '@/assets/images/receive_pic_congratulation@2x.png';
// import passwordOpen from '@/assets/images/passwordOpen.png';
import { numFormat } from '@/utils/util';
import styles from './index.less';

const Item = List.Item;

class Exchange extends PureComponent {
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
    const { getFieldProps } = this.props.form;
    const config = JSON.parse(localStorage.getItem('configuration')) || {};
    const { select, classN } = this.state;
    return (
      <div className={styles.exchange}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          className={styles.navBar}
          onLeftClick={() => {
            this.props.history.go(-1);
          }}
        >
          兑换
        </NavBar>
        <div className={styles.content}>
          <span className={styles.title}>奖品</span>
          <div className={styles.prodInfoBox}>
            <img src={receiveBg} alt="" className={styles.left} />
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
          <span className={styles.title}>兑换详情</span>
          <List className={styles.exchangeInfo}>
            <Item extra="10,000,000 ₫">市场零售价</Item>
            <Item extra="5%">税费/服务费比例</Item>
            <Item extra="5,000 ₫">税费/服务费</Item>
            <Item extra="9,500,000 ₫">实际到账</Item>
          </List>
          <span className={styles.title}>银行卡信息</span>
          <List>
            <InputItem
              {...getFieldProps('name')}
              clear
              placeholder="请输入真实姓名"
              ref={el => (this.nameRef = el)}
              onClick={() => {
                this.nameRef.focus();
              }}
            >
              持卡人名字
            </InputItem>
            <InputItem
              {...getFieldProps('card')}
              clear
              placeholder="请输入银行名称"
              ref={el => (this.name2Ref = el)}
              onClick={() => {
                this.name2Ref.focus();
              }}
            >
              银行名称
            </InputItem>
            <InputItem
              {...getFieldProps('card')}
              clear
              placeholder="请输入银行名称"
              ref={el => (this.cardRef = el)}
              onClick={() => {
                this.cardRef.focus();
              }}
            >
              卡号
            </InputItem>
          </List>
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

export default connect(mapState, mapDispatch)(createForm()(Exchange));
