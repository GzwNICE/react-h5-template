import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { InputItem } from 'antd-mobile';
import styles from './index.less';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);

let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}
class Personal extends PureComponent {
  constructor(props) {
    super(props);
    this.state={
      value: '',
    }
  }
  componentDidMount() {
    const search = queryString.parse(window.location.search);
    this.setState({
      title: search.title,
      type: search.type,
      value: search.content,
    });
  }
  onSaveClick() {
    const { type, value } = this.state;
    const { updateUser } = this.props;
    updateUser({
      [type]: value,
      updateAvatar: 'false',
    }).then(() => {
      this.props.history.go(-1);
    });
  }
  onChange = value => {
    this.setState({
      value,
    });
  };
  render() {
    console.log("ss",this.state)
    const { title, type, value } = this.state;
    return (
      <div className={styles.contentBox}>
        <div className={styles.titleBox}>
          <div className={styles.cancel} onClick={() => this.props.history.go(-1)}>
            取消
          </div>
          <div className={styles.title}>{title}</div>

          <div className={styles.save} onClick={this.onSaveClick.bind(this)}>
            保存
          </div>
        </div>
        <InputItem
          placeholder={type == 'name' ? '请填写真实姓名' : '请填写身份证号'}
          className={styles.inputItem}
          moneyKeyboardAlign="left"
          moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          onChange={this.onChange}
          defaultValue={value}
        />
        {type == 'name' ? (
          <div className={styles.editInfo} style={{ marginTop: '12px' }}>
            为了方便后续中奖后的确认，请填写真实姓名哦
          </div>
        ) : null}
        {type == 'idCard' ? (
          <div className={styles.editInfo} style={{ marginTop: '12px' }}>
            * 领取超过xxx.xx元的奖品需要认证身份证信息。
          </div>
        ) : null}
        {type == 'idCard' ? (
          <div className={styles.editInfo}>* 身份证信息认证后无法修改，请谨慎操作。</div>
        ) : null}
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user.data,
});

const mapDispatch = dispatch => ({
  updateUser: params => dispatch.user.updateUserInfo(params),
});

export default connect(mapState, mapDispatch)(Personal);
