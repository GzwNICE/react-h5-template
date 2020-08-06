import React, { PureComponent } from 'react';
import intl from 'react-intl-universal';
import styles from './index.less';

class NoShowItem extends PureComponent {
  constructor(props) {
    super(props);
  }
  onShowClick(activityTurnNum,e) {
    e.stopPropagation();
    this.props.push(`/addShow/${activityTurnNum}`);
  }
  render() {
    const { data } = this.props;
    return (
     <div className={styles.orderInfo}>
         <img className={styles.orderImg} src={data.picUrl}></img>
         <div style={{width:'100%'}}>
          <div className={styles.orderTitle}>{data.productName}</div>
             <div className={styles.status}>
                  <div className={styles.state}>{intl.get('user.str_has_send')}</div>
                 <div className={styles.btn} onClick={this.onShowClick.bind(this,data.activityTurnNum)} >{intl.get('user.str_goshow')}</div>
             </div>
         </div>
      </div>
    );
  }
}
export default NoShowItem;
