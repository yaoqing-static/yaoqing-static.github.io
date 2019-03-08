// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒i 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//判断日期是否合法
function isInvalidDate(str) {
    var reg = /^(\d+)-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2})$/;
    var r = str.match(reg);
    if(r==null){return false;}
    r[2]=r[2]-1;
    var d= new Date(r[1], r[2],r[3], r[4],r[5], 0);
    if(d.getFullYear()!=r[1]){return false;}
    if(d.getMonth()!=r[2]){return false;}
    if(d.getDate()!=r[3]){return false;}
    if(d.getHours()!=r[4]){return false;}
    if(d.getMinutes()!=r[5]){return false;}
    return true;
}


var alertId = 0;
function initAlert(type, icon_class, msg) {
    var myAlertId = alertId ++;
    var alertHtml = '<div id="my-alert-' + myAlertId + '" class="my-alert alert alert-' + type + '" role="alert">' +
        '<span class="glyphicon ' + icon_class + '"></span>&nbsp;&nbsp;' +
        '<span>' + msg + '</span>' +
        '</div>';
    if($("#my-alert-parent-div").length <= 0) {
        $("body").prepend("<div id='my-alert-parent-div'></div>");
    }
    $("#my-alert-parent-div").prepend(alertHtml);
    var $alert = $("#my-alert-" + myAlertId);
    $alert.slideDown(500, function() {
        setTimeout(function(){
            $alert.slideUp(500);
        }, 2000);
    });
}

function showSuccessAlert(msg) {
    initAlert('success', 'glyphicon-ok', msg);
}

function showErrorAlert(msg) {
    initAlert('danger', 'glyphicon-remove', msg);
}

function showWarningAlert(msg) {
    initAlert('warning', 'glyphicon-warning-sign', msg);
}

var editor = null;
function initCkeditorImgBtn() {
    $(".wc-img_item").on("click", function() {
        if($(this).hasClass("wc-img_item-selected")) {
            $(this).removeClass("wc-img_item-selected");
        } else {
            $(this).addClass("wc-img_item-selected");
        }

        $("#wc-img-selected-tips").html("当前选择了" + $(".wc-img_item-selected").length + "张图片");
        $("#btn-wc-img-modal-confirm").click(function() {
            if($(".wc-img_item-selected").length > 0) {
                var htmlToInsert = "";
                $(".wc-img_item-selected").each(function(){
                    var src = $(this).find("img").attr('src');
                    htmlToInsert += "<figure><img src='" + src + "'></figure>";
                    $(this).removeClass("wc-img_item-selected");
                });
                editor.insertHtml(htmlToInsert);
                $("#wc-img-selected-tips").html("当前选择了0张图片");
            }

            $("#wcImgModal").modal("hide");
        });
    });


    $("#wc-img-upload-btn").click(function(){$("#wc-img-upload-input").click();});
    $("#wc-img-upload-input").change(function(){
        $("#wc-img-upload-form").ajaxSubmit({
            url: "uploadImg.php",
            beforeSubmit: function() {
                console.log("upload begin");
                $("#wc-img-upload-loading").show();
                $("#wc-img-progress-bar").show();
            },
            uploadProgress: function(event, position, total, percentComplete) {
                //TODO 放到外网看看这段是否无效，无效的话再找mt看看
                updateUploadProgress(percentComplete);
            },
            success: function(mdata) {
                updateUploadProgress(100);
                console.log("upload success: " + mdata);
                /*
                 返回的数据格式：{'picId1': '.....', 'imgSrc1': 'http://....'}
                 */
                //TODO ajax重新更新当前分组的图片

                showSuccessAlert("上传成功");
            },
            error: function(resp) {
                //TODO 根据返回码提示错误 showErrorAlert(msg);
                console.log("upload failed");
                showErrorAlert("上传失败");
            },
            complete: function(xhr) {
                console.log("upload finished");
                $("#wc-img-upload-input").val("");
                $("#wc-img-upload-loading").hide();
                $("#wc-img-progress-bar").hide();
                updateUploadProgress(0);
            }
        });
    });
}

function updateUploadProgress(percent) {
    var $progress = $("#wc-img-progress-value");
    $progress.attr("aria-valuenow", percent);
    $progress.width(percent + "%");
    console.log("upload progress: " + percent);
}

function showWcImgGroup(groupId) {
    var $pageLimit = $("#wc-img-page-limit"),
        $pageId = $("#wc-img-page-index"),
        $group = $("#wc-img-group"),
        $imgUploadInput = $("#wc-img-upload-input");

    $("a[id^='wc-imglibrary-group-']").each(function(){
        if($(this).hasClass('active')) $(this).removeClass("active");
    });
    $("a[id^='wc-imglibrary-group-" + groupId + "']").addClass('active');
    $pageLimit.val("10");
    $pageId.val("1");
    $group.val(groupId);
    $imgUploadInput.val("");
    searchWcImgData();
}

function searchWcImgData(isUpdatePageIndex, newPageIndex) {
    //TODO 发送ajax请求，根据分组ID以及分页信息，请求图片，一次返回10条数据
    /*TODO
     1.返回的数据格式:
     data = {
     pageCount: 100, //分页用，该分组下的图片总数
     pageIndex: 1,   //分页用，当前的页码
     imgs: [
     {name: 'xxxx1', src: 'yyyy1'},
     {name: 'xxxx2', src: 'yyyy2'},
     {name: 'xxxx3', src: 'yyyy3'}

     ],
     groupId: 'zzzz'
     }
     2.在success函数里组装数据：
     var imgHtml = "";
     var imgs = data.imgs;
     for(var i=0; i<imgs.length; i++) {
     imgHtml += "<li class='wc-img_item'><img class='wc-pic' src='" + imgs[i].src + "' title='" + imgs[i].name + "'><label>" + imgs[i].name + "</label></li>";
     }
     $(".wc-img-panel").html(imgHtml);

     page("wc-img", data.pageCount, data.pageIndex, 10);
     $("#wc-img-group").val(data.groupId);
     if(data.pageCount <= 10) {
     $("#wc-img-page-div").hide();
     } else {
     $("#wc-img-page-idv").show();
     }
     */
}

function clickWcImgPrePage() {
    prePage("wc-img", searchWcImgData);
}

function clickWcImgNextPage() {
    nextPage("wc-img", searchWcImgData);
}

function clickWcImgSearchPage() {
    var pageId = $("#wc-img-page-search").val(),
        pageCount = $("#wc-img-page-count").val();
    if(/^[0-9]+$/.test(pageId) && pageId > 0 && pageId < pageCount) {
        searchPage("wc-img", pageId, searchWcImgData);
    } else {
        showWarningAlert("请输入正确的页码");
    }
}

function searchPage(idPrefix, num, callback) {
    var pageId = $("#" + idPrefix + "-page-index").val(),
        pageCount = $("#" + idPrefix + "-page-count").val(),
        pageLimit = $("#" + idPrefix + "-page-limit");
    if(num > 0 && num < pageCount) {
        page(idPrefix, pageCount, num, pageLimit);
        if(callback) callback();
    }
}

function prePage(idPrefix, callback) {
    var pageId = $("#" + idPrefix + "-page-index").val(),
        pageCount = $("#" + idPrefix + "-page-count").val(),
        pageLimit = $("#" + idPrefix + "-page-limit");
    if(pageId > 1 && pageId < pageCount) {
        page(idPrefix, pageCount, pageId - 1, pageLimit);
        if(callback) callback();
    }
}

function nextPage(idPrefix, callback) {
    var pageId = $("#" + idPrefix + "-page-index").val(),
        pageCount = $("#" + idPrefix + "-page-count").val(),
        pageLimit = $("#" + idPrefix + "-page-limit");
    if(pageId > 0 && pageId < pageCount) {
        page(idPrefix, pageCount, pageId + 1, pageLimit);
        if(callback) callback();
    }
}

function page(idPrefix, pageCount, pageIndex, pageLimit) {
    var pageNum = (pageCount - 1) / pageLimit;
    $("#" + idPrefix + "-label").html(pageIndex + "/" + pageNum);
    $("#" + idPrefix + "-page-index").val(pageIndex);
    $("#" + idPrefix + "-page-count").val(pageCount);
    $("#" + idPrefix + "-page-limit").val(pageLimit);

    if(pageIndex == 1) {
        $("#wc-img-pre").hidden();
    } else {
        $("#wc-img-pre").show();
    }

    if(pageIndex == pageNum) {
        $("#wc-img-next").hidden();
    } else {
        $("#wc-img-next").show();
    }
}

function cutInputLength(id, maxLen) {
    var $input = $(id),
        $label = $(id + "-limit-num"),
        val = $input.val(),
        len = val.length;

    if(len > maxLen) {
        $input.val(val.substr(0, maxLen));
        $label.stop();
        $label.animate({
                "color": "#F00"
            }, 100, function() {
                setTimeout(function() {
                    if(!$label.is(":animated")) {
                        $label.animate({
                            "color": "#BDC3C7"
                        }, 300);
                    }
                }, 700)
            }
        );
    }

    $label.text($input.val().length + "/" + maxLen);

}

function initInputLengthChangeListener() {
    $("#title").on('input', function() {
        cutInputLength("#title", 64);
    });

    $("#label").on('input', function() {
        cutInputLength("#label", 20);
    });
}


function strEllipsize(str, len) {
    return str.length > len ? str.substr(str, len) + "..." : str;
}


function initModal(title, content, okEventMethod, extBtnHtml, width) {
    $("#myModalLabel").html(title);
    if(okEventMethod == null) {
        //$("#btn-modal-confirm").attr("onclick", "hideModal();");
        $("#btn-modal-confirm").click(hideModal);
    } else {
        if(okEventMethod.constructor == Function){
            $("#btn-modal-confirm").click(okEventMethod?okEventMethod:hideModal);
        }
        else{
            if(okEventMethod.indexOf(";") == okEventMethod.length - 1) {
                okEventMethod = okEventMethod.substr(0, okEventMethod.length - 1);
            }
            $("#btn-modal-confirm").attr("onclick", okEventMethod + " ? '' : hideModal();");
        }
    }
    $("#myModal .modal-dialog").css("width", width == null ? "600px" : width);
    $("#modal-footer-confirm-div").show();
    $("#modal-footer-pager-div").hide();

    if(extBtnHtml != null && extBtnHtml != "") {
        $("#ext-btn-div").html(extBtnHtml);
        $("#ext-btn-div").show();
    } else {
        $("#ext-btn-div").hide();
    }

    if(typeof(content) == "function") {
        //为了方便异步回调显示
        //显示spin
        var spinDiv = '<div id="spin-container"><div id="spin-div"></div><span>正在加载...</span></div>';
        $("#myModalContent").html(spinDiv);
        $("#spin-div").spin({top: '35%'});
        showModal();
        content($("#myModalContent"));
    } else {
        $("#myModalContent").html(content);
        showModal();
    }
}

function showModal() {
    $("#myModal").modal({
        'backdrop': 'static',
        'show': true
    });
}

function hideModal() {
    $("#myModal").modal("hide");
}


function getNotNullString(v) {return v == null || v == undefined ? "" : v;}
function isEmptyStr(v) {return v == undefined || v == null || $.trim(v) == "";}
function isNotEmptyStr(v) {return !isEmptyStr(v);}
