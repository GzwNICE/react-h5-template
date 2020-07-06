/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import intl from 'react-intl-universal';
import { NavBar, Icon, InputItem, Picker, List, TextareaItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import addressLine from '@/assets/images/address_line.png';
import styles from './index.less';

const { lang } = queryString.parse(window.location.search);
class GetPrize extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activityTurnId: this.props.match.params.activityTurnId,
    };
  }

  componentDidMount() {
    const { getInfo } = this.props;
    getInfo({ activityTurnId: this.state.activityTurnId });
  }

  selectAdd = () => {
    this.props.history.push(`/addressList?activityTurnId=${this.state.activityTurnId}`);
  };

  handleSubmit = () => {
    const address = JSON.parse(localStorage.getItem('address')) || {};
    const { submitInfo, info } = this.props;
    if (!address.id && info.productType === 'SUBSTANCE') {
      return Toast.info('请填写收货地址', 2);
    }
    this.props.form.validateFields((err, value) => {
      if (err) {
        return Toast.info('必填项不能为空！', 2);
      }
      const params = {
        activityTurnId: this.state.activityTurnId,
        receiveAddressId: info.productType === 'SUBSTANCE' ? address.id : null,
        verifyId: value.verifyId,
        ageInterval: value.ageInterval[0],
        education: value.education[0],
        job: value.job[0],
        income: value.income[0],
        companyName: value.companyName,
        companyAddress: value.companyAddress,
        directContact: value.directContact[0],
        directMobile: value.directMobile,
        indirectContact: value.indirectContact,
        indirectMobile: value.indirectMobile,
        rewardRulesId: info.appRewardRulesVO.rewardRulesId,
      };
      submitInfo(params).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.props.history.push(`/awardResult?type=${info.productType}`);
        }
      });
    });
  };

  render() {
    const { getFieldProps } = this.props.form;
    const config = JSON.parse(localStorage.getItem('configuration')) || {};
    const address = JSON.parse(localStorage.getItem('address')) || {};
    const { info } = this.props;
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
        {address.id ? (
          <div>
            <div className={styles.linBox}>
              <img src={addressLine} alt="" className={styles.addressLine} />
            </div>
            <div className={styles.address}>
              <div className={styles.top}>
                <span className={styles.name}>{address.userName}</span>
                <span className={styles.phone}>{address.mobile}</span>
                <span className={styles.change} onClick={this.selectAdd}>
                  更换
                </span>
              </div>
              <div className={`${styles.bot} ${styles.line2}`}>
                {`${address.city}${address.district}${address.ward}${address.detailAddress}`}
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
              <span className={styles.inputTitle}>
                <i>*</i>身份证信息
              </span>
              <InputItem
                {...getFieldProps('verifyId', {
                  rules: [{ required: true }],
                })}
                clear
                placeholder="请输入身份证信息"
                className={styles.inputItem}
                ref={el => (this.verInput = el)}
                onClick={() => {
                  this.verInput.focus();
                }}
              />
            </li>
          ) : null}
          {info.appRewardRulesVO.directContact === 'Y' ? (
            <li className={styles.rows}>
              <span className={styles.inputTitle}>
                <i>*</i>紧急联系人
              </span>
              <div className={styles.content}>
                <span className={styles.key}>身份</span>
                <Picker
                  data={intl.get('prize.directContact')}
                  cols={1}
                  {...getFieldProps('directContact', {
                    rules: [{ required: true }],
                  })}
                >
                  <List.Item arrow="horizontal" className={styles.select} />
                </Picker>
              </div>
              <div className={styles.content}>
                <span className={styles.key}>手机</span>
                <InputItem
                  {...getFieldProps('directMobile', {
                    rules: [{ required: true }],
                  })}
                  clear
                  placeholder="请填写10位数手机号"
                  className={styles.inputItem}
                  type="number"
                  ref={el => (this.dirInput = el)}
                  onClick={() => {
                    this.dirInput.focus();
                  }}
                />
              </div>
            </li>
          ) : null}
          {info.appRewardRulesVO.indirectContact === 'Y' ? (
            <li className={styles.rows}>
              <span className={styles.inputTitle}>
                <i>*</i>间接联系人
              </span>
              <div className={styles.content}>
                <span className={styles.key}>身份</span>
                <Picker
                  data={intl.get('prize.indirectContact', {
                    rules: [{ required: true }],
                  })}
                  cols={1}
                  {...getFieldProps('indirectContact')}
                >
                  <List.Item arrow="horizontal" className={styles.select} />
                </Picker>
              </div>
              <div className={styles.content}>
                <span className={styles.key}>手机</span>
                <InputItem
                  {...getFieldProps('indirectMobile', {
                    rules: [{ required: true }],
                  })}
                  clear
                  placeholder="请填写10位数手机号"
                  className={styles.inputItem}
                  type="number"
                  ref={el => (this.indirectInput = el)}
                  onClick={() => {
                    this.indirectInput.focus();
                  }}
                />
              </div>
            </li>
          ) : null}
          {info.appRewardRulesVO.ageInterval === 'Y' ? (
            <li className={styles.rows}>
              <span className={styles.inputTitle}>
                <i>*</i>年龄
              </span>
              <div className={styles.content}>
                <Picker
                  data={intl.get('prize.ageInterval', {
                    rules: [{ required: true }],
                  })}
                  cols={1}
                  {...getFieldProps('ageInterval')}
                >
                  <List.Item arrow="horizontal" className={styles.select} />
                </Picker>
              </div>
            </li>
          ) : null}
          {info.appRewardRulesVO.education === 'Y' ? (
            <li className={styles.rows}>
              <span className={styles.inputTitle}>
                <i>*</i>学历
              </span>
              <div className={styles.content}>
                <Picker
                  data={intl.get('prize.education')}
                  cols={1}
                  {...getFieldProps('education', {
                    rules: [{ required: true }],
                  })}
                >
                  <List.Item arrow="horizontal" className={styles.select} />
                </Picker>
              </div>
            </li>
          ) : null}
          {info.appRewardRulesVO.job === 'Y' ? (
            <li className={styles.rows}>
              <span className={styles.inputTitle}>
                <i>*</i>职业
              </span>
              <div className={styles.content}>
                <Picker
                  data={intl.get('prize.job')}
                  cols={1}
                  {...getFieldProps('job', {
                    rules: [{ required: true }],
                  })}
                >
                  <List.Item arrow="horizontal" className={styles.select} />
                </Picker>
              </div>
            </li>
          ) : null}
          {info.appRewardRulesVO.income === 'Y' ? (
            <li className={styles.rows}>
              <span className={styles.inputTitle}>
                <i>*</i>月收入
              </span>
              <div className={styles.content}>
                <Picker
                  data={intl.get('prize.income')}
                  cols={1}
                  {...getFieldProps('income', {
                    rules: [{ required: true }],
                  })}
                >
                  <List.Item arrow="horizontal" className={styles.select} />
                </Picker>
              </div>
            </li>
          ) : null}
          {info.appRewardRulesVO.companyName === 'Y' ? (
            <li className={styles.rows}>
              <span className={styles.inputTitle}>
                <i>*</i>公司名称
              </span>
              <InputItem
                {...getFieldProps('companyName', {
                  rules: [{ required: true }],
                })}
                clear
                placeholder="请填写公司名称"
                className={styles.inputItem}
                ref={el => (this.companyInput = el)}
                onClick={() => {
                  this.companyInput.focus();
                }}
              />
            </li>
          ) : null}
          {info.appRewardRulesVO.companyAddress === 'Y' ? (
            <li className={styles.rows}>
              <span className={styles.inputTitle}>
                <i>*</i>公司地址
              </span>
              <TextareaItem
                {...getFieldProps('companyAddress', {
                  rules: [{ required: true }],
                })}
                rows={3}
                clear
                placeholder="请填写公司地址"
                className={styles.textarea}
                ref={el => (this.AddressInput = el)}
                onClick={() => {
                  this.AddressInput.focus();
                }}
              />
            </li>
          ) : null}
          <Button type="primary" className={styles.submit} onClick={this.handleSubmit}>
            提交
          </Button>
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
  submitInfo: params => dispatch.prize.submit(params),
});

export default connect(mapState, mapDispatch)(createForm()(GetPrize));
