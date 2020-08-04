import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { NavBar, Icon } from 'antd-mobile';
import intl from 'react-intl-universal';
import styles from './index.less';

class Rule extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() => this.props.history.go(-1)}
        >
          邀请规则
        </NavBar>
        <div className={styles.content}>
        1. 好友接受邀请注册后，每完成一笔充值，您都会得到相应比例的GO币奖励。<br/><br/>
        2. 奖励将以GO币的形式发放到您的交易账户。 <br/><br/>
        3. 单个被邀请人提供的奖励比例、奖励周期内上限、邀请人享受好友交易奖励有效时长均以平台公布的数值为准。 <br/><br/>
        4. 奖励的GO币实时结算，一旦被邀请人完成充值，邀请人即可在账户中查询到GO币奖励。 <br/><br/>
        5. 如被邀请人违反邀请奖励的相应风控规则，其邀请奖励将不能发放给邀请人，同时，被邀请人的邀请状态变成【已无效】并且产生的奖励记录状态变成【奖励无效】。<br/> <br/>
        6. 如有深度渠道合作意向，请联系sansanhanoi33@gmail.com，邮件需包含所在地区、自有资源背景、简要展业计划、自我介绍、个人社交软件账号或手机号等信息。 <br/> <br/>
        规则如有调整，以GaGaGO平台更新为准，最终解释权归GaGaGO所有。 
        </div>
      </div>
    );
  }
}

const mapState = state => ({
});

const mapDispatch = dispatch => ({
});

export default connect(mapState, mapDispatch)(Rule);
