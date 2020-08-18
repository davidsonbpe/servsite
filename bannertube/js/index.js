

$(function(){
  var url_base = 'https://img.youtube.com/vi/';
  var url_max = '/maxresdefault.jpg';
  var url_0 = '/mqdefault.jpg';
  var url_00 = '/hqdefault.jpg';
  var url_1 = '/1.jpg';
  var url_2 = '/2.jpg';
  var url_3 = '/3.jpg';
  var url_4 = '/4.jpg';
  var embed = '//www.youtube.com/embed/';
  
  $('.buttonn').on('click', function(e){
    
    e.preventDefault();
    
    var id = $('input').val();
    
    var imgMax = $('.max');
    var img0 = $('.zero');
    var img00 = $('.tzero');
    var img1 = $('.one');
    var img2 = $('.two');
    var img3 = $('.three');
    
    var picMaxurl = url_base + id + url_max;
    var pic0url = url_base + id + url_0;
    var pic00url = url_base + id + url_00;
    var pic1url = url_base + id + url_1;
    var pic2url = url_base + id + url_2;
    var pic3url = url_base + id + url_3;
    
    $('span').remove();
      
    imgMax.attr('href', picMaxurl);
    
    img0.attr('href', pic0url);
    img00.attr('href', pic00url);
    img1.attr('href', pic1url);
    img2.attr('href', pic2url);
    img3.attr('href', pic3url);
    
    imgMax.attr('src', picMaxurl);
    img0.attr('src', pic0url);
    img00.attr('src', pic00url);
    img1.attr('src', pic1url);
    img2.attr('src', pic2url);
    img3.attr('src', pic3url);
    
    /*imgMax.after('<span>' + imgMax[0].naturalWidth + ' × ' + imgMax[0].naturalHeight + '</span>');
    img0.after('<span>' + img0[0].naturalWidth + ' × ' + img0[0].naturalHeight + '</span>');
    img1.after('<span>' + img1[0].naturalWidth + ' × ' + img1[0].naturalHeight + '</span>');
    img2.after('<span>' + img2[0].naturalWidth + ' × ' + img2[0].naturalHeight + '</span>');
    img3.after('<span>' + img3[0].naturalWidth + ' × ' + img3[0].naturalHeight + '</span>');*/
    
  });
});
