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
      isEmpty: null,
      content: ''
    };
  }
  componentDidMount() {
    this.setState({
      isEmpty: true,
      content: '',
    });
    const isLogin = localStorage.getItem('mobile');
    if (!isLogin) {
      this.props.history.push(`/login`);
      return;
    }
  }
  componentWillUnmount() {
    const { clearImage } = this.props;
    clearImage();
  }
  onImageChange = (files, type, index) => {
    // console.log(files, type, index);
    const { updateImage, removeImage, compressThreshold=2 } = this.props;
    this.setState({
      files,
    });
    // if (type == 'add') {
    //   let formData = new FormData();
    //   const file = files[files.length - 1].file;
    //   let fileSize = file.size / 1024 / 1024;
    //   formData.append('type', 'image');
    //   formData.append('timeLimit', 'longPeriod');
    //   formData.append('attributeName', 'feedback');
    //   if (fileSize >= compressThreshold) {
    //     this.transformFile(file).then(file => {
    //       formData.append('multipartFile', file);
    //       updateImage(formData);
    //     });
    //   } else {
    //     formData.append('multipartFile', file);
    //     updateImage(formData);
    //   }
    // } else {
    //   removeImage(index);
    // }
  };
  //在上传之前转换文件
  transformFile = (file) => {
    /**
     * 针对图片进行压缩,如果图片大小超过压缩阈值,则执行压缩,否则不压缩
     */
    //判断是否是图片类型
        const {compressThreshold = 2, isPictureCompress = true, pictureQuality = 0.92} = this.props;
        let fileSize = file.size / 1024 / 1024;
        // console.log('before compress, the file size is : ', fileSize + "M");
        //当开启图片压缩且图片大小大于等于压缩阈值,进行压缩
        if ((fileSize >= compressThreshold) && isPictureCompress) {
            //判断浏览器内核是否支持base64图片压缩
            if (typeof (FileReader) === 'undefined') {
              console.log("FileReader")
                return file;
            } else {
                try {
                    this.setState({
                        spinLoading: true
                    });
                    return new Promise(resolve => {
                        //声明FileReader文件读取对象
                        console.log("声明FileReader文件读取对象")

                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => {
                            // 生成canvas画布

                            const canvas = document.createElement('canvas');
                            console.log("生成canvas画布")

                            // 生成img
                            const img = document.createElement('img');
                            console.log("生成img")

                            img.src = reader.result;
                            img.onload = () => {
                                const ctx = canvas.getContext('2d');
                                //原始图片宽度、高度
                                let originImageWidth = img.width, originImageHeight = img.height;
                                //默认最大尺度的尺寸限制在（1920 * 1080）
                                let maxWidth = 1920, maxHeight = 1080, ratio = maxWidth / maxHeight;
                                //目标尺寸
                                let targetWidth = originImageWidth, targetHeight = originImageHeight;
                                //当图片的宽度或者高度大于指定的最大宽度或者最大高度时,进行缩放图片
                                if (originImageWidth > maxWidth || originImageHeight > maxHeight) {
                                    //超过最大宽高比例
                                    if ((originImageWidth / originImageHeight) > ratio) {
                                        //宽度取最大宽度值maxWidth,缩放高度
                                        targetWidth = maxWidth;
                                        targetHeight = Math.round(maxWidth * (originImageHeight / originImageWidth));
                                    } else {
                                        //高度取最大高度值maxHeight,缩放宽度
                                        targetHeight = maxHeight;
                                        targetWidth = Math.round(maxHeight * (originImageWidth / originImageHeight));
                                    }
                                }
                                console.log("canvas对图片进行缩放")

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
                                let newFile = new File([uint8Array], file.name, {type: mimeType || 'image/jpeg'});
                                // console.log('after compress, the file size is : ', (newFile.size / 1024 / 1024) + "M");
                                console.log("结果：",newFile.size)

                                resolve(newFile);

                            };
                        };
                        reader.onerror = () => {
                            this.setState({
                                spinLoading: false
                            });
                            return file;
                        }
                    }).then(res => {
                        this.setState({
                            spinLoading: false
                        });
                        return res;
                    }).catch(() => {
                        this.setState({
                            spinLoading: false
                        });
                        return file;
                    });
                } catch (e) {
                    this.setState({
                        spinLoading: false
                    });
                    //压缩出错,直接返回原file对象
                    return file;
                }
            }
        } else {
            //不需要压缩，直接返回原file对象
            console.log("不需要压缩",file.size)
            return  file;
        }
};
  onAreaChange = ret => {
    this.setState({
      isEmpty: ret.length == 0,
      content: ret,
    });
  };
  submitMsg() {
    // const { addMessage, imageIds } = this.props;
    // addMessage({
    //   feedbackContent: this.state.content,
    //   imgIds: imageIds,
    //   url: '/app/v1/user/feedback',
    // }).then(() => {
    //   Toast.info(intl.get('user.str_thank_feedback'), 2);
    //   this.props.history.go(-1);
    // });
    this.setState({
      isEmpty: true,
      files: []
    })
    this.customFocusInst.state.value = ''
    Toast.success('感谢您的反馈');
    setTimeout(()=>{
      this.props.history.go(-1);
    }, 2000)
  }

  render() {
    const { files, isEmpty } = this.state;
    return (
      <div className={styles.contentBox}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#0091FF' }}
          onLeftClick={() => this.props.history.go(-1)}
        >
          {intl.get('user.feedback')}
        </NavBar>
        <div className={styles.titleBox}>
          问题描述<span>（必填）</span>
        </div>
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
  addMessage: params => dispatch.user.submitData(params),
  removeImage: params => dispatch.user.removeImage(params),
  clearImage: params => dispatch.user.clearImage(params),
});

export default connect(mapState, mapDispatch)(FeedBack);
