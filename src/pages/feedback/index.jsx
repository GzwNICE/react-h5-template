import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavBar, Icon, TextareaItem, ImagePicker, Button, Toast } from 'antd-mobile';
import styles from './index.less';

class FeedBack extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      isEmpty: null,
      content: ''
    };
  }
  componentDidMount() {
    this.setState({
      isEmpty: true,
      content: '',
    });
    // const isLogin = localStorage.getItem('mobile');
    // if (!isLogin) {
    //   this.props.history.push(`/login`);
    //   return;
    // }
  }

  onImageChange = (files, type, index) => {
    this.setState({
      files,
    });
  };

  onAreaChange = ret => {
    this.setState({
      isEmpty: ret.length == 0,
      content: ret,
    });
  };

  submitMsg = () => {
    this.setState({
      isEmpty: true,
      files: []
    })
    this.customFocusInst.state.value = ''
    Toast.success('感谢您的反馈');
    // setTimeout(()=>{
    //   this.props.history.go(-1);
    // }, 2000)
  }

  render() {
    const { files, isEmpty } = this.state;
    return (
      <div className={styles.contentBox}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          className={styles.navbar}
          onLeftClick={() => this.props.history.go(-1)}
        >
          意见反馈
        </NavBar>
        <div className={styles.titleBox}>
          问题描述<span>（必填）</span>
        </div>
        <TextareaItem
          placeholder='请填写您的建议或问题'
          autoHeight
          autoFocus
          onChange={this.onAreaChange}
          rows={5}
          count={200}
          ref={el => (this.customFocusInst = el)}
        />
        <div style={{ backgroundColor: '#fff', paddingBottom: '15px' }}>
          <ImagePicker
            length="6"
            files={files}
            onChange={this.onImageChange}
            selectable={files.length < 9}
            accept="image/gif,image/jpeg,image/jpg,image/png"
          />
        </div>
        <Button disabled={isEmpty} className={styles.submit} onClick={this.submitMsg}>
          提交
        </Button>
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(FeedBack);
