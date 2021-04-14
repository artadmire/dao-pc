import ctx from '../index';
import {showInfo} from '../../components/Modal';

// 更新推广信息
export const getPromoteInfo = async (account) => {
  if (account && account.length) {
    fetch('http://pools.anobor.com/api/defi-ano/defiano/myAccount?address=' + account)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        ctx.data.promoteAvailable = myJson.frees;
        ctx.data.promotePaddress = myJson.pid;
        ctx.data.promoteBlocked = myJson.frozen;
        if (myJson.pid == null) {
          ctx.data.promotePidStatus = true;
        } else {
          ctx.data.promotePidStatus = false;
        }
      });
    // console.log( ctx.data.promotePidStatus,222);
  }
}
// 获取APY
export const getAPY = async (pool_id) => {
  fetch('http://pools.anobor.com/api/defi-ano/defiano/getAPY?poor_id=' + pool_id)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      if (pool_id == 1) {
        ctx.data.pool1APY = myJson;
      }
      if (pool_id == 2) {
        ctx.data.LPpool1APY = myJson;
      }
    });
  // console.log( ctx.data.promotePidStatus,222);
}

// 上链
export const transfer = async (account) => {
  showInfo({content: 'come in 15 days'});

  /*    if (ctx.data.promoteAvailable>0.5){
            ctx.data.promoteAvailable=0;
            showInfo({content:"success"})
        }else {
            showInfo({content:"not enough ANO"})
        }
      if (account && account.length) {
        fetch('http://pools.anobor.com/api/defi-ano/defiano/add?address='+account)
            .then(function(response) {
              return response.json();
            })
            .then(function(myJson) {


            });
      }*/
}
// 添加推广人
export const addPid = async (account, pid) => {
  if (account && account.length) {
    fetch('http://pools.anobor.com/api/defi-ano/defiano/getBalance?address=' + account + '&pid=' + pid)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        if (myJson.pid == null) {
          ctx.data.promotePidStatus = true;
          ctx.data.promotePaddress = myJson.pid;
        } else {
          ctx.data.promotePidStatus = false;
        }
      });
  }
}

// 提取本金时，推荐人获取推广收益
export const promoteReward = async (account, amount) => {
  if (account && account.length) {
    fetch('http://pools.anobor.com/api/defi-ano/defiano/withdraw?address=' + account + '&amount=' + amount.num)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {

      });
  }
}

// 获取ANo单价
export const getANOPrice = async (account, amount) => {
  fetch('http://pools.anobor.com/api/defi-ano/defiano/getANOPrice')
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      ctx.data.ANOPrice = myJson;
      // 计算已分分红量
      let nowTime = (new Date()).valueOf() - 1615377600000;
      let anoRevenue = nowTime / 84600000 * 222.22
      // 计算已分分红量
      let ano_usdtRevenue = nowTime / 84600000 * 444.44
      ctx.data.allUserRevenue = ((parseFloat(anoRevenue) + parseFloat(ano_usdtRevenue)) * myJson).toFixed(2);
    });

}
