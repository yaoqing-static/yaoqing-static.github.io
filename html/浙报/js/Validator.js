/*strategies*/
var strategies = {
  isNotEmpty: function (value, errorMsg) {
    if (value === '') {
      return errorMsg;
    } 
  },
  isLegalCost: function (value, errorMsg) {
    if (parseFloat(value) < 0.1 || parseFloat(value) >= 10) {
      return errorMsg;
    }
  },
  isLegalRepertory: function (value, errorMsg) {
    if (parseFloat(value) < 0 || parseFloat(value) >= 10000) {
      return errorMsg;
    }
  },
  isInt: function (value, errorMsg) {
    if (!/^[1-9]\d*|0$/.test(value)) {
      return errorMsg;
    }
  },
  isNumber: function (value, errorMsg) {
    if (!/^\d+(\.\d+)?$/.test(value)) {
      return errorMsg;
    }
  },
  minLength: function (value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg;
    }
  },
  maxLength: function (value, length, errorMsg) {
    if (value.length > length) {
      return errorMsg;
    }
  },
  maxTxtLength: function (value, length, errorMsg) {
    if (value.length > length) {
      return errorMsg;
    }
  },
  isMail: function (value, errorMsg) {
    if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value)) {
      return errorMsg;
    }
  },
  isCode: function (value, errorMsg) {
    if (value != window.codeValue) {
      return errorMsg;
    }
  },
  isCodeCanUse: function (value, errorMsg) {
    if (!window.codeCanUse) {
      return errorMsg;
    }
  },
  isPhone: function (value, errorMsg) {
    if (!/^[1]([3][0-9]{1}|59|58|88|89)[0-9]{8}$/.test(value)) {
      return errorMsg;
    }
  },
  isOldPassword: function (value, errorMsg) {
    if (value != window.oldPassword) {
      return errorMsg;
    }
  },
  isSecPassword: function (value, sec, errorMsg) {
    if (value != sec) {
      return errorMsg;
    }
  },
  isMailPhone:function(value,errorMsg){
      if(!(/^[1]([3][0-9]{1}|59|58|88|89)[0-9]{8}$/.test(value) || /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value)))
      return errorMsg;
  }
};

/*Validator*/
var Validator = function () {
  this.cache = [];
};
Validator.prototype.add = function (dom, rules) {
  var thiz = this;
  for (var i = 0, rule; rule = rules[i++];) {
    (function (rule) {
      var strategyAry = rule.strategy.split(':');
      var errorMsg = rule.errorMsg;
      thiz.cache.push(function () {
        var strategy = strategyAry.shift();
        strategyAry.unshift(dom.value);
        strategyAry.push(errorMsg);
        return strategies[strategy].apply(dom, strategyAry);
      });
    })(rule);
  }
};
Validator.prototype.start = function () {
  for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
    var errorMsg = validatorFunc();
    if (errorMsg) {
      return errorMsg;
    }
  }
};
