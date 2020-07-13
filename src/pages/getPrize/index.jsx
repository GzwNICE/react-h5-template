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
      return Toast.info(`${intl.get('prize.ph1')}`, 2);
    }
    this.props.form.validateFields((err, value) => {
      if (err) {
        return Toast.info(`${intl.get('prize.ph2')}`, 2);
      }
      const params = {
        activityTurnId: this.state.activityTurnId,
        receiveAddressId: info.productType === 'SUBSTANCE' ? address.id : null,
        verifyId: value.verifyId,
        ageInterval: value.ageInterval ? value.ageInterval[0] : '',
        education: value.education ? value.education[0] : '',
        job: value.job ? value.job[0] : '',
        income: value.income ? value.income[0] : '',
        companyName: value.companyName,
        companyAddress: value.companyAddress,
        directContact: value.directContact ? value.directContact[0] : '',
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
          {intl.get('prize.prizeCollection')}
        </NavBar>
        <div className={styles.goodTitle}>{intl.get('prize.productInformation')}</div>
        <div className={styles.goodInfo}>
          <img
            src={info.prizesProductVO && info.prizesProductVO.imgUrl}
            alt=""
            className={styles.goodPic}
          />
          <div className={styles.goodName}>
            <span className={`${styles.title} ${styles.line2}`}>
              {info.prizesProductVO
                ? `${intl.get('product.round', {
                    currentTurn: info.prizesProductVO.currentTurn,
                  })} ${info.prizesProductVO.activityName}`
                : null}
            </span>
            <span className={styles.price}>
              {intl.get('prize.retailPrice')}：
              <i>{`${info.prizesProductVO.marketPrice} ${config.moneySymbol}`}</i>
              <span></span>
            </span>
          </div>
          <span className={styles.quantity}>x1</span>
        </div>
        <div className={styles.goodTitle}>{intl.get('prize.shippingAddress')}</div>
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
                  {intl.get('prize.replace')}
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
            <span>+</span>
            {intl.get('prize.ph1')}
          </div>
        )}
        <div className={styles.goodTitle}>
          {intl.get('prize.awardInfo')}
          <span>{intl.get('prize.becauseSpecial')}</span>
        </div>
        <div className={styles.Information}>
          {info.appRewardRulesVO.verifyId === 'Y' ? (
            <li className={styles.rows}>
              <span className={styles.inputTitle}>
                <i>*</i>
                {intl.get('prize.IDCardInfo')}
              </span>
              <div className={styles.content}>
                <InputItem
                  {...getFieldProps('verifyId', {
                    rules: [{ required: true }],
                  })}
                  clear
                  placeholder={intl.get('prize.ph3')}
                  className={`${styles.inputItem} ${styles.verifyId}`}
                  ref={el => (this.verInput = el)}
                  onClick={() => {
                    this.verInput.focus();
                  }}
                />
              </div>
            </li>
          ) : null}
          {info.appRewardRulesVO.directContact === 'Y' ? (
            <li className={styles.rows}>
              <span className={styles.inputTitle}>
                <i>*</i>
                {intl.get('prize.emergencyContact')}
              </span>
              <div className={styles.content}>
                <Picker
                  data={intl.get('prize.directContact')}
                  cols={1}
                  {...getFieldProps('directContact', {
                    rules: [{ required: true }],
                  })}
                  extra={<div className={styles.selValue}>{intl.get('prize.pleaseChoose')}</div>}
                >
                  <List.Item arrow="horizontal" className={styles.select}>
                    <div className={`${styles.key} ${styles.selKey}`}>
                      {intl.get('prize.Identity')}
                    </div>
                  </List.Item>
                </Picker>
              </div>
              <div className={styles.content}>
                <span className={styles.key}>{intl.get('prize.phone')}</span>
                <InputItem
                  {...getFieldProps('directMobile', {
                    rules: [{ required: true }],
                  })}
                  clear
                  placeholder={intl.get('prize.ph4')}
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
                <i>*</i>
                {intl.get('prize.indirect')}
              </span>
              <div className={styles.content}>
                <Picker
                  data={intl.get('prize.indirectContact', {
                    rules: [{ required: true }],
                  })}
                  cols={1}
                  {...getFieldProps('indirectContact')}
                  extra={<div className={styles.selValue}>{intl.get('prize.pleaseChoose')}</div>}
                >
                  <List.Item arrow="horizontal" className={styles.select}>
                    <div className={`${styles.key} ${styles.selKey}`}>
                      {intl.get('prize.Identity')}
                    </div>
                  </List.Item>
                </Picker>
              </div>
              <div className={styles.content}>
                <span className={styles.key}>{intl.get('prize.phone')}</span>
                <InputItem
                  {...getFieldProps('indirectMobile', {
                    rules: [{ required: true }],
                  })}
                  clear
                  placeholder={intl.get('prize.ph4')}
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

          <li className={styles.rows}>
            <span className={styles.inputTitle}>
              <i>*</i>
              {intl.get('prize.basicInfo')}
            </span>
            {info.appRewardRulesVO.ageInterval === 'Y' ? (
              <div className={styles.content}>
                <Picker
                  data={intl.get('prize.ageInterval', {
                    rules: [{ required: true }],
                  })}
                  cols={1}
                  {...getFieldProps('ageInterval')}
                  extra={<div className={styles.selValue}>{intl.get('prize.pleaseChoose')}</div>}
                >
                  <List.Item arrow="horizontal" className={styles.select}>
                    <div className={`${styles.key} ${styles.selKey}`}>{intl.get('prize.age')}</div>
                  </List.Item>
                </Picker>
              </div>
            ) : null}
            {info.appRewardRulesVO.education === 'Y' ? (
              <div className={styles.content}>
                <Picker
                  data={intl.get('prize.education')}
                  cols={1}
                  {...getFieldProps('education', {
                    rules: [{ required: true }],
                  })}
                  extra={<div className={styles.selValue}>{intl.get('prize.pleaseChoose')}</div>}
                >
                  <List.Item arrow="horizontal" className={styles.select}>
                    <div className={`${styles.key} ${styles.selKey}`}>
                      {intl.get('prize.Education')}
                    </div>
                  </List.Item>
                </Picker>
              </div>
            ) : null}
            {info.appRewardRulesVO.job === 'Y' ? (
              <div className={styles.content}>
                <Picker
                  data={intl.get('prize.job')}
                  cols={1}
                  {...getFieldProps('job', {
                    rules: [{ required: true }],
                  })}
                  extra={<div className={styles.selValue}>{intl.get('prize.pleaseChoose')}</div>}
                >
                  <List.Item arrow="horizontal" className={styles.select}>
                    <div className={`${styles.key} ${styles.selKey}`}>
                      {intl.get('prize.Occupation')}
                    </div>
                  </List.Item>
                </Picker>
              </div>
            ) : null}
            {info.appRewardRulesVO.income === 'Y' ? (
              <div className={styles.content}>
                <Picker
                  data={intl.get('prize.income')}
                  cols={1}
                  {...getFieldProps('income', {
                    rules: [{ required: true }],
                  })}
                  extra={<div className={styles.selValue}>{intl.get('prize.pleaseChoose')}</div>}
                >
                  <List.Item arrow="horizontal" className={styles.select}>
                    <div className={`${styles.key} ${styles.selKey}`}>
                      {intl.get('prize.monthlyIncome')}
                    </div>
                  </List.Item>
                </Picker>
              </div>
            ) : null}
            {info.appRewardRulesVO.companyName === 'Y' ? (
              <div className={styles.content}>
                <span className={styles.key}>{intl.get('prize.companyName')}</span>
                <InputItem
                  {...getFieldProps('companyName', {
                    rules: [{ required: true }],
                  })}
                  clear
                  placeholder={intl.get('prize.ph5')}
                  className={styles.inputItem}
                  ref={el => (this.companyInput = el)}
                  onClick={() => {
                    this.companyInput.focus();
                  }}
                />
              </div>
            ) : null}
          </li>
          {info.appRewardRulesVO.companyAddress === 'Y' ? (
            <li className={styles.rows}>
              <span className={styles.inputTitle}>
                <i>*</i>
                {intl.get('prize.companyAddress')}
              </span>
              <TextareaItem
                {...getFieldProps('companyAddress', {
                  rules: [{ required: true }],
                })}
                rows={3}
                clear
                placeholder={intl.get('prize.ph6')}
                className={styles.textarea}
                ref={el => (this.AddressInput = el)}
                onClick={() => {
                  this.AddressInput.focus();
                }}
              />
            </li>
          ) : null}
          <Button type="primary" className={styles.submit} onClick={this.handleSubmit}>
            {intl.get('prize.submit')}
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
