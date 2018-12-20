var loginApp = new Vue({
    el: '#loginApp',
    data: {
        currentForm: 'login',

        isUnbinding: false,         //是否正在解绑
        showConfirm: true,         //是否显示confirm
        login: {
            loginType: 'username',      //登录方式 username 账号登录   mobile 手机登录

            username: '',               //账号,
            password: '',               //密码
            usernameError: '',
            passwordError: '',

            isFetching: false           //是否正在登录
        },
        register: {

            isCheckedRule: true,            //是否同意用户协议

            isFetching: false           //是否正在登录
        },
        bind: {
            loginType: 'username',       //登录方式 username 账号登录   mobile 手机登录

            isFetching: false           //是否正在登录
        }
    },
    created: function () {

    },
    mounted: function () {
        var self = this;

        //回车提交
        document.onkeydown = function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode === 13) {
                self.submitLogin();
            }
        };
    },
    methods: {
        //提交登录 登录、注册、绑定手机都调用此方法
        submitLogin: function () {
            var self = this,
                currentApp = self.currentApp,
                data = {},
                isLoginByMobile = currentApp.loginType !== 'username',
                isAliVerify = currentApp.isAliVerify && !self.isShowBind && self.currentForm === 'register',

                mobile = currentApp.mobile,
                code = currentApp.code,

                username = currentApp.username,
                password = currentApp.password

            if(!isLoginByMobile){
                if (!username) {
                    currentApp.usernameError = '用户名不能为空';
                    return;
                }
                if (!password) {
                    currentApp.passwordError = '密码不能为空';
                    return;
                }
                data = {
                    userName: username,
                    passWord: password
                };
            }

            self.isFetching = true;

            $.ajax({
                method: 'post',
                url: 'user',
                data: data
            }).done(function (res) {
                if (true) {
                    self.loginSuccess(data);

                } else {
                    $.alert(res.msg);
                }
            });
        },

        //登录成功回调
        loginSuccess: function (res) {
            this.showConfirm = false;
            alert('1');
        },
        //微信登录
        loginByWx: function (href) {
            var width = 560,
                height = 540,
                left = ($(window).width() - width) / 2,
                top = ($(window).height() - height) / 2;
            window.open(href, '_blank', 'toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=' + width + ', height=' + height + ',left=' + left + ',top=' + top);
        },
    },
    computed: {
        currentApp: function () {
            var key = this.currentForm;
            if (this.isShowBind) {
                key = 'bind';
            }
            return this[key];
        }
    },
    watch: {
        currentForm: function (val) {
            var self = this;
            if (val === 'register' && this.register.isAliVerify) {
                this.$nextTick(function () {
                    self.createAliVerify();
                });
            } else {
                self.getCaptcha();
            }
        },
        'login.loginType': function () {
            this.getCaptcha();
        },
        isShowBind: function (val) {
            if (!val) {
                this.getCaptcha();
            }
        }
    }
});
