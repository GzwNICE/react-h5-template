import React, { Component } from 'react'
import bg1 from '@/assets/images/qrcode/tg01.png';
import queryString from 'query-string';
import styles from './index.less';

const imagesContext = require.context('@/assets/images/qrcode', false, /\.png$/);

class Promote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: queryString.parse(window.location.search).channel_code,
    };
  }
  componentDidMount() {
    const codeImg = imagesContext(`./${this.state.code}.png`);
    this.drawAndShareImage(bg1, codeImg, 103, 380, 'a1', 98, 98);
  }

  drawAndShareImage(img1, img2, x, y, id, w, h) {
    const { code } = this.state;
    var canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 500;
    var context = canvas.getContext('2d');
    context.rect(0, 0, canvas.width, canvas.height);
    context.fill();
    var myImage = new Image();
    myImage.src = img1; //背景图片 你自己本地的图片或者在线图片
    myImage.crossOrigin = 'Anonymous';
    myImage.onload = function() {
      context.drawImage(myImage, 0, 0, 300, 500);
      var myImage2 = new Image();
      myImage2.src = img2; //你自己本地的图片或者在线图片
      myImage2.crossOrigin = 'Anonymous';
      myImage2.onload = function() {
        context.drawImage(myImage2, x, y, w, h);
        var base64 = canvas.toDataURL('image/png'); //"image/png" 这里注意一下
        var img = document.getElementById(id);
        img.setAttribute('src', base64);
      };
    };
  }

  render() {
    return (
      <div className={styles.promotePage}>
        <img src="" alt="" id="a1"/>
      </div>
    )
  }
}

export default Promote;
