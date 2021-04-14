// var HDWalletProvider = require("truffle-hdwallet-provider");
// var mnemonic = "olive cage lady velvet gloom beach jewel garbage permit table intact hybrid";
const GOFcontractAddress="0x195985c564CACA32E961Cb71334520948a8651d9";
const GOFPoolcontractAddress="0x3F05F579e08bdBe526bd11fF5FCe4fC26144AAC7";
var GOFbalance=0.0;
var benjin=0.0;
var shouyi=0.0;
let approve=false;
App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    $.getJSON('./pets.json', function(data) {

    });
    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
		// 加载Adoption.json，保存了Adoption的ABI（接口说明）信息及部署后的网络(地址)信息，它在编译合约的时候生成ABI，在部署的时候追加网络信息
	  $.getJSON('./GOF.json', function(data) {
		// 用Adoption.json数据创建一个可交互的TruffleContract合约实例。
		var AdoptionArtifact = data;
		App.contracts.GOF = TruffleContract(AdoptionArtifact);

		// Set the provider for our contract
		App.contracts.GOF.setProvider(App.web3Provider);

		// Use our contract to retrieve and mark the adopted pets
		// return App.markAdopted();
	  });
      $.getJSON('./GOFGTPool.json', function(data) {
        // 用Adoption.json数据创建一个可交互的TruffleContract合约实例。
        var AdoptionArtifact = data;
        App.contracts.GOFGTPool = TruffleContract(AdoptionArtifact);

        // Set the provider for our contract
        App.contracts.GOFGTPool.setProvider(App.web3Provider);

        // Use our contract to retrieve and mark the adopted pets
        // return App.markAdopted();
      });
	  return App.bindEvents();
  },
  bindEvents: function() {
    $(document).on('click', '#linking_linkds', App.handleAdopt2);
    $(document).on('click', '#zhiya', App.zhiya);
    $(document).on('click', '#tuiguang', App.tuiguang);
    $(document).on('click', '#withdraw', App.withdraw1);
    $(document).on('click', '#earned', App.earn);
    $(document).on('click', '#shanglian', App.shanglian);
  },
  shanglian: function(){

  },
  benjinFun: function () {
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.GOFGTPool.at(GOFPoolcontractAddress).then(function(instance){
        adoptionInstance = instance;
        adoptionInstance.balanceOf(account).then(function(result) {
          benjin= result/1000000000000000000;
          console.log(benjin);
        }).catch(function(err) {
          console.log(err.message);
        });
      })
    })
  },
  shouyiFun: function () {
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.GOFGTPool.at(GOFPoolcontractAddress).then(function(instance){
        adoptionInstance = instance;
        adoptionInstance.earned(account).then(function(result) {
          shouyi= result/1000000000000000000;
          console.log(shouyi);
        }).catch(function(err) {
          console.log(err.message);
        });
      })
    })
  },
  withdraw1: function(event){
    event.preventDefault();
    console.log($("#realANO").html());
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

        var txt=  "可提取:"+benjin+"ANO";
        window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.input,{
          onOk:function(v){
            App.contracts.GOFGTPool.at(GOFPoolcontractAddress).then(function(instance){
              adoptionInstance = instance;
            adoptionInstance.withdraw(v*1000000000000000000).then(function(result) {
              $("#realANO").html(add($("#realANO").html(),v));
              App.benjinFun();
              $.get("http://localhost:8090/defi-ano/defiano/withdraw",{"address":account,"amount":v},function (data) {
              })

              return result;
            }).catch(function(err) {
              console.log(err.message);
            });
          })
          }
        })

    })
  },
  earn: function(){
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];

        var txt=  "共收益:"+shouyi+"ANO \n 是否全部提取？";
        window.wxc.xcConfirm(txt,{
          onOk:function(v){
            App.contracts.GOFGTPool.at(GOFPoolcontractAddress).then(function(instance){
              adoptionInstance = instance;
            adoptionInstance.getReward().then(function(result) {
              return result;
            }).catch(function(err) {
              console.log(err.message);
            });
          })
          }
        })

    })
  },
  tuiguang: function(event){
    event.preventDefault();
    var adoptionInstance;
    // 获取用户账号
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      var txt=  "";
      $.get("http://localhost:8090/defi-ano/defiano/myAccount",{"address":account},function (act) {
        if (act.pid==null||act.pid==""){
          txt="添加推荐人";
        }else {
          txt="推荐人:"+act.pid.substring(0,5)+"..."+" \n "+"修改:"
        }
        window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.input,{
          onOk:function(v){
            $.get("http://localhost:8090/defi-ano/defiano/getBalance",{"address":account,"pid":v},function () {
              $("#paccount").html(act.pid);
            })
          }
        });
      })

    });
  },
  markAdopted: function() {
    var adoptionInstance;
    App.contracts.Adoption.deployed().then(function(instance) {
      adoptionInstance = instance;
      // 调用合约的getAdopters(), 用call读取信息不用消耗gas
      return adoptionInstance.getAdopters.call();
    }).then(function(adopters) {
      for (i = 0; i < adopters.length; i++) {
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },


  //获取账户地址和余额信息
  handleAdopt2: function(event) {
    event.preventDefault();
    var adoptionInstance;
    // 获取用户账号
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];

      $('.bankId').html(account);
      App.contracts.GOF.at(GOFcontractAddress).then(function(instance){
        adoptionInstance = instance;
        adoptionInstance.balanceOf(account).then(function(res){
          GOFbalance=res.c[0]*100000000000000;
          console.log(GOFbalance);
          $("#realANO").html(res.c[0]/10000);
        })
        $.get("http://localhost:8090/defi-ano/defiano/myAccount",{"address":account},function (data) {
          $("#frees").html(data.frees);
          $("#frozen").html(data.frozen);
        })

      })
      App.benjinFun();
      App.shouyiFun();



    });

  },

  zhiya: function(event) {
    event.preventDefault();

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      // var constrats=0x3F05F579e08bdBe526bd11fF5FCe4fC26144AAC7;


      if (approve==false){
        App.contracts.GOF.at(GOFcontractAddress).then(function(instance){
          adoptionInstance = instance;
          adoptionInstance.approve("0x3F05F579e08bdBe526bd11fF5FCe4fC26144AAC7",GOFbalance).then(function(result) {
            console.log(result);
            approve=true;
            return result;
          }).catch(function(err) {
            console.log(err.message);
          });
        })
      }else {
        var txt=  "质押数量：";
        window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.input,{
          onOk:function(v){
            App.contracts.GOFGTPool.at(GOFPoolcontractAddress).then(function(instance){
              adoptionInstance = instance;
              adoptionInstance.stake(v*1000000000000000000).then(function(result) {
                App.benjinFun();
                console.log(result);
                return result;
              }).catch(function(err) {
                console.log(err.message);
              });
              })
            }
        })
      }


    });

  },

};
function add(arg11, arg2) {
  var r1, r2, m, c;
  try { r1 = arg11.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
  c = Math.abs(r1 - r2);
  m = Math.pow(10, Math.max(r1, r2))
  if (c > 0) {
    var cm = Math.pow(10, c);
    if (r1 > r2) {
      arg1 = Number(arg11.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", "")) * cm;
    }
    else {
      arg1 = Number(arg11.toString().replace(".", "")) * cm;
      arg2 = Number(arg2.toString().replace(".", ""));
    }
  }
  else {
    arg1 = Number(arg11.toString().replace(".", ""));
    arg2 = Number(arg2.toString().replace(".", ""));
  }
  return (arg1 + arg2) / m
}
$(function() {
  // $(window).load(function() {
  //   console.log(1111);
  //   App.init();
  // });
  //$(window).on('load',function(){
  //window.onload=function() {
    $.get("http://localhost:8090/defi-ano/defiano/perDay",function (data) {
      $('#perDay1').html(data+"ANO");
    })
    $.get("http://localhost:8090/defi-ano/defiano/total",function (data) {
      $('#total1').html(data+"ANO");
    })
    $.get("http://localhost:8090/defi-ano/defiano/totalSupply",function (data) {
      $('#totalSupply1').html(data+"USDT");
    })

    App.init();
  //};
});
