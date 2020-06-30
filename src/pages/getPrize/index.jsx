/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
// import intl from 'react-intl-universal';
import { NavBar, Icon, InputItem, Picker, List, TextareaItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import loginBg from '@/assets/images/loginBg.png';
import addressLine from '@/assets/images/address_line.png';
import styles from './index.less';

const { lang } = queryString.parse(window.location.search);
class GetPrize extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activityTurnId: this.props.match.params.activityTurnId,
      address: false,
    };
  }

  componentDidMount() {
    const { getInfo } = this.props;
    getInfo({ activityTurnId: this.state.activityTurnId }).then(res => {
      console.log(res);
    });
  }

  selectAdd = () => {
    console.log(123123);
    this.props.history.push(
      `/addressList?lang=${lang}&activityTurnId=${this.state.activityTurnId}`
    );
  };

  render() {
    const { getFieldProps } = this.props.form;
    const config = JSON.parse(localStorage.getItem('configuration')) || {};
    const { address } = this.state;
    const { info } = this.props;
    const district = [
      {
        label: '2013',
        value: '2013',
      },
      {
        label: '2014',
        value: '2014',
      },
    ];
    return (
      <div className={styles.prize}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          className={styles.navBar}
          onLeftClick={() => {
            this.props.history.go(-1);
          }}
        >
          领取奖品
        </NavBar>
        <div className={styles.goodTitle}>商品信息</div>
        <div className={styles.goodInfo}>
          <img
            src={info.prizesProductVO && info.prizesProductVO.imgUrl}
            alt=""
            className={styles.goodPic}
          />
          <div className={styles.goodName}>
            <span className={`${styles.title} ${styles.line2}`}>
              {info.prizesProductVO
                ? `第${info.prizesProductVO.currentTurn}轮 ${info.prizesProductVO.activityName}`
                : null}
            </span>
            <span className={styles.price}>
              零售价：<i>{`${info.prizesProductVO.marketPrice} ${config.moneySymbol}`}</i>
              <span></span>
            </span>
          </div>
          <span className={styles.quantity}>x1</span>
        </div>
        <div className={styles.goodTitle}>收货地址</div>
        {address ? (
          <div>
            <div className={styles.linBox}>
              <img src={addressLine} alt="" className={styles.addressLine} />
            </div>
            <div className={styles.address}>
              <div className={styles.top}>
                <span className={styles.name}>张飞</span>
                <span className={styles.phone}>188xxxx8825</span>
                <span className={styles.change}>更换</span>
              </div>
              <div className={`${styles.bot} ${styles.line2}`}>
                河内市 西湖郡 安富路 安阳街70号西湖郡 安富路 安阳街70号西湖郡 安富路 安阳街 安富路
                安阳安阳街安阳安阳街安阳安阳街安阳安阳街安阳安阳街
              </div>
            </div>
            <div className={styles.linBox}>
              <img src={addressLine} alt="" className={styles.addressLine} />
            </div>
          </div>
        ) : (
          <div className={styles.addBlank} onClick={this.selectAdd}>
            <span>+</span>请填写收货地址
          </div>
        )}
        <div className={styles.goodTitle}>
          领奖信息
          <span>（由于领取物品较为特殊，为了提供更好的发奖服务，需要您填写一些确认信息。）</span>
        </div>
        <div className={styles.Information}>
          {info.appRewardRulesVO.verifyId === 'Y' ? (
            <li className={styles.rows}>
              <span className={styles.inputTitle}><i>*</i>身份证信息</span>
              <InputItem
                {...getFieldProps('smsCode')}
                clear
                placeholder="请输入身份证信息"
                className={styles.inputItem}
                ref={el => (this.smsInput = el)}
                onClick={() => {
                  this.smsInput.focus();
                }}
              />
            </li>
          ) : null}
          {info.appRewardRulesVO.directContact === 'Y' ? (
            <li className={styles.rows}>
              <span className={styles.inputTitle}><i>*</i>紧急联系人</span>
              <div className={styles.content}>
                <span className={styles.key}>身份</span>
                <Picker data={district} cols={1} {...getFieldProps('district3')}>
                  <List.Item arrow="horizontal" className={styles.select} />
                </Picker>
              </div>
              <div className={styles.content}>
                <span className={styles.key}>手机</span>
                <InputItem
                  {...getFieldProps('phone')}
                  clear
                  placeholder="请填写10位数手机号"
                  className={styles.inputItem}
                  type="number"
                  ref={el => (this.phoneInput = el)}
                  onClick={() => {
                    this.phoneInput.focus();
                  }}
                />
              </div>
            </li>
          ) : null}
          {info.appRewardRulesVO.indirectContact === 'Y' ? (
            <li className={styles.rows}>
              <span className={styles.inputTitle}><i>*</i>间接联系人</span>
              <div className={styles.content}>
                <span className={styles.key}>身份</span>
                <Picker data={district} cols={1} {...getFieldProps('district3')}>
                  <List.Item arrow="horizontal" className={styles.select} />
                </Picker>
              </div>
              <div className={styles.content}>
                <span className={styles.key}>手机</span>
                <InputItem
                  {...getFieldProps('phone')}
                  clear
                  placeholder="请填写10位数手机号"
                  className={styles.inputItem}
                  type="number"
                  ref={el => (this.phoneInput = el)}
                  onClick={() => {
                    this.phoneInput.focus();
                  }}
                />
              </div>
            </li>
          ) : null}
          {info.appRewardRulesVO.education === 'Y' ? (
            <li className={styles.rows}>
              <span className={styles.inputTitle}><i>*</i>学历</span>
              <div className={styles.content}>
                <Picker data={district} cols={1} {...getFieldProps('district3')}>
                  <List.Item arrow="horizontal" className={styles.select} />
                </Picker>
              </div>
            </li>
          ) : null}
          {info.appRewardRulesVO.job === 'Y' ? (
            <li className={styles.rows}>
              <span className={styles.inputTitle}><i>*</i>职业</span>
              <div className={styles.content}>
                <Picker data={district} cols={1} {...getFieldProps('district3')}>
                  <List.Item arrow="horizontal" className={styles.select} />
                </Picker>
              </div>
            </li>
          ) : null}
          {info.appRewardRulesVO.income === 'Y' ? (
            <li className={styles.rows}>
              <span className={styles.inputTitle}><i>*</i>月收入</span>
              <div className={styles.content}>
                <Picker data={district} cols={1} {...getFieldProps('district3')}>
                  <List.Item arrow="horizontal" className={styles.select} />
                </Picker>
              </div>
            </li>
          ) : null}
          {info.appRewardRulesVO.companyName === 'Y' ? (
            <li className={styles.rows}>
              <span className={styles.inputTitle}><i>*</i>公司名称</span>
              <InputItem
                {...getFieldProps('smsCode')}
                clear
                placeholder="请填写公司名称"
                className={styles.inputItem}
                ref={el => (this.smsInput = el)}
                onClick={() => {
                  this.smsInput.focus();
                }}
              />
            </li>
          ) : null}
          {info.appRewardRulesVO.companyAddress === 'Y' ? (
            <li className={styles.rows}>
              <span className={styles.inputTitle}><i>*</i>公司地址</span>
              <TextareaItem
                {...getFieldProps('control')}
                rows={3}
                clear
                placeholder="请填写公司地址"
                className={styles.textarea}
              />
            </li>
          ) : null}
          <Button type="primary" className={styles.submit}>提交</Button>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  info: state.prize.data.prizeInfo,
  address: state.prize.data.address,
});

const mapDispatch = dispatch => ({
  getInfo: params => dispatch.prize.prizeInfo(params),
});

export default connect(mapState, mapDispatch)(createForm()(GetPrize));
