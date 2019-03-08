;
(function ($, window, document, undefined) {
  var MyPlaceholder = function (ele, opt) {
    this.$element = ele;
    this.defaults = {
      'content': '',
      'callback':function(){
        alert('callback');
      }
    };
    this.options = $.extend({}, this.defaults, opt)
  };
  MyPlaceholder.prototype = {
    holding: function () {
      return this.$element.css('position', 'relative').append('<button class="btn btn-default" style="position: absolute;right:0;top: 0;"><span class="glyphicon glyphicon-search"></span></button><div style="font-size:16px;color: #999;line-height: 32px;width:100%;z-index:20;position: absolute;left:0;top: 0;text-align: center;"><span class="glyphicon glyphicon-search" style="top: 3px;margin-right: 4px;"></span>' + this.options.content + '</div><span style="display:none;color:#a6a6a6;position: absolute;left: 10px;top:6px;font-size: 20px;" class="glyphicon glyphicon-search myIcons"></span><span style="display:none;color:#a6a6a6;position: absolute;right: 50px;top:6px;font-size: 20px;" class="glyphicon glyphicon-remove myIcons"></span>').find('input').css({padding: '0px 40px'}).parent().find('button').on('click',this.options.callback).hide().parent().find('div').on('click', function () {
        var thiz = this;
        $(this).hide().parent().find('.myIcons').show().parent().find('button').show().parent().find('input').focus().on('blur', function () {
          if (this.value === '') {
            $(thiz).show().parent().find('.myIcons').hide().parent().find('button').hide();
          } else {
            $(thiz).hide().parent().find('.glyphicon-remove').off().on('click', function () {
              $(thiz).parent().find('input').val('').focus();
            });
          }
        });
      });
    }
  };
  $.fn.holding = function (options) {
    var myPlaceholder = new MyPlaceholder(this, options);
    return myPlaceholder.holding();
  }
})(jQuery, window, document);