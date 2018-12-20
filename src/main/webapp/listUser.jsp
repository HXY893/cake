<%--
  Created by IntelliJ IDEA.
  User: ruiyi
  Date: 2018/12/11
  Time: 下午8:12
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!-- 引入bootstrap样式 -->
<link href="https://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
<!-- 引入bootstrap-table样式 -->
<link href="https://cdn.bootcss.com/bootstrap-table/1.11.1/bootstrap-table.min.css" rel="stylesheet">

<!-- jquery -->
<script src="https://cdn.bootcss.com/jquery/2.2.3/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

<!-- bootstrap-table.min.js -->
<script src="https://cdn.bootcss.com/bootstrap-table/1.11.1/bootstrap-table.min.js"></script>
<!-- 引入中文语言包 -->
<script src="https://cdn.bootcss.com/bootstrap-table/1.11.1/locale/bootstrap-table-zh-CN.min.js"></script>

<html>
<head>
    <title>Title</title>
</head>
<body>
<script type="text/javascript">

    $(document).ready(function () {


        function addButton(){
            return [
                '&nbsp;&nbsp;&nbsp;&nbsp;<button id="btn_edit" type="button" class="btn btn-default">编辑</button>&nbsp;&nbsp;&nbsp;&nbsp;',
                '<button id="btn_delete" type="button" class="btn btn-default">删除</button>'
            ].join("");
        }

        window.operateEvents = {
            "click #btn_edit" : function(e,v,r,i){
                $.ajax({
                    url:"toUpdateUser"+"/"+r.id,
                    type:"get",
                    daraType:"json",
                    success:function(data){
                        $('#updatepname').val(data.username);
                        $('#updatepage').val(data.password);
                        $('#updatepid').val(data.id);

                    },
                });
                $("#updatemyModal").modal();
            },
            "click #btn_delete" : function(e,v,r,i){
                $.post(
                    'removeUser/' + r.id,
                    {'_method':'DELETE'},
                    function(){
                            //删除成功之后回到第一页（刷新回第一页）
                            $('#cusTable').bootstrapTable('refresh');
                    },
                    'json'
                );
            }


        }

        //调用函数，初始化表格
        $("#cusTable").bootstrapTable({
            method: "get",  //使用get请求到服务器获取数据
            url: "listUser", //获取数据的Servlet地址
            toolbar: '#toolbar', //工具按钮用哪个容器
            pagination: true, //启动分页
            pageSize: 10,  //每页显示的记录数
            pageNumber:1, //当前第几页
            pageList: [5, 10, 15, 20, 25],//记录数可选列表
            search: false,  //是否启用查询
            showColumns: true,  //显示下拉框勾选要显示的列
            showRefresh: true,  //显示刷新按钮
            sidePagination: "server", //表示服务端请求
            height: 500,              //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "pid",          //每一行的唯一标识，一般为主键列
            showToggle:true,          //是否显示详细视图和列表视图的切换按钮
            cardView: false,          //是否显示详细视图
            detailView: false,        //是否显示父子表
            minimumCountColumns: 2,   //最少允许的列数
            clickToSelect: true,      //是否启用点击选中行
            //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
            //设置为limit可以获取limit, offset, search, sort, order
            queryParamsType : "undefined",
            queryParams: function queryParams(params) {   //设置查询参数
                var param = {
                    pageNumber: params.pageNumber,
                    pageSize: params.pageSize,
                    orderNum : $("#txt_search_departmentname").val(),
                    page:$("#txt_search_statu").val()
                };
                return param;
            },
            columns: [{
                field: 'id',
                title: 'id'
            }, {
                field: 'username',
                title: '用户名'
            }, {
                field: 'password',
                title: '密码'
            }, {
                field:'button',
                title:'操作',
                formatter:addButton,
                events:operateEvents
            }]

        });


        //添加：
        $('#btn_add').on("click", function () {
            $('#myModal').modal();
        });


    })

    //提交添加：
    function mya(){
        //var username=$('#addpname').val();
        //var password=$('#addpage').val();
        //实例化一个对象：
        //var user={"username":username,"password":password};
        //将对象转换成字符串
        //var str=JSON.stringify(user);
        $.ajax({
            type:"POST" ,
            url:"addUser",
            data:$("#ff_p").serialize(),
            success:function(){
                    $("#cusTable").bootstrapTable("refresh");
                    $("#ff_p").form("clear");

            }
        });
    }

    //修改提交：
    function myb(){
        //var username=$('#updatepname').val();
        //var password=$('#updatepage').val();
        //var id=$('#updatepid').val();
        //实例化一个对象：
        //var user={"id":id,"username":username,"password":password};
        //将对象转换成字符串
        //var str=JSON.stringify(user);
        //alert(str);
        $.ajax({
            type:"POST" ,
            url:"updateUser",
            data:$("#updateff_p").serialize(),
            success:function(){
                    $("#cusTable").bootstrapTable("refresh");

            }
        });
    }

</script>

<div class="panel-body" style="padding-bottom:0px;">

    <div id="toolbar" class="btn-group">
        <button id="btn_add" type="button" class="btn btn-default">
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
        </button>
    </div>

    <table class="table table-hover" id="cusTable">
    </table>
</div>

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="myModalLabel">新增</h4>
            </div>
            <div class="modal-body">
                <form id="ff_p" method="post">
                    <div class="form-group">
                        <label for="addpname">用户名</label>
                        <input type="text" name="username" class="form-control" id="addpname" placeholder="用户名">
                    </div>

                    <div class="form-group">
                        <label for="addpage">密码</label>
                        <input type="text" name="password" class="form-control" id="addpage" placeholder="密码">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭</button>
                        <button type="button" id="btn_submit" class="btn btn-primary" data-dismiss="modal" onclick="mya()"><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true" ></span>保存</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="updatemyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="updatemyModalLabel">修改</h4>
            </div>
            <div class="modal-body">
                <form id="updateff_p" method="post">
                    <div class="form-group">
                        <label for="updatepname">用户名</label>
                        <input type="text" name="namepname" class="form-control" id="updatepname" placeholder="用户名">
                        <input type="hidden" id="updatepid" />
                    </div>

                    <div class="form-group">
                        <label for="updatepage">密码</label>
                        <input type="text" name="namepid" class="form-control" id="updatepage" placeholder="密码">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭</button>
                        <button type="button" id="btn_update" class="btn btn-primary" data-dismiss="modal" onclick="myb()"><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true" ></span>保存</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

</body>
</html>