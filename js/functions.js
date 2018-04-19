// init
$(document).ready(function(){
  $("#result").click(function(event) {
    $(this).fadeOut('200');
  });
});


// funtion
function create_img() {
  $(".CodeFlask__pre").css('cssText', 'background-color: #FFF !important');
  $(".CodeFlask__pre").find('.line-numbers-rows>span').each(function(index, el) {
    $(el).addClass('result');
    $(el).html(index+1);
  });
  html2canvas($(".CodeFlask__pre"),{
    onrendered: function(canvas) {
      var a = document.createElement('a');
      a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      a.download = 'code.png';
      a.click();
    }
  });
  setTimeout(function() {
    $(".CodeFlask__pre").css('cssText', 'background-color: transparent');
    $(".CodeFlask__pre").find('.line-numbers-rows>span').each(function(index, el) {
      $(el).html('');
      $(el).removeClass('result');
    });
  }, 100);
}

function show_img(){
  var img = document.createElement('img');
  $("#result").find("img").remove();
  $(".CodeFlask__pre").css('cssText', 'background-color: #FFF !important');
  $(".CodeFlask__pre").find('.line-numbers-rows>span').each(function(index, el) {
    $(el).addClass('result');
    $(el).html(index+1);
  });
  html2canvas($(".CodeFlask__pre"),{
    onrendered: function(canvas) {
      img.src=canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      $("#result").append(img);
      var r = document.createRange();
    }
  });
  $("#result").fadeIn('200');
  setTimeout(function() {
    $(".CodeFlask__pre").css('cssText', 'background-color: transparent');
    $(".CodeFlask__pre").find('.line-numbers-rows>span').each(function(index, el) {
      $(el).html('');
      $(el).removeClass('result');
    });
  }, 100);
}
