<%--
  Created by IntelliJ IDEA.
  User: ruiyi
  Date: 2018/12/20
  Time: 上午10:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8"/>
    <title>诺心蛋糕官网|诺心LE CAKE—诺心蛋糕网上订购</title>
    <meta name="Keywords" content="诺心蛋糕官网,诺心, 生日蛋糕订购，芝士蛋糕,慕斯蛋糕,草莓蛋糕，蛋糕网上订购，订蛋糕，网上订蛋糕"/>
    <meta name="Description" content="诺心蛋糕官网提供生日蛋糕,巧克力蛋糕,芝士蛋糕,水果蛋糕,慕斯蛋糕,草莓蛋糕订购,蛋糕店已在上海,北京,广州,深圳,天津,杭州,苏州,成都,重庆,宁波,南京开通网上订蛋糕,免费配送到家。"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="renderer" content="webkit"/>
    <meta property="wb:webmaster" content="ec5363986c1d9b8a"/>
    <link rel="shortcut icon" href="/favicon.ico?01" type="image/x-icon">
    <link rel="stylesheet" href="static/css/base.css">
    <link rel="stylesheet" href="static/css/widget.css">
    <!--[if lt IE 9]>
    <script src="static/js/html5.min.js"></script>
    <![endif]-->
    <script>
        var GlobalConfig = {
            'baseUrl': 'https://www.lecake.com/',
            'staticUrl': '//newimgcdn.lapetit.cn/web/',
            'cookieDomain': '.lecake.com',
            'imageRoot': '//imagecdn.lapetit.cn/postsystem/docroot/images',
            'staticVersions': '2018121303',
            'site_env': 'prod'
        };
        var isLecakeCNDomain = false;
        //用户id
        var customerId = '';
        //用户信息
        var customerInfo = [];
        //某些商品特殊餐具数量
        var globalSpecialDinnerware = {"105819":"\u542b2\u628a\u9910\u53c9","105822":"\u542b2\u628a\u9910\u53c9","105909":"\u542b2\u628a\u9910\u53c9","105978":"\u542b2\u628a\u9910\u53c9","106041":"\u5404\u542b2\u628a\u9910\u52fa","106032":"\u542b2\u628a\u9910\u52fa","106038":"\u542b2\u628a\u9910\u52fa","106031":"\u542b2\u628a\u9910\u52fa","106035":"\u542b2\u628a\u9910\u52fa","106071":"\u542b2\u628a\u9910\u52fa","106068":"\u542b2\u628a\u9910\u52fa","107135":"\u542b1\u628a\u9910\u53c9"};
    </script>
    <script src="static/js/jquery.min.js"></script>
    <script src="static/js/vue.min.js"></script>
    <link href="static/css/passport.css" rel="stylesheet">
    <link href="static/css/nc.css" rel="stylesheet">
    <link href="static/css/loginapp.css" rel="stylesheet"></head>
<body>
<article class="container main_login main_passport max_width">
    <header class="global_header mini_header">
        <div class="wrap">
            <section class="global_nav">
                <div class="main_width clear_fix">
                    <div class="f_left logo_wrap">
                        <a href="/">
                            <img src="static/picture/logo_new.png"/>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    </header>
    <div class="main" style="background:url(static/images/ac198f1e37025872d33159b4cfc2ae88.jpg) no-repeat center;">
    <section class="main_width">
        <a href="" class="banner_link"></a>

        <article class="login_app" id="loginApp">


            <div class="login_wrap"><h2 class="clear_fix tab_title"><a href="javascript:void(0)" class="tab_btn f_left text_left">手机验证登录</a> <a href="javascript:void(0)" class="tab_btn f_right text_right active">账户密码登录</a></h2> <div class="tab tab_mobile" style="display: none;"><p class="input_wrap username_wrap"><input type="text" maxlength="11" title="手机号码" placeholder="手机号码"> <span class="error_message"></span></p> <p class="input_wrap yzm_wrap"><input type="text" maxlength="6" title="验证码" placeholder="请输入验证码"> <a href="javascript:void(0)" class="captchaWrap"><img src="" alt="点击刷新"> <span class="refresh_btn">换一个</span></a> <span class="error_message" style="display: none;"></span></p> <p class="input_wrap yzm_wrap"><input type="text" maxlength="6" title="短信验证码" placeholder="短信验证码"> <button class="code_btn">发送验证码
            </button> <button disabled="disabled" class="code_btn" style="display: none;">正在发送</button> <button disabled="disabled" class="code_btn" style="display: none;">0秒后重试</button> <span class="error_message"></span></p></div> <div class="tab tab_account" style=""><p class="input_wrap username_wrap"><input type="text" maxlength="50" title="email/手机号" placeholder="请输入账号" autocomplete="off"> <span class="error_message"></span></p> <p class="input_wrap password_wrap"><input type="password" maxlength="50" title="密码" placeholder="请输入密码"> <span class="error_message auto_wrap"></span></p> <p class="input_wrap yzm_wrap hide"><input type="text" maxlength="6" title="验证码" placeholder="请输入验证码"> <a href="javascript:void(0)" class="captchaWrap"><img src="" alt="点击刷新"> <span class="refresh_btn">换一个</span></a> <span class="error_message"></span></p></div> <button class="btn">立即登录
            </button> <p class="clear_fix bottom_link"><a href="" data-statistics="login_password|忘记密码" class="link_1">忘记密码</a> <a href="javascript:void(0)" data-statistics="login_register|注册新用户" class="f_right link_2">立即注册</a> <span class="f_right">还没有账号？</span></p> <div class="more_login_type"><h3></h3> <div class="type_list"><a href="javascript:void(0)" class="wx"></a> <a href="" class="qq"></a></div></div></div>


            <div class="ui_pop active" v-show="showConfirm">
                <div class="ui_confirm inner">
                    <div class="text">
                        <h3>当前手机号{{currentMobile}}已绑定以下账号，为了您的账户安全请选择一个诺心账户登录,此手机号将与其他账号解绑。</h3>
                        <h4>若有疑问可联系在线客服4001-578-578。</h4>
                        <div class="mobile_list">
                            <a href="javascript:void(0)"
                               v-for="item in mobileList"
                               :class="{active:custID===item.custID}"
                               @click="custID=item.custID;selectedMobile=item.mobile;">{{item.custID}}</a>
                        </div>
                    </div>
                    <div class="btn_wrap clear_fix">
                        <button class="f_left cancel_btn" @click="showConfirm=false">取消</button>
                        <button class="f_right ok_btn" @click="unbindMobile">确定</button>
                    </div>
                </div>
            </div>
            </template>
        </article>

    </section>
</div>
    <footer class="global_footer">
        <div class="footer_online">
            <a href="javascript:void(0)" class="service_btn" id="footerServiceBtn"><i></i>在线客服</a>
            <a href="javascript:void (0)" class="wx_btn" id="footerWxBtn">
                <img src="static/picture/qr_code_bottom.png">
                <i></i>
                微信公众号
            </a>
        </div>
        <div class="footer_tel">
            <p>
                <i></i>
                <span>客服电话：4001-578-578 服务时间（08:30-22:30）</span>
            </p>
        </div>
        <div class="footer_nav clear_fix">
            <p class="clear_fix">
                <a href="/about/notice.html" target="_blank">诺心公告</a>
                <a href="/shop/help-1.html" target="_blank">关于诺心</a>
                <a href="/shop/help-80.html" target="_blank">联系我们</a>
                <a href="/shop/help-42.html"
                   target="_blank">客服服务</a>
                <a href="//rescdn.lecake.com/shop/lecake/theme/xth2/images/index/business_certificate4.jpg"
                   target="_blank">食品经营许可证</a>
                <a href="//rescdn.lecake.com/postsystem/docroot/images/promotion/201805/S22C-2180516134800_0001_0101.jpg"
                   target="_blank">生产许可证</a>
                <a href="/shop/help-668.html" target="_blank">预付费卡协议</a>
                <a href="https://www.sgs.gov.cn/lz/licenseLink.do?method=licenceView&entyId=1u2xwmwzpxrk6u2rvor2928au92degmyr8rxc2ylqre60wm"
                   class="last" target="_blank"><i></i>上海工商</a>
            </p>
        </div>
        <div class="footer_address">
            <p class="clear_fix">
                诺心食品（上海）有限公司                &nbsp;&nbsp;上海徐汇区田林路140号28号楼503室&nbsp;&nbsp;客服邮箱：services@lecake.com&nbsp;&nbsp;公司电话：4001-578-578            </p>
        </div>
        <div class="footer_copy">
            <p>copyright©2010-2018 诺心lecake.com版权所有 沪ICP备10211730</p>
        </div>
    </footer>
</article>
<script>
    document.write('<div style="display:none;">');
</script>
<script>
    document.write('</div>');
</script>
<script src="static/js/sitelist.js"></script>
<script src="static/js/widget.js"></script>
<script src="static/js/base.js"></script>
<script src="static/js/nc.js"></script>
<script src="static/js/loginapp.js"></script>
<script type="text/javascript">
    var glbStatConfig={stat_host:"www.lecake.com",click_id: "L.Raw.E4nxSN"};</script>
<script type="text/javascript" src="static/js/mystat.js"></script><script>
    var _hmt = _hmt || [];
    (function () {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?0aab2028932298cda55c549351d0a22b";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
</script>
<!--HPSTAT end-->
<script src="static/js/statistics.js"></script>
<script>
    var udeskReady = false;

    function udeskLoad() {
        if (!udeskReady) {
            udeskReady = true;
            (function (a, h, c, b, f, g) {
                a["UdeskApiObject"] = f;
                a[f] = a[f] || function () {
                    (a[f].d = a[f].d || []).push(arguments)
                };
                g = h.createElement(c);
                g.async = 1;
                g.src = b;
                c = h.getElementsByTagName(c)[0];
                c.parentNode.insertBefore(g, c)
            })(window, document, "script", "//lecake.udesk.cn/im_client/js/udeskApi.js?1480995487253", "ud");
            ud({
                "code": "193g370d",
                "link": "//lecake.udesk.cn/im_client?web_plugin_id=23216",
                "isInvite": true,
                "mode": "inner",
                "pos_flag": "srb",
                "onlineText": "联系客服，在线咨询",
                "offlineText": "客服下班，请留言",
                "targetSelector": "#serviceBtn,#footerServiceBtn",
                "pop": {
                    "direction": "top",
                    "arrow": {
                        "top": 0,
                        "left": "80%"
                    }
                },
            });
        }
    }

    $(window).load(udeskLoad);
    setTimeout(udeskLoad, 5000);
</script>

</body>
</html>
