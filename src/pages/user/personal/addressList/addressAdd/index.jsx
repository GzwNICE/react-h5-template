/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { Picker, List, NavBar, Button, WhiteSpace, TextareaItem, Switch, Toast } from 'antd-mobile';
import cityJson from '@/assets/lang/vi-VN.min.json';
import { createForm } from 'rc-form';
import intl from 'react-intl-universal';

import styles from './index.less';

class AddressAdd extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cityData: cityJson,
      cityColumns: [],
      areaColumns: [],
      wardColumns: [],
      checked: false,
      lang: Cookies.get('lang'),
    };
  }
  componentDidMount() {
    console.log(this.props.location.state);
    for (var data in this.state.cityData) {
      this.state.cityColumns.push({ label: data, value: data });
    }
    if (this.props.location.state && this.props.location.state.item) {
      this.addressInfo = this.props.location.state.item;
      this.onChangeCity([this.addressInfo.city]);
      this.onChangeArea([this.addressInfo.district]);
      this.setState({
        userName: this.addressInfo.userName,
        mobile: this.addressInfo.mobile,
        wardValue: [this.addressInfo.ward],
        detailAddress: this.addressInfo.detailAddress,
        checked: this.addressInfo.isDefault == 'Y',
      });
    }
  }
  onSaveClick() {
    const { saveAddress } = this.props;

    this.props.form.validateFields((err, value) => {
      if (err) return;
      if (!value.userName) {
        return Toast.info(intl.get('address.inputName'), 2);
      } else if (!value.mobile) {
        return Toast.info(intl.get('address.pleaseInputMobile'), 2);
      } else if (!this.state.cityValue) {
        return Toast.info(intl.get('address.pleaseInputCity'), 2);
      } else if (!this.state.areaValue) {
        return Toast.info(intl.get('address.pleaseInputArea'), 2);
      } else if (!this.state.wardValue) {
        return Toast.info(intl.get('address.pleaseInputWard'), 2);
      } else if (!value.detailAddress) {
        return Toast.info(intl.get('address.pleaseDetailAddress'), 2);
      } else {
        saveAddress({
          city: this.state.cityValue[0],
          district: this.state.areaValue[0],
          ward: this.state.wardValue[0],
          userName: value.userName,
          mobile: value.mobile,
          isDefault: this.state.checked ? 'Y' : 'N',
          id: this.addressInfo ? this.addressInfo.id : '',
          detailAddress: value.detailAddress,
        }).then(() => {
          const { activityTurnId } = this.props.location.state;
          this.props.history.push(`/addressList?activityTurnId=${activityTurnId}`);
        });
      }
    });
  }
  /**
   * @param {城市} city
   */
  onChangeCity = city => {
    this.areaData = this.state.cityData[city];
    const arr = [];
    for (var data in this.areaData) {
      arr.push({ label: data, value: data });
    }
    this.setState({
      cityValue: city,
      areaColumns: arr,
    });
  };
  /**
   * @param {行政区} area
   */
  onChangeArea = area => {
    const wards = this.areaData[area];
    const arr = [];
    for (var i = 0; i < wards.length; i++) {
      arr.push({ label: wards[i], value: wards[i] });
    }
    this.setState({
      areaValue: area,
      wardColumns: arr,
    });
  };
  /**
   * @param {ward} ward
   */
  onChangeWard = ward => {
    this.setState({
      wardValue: ward,
    });
  };
  render() {
    const { getFieldProps } = this.props.form;
    const { userName, mobile, cityValue, areaValue, wardValue, detailAddress, lang } = this.state;
    return (
      <div className={styles.box}>
        <NavBar
          mode="dark"
          leftContent={intl.get('address.cancel')}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() => {
            this.props.history.go(-1);
          }}
        >
          {intl.get('address.address')}
        </NavBar>
        <WhiteSpace size="md" />
        <div className={styles.itemBox}>
          <div className={styles.title}>{intl.get('address.addressName')}</div>
          <input
            className={styles.content}
            {...getFieldProps('userName', {
              initialValue: `${userName ? userName : ''}`,
            })}
            placeholder={intl.get('address.pleaseInputAddressName')}
          ></input>
        </div>
        <WhiteSpace size="md" />

        <div className={styles.itemBox}>
          <div className={styles.title}>
            {intl.get('address.inputMobile')}
            <div className={styles.areaCode}>{`+${lang === 'zh' ? '86' : '84'}`}</div>
          </div>
          <input
            className={styles.content}
            {...getFieldProps('mobile', {
              initialValue: `${mobile ? mobile : ''}`,
            })}
            placeholder={intl.get('address.pleaseInputMobile')}
          />
        </div>
        <WhiteSpace size="md" />
        <Picker
          data={this.state.cityColumns}
          value={cityValue}
          cols={1}
          extra={<div className={styles.change}>{intl.get('address.changeCity')}</div>}
          onChange={this.onChangeCity}
        >
          <List.Item arrow="horizontal">
            <div className={styles.title}>{intl.get('address.city')}</div>
          </List.Item>
        </Picker>
        <WhiteSpace size="md" />

        <Picker
          data={this.state.areaColumns}
          value={areaValue}
          cols={1}
          extra={<div className={styles.change}>{intl.get('address.changeArea')}</div>}
          onChange={this.onChangeArea}
        >
          <List.Item arrow="horizontal">
            <div className={styles.title}>{intl.get('address.area')}</div>
          </List.Item>
        </Picker>
        <WhiteSpace size="md" />

        <Picker
          data={this.state.wardColumns}
          value={wardValue}
          cols={1}
          extra={<div className={styles.change}>{intl.get('address.changeWard')}</div>}
          onChange={this.onChangeWard}
        >
          <List.Item arrow="horizontal">
            <div className={styles.title}>{intl.get('address.ward')}</div>
          </List.Item>
        </Picker>
        <WhiteSpace size="md" />
        <div style={{ backgroundColor: '#fff' }}>
          <div style={{ color: '#333', fontSize: '14px', marginLeft: '15px', paddingTop: '10px' }}>
            {intl.get('address.address')}
          </div>
          <TextareaItem
            {...getFieldProps('detailAddress', {
              initialValue: `${detailAddress ? detailAddress : ''}`,
            })}
            placeholder={intl.get('address.detailAddress')}
            rows={4}
          />
        </div>
        <WhiteSpace size="md" />

        <List.Item
          extra={
            <Switch
              className={styles.switchInfo}
              checked={this.state.checked}
              onChange={() => {
                this.setState({
                  checked: !this.state.checked,
                });
              }}
            />
          }
        >
          <div style={{ color: '#333', fontSize: '14px' }}>{intl.get('address.normalAddress')}</div>
        </List.Item>
        <div className={styles.addAddress}>
          <Button className={styles.submit} onClick={this.onSaveClick.bind(this)}>
            {intl.get('address.save')}
          </Button>
        </div>
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({
  saveAddress: params => dispatch.user.requestSaveAddress(params),
});

export default connect(mapState, mapDispatch)(createForm()(AddressAdd));
