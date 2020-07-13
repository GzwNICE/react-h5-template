import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { NavBar, Icon, TextareaItem, ImagePicker, Button, Toast } from 'antd-mobile';
import intl from 'react-intl-universal';

import styles from './index.less';

class FeedBack extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }
  componentDidMount() {
    this.setState({
      isEmpty: true,
      content: '',
    });
  }
  componentWillUnmount() {
    const { clearImage } = this.props;
    clearImage();
  }
  onImageChange = (files, type, index) => {
    console.log(files, type, index);
    const { updateImage, removeImage } = this.props;
    this.setState({
      files,
    });
    let formData = new FormData();
    formData.append('type', 'image');
    formData.append('timeLimit', 'longPeriod');
    formData.append('multipartFile', files[files.length - 1].file);
    formData.append('attributeName', 'feedback');
    if (type == 'add') {
      updateImage(formData);
    } else {
      removeImage(index);
    }
  };
  onAreaChange = ret => {
    this.setState({
      isEmpty: ret.length == 0,
      content: ret,
    });
  };
  submitMsg() {
    const { addMessage, imageIds } = this.props;
    addMessage({
      feedbackContent: this.state.content,
      imgIds: imageIds,
    }).then(() => {
      Toast.info(intl.get('user.str_thank_feedback'), 2);
      this.props.history.go(-1);
    });
  }

  render() {
    const { files, isEmpty } = this.state;
    return (
      <div className={styles.contentBox}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() => this.props.history.go(-1)}
        >
          {intl.get('user.feedback')}
        </NavBar>
        <TextareaItem
          placeholder={intl.get('user.str_welocme_feedback')}
          autoHeight
          autoFocus
          onChange={this.onAreaChange}
          rows={5}
          count={500}
          ref={el => (this.customFocusInst = el)}
        />
        <div style={{ backgroundColor: '#fff', paddingBottom: '15px' }}>
          <ImagePicker
            length="6"
            files={files}
            onChange={this.onImageChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length < 9}
            accept="image/gif,image/jpeg,image/jpg,image/png"
          />
        </div>
        <Button disabled={isEmpty} className={styles.submit} onClick={this.submitMsg.bind(this)}>
          {intl.get('user.submit')}
        </Button>
      </div>
    );
  }
}

const mapState = state => ({
  imageIds: state.user.data.imageIds,
});

const mapDispatch = dispatch => ({
  updateImage: params => dispatch.user.requestUpdateImage(params),
  addMessage: params => dispatch.user.requestAddMessage(params),
  removeImage: params => dispatch.user.removeImage(params),
  clearImage: params => dispatch.user.clearImage(params),
});

export default connect(mapState, mapDispatch)(FeedBack);
