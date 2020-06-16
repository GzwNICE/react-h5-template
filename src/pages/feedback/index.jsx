import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { NavBar, Icon, TextareaItem, ImagePicker } from 'antd-mobile';

import styles from './index.less';

class FeedBack extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }
  onChange = (files, type, index) => {
    console.log(files, type, index);
    const { updateImage } = this.props;
    this.setState(
      {
        files,
      },
      () => {
        if (type == 'add') {
          updateImage({
            multipartFile: files[files.length - 1],
            type: 'image',
            timeLimit: 'shortPeriod',
            attributeName: 'feedback',
          });
        }
      }
    );
  };
  render() {
    const { files } = this.state;

    return (
      <div className={styles.contentBox}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() => this.props.history.go(-1)}
        >
          意见反馈
        </NavBar>
        <TextareaItem
          placeholder='对我们的服务有什么建议吗？请告诉我们'
          autoHeight
          rows={5}
          count={500}
          ref={el => (this.customFocusInst = el)}
        />
        <div style={{ backgroundColor: '#fff', paddingBottom: '15px' }}>
          <ImagePicker
            length="6"
            files={files}
            onChange={this.onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length < 9}
            accept="image/gif,image/jpeg,image/jpg,image/png"
        />
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user.data,
});

const mapDispatch = dispatch => ({
  userInfo: params => dispatch.user.getUserInfo(params),
  updateImage: params => dispatch.user.requestUpdateImage(params),
});

export default connect(mapState, mapDispatch)(FeedBack);
