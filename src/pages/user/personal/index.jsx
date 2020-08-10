import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { NavBar, Icon, Picker, List } from 'antd-mobile';
import authorImg from '@/assets/images/avatar_notlogin.png';
import intl from 'react-intl-universal';

import styles from './index.less';

const { lang } = queryString.parse(window.location.search);
class Personal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sexValue: ['男'],
      colorValue: ['#00FF00'],
    };
  }
  componentDidMount() {
    this.setState({
      sexs: [
        {
          label: intl.get('user.str_man'),
          value: '男',
        },
        {
          label: intl.get('user.str_woman'),
          value: '女',
        },
      ],
    });
    const { userInfo } = this.props;
    userInfo().then(() => {
      this.setState({
        sexValue: [this.props.user.userInfo.sex],
      });
    });
  }
  onRealNameClick(name) {
    this.props.history.push(
      `/editname?title=${intl.get('user.str_realname_title')}&type=name&content=${name}`
    );
  }
  onAddressClick() {
    this.props.history.push(`/addressList`);
  }

  onAddCardClick() {
    this.props.history.push(`/editname?title=${intl.get('user.str_idcard_no')}&type=idCard`);
  }
  onImageChangeClick(event) {
    const { updateImage, updateUser, compressThreshold = 2 } = this.props;
    let formData = new FormData();
    const file = event.target.files[0];
    let fileSize = file.size / 1024 / 1024;
    formData.append('type', 'image');
    formData.append('timeLimit', 'longPeriod');
    formData.append('attributeName', 'appAvatar');
    if (fileSize >= compressThreshold) {
      this.transformFile(file).then(file => {
        formData.append('multipartFile', file);
        updateImage(formData).then(e => {
          updateUser({
            avatarId: e.data.fileId,
            updateAvatar: 'true',
          });
        });
      });
    } else {
      formData.append('multipartFile', file);
      updateImage(formData).then(e => {
        updateUser({
          avatarId: e.data.fileId,
          updateAvatar: 'true',
        });
      });
    }
  }
  //在上传之前压缩文件
  transformFile = file => {
    /**
     * 针对图片进行压缩,如果图片大小超过压缩阈值,则执行压缩,否则不压缩
     */
    //判断是否是图片类型
    const { compressThreshold = 2, isPictureCompress = true, pictureQuality = 0.92 } = this.props;
    let fileSize = file.size / 1024 / 1024;
    // console.log('before compress, the file size is : ', fileSize + "M");
    //当开启图片压缩且图片大小大于等于压缩阈值,进行压缩
    if (fileSize >= compressThreshold && isPictureCompress) {
      //判断浏览器内核是否支持base64图片压缩
      if (typeof FileReader === 'undefined') {
        console.log('FileReader');
        return file;
      } else {
        try {
          this.setState({
            spinLoading: true,
          });
          return new Promise(resolve => {
            //声明FileReader文件读取对象
            console.log('声明FileReader文件读取对象');

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              // 生成canvas画布

              const canvas = document.createElement('canvas');
              console.log('生成canvas画布');

              // 生成img
              const img = document.createElement('img');
              console.log('生成img');

              img.src = reader.result;
              img.onload = () => {
                const ctx = canvas.getContext('2d');
                //原始图片宽度、高度
                let originImageWidth = img.width,
                  originImageHeight = img.height;
                //默认最大尺度的尺寸限制在（1920 * 1080）
                let maxWidth = 1920,
                  maxHeight = 1080,
                  ratio = maxWidth / maxHeight;
                //目标尺寸
                let targetWidth = originImageWidth,
                  targetHeight = originImageHeight;
                //当图片的宽度或者高度大于指定的最大宽度或者最大高度时,进行缩放图片
                if (originImageWidth > maxWidth || originImageHeight > maxHeight) {
                  //超过最大宽高比例
                  if (originImageWidth / originImageHeight > ratio) {
                    //宽度取最大宽度值maxWidth,缩放高度
                    targetWidth = maxWidth;
                    targetHeight = Math.round(maxWidth * (originImageHeight / originImageWidth));
                  } else {
                    //高度取最大高度值maxHeight,缩放宽度
                    targetHeight = maxHeight;
                    targetWidth = Math.round(maxHeight * (originImageWidth / originImageHeight));
                  }
                }
                console.log('canvas对图片进行缩放');

                // canvas对图片进行缩放
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                // 清除画布
                ctx.clearRect(0, 0, targetWidth, targetHeight);
                // 绘制图片
                ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
                // quality值越小,图像越模糊,默认图片质量为0.92
                const imageDataURL = canvas.toDataURL(file.type || 'image/jpeg', pictureQuality);
                // 去掉URL的头,并转换为byte
                const imageBytes = window.atob(imageDataURL.split(',')[1]);
                // 处理异常,将ascii码小于0的转换为大于0
                const arrayBuffer = new ArrayBuffer(imageBytes.length);
                const uint8Array = new Uint8Array(arrayBuffer);
                for (let i = 0; i < imageBytes.length; i++) {
                  uint8Array[i] = imageBytes.charCodeAt(i);
                }
                let mimeType = imageDataURL.split(',')[0].match(/:(.*?);/)[1];
                let newFile = new File([uint8Array], file.name, { type: mimeType || 'image/jpeg' });
                // console.log('after compress, the file size is : ', (newFile.size / 1024 / 1024) + "M");
                console.log('结果：', newFile.size);

                resolve(newFile);
              };
            };
            reader.onerror = () => {
              this.setState({
                spinLoading: false,
              });
              return file;
            };
          })
            .then(res => {
              this.setState({
                spinLoading: false,
              });
              return res;
            })
            .catch(() => {
              this.setState({
                spinLoading: false,
              });
              return file;
            });
        } catch (e) {
          this.setState({
            spinLoading: false,
          });
          //压缩出错,直接返回原file对象
          return file;
        }
      }
    } else {
      //不需要压缩，直接返回原file对象
      console.log('不需要压缩', file.size);
      return file;
    }
  };
  onChangeSex = sex => {
    const { updateUser, userInfo } = this.props;
    this.setState(
      {
        sexValue: sex,
      },
      () => {
        updateUser({
          sex: this.state.sexValue[0],
          updateAvatar: 'false',
        }).then(() => {
          userInfo();
        });
      }
    );
  };
  render() {
    const { user } = this.props;
    return (
      <div className={styles.contentBox}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() => this.props.history.go(-1)}
        >
          {intl.get('user.str_personal_data')}
        </NavBar>
        <div className={styles.userInfo}>
          <img
            className={styles.authorImg}
            src={user.userInfo.photoUrl ? user.userInfo.photoUrl : authorImg}
          ></img>
          <div className={styles.imgEdit}>
            <input
              type="file"
              accept="image/*"
              className={styles.cameraInput}
              onChange={this.onImageChangeClick.bind(this)}
            />
            {intl.get('user.str_edit')}
          </div>
        </div>
        <div
          className={styles.itemBox}
          style={{ marginTop: '10px' }}
          onClick={this.onRealNameClick.bind(this, user.userInfo.name)}
        >
          <div className={styles.title}>{intl.get('user.str_real_name')}</div>
          <div className={styles.arrow} />
          <div className={styles.content}>
            {user.userInfo.name ? user.userInfo.name : intl.get('user.str_input_realname')}
          </div>
        </div>
        <Picker
          data={this.state.sexs}
          cols={1}
          value={this.state.sexValue}
          onChange={this.onChangeSex}
        >
          <List.Item arrow="horizontal">
            <div className={styles.title}>{intl.get('user.str_sex')}</div>
          </List.Item>
        </Picker>
        <div className={styles.itemBox} style={{ marginTop: '10px' }}>
          <div className={styles.title}>{intl.get('user.str_phone_num')}</div>
          <div className={styles.content}>{user.userInfo.mobile}</div>
        </div>
        <div
          className={styles.itemBox}
          style={{ marginTop: '1px' }}
          onClick={this.onAddressClick.bind(this)}
        >
          <div className={styles.title}>{intl.get('user.str_user_address')}</div>
          <div className={styles.arrow} />
        </div>
        <div
          className={styles.itemBox}
          style={{ marginTop: '1px' }}
          onClick={user.userInfo.idCard ? null : this.onAddCardClick.bind(this)}
        >
          <div className={styles.title}>{intl.get('user.str_idcard_no')}</div>
          {user.userInfo.idCard ? '' : <div className={styles.arrow} />}
          <div className={styles.content}>{user.userInfo.idCard} </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user.data,
});

const mapDispatch = dispatch => ({
  updateImage: params => dispatch.user.requestUpdateImage(params),
  userInfo: params => dispatch.user.getUserInfo(params),
  updateUser: params => dispatch.user.updateUserInfo(params),
});

export default connect(mapState, mapDispatch)(Personal);
