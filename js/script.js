$(document).ready(function () {
  // прокрутка по якроям
  var $page = $('html, body');
  $("ul.anchor a, a.anchor").click(function () {
    var fixed_offset = 77;
    var w = $(window).width(); // Получаем ширину окна
    if (w <= 992) {
      fixed_offset = 57;
    } else {}
    $page.animate({
      scrollTop: $($.attr(this, 'href')).offset().top - fixed_offset
    }, 400);
    return false;
  });
  // запрет на вытягивание картинок
  $("img, a").on("dragstart", function (event) { event.preventDefault(); });
  // меню
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $('.bottom').addClass('fixed');
    }
    else if ($(this).scrollTop() < 50) {
      $('.bottom').removeClass('fixed');
    }
  });

  // бургер
  $('#burger a').click(function () {
    $('#leftdrop').slideDown();
    $('#leftdrop').css({ 'display': 'flex' });
    $('html').css({ 'overflow-y': 'hidden' });
  });
  $('#close, #leftdrop .anchor').click(function () {
    $('#leftdrop').slideUp();
    $('html').css({ 'overflow-y': 'auto' });
  });

  // ajax-form
  var form = $('form'),
      action = form.attr('action');

  form.on('submit', function(event) {
    var formData = {
      contacts_name: $('#contacts_name').val(),
      contacts_tel: $('#contacts_tel').val()
    }

    

    $.ajax({
      url: action,
      type: 'POST',
      data: formData,
      beforeSend: function (data) {
        form.find('button[type="submit"], input').attr('disabled', 'disabled');
      },
      error: function(request, txtstatus, errorThrown) {
        console.log(request);
        console.log(txtstatus);
        console.log(errorThrown);
      },
      success: function () {
        $('form button').html('Отправлено');
        $('form input').val('');
      }
    })
    
    event.preventDefault();
  });


  // filter_dropdown
  $('.filter_dropdown').click(function () {
    $('.filter').slideToggle(300);
  });
});

// first slider
var slider = tns({
  container: '#first_slider',
  items: 1,
  slideBy: 'page',
  autoplay: true,
  speed: 600,
  mode: 'gallery',
  controls: false,
  lazyload: true,
  autoplayButtonOutput: false,
  navContainer: '#dots'
});
// reviews slider
var slider = tns({
  container: '#reviews_slider',
  items: 1,
  slideBy: 'page',
  prevButton: '.prev_btn',
  controlsContainer: '.controls_container',
  nav: false
});

