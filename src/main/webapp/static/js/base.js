//工具函数对象
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
window.cancelRequestAnimFrame = (function () {
    return window.cancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        clearTimeout;
})();

var utils = {
    isEmpty: function (val) {
        var type = typeof(val);
        switch (type) {
            case 'string':
                return $.trim(val).length === 0;
            case 'number':
                return val === 0;
            case 'object':
                return val === null;
            case 'array':
                return val.length === 0;
            default:
                return true;
        }
    },
    isChinese: function (val) {
        var reg = /^[\u4e00-\u9fa5]+$/;
        return reg.exec(val);
    },
    strLen: function (str) {
        var len = 0;
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
                len += 2;
            } else {
                len++;
            }
        }
        return len;
    },
    //正整数
    isDigital: function (val) {
        return /^\d+$/.test(val);
    },
    isTel: function (tel) {
        return /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,6})?$/.test(tel);
    },
    isUserName: function (val) {
        return /(^[a-zA-Z0-9][a-zA-Z0-9_\-.]*@[a-zA-Z0-9]+$)|(^[A-Za-z0-9_\-.]*@+$)|(^[a-zA-Z0-9][a-zA-Z0-9_\-.]+$)/.test(val);
    },
    isMobile: {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        IOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        QQ: function () {
            return (navigator.userAgent.indexOf('QQ') > -1);
        },
        WeChat: function () {
            return navigator.userAgent.match(/MicroMessenger/i);
        },
        AlipayChat: function () {
            return navigator.userAgent.match(/AlipayClient/i);
        },
        APP: function () {
            return navigator.userAgent.match(/lecake/i);
        }
    },
    checkPassword: function (val) {
        return /^[A-Za-z0-9_-]{6,20}$/.test(val);
    },
    checkYzm: function (val, min, max) {
        min = min || 4;
        max = max || 6;
        return new RegExp('^\\w{' + min + ',' + max + '}$').test(val);
    },
    //检查邮箱
    checkEmail: function (email) {
        return /^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+((.|-|_)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(email);
    },
    //检查手机号
    checkMobile: function (mobile) {
        return /^1\d{10}$/.test(mobile);
    },
    //返回'00'类字符串
    subTime: function (str_time) {
        if (str_time < 10) {
            str_time = '0' + str_time;
        }
        return str_time + '';
    },
    //格式化货币单位
    currency: function (price, separate) {
        var f = parseFloat(price);
        if (isNaN(f)) {
            return 0;
        }
        f = Math.round(f * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        if (separate) {
            return s.split('.');
        }
        return s;
    },
    //异步加载js
    asyncLoadJS: function (url) {
        var headObj = document.getElementsByTagName('HEAD').item(0);
        var scriptObj = document.createElement('script');
        scriptObj.type = 'text/javascript';
        scriptObj.src = url;
        headObj.appendChild(scriptObj);
    },
    //格式化日期
    formatDate: function (time, fmt) {
        time = time || Date.now();
        fmt = fmt || 'yyyy-MM-dd hh:mm:ss';
        var date = new Date(time);
        var o = {
            'M+': date.getMonth() + 1, //月份
            'd+': date.getDate(), //日
            'h+': date.getHours(), //小时
            'm+': date.getMinutes(), //分
            's+': date.getSeconds(), //秒
            'q+': Math.floor((date.getMonth() + 3) / 3), //季度
            'S': date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    },
    //获取中文星期
    getDay: function (time, prefix) {
        time = time || Date.now();
        prefix = prefix || '周';
        var str = '日一二三四五六';
        return prefix + str[new Date(time).getDay()];
    },
    //获取查询参数
    getQuery: function (name, url) {
        var u = arguments[1] || window.location.search,
            reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
            r = u.substr(u.indexOf('\?') + 1).match(reg);
        return r !== null ? r[2] : '';
    },
    parseJSON: function (str) {
        return ('undefined' !== typeof JSON) ? JSON.parse(str) : (new Function("return " + str))();
    },
    getLength: function (val) {
        var len = 0;
        var a = val.split('');
        for (var i = 0; i < a.length; i++) {
            if (a[i].charCodeAt(0) < 299) {
                len++;
            } else {
                len += 2;
            }
        }
        return len;
    },
    //获取除hash外location
    getHref: function () {
        return location.href.split('#')[0];
    },
    //获取location.origin
    getOrigin: function () {
        return location.protocol + '//' + location.hostname;
    },
    //获取location.origin
    checkProtocol: function (url) {
        return url.indexOf('http') === -1 ? location.protocol + url : url;
    },
    //获取字符串长度，区分中英文
    len: function (str) {
        var len = 0,
            a = str.split('');
        for (var i = 0; i < a.length; i++) {
            if (a[i].charCodeAt(0) < 299) {
                len++;
            } else {
                len += 2;
            }
        }
        return len;
    },
    //检查详细地址和门牌号
    checkAddress: function (str, min, max) {
        if (str.length < min || str.length > max) {
            return false;
        }
        return !/[~!@#$%^&*\\|"']/.test(str);
    },
    //判断对象类型
    isType: function (o, type) {
        var types = [
                ['number', 'Number'],
                ['string', 'String'],
                ['undefined', 'Undefined'],
                ['bool', 'Boolean'],
                ['object', 'Object'],
                ['array', 'Array'],
                ['function', 'Function'],
                ['null', 'Null']
            ],
            current = [];
        for (var i = 0; i < types.length; i++) {
            if (types[i][0] === type) {
                current = types[i];
            }
        }
        if (!current.length) {
            throw new Error('类型不存在');
        }
        return Object.prototype.toString.call(o) === '[object ' + current[1] + ']';
    },
    //获取uuid
    uuid: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    //获取[min, max]
    rand: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    //判断ie版本
    getIEVersion: function () {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion === 7) {
                return 7;
            } else if (fIEVersion === 8) {
                return 8;
            } else if (fIEVersion === 9) {
                return 9;
            } else if (fIEVersion === 10) {
                return 10;
            } else {
                return 6;//IE版本<=7
            }
        } else if (isEdge) {
            return 'edge';//edge
        } else if (isIE11) {
            return 11; //IE11
        } else {
            return -1;//不是ie浏览器
        }
    },
    //根据新参数重构url searchObj={key:val}
    createUrl: function (searchObj, pathname) {
        pathname = pathname || location.pathname;
        searchObj = searchObj || {};
        var search = location.search.split('?')[1],
            hash = location.hash,
            params = [],
            searchArr = [],
            newSearchArr = [],
            searchStr;
        if (search) {
            search.split('&').forEach(function (item) {
                params = item.split('=');
                searchArr.push([params[0], params[1]]);
            });
        }
        searchArr.forEach(function (arr) {
            if (searchObj.hasOwnProperty(arr[0])) {
                arr[1] = searchObj[arr[0]];
            }
            newSearchArr.push(arr);
        });
        var keyArray = searchArr.map(function (item) {
            return item[0];
        });
        for (var key in searchObj) {
            if (searchObj.hasOwnProperty(key) && $.inArray(key, keyArray) === -1) {
                newSearchArr.push([key, searchObj[key]]);
            }
        }
        searchStr = newSearchArr.reduce(function (prevVal, currentArr) {
            return (prevVal ? prevVal + '&' : '') + currentArr.join('=');
        }, '');
        return pathname + '?' + searchStr + hash;
    }
};

//cookie相关操作
var cookie = {
    //设置cookie，time为秒数
    set: function (key, val, time) {
        var exp = new Date();
        exp.setTime(exp.getTime() + time * 1000);
        if (!time) {
            document.cookie = key + '=' + encodeURIComponent(val) + ';path=/;domain=' + GlobalConfig.cookieDomain + ';';
        } else {
            document.cookie = key + '=' + encodeURIComponent(val) + ';expires=' + exp.toGMTString() + ';path=/;domain=' + GlobalConfig.cookieDomain + ';';
        }
    },
    get: function (key) {
        var cookieArr = document.cookie.split('; ');
        var arr, val = null;
        for (var i = 0; i < cookieArr.length; i++) {
            arr = cookieArr[i].split('=');
            if (key === arr[0]) {
                val = decodeURIComponent(decodeURIComponent(arr[1]));
                break;
            }
        }
        return val;
    },
    delete: function (key) {
        var val = this.get(key);
        if (val !== null) {
            this.set(key, null, -10000000);
        }
    }
};

//购物车相关操作
var globalCart = {
    //单个商品编辑购物车,构造如['sku_id'=>102025,'amount'=>2,'attributes'=>['goods_cut'=>0,'goods_birthday'=>'']]的格式,amount为0时为删除
    //obj = {sku_id:int,amount:int,attributes:array,success:fn,fail:fn,always:fn} || {params:[{sku_id:int,amount:int,attributes:array}],success:fn,fail:fn,always:fn}
    update: function (obj, isAdd) {
        var params,
            itemInfo;
        if (!obj.params) {
            itemInfo = {
                sku_id: obj.sku_id,
                amount: utils.isType(obj.amount, 'undefined') ? 1 : obj.amount,
                checked: obj.checked,
                use_bargain_id: obj.use_bargain_id
            };
            if (obj.attributes) {
                itemInfo.attributes = obj.attributes;
            }
            params = [itemInfo];
        } else {
            params = obj.params;
        }
        var url = isAdd ? '/cart/add-new.html' : '/cart/update-new.html';
        $.ajax({
            method: 'get',
            url: url,
            data: {
                params: params
            }
        }).done(function (res) {
            if (res.error === 0) {
                //更新全局购物车数量
                globalCart.count();
                obj.success && obj.success(res.data);
            } else {
                obj.fail && obj.fail(res.msg);
            }
        }).fail(function () {
            obj.fail && obj.fail('编辑购物车失败');
        }).always(function (res) {
            obj.always && obj.always(res);
        });
    },
    //全局购物车数量
    count: function (dom) {
        dom = dom || $('.global_cart_num');
        var num = cookie.get('CARTCNT');
        if (num && parseInt(num) > 0) {
            dom.removeClass('hide').find('b').text(num);
        } else {
            dom.addClass('hide').find('b').text(0);
        }
    }
};
//时间日期操作
var timeHandler = {
    //时间戳=>100000
    timeToInt: function (time) {
        time = this.strToInt(time);
        var t = utils.formatDate(time, 'hh:mm');
        return parseInt(t.split(':').join('')) * 100;
    },
    //10:00:00=>时间戳
    strToInt: function (time) {
        var str;
        if (typeof time === 'number') {
            time = time.toString();
            str = time.substring(0, 2) + ':' + time.substring(2, 4);
        } else {
            str = time;
        }
        str = str || '10:00:00';
        var startArr = str.split(':').map(function (item) {
            return parseInt(item);
        });
        return ((startArr[0] + new Date().getTimezoneOffset() / 60) * 3600 + startArr[1] * 60) * 1000;
    },
    //100000=>10:00:00
    intToStr: function (time, isShort) {
        time = time || 100000;
        time = time.toString();
        return time.substring(0, 2) + ':' + time.substring(2, 4) + (isShort ? '' : ':' + time.substring(4, 6));
    },
    //10:00:00=>100000
    timeToNumber: function (time) {
        time = time || '10:00:00';
        return parseInt(time.replace(/:/g, ''));
    },
    //将2017-00-00转化为时间戳
    dateToInt: function (date) {
        date = date || '2017-00-00';
        return new Date(date.split('-').map(function (item) {
            return parseInt(item);
        }).join('/')).getTime();
    }
};
//地址操作
var addressHandler = {
    //将获取到的全国配送地址修改成可用列表
    createAddressArr: function (data) {
        var list = [];
        if (utils.isType(data, 'object')) {
            for (var i in data) {
                var _province = data[i],
                    province = {};
                province.id = i;
                province.name = i;
                province.childs = [];
                if (utils.isType(_province, 'object')) {
                    for (var j in _province) {
                        var _city = _province[j],
                            city = {};
                        city.id = j;
                        city.name = j;
                        city.childs = [];
                        if (utils.isType(_city, 'array')) {
                            _city.forEach(function (item) {
                                city.childs.push({
                                    id: item,
                                    name: item
                                });
                            });
                        }
                        province.childs.push(city);
                    }
                }
                list.push(province);
            }
        }
        return list;
    },
    //获取省、市、区名称
    getAreaName: function (obj, key, arr) {
        if (!obj.address) {
            return '';
        }
        var name = '',
            id = obj.address[key];
        arr.forEach(function (item) {
            if (item.id.toString() === id.toString()) {
                name = item.name;
            }
        });
        return name;
    },
    //获取省、市、区列表
    getAreaArr: function (obj, parentArr, parentId, key) {
        var arr = [],
            address = obj.address,
            isExists = false;
        if (address) {
            //省一级
            if (key === 'provinceid') {
                for (var i in parentArr) {
                    arr.push(parentArr[i]);
                }
            } else {
                parentArr.forEach(function (item) {
                    if (item.id.toString() === parentId.toString()) {
                        if (utils.isType(item.childs, 'array')) {
                            arr = item.childs;
                        }
                    }
                });
            }
            arr.forEach(function (item) {
                if (address[key]) {
                    if (item.id.toString() === address[key].toString()) {
                        isExists = true;
                    }
                }
            });
            if (!isExists && arr.length) {
                address[key] = arr[0].id.toString();
            }
        }
        return arr;
    }
};
//支付对象
var globalPayment = {
    //支付
    pay: function (payId, orderId) {
        payId = parseInt(payId);
        if (payId === 65 || payId === 95 || payId === 105 || payId === 102) {
            $.alert('此支付方式只能在APP支付');
            return;
        }
        if (payId === 99 || payId === 107 || payId === 108) {
            $.alert('请在微商城中打开支付');
            return;
        }
        if (payId === 29 || payId === 100) {
            window.location.href = '/shop/onlinepay/wx/jsapicall_sm.php?wx_out_trade_no=' + orderId;
        } else {
            window.location = '/shop/bill_pay.php?bill_no=' + orderId + '&payTypeID=' + payId;
        }
    }
};
(function () {
    //支付倒计时
    var PaymentCountdown = function (options) {
        var defaultOptions = {
            dom: $('.countdown_wrap time'),                      //显示倒计时的dom
            now: parseInt($('#nowTime').val()) || Date.now(),   //现在时间
            orderCreateTime: 0,                                       //订单创建时间
            payTime: 20 * 60 * 1000,                            //多长时间后不能支付
            setTimeFn: null,                                     //显示倒计时函数
            callback: null,                                     //倒计时结束回调
            needHour: false                                     //是否需要显示小时
        };
        this.timer = null;
        this.opts = $.extend(defaultOptions, options || {});
        if (this.opts.dom.length) {
            this.countdown();
        }
    };
    PaymentCountdown.prototype = {
        getTime: function (time, flag) {
            var t = time / 1000 % 60;
            if (flag === 'h') {
                t = time / 1000 / 60 / 60 % 24;
            } else if (flag === 'm') {
                t = time / 1000 / 60 % 60;
            }
            t = Math.floor(t).toString();
            t = t.length === 1 ? '0' + t : t;
            return t;
        },
        countdown: function () {
            var self = this,
                opts = this.opts;
            var now = opts.now,
                orderCreateTime = opts.orderCreateTime * 1000,
                payTime = opts.payTime,
                callback = opts.callback;
            var endTime = payTime + orderCreateTime,
                lastTime = endTime - now;
            if (lastTime > 0) {
                self.setTimeStr(lastTime);
                self.timer = setInterval(function () {
                    lastTime -= 1000;
                    self.setTimeStr(lastTime);
                    if (lastTime <= 0) {
                        clearInterval(self.timer);
                        callback && callback();
                    }
                }, 1000);
            } else {
                callback && callback();
            }
        },
        setTimeStr: function (lastTime) {
            var dom = this.opts.dom,
                needHour = this.opts.needHour,
                setTimeFn = this.opts.setTimeFn;
            var h = this.getTime(lastTime, 'h'),
                m = this.getTime(lastTime, 'm'),
                s = this.getTime(lastTime, 's');
            if (setTimeFn) {
                setTimeFn(dom, h, m, s);
            } else {
                dom.text((needHour ? h + ' : ' : '') + m + ' : ' + s);
            }
        }
    };
    window.PaymentCountdown = PaymentCountdown;
})();

//判断商品类型
function getGoodsType(typeId) {
    typeId = parseInt(typeId);
    var type;
    switch (typeId) {
        case 1:
            type = '蛋糕';
            break;
        case 2:
            type = '配件';
            break;
        case 3:
            type = '特殊配件';
            break;
        case 21:
            type = '预生产类';
            break;
        case 23:
            type = '虚拟商品';
            break;
        default:
            type = '其他';
    }
    return type;
}

//混淆订单号
function mixOrderNo(no) {
    no = no || '';
    var last = no.substr(-6).split('').reverse().join('');
    return no.substr(0, 12) + last;
}

//兼容活动页写法
var app_js = {
    /**
     * 购买商品函数，
     * @param sku_id 商品SKU ID 或 SKU ARRAY => [{sku_id: 100000, amount: 1}]
     * @param amount  数量 默认1
     * @param quickBuyFlag true OR false, default false 购买成功后是否直接跳转结算页
     * @param fn   购买结果回调
     */
    buyItem: function (sku_id, amount, quickBuyFlag, fn) {
        var params = [];
        amount = amount || 1;
        fn = fn || {};
        if (utils.isType(sku_id, 'array')) {
            //代表是id数组
            params = sku_id;
        } else {
            if (!sku_id) {
                $.toast("添加购物车失败！（未输入商品ID）");
                return;
            }
            params.push({
                sku_id: sku_id,
                amount: amount,
                checked: 1
            });
        }
        if (quickBuyFlag) {
            $.ajax({
                method: 'get',
                url: '/cart/to-order.html',
                data: {
                    params: params
                }
            }).done(function (res) {
                if (res.error === 0) {
                    if (fn.success) {
                        fn.success(res.data);
                    } else {
                        //跳转结算页
                        window.location = '/order/index.html?buyId=' + res.data.buyId;
                    }
                } else {
                    if (fn.fail) {
                        fn.fail(res.msg);
                    } else {
                        $.alert(res.msg);
                    }
                }
            }).fail(function () {
                if (fn.fail) {
                    fn.fail('提交失败，请重试');
                } else {
                    $.alert('提交失败，请重试');
                }
            }).always(function () {
                fn.always && fn.always();
            });
        } else {
            globalCart.update({
                params: params,
                always: function () {
                    fn.always && fn.always();
                },
                success: function () {
                    if (fn.success) {
                        fn.success();
                    } else {
                        window.location = '/cart/index.html';
                    }
                },
                fail: function (msg) {
                    if (fn.fail) {
                        fn.fail(msg);
                    } else {
                        $.alert(msg);
                    }
                }
            }, true);
        }
    }
};

//顶部小购物车
var globalTopCart = {};

//购买后直接升级aha会员的商品
var globalBuyVipGoods = 108003;
if (GlobalConfig.site_env === 'dev') {
    globalBuyVipGoods = 103657;
} else if (GlobalConfig.site_env === 'alpha') {
    globalBuyVipGoods = 103663;
}

//全局页面初始化
$(function () {
    //顶部切换导航
    $('.have_inner').hover(function () {
        $(this).find('.inner_wrap').fadeIn(200);
    }, function () {
        $(this).find('.inner_wrap').fadeOut(200);
    });
    //初始化城市选择器
    var citySelectorDom = $('#selectCity').length ? '#selectCity' : '.select_city';
    citySelector.init(citySelectorDom);
    //微信图片
    $('.wx_btn').on('mouseenter', function () {
        $(this).find('img').show();
    }).on('mouseleave', function () {
        $(this).find('img').hide();
    });
    //客服
    $('#footerServiceBtn').click(function () {
        $('#serviceBtn').click();
    });
    /**
     * 点击心享卡图标
     * 如果已经购买了心享卡权益，则显示心享卡说明，否则跳转权益购买页面
     */
    $('#passCardFlag').click(function () {
        if ($(this).hasClass('active')) {
            $('    <article class="container main_pass_card_rule" id="passCardRule">\n' +
                '        <div class="main">\n' +
                '            <a href="javascript:void(0)" id="closePassCardRule" class="close_btn">关闭</a>\n' +
                '            <h3>【心享卡使用指南】</h3>\n' +
                '            <h4>1. 心享卡是面向诺心用户的专享特权。心享卡会员可获得「购买千层系列蛋糕权益」。</h4>\n' +
                '            <h4>2. 心享卡会员购买任意诺心千层系列蛋糕，可享立减50元优惠。</h4>\n' +
                '            <h4>3. 心享卡会员购买全场蛋糕单笔订单实付满178元（不含运费），可享Aha值积分返利；每实付10元累计1个Aha值（Aha值48小时以内到账；实际现金消费指微信、支付宝支付）。</h4>\n' +
                '            <h4>4. Aha值结算蛋糕、礼品、配件时（不含运费），可直接抵扣现金，1Aha值=1元；现有积分和Aha值可同时获取累计，但不可同时使用）。</h4>\n' +
                '            <h4>5. 权益购买后即刻生效，有效期为1年，Aha值永久有效。</h4>\n' +
                '        </div>\n' +
                '    </article>').appendTo($('body'));
            $('#closePassCardRule').click(function () {
                $('#passCardRule').remove();
            });
        } else {
            // window.location = '/shop/help-625.html';
        }
    });
    //页面加载完成后全局调用
    globalCart.count();
    //加入购物车通用处理
    $(document).on('click', '[buy-item]', function () {
        loading.show();
        var me = $(this),
            id = me.attr('data-id'),
            amount = me.attr('data-amount'),
            action = me.attr('data-action');
        amount = parseInt(amount) || 1;
        globalCart.update({
            sku_id: id,
            amount: amount,
            checked: 1,
            always: function () {
                loading.hide();
            }
        }, action === 'add');
    });
    (function () {
        var globalHeader = $('#globalHeader');
        //搜索
        globalHeader.on('click', '.global_search_btn', function () {
            var searchWrap = $(this).parent('.search_wrap'),
                input = globalHeader.find('.search_wrap input'),
                keyword = $.trim(input.val()) || input.attr('placeholder');
            if (searchWrap.parents('.header_wrap').hasClass('active') && !searchWrap.hasClass('active')) {
                searchWrap.addClass('active');
                return;
            }
            if (!keyword) {
                $.alert('请输入要搜索的商品名称');
                return;
            }
            window.location = '/goods/search.html?keyword=' + keyword
        });

        //回车搜索
        $(document).on('keydown', function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode === 13 && $('#globalHeader .search_input').is(':focus')) {
                $('.global_search_btn').click();
            }
        });

        //顶部复制
        if (window.hideGlobalHeader || $('#globalTopCart').length === 0) {
            return;
        }
        globalHeader.append(globalHeader.find('.header_wrap').clone(true).addClass('fix_header'));
        setTimeout(function () {
            if (globalHeader.find('.customer_link').length === 0) {
                $('#globalTopCustomer').appendTo(globalHeader.find('.fix_header .customer_link_wrap'));
            }
            $('#globalTopCart').appendTo(globalHeader.find('.fix_header .nav_cart_wrap'));
        }, 0);
        var dom = globalHeader.find('.fix_header'),
            height = 155;
        $(window).scroll(function () {
            if ($(window).scrollTop() > height) {
                dom.addClass('active');
            } else {
                dom.removeClass('active');
            }
        });
        globalTopCart = new Vue({
            el: '#globalTopCart',
            data: {
                itemCount: 0,                      //购物车商品数量
                buyList: [],                                        //正常商品列表
                totalPrice: 0,                //总金额
                discountsPrice: 0,        //优惠金额
                isLoading: false            //是否正在请求
            },
            methods: {
                //获取购物车商品
                getData: function () {
                    var self = this;
                    self.isLoading = true;
                    $.ajax({
                        method: 'get',
                        url: '/cart/mini.html'
                    }).done(function (res) {
                        if (res.error === 0) {
                            self.setCartInfo(res.data);
                        }
                    }).fail(function (e) {
                        console.log(e);
                    }).always(function () {
                        self.isLoading = false;
                    });
                },
                //编辑购物车公用方法
                deleteItem: function (itemId) {
                    var self = this;
                    globalCart.update({
                        params: [
                            {
                                sku_id: itemId,
                                amount: 0
                            }
                        ],
                        success: function (res) {
                            self.setCartInfo(res);
                            if (utils.isType(window.cartObj, 'object')) {
                                cartObj.setData(res);
                            }
                        },
                        fail: function (msg) {
                            $.alert(msg);
                        }
                    }, false);
                },
                //获取购物车信息回调
                setCartInfo: function (data) {
                    this.buyList = data.buy_list;
                    this.itemCount = data.count;
                    this.discountsPrice = data.discountsPrice;
                    this.totalPrice = data.totalPrice;
                    globalCart.count();
                }
            },
            computed: {
                //购物车商品列表由仅可单独购买商品列表和可正常购买商品列表组成，其他站点商品及不可购买商品排除
                goodsList: function () {
                    return this.buyList.map(function (item) {
                        //假如用户已经登录并且没有心享卡权限时，心享价设为0
                        if (customerInfo.privilege && !customerInfo.privilege.has_pass_card) {
                            item.passcard_price = 0;
                        }
                        return item;
                    });
                }
            },
            filters: {
                //拼接购物车商品主图
                mainPic: function (img) {
                    return GlobalConfig.imageRoot + '/goods/' + img;
                },
                //价格
                salePrice: function (price) {
                    price = price > 0 ? price : 0;
                    return parseFloat(utils.currency(price));
                }
            }
        });
        globalHeader.on('mouseenter', '.fix_header .nav_cart_wrap', function () {
            var num = parseInt(cookie.get('CARTCNT'));
            if (num !== globalTopCart.itemCount) {
                globalTopCart.getData();
            }
        });
    })();

    (function () {
        //激活aha会员弹窗
        $('.link_to_activate_vip').click(function () {
            $('#linkToActivateVip').removeClass('hide');
        });
        $('#linkToActivateVip .close_btn').click(function () {
            $('#linkToActivateVip').addClass('hide');
        });
    })();

    //购买aha商品
    (function () {
        $(document).on('click', '.global_buy_vip_goods', function () {
            app_js.buyItem(globalBuyVipGoods, 1, true);
        });
    })();

    //aha权益介绍
    (function () {
        var html = $('<article class="global_vip_rule">\n' +
            '        <div class="wrap">\n' +
            '            <a href="javascript:void(0)" class="close_btn">关闭</a>\n' +
            '            <div class="inner">\n' +
            '            <h3>Aha会员规则说明</h3>\n' +
            '            <h3>诺心为向用户提供更高品质的客户服务，特别推出Aha会员专属权益。</h3>\n' +
            '            <h3>【激活Aha会员】</h3>\n' +
            '            <p>用户可在诺心官网通过以下任一方式激活Aha会员：</p>\n' +
            '            <p> 1. 付费激活：支付199元Aha会员费，可获得1年aha会员权益。</p>\n' +
            '            <p>2. 0元激活：完善生日信息并成功邀请一名非Aha会员的好友注册或登录。</p>\n' +
            '            <p>3. 受邀激活：完成Aha会员对你发出的点亮任务邀请。</p>\n' +
            '            <h3>【Aha会员权益】</h3>\n' +
            '            <p>成功激活Aha会员的用户可享受如下权益：</p>\n' +
            '            <p>1. 专享会员价：凡标有Aha会员标签的商品，会员下单可享受Aha会员价，可与Aha专属优惠券与Aha值优惠同享（其他优惠除外，如促销、普通会员优惠券、蛋糕卡、储值卡、银行优惠等不可同享）。\n' +
            '            </p>\n' +
            '            <p>2. Aha专享优惠券：成为Aha会员即可获得会员专属优惠券。</p>\n' +
            '            <p>3.\n' +
            '                Aha值返利：单笔蛋糕订单实付满178元(不含运费)可享Aha值返利，每实付10元累计1Aha值，Aha值可直接抵扣蛋糕、礼品、配件费用(不含运费)，1Aha值=1元，现有积分和Aha值可同时获取累计，但不可同时使用。(Aha值48小时内到账，实付金额特指微信、支付宝支付)。\n' +
            '            </p>\n' +
            '            <p>4. Aha蛋糕狂欢节：Aha会员每月拥有专属蛋糕狂欢节，在狂欢节期间享受人气蛋糕超值狂欢价。</p>\n' +
            '            <p> 5. 其他权益：新品优先试吃特权及其他惊喜会员活动。</p>\n' +
            '            <h3>【Aha会员有效期】</h3>\n' +
            '            <p> Aha会员权益激活后即刻生效，有效期至多1年；Aha会员如过期，可通过支付会员费重新激活。</p>\n' +
            '            <h3>【延长有效期】</h3>\n' +
            '            <p> 1. 续费：Aha会员权益过期后可续费重新激活，有效期为1年。</p>\n' +
            '            <p> 2.\n' +
            '                下单：如Aha会员初始有效期不足1年，在有效期内每配送完成一笔订单（蛋糕、吐司等诺心自营商品），可延长6个月的有效期，直至有效期延长至1年（自会员激活之日起）。 </p>\n' +
            '            <h3>温馨提示：</h3>\n' +
            '            <p>1. 延长有效期的订单需在Aha会员有效期内完成配送，订单需采用线上现金支付（不支持蛋糕卡、储值卡等支付方式）。</p>\n' +
            '            <p> 2. 如发生退货拒收等情形，延长的有效期将取消，如取消后会员已过期，Aha会员权益终止，用户自动恢复为普通会员身份。</p>\n' +
            '        </div>\n' +
            '        </div>\n' +
            '    </article>');
        $(document).on('click', '.global_show_vip_rule', function () {
            html.appendTo($('body')).click(function () {
                $('.global_vip_rule').remove();
            }).find('.close_btn').click(function () {
                $('.global_vip_rule').remove();
            }).end().find('.wrap').click(function (e) {
                e.stopPropagation();
            });
        });
    })();
});

//2018.11.06 领券
function showOnlyOnePop(flag, callback) {
    var plat = 'pc',
        key = flag + '_' + plat,
        clearKey = 'clear_' + key;
    if (utils.getQuery(clearKey)) {
        localStorage.removeItem(key);
    }
    var val = localStorage.getItem(key);
    if (!val) {
        localStorage.setItem(key, 'isSet');
        var dom = $('.' + flag);
        callback && callback(dom);
    }
}