$(document).ready(function () {
  // прокрутка по якроям
  var $page = $('html, body');
  $("ul.anchor a, a.anchor").click(function () {
    var fixed_offset = 77;
    var w = $(window).width(); // Получаем ширину окна
    if (w <= 992) {
      fixed_offset = 57;
    } else { }
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

  // подсказки для формы
  $('.input').each(function () {
    $(this).attr('data-tooltip', 'false');
  });

  function tooltipError(indexError, input) {
    if (indexError) {
      let wrap = input.parent();
      wrap.attr('data-tooltip', 'true');
    } else if (input != false) {
      let wrap = input.parent();
      wrap.attr('data-tooltip', 'false');
    } else {
      return false;
    }
  }

  // форма обратного звонка
  const input_arr = ['contacts_name', 'contacts_tel', 'delivery_name', 'delivery_tel', 'order_name', 'order_tel', 'order_email'];
  $('.delivery form, .contacts form').on('submit', function (e) {
    let data = $(this).serialize(),
      form = $(this),
      action = $(this).attr('action'),
      error = false; // индекс ошибки

    form.find(":input").each(function () {// проверяем каждое поле в форме
      for (var i = 0; i < input_arr.length; i++) { // если поле присутствует в списке обязательных
        if ($(this).attr("name") == input_arr[i]) { //проверяем поле формы на пустоту

          if (!$(this).val()) { // если поле пустое
            error = true; // определяем индекс ошибки
            tooltipError(error, $(this));
          }
          $(this).on("focus", function () {
            error = false;
            tooltipError(error, $(this));
          });
        }

      }
    });

    if (!error) {
      tooltipError(error, false);

      $.ajax({
        url: action,
        type: 'POST',
        data: data,
        beforeSend: function (data) {
          form.find('button[type="submit"], input').attr('disabled', true);
        },
        error: function (request, txtstatus, errorThrown) {
          console.log(request);
          console.log(txtstatus);
          console.log(errorThrown);
        },
        success: function () {
          form.find('button').html('Отправлено');
          form.find('input').val('');
        }
      });
    }

    e.preventDefault();
  });


  // форма заказа товара
  $('.popup form').on('submit', function (e) {
    let title_val = $('h1').text().trim(),
      data = $(this).serialize() + '&order_title=' + title_val, //плюсую к данным формы название товара
      form = $(this),
      action = $(this).attr('action'),
      error = false;

    form.find(":input").each(function () {
      for (var i = 0; i < input_arr.length; i++) { 
        if ($(this).attr("name") == input_arr[i]) { 

          if (!$(this).val()) { 
            error = true;
            tooltipError(error, $(this));
          }
          $(this).on("focus", function () {
            error = false;
            tooltipError(error, $(this));
          });
        }

      }
    });

    if (!error) {
      tooltipError(error, false);

      $.ajax({
        url: action,
        type: 'POST',
        data: data,
        beforeSend: function (data) {
          form.find('button[type="submit"], input').attr('disabled', true);
        },
        error: function (request, txtstatus, errorThrown) {
          console.log(request);
          console.log(txtstatus);
          console.log(errorThrown);
        },
        success: function () {
          form.find('button').html('Отправлено');
          form.find('input').val('');
        }
      });
    }

    e.preventDefault();
  });

  // modal
  $('.popup-open').click(function () {
    $('.popup-fade').fadeIn(100);
    return false;
  });

  $('.popup-close').click(function () {
    $(this).parents('.popup-fade').fadeOut(100);
    return false;
  });

  $(document).keydown(function (e) {
    if (e.keyCode === 27) {
      e.stopPropagation();
      $('.popup-fade').fadeOut(100);
    }
  });

  $('.popup-fade').click(function (e) {
    if ($(e.target).closest('.popup').length == 0) {
      $(this).fadeOut(100);
    }
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

