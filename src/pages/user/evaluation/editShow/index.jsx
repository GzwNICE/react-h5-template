import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { NavBar, Icon, TextareaItem, ImagePicker, Button, Toast } from 'antd-mobile';
import intl from 'react-intl-universal';

import styles from './index.less';
let imgList = [];
class Show extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }
  componentDidMount() {
    const { showOrderInfo } = this.props;
    const id = this.props.match.params.id;
    showOrderInfo({ url: `/app/order/show/info?id=${id}` }).then(e => {
      e.data.imgList.map(i => {
        imgList.push(i.id);
      });
      console.log("imgList",imgList)
      this.setState({
        files: e.data.imgList,
        content: e.data.content,
      });
    });
    this.setState({
      isEmpty: true,
      content: '',
    });
  }
  componentWillUnmount() {
    const { clearImage } = this.props;
    clearImage();
    imgList = [];
  }
  onImageChange = (files, type, index) => {
    const { updateImage, removeImage } = this.props;
    this.setState({
      files,
    });
    let formData = new FormData();
    formData.append('type', 'image');
    formData.append('timeLimit', 'longPeriod');
    formData.append('multipartFile', files[files.length - 1].file);
    formData.append('attributeName', 'orderShow');
    if (type == 'add') {
      updateImage(formData);
    } else {
      imgList.splice(index, 1);
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
    const { submitData, imageIds } = this.props;
    let imgIds = '';
    imageIds.map(i => {
      imgList.push(i);
    });
    imgList.map((i, _index) => {
      imgIds +=i;
      if(_index != imgList.length-1){
        imgIds +=","
      }
    });

    submitData({
      content: this.state.content,
      imgIds: imgIds,
      orderType: 0,
      id: this.props.match.params.id,
      url: '/app/order/show/update',
    }).then(e => {
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
         {intl.get('user.str_title_show_order')}
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
        <Button disabled={isEmpty} className={styles.submitBtn} onClick={this.submitMsg.bind(this)}>
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
  submitData: params => dispatch.user.submitData(params),
  removeImage: params => dispatch.user.removeImage(params),
  showOrderInfo: params => dispatch.user.getData(params),
  clearImage: params => dispatch.user.clearImage(params),
});

export default connect(mapState, mapDispatch)(Show);
