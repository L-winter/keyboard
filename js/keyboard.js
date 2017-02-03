$(function() {
  $.fn.Softkeyboard = function(binding) {
    var facedata = [];
    for (var i = 0; i < binding.facelength; i++) {
      facedata[i] = "[em_" + (i + 1) + "]";
    }

    $("#keyboard").css({
      "background-color": binding.background,
      "border-color": binding.background
    });
    $("#keyboard .keyboard-line span").css({
      "background-color": binding.buttoncolor,
      "color": binding.fontcolor
    });
    $("#keyboard .keyboard-line span").hover(function() {
        $(this).css({
          "background-color": binding.buttonhovercolor,
          "color": binding.fonthovercolor
        });
      }, function() {
        $(this).css({
          "background-color": binding.buttoncolor,
          "color": binding.fontcolor
        });
      })
      //改变样式

    if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i) && binding.mobileup === true) {
      var strin = "<meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'>";
      $("head").append(strin);
      var wid = window.innerWidth;
      $("#keyboard").css("width", wid);
    } //适配移动端

    /*    $(binding.switch).click(function() {
          $("#keyboard").fadeToggle();
        }); //软键盘开关*/
    if (typeof(binding.switch) == 'undefined') {
      $(binding.Inputbox).focus(function() {
        $("#keyboard").fadeIn()
      })
    } else {
      $(binding.switch).click(function() {
        $("#keyboard").fadeToggle();
      }); //软键盘开关
    }

    if (binding.keyboardoff_on === true) {
      $(binding.Inputbox).attr("readonly", "readonly");
    };

    $(".keyboard-on").bind("click", function() {
        var thisinputvalue = $(binding.Inputbox).val(); //当前值
        window.keyboard_record = replace_em(thisinputvalue);
        $("#keyboard_show").append("<div class='keyboard'>" + keyboard_record + "</div>");

        function replace_em(str) {
          str = str.replace(/\[em_([0-9]*)\]/g, "<img src='" + binding.facesrc + "/$1.gif' />");
          return str;
        }
        if (binding.empty === true) {
          $(binding.Inputbox).val("");
        }
      }) //发送

    if (binding.faceup === true) {
      for (var i = 1; i <= facedata.length; i++) {
        var str = " <div class='keyboard-butn10'><img src='" + binding.facesrc + "/" + i + ".gif'></div>";
        $("#keyboard .keyboard-face").append(str);
      }
      $(".keyboard-face div").click(function() {
        var thisinputvalue = $(binding.Inputbox).val(); //当前值
        //var keyboardtarget=document.getElementById("keyboard-target");
        var keyboardtarget = $(binding.Inputbox).get(0);
        var thisselectionstar = keyboardtarget.selectionStart; //光标位置
        var thisvalue = facedata[$(this).index()]; //点击的face
        var thislengt = thisinputvalue.length; //字符串长度
        var wzstring = thisinputvalue.substr(0, thisselectionstar) + thisvalue + thisinputvalue.substr(thisselectionstar, thislengt);
        $(binding.Inputbox).val(wzstring);
      })

      $("#keyboard #keyboard-face-on").on("click", function() {
        $(".keyboard-face").slideToggle();
        $(".keyboard-letter").css("display", "none");
        $(".keyboard-symbol").css("display", "none");
      })
    } else {
      $("#keyboard-face-on").parent().css("display", "none");
      $("#keyboard .keyboard-line .keyboard-blank").parent().removeClass("keyboard-butn50");
      $("#keyboard .keyboard-line .keyboard-blank").parent().addClass("keyboard-butn60");
    } //表情开关

    $("#keyboard-symbol-on").bind("click", function() {
        $(".keyboard-symbol").slideToggle();
        $(".keyboard-letter").css("display", "none");
        $(".keyboard-face").css("display", "none");
      }) //符号开关

    $("#keyboard #keyboard-abc").bind("click", function() {
      $(".keyboard-letter").slideToggle();
      $(".keyboard-symbol").css("display", "none");
      $(".keyboard-face").css("display", "none");
    });

    i = 0; //定义大小写
    $("#keyboard .keyboard-line .keyboard-value").bind("click", function() {
        var thisinputvalue = $(binding.Inputbox).val(); //当前值
        var keyboardtarget = $(binding.Inputbox).get(0);
        var thisselectionstar = keyboardtarget.selectionStart; //光标位置
        var thisvalue = $(this).text(); //点击值
        var thislengt = thisinputvalue.length; //字符串长度
        var wzstring = thisinputvalue.substr(0, thisselectionstar) + thisvalue + thisinputvalue.substr(thisselectionstar, thislengt);
        $(binding.Inputbox).val(wzstring);
      }) //字符串值

    $("#keyboard .keyboard-line .keyboard-show").click(function() {
        $("#keyboard-number").slideToggle("slow");
      }) //数字键盘

    $("#keyboard .keyboard-line .keyboard-delen").bind("click", function() {
        var thisinputvalue = $(binding.Inputbox).val(); //当前值
        var keyboardtarget = $(binding.Inputbox).get(0);
        var thisselectionstar = keyboardtarget.selectionStart; //光标位置
        var thislengt = thisinputvalue.length; //字符串长度
        var wzstring = thisinputvalue.substr(0, thisselectionstar - 1) + thisinputvalue.substr(thisselectionstar, thislengt);
        $(binding.Inputbox).val(wzstring);
      }) //删除

    $("#keyboard .keyboard-line .keyboard-blank").bind("click", function() {
        var thisinputvalue = $(binding.Inputbox).val(); //当前值
        var keyboardtarget = $(binding.Inputbox).get(0);
        var thisselectionstar = keyboardtarget.selectionStart; //光标位置
        var thislengt = thisinputvalue.length; //字符串长度
        var blank = " ";
        var wzstring = thisinputvalue.substr(0, thisselectionstar) + blank + thisinputvalue.substr(thisselectionstar, thislengt);
        $(binding.Inputbox).val(wzstring);
      }) //空格

    $("#keyboard .keyboard-line .keyboard-capital").bind("click", function() {
        if (i === 0) {
          $("#keyboard .keyboard-value").each(function() {
            $(this).text($(this).text().toLocaleLowerCase());
          });
          i = 1;
        } else if (i === 1) {
          $("#keyboard .keyboard-value").each(function() {
            $(this).text($(this).text().toLocaleUpperCase());
          })
          i = 0;
        };
      }) //大小写
  }
})
