/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { NavBar, Icon } from 'antd-mobile';

import styles from './index.less';

class Help extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const qList = [
      {
        title: '商品什么时候发货？',
        content:
          '商品支付成功后48小时内发货；虚拟商品1小时内会发货；抽奖和免费试用商品一般在开奖号48小时内发货，具体以活动通知为准；',
      },
      {
        title: '商品一直不发货怎么办？',
        content:
          '亲，商品类型不同，发货时间会有差异，请不要着急；如果长时间没发货，请联系客服工作人员；',
      },
      {
        title: '哪里可以看到我的订单?',
        content: '亲，您可以在【我的】-【我的订单】里查看订单状态 温馨提示？：已删除订单无法查看',
      },
      {
        title: '怎么样才是下单成功？',
        content:
          '亲，支付成功后，在【我的订单】中看到有待发货的订单，说明该订单下单成功，支付失败等都可能导致下单失败，如果遇到支付失败，请重新支付；',
      },
      {
        title: '商品质量问题怎么处理?',
        content:
          '亲，非常抱歉，没有给你带来满意的购物体验，签收之日起15天内，您可以打开【我的订单】，找到对应商品订单，发起申请退换或者退款处理；',
      },
      {
        title: '全场免邮费吗？',
        content:
          '本平台全场免邮费，但对于部分特殊商品、部分运输路程较远地区（如西藏、新疆等部分地区）可能需要收取一定的运输费用，所以您支付时候连邮费一起支付，感谢理解！',
      },
      {
        title: '我没收到货？',
        content:
          '亲，快递运输需要一定的时间，常规商品一般在3-5天内送达，还请您耐心等待；虚拟商品会在下单后小时内下放，如果长时间没有收到货，请联系快递公司查询或者联系客服人员；',
      },
      {
        title: '退换货运费谁承担？',
        content:
          '本平台发货都是包邮的，如果需要商品出现质量问题退换货，平台秉承‘’‘谁过错，谁承担’‘的原则，如果非平台或者物流问题，退换货运费可能需要您自行承担；',
      },
      {
        title: '退款什么时候到账？',
        content:
          '如果订单显示为 退款成功 ，订单款项会原路返回您的支付账户，具体退款时间为3-7工作日以内返还；',
      },
      {
        title: '如何付款？',
        content:
          '亲，你在下单时候可以选择支付宝、微信、银行卡等支付方式？温馨提示：请尽快支付，不然订单会在一定时间内取消。',
      },
    ];
    return (
      <div className={styles.help}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          className={styles.navBar}
          style={{ backgroundColor: '#0091FF' }}
          onLeftClick={() => this.props.history.go(-1)}
        >
          帮助中心
        </NavBar>
        {qList.map(i => {
          return (
            <div className={styles.qItem} key={i.title}>
              <div className={styles.title}>{i.title}</div>
              <div className={styles.content}>{i.content}</div>
            </div>
          )
        })}
      </div>
    );
  }
}

export default Help;
