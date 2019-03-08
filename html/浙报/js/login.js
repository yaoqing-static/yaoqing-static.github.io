jQuery(function ($) {
  //fix IE8 placeholder
  $('input, textarea').placeholder();

  var domMyMail = document.getElementById('myMail');
  var validataFunc = function () {
    var validator = new Validator();
    validator.add(domMyMail, [{
      strategy: 'isNotEmpty',
      errorMsg: '邮箱名不能为空'
    }, {
      strategy: 'isMail',
      errorMsg: '邮箱名格式不正确'
    }]);
    var errorMsg = validator.start();
    return errorMsg;
  };

  var domSendMail = document.getElementById('sendMail');
  domSendMail.onclick = function () {
    var errorMsg = validataFunc();
    if (errorMsg) {
      $('.error').show().html(errorMsg);
      return false;
    } else {
      $('.error').hide();
    }
  }
});