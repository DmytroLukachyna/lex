$(document).ready(function () {
  jQuery.validator.addMethod('validateError', function (value, element) {
    if ($('.request__form-photo').hasClass('request__form-photo_loaded')) {
      return true;
    } else {
      return false;
    }
  });
  $('.modal__form-main').validate({
    rules: {
      username: {
        required: true,
        minlength: 2,
      },
      usernumber: {
        required: true,
        minlength: 19,
        maxlength: 19,
      },
    },
  });
  $('.modal__form-default').validate({
    rules: {
      username: {
        required: true,
        minlength: 2,
      },
      usernumber: {
        required: true,
        minlength: 19,
        maxlength: 19,
      },
    },
  });
  $('#request__form').validate({
    rules: {
      requestname: {
        required: true,
        minlength: 2,
      },
      requestnumber: {
        required: true,
        minlength: 19,
        maxlength: 19,
      },
      requestemail: {
        required: true,
        email: true,
      },
      requestvin: {
        required: true,
        minlength: 17,
        maxlength: 17,
      },
      requestplate: {
        required: true,
        minlength: 6,
      },
      requesttrustedname: {
        required: true,
        minlength: 2,
      },
      requesttrustednumber: {
        required: true,
        minlength: 19,
        maxlength: 19,
      },
      requestcodeword: {
        required: true,
        minlength: 1,
      },
      requestservices: {
        required: true,
      },
      'userfile[]': {
        required: true,
        validateError: true,
      },
      requestcheckbox: {
        required: true,
      },
    },
  });
  $('.slider__item-phones').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    dots: false,
    accessibility: false,
    focusOnSelect: false,
    swipe: true,
    asNavFor: '.slider__item-text-wrapper',
  });
  $('.slider__item-text-wrapper').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    dots: true,
    prevArrow: $('.slider__arrow-left'),
    nextArrow: $('.slider__arrow-right'),
    accessibility: false,
    focusOnSelect: false,
    appendDots: '.slider__content-dots',
    dotsClass: 'dot',
    asNavFor: '.slider__item-phones',
  });
  var total = $('.dot li');
  $('.slider__counter').text(`01/0${total.length}`);
  var $status = $('.slider__counter');
  var $slickElement = $('.slider__item-text-wrapper');
  $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    if (!slick.$dots) {
      return;
    }
    var i = (currentSlide ? currentSlide : 0) + 1;
    $status.text('0' + i + '/0' + slick.$dots[0].children.length);
  });
  var scrollBar = $('.request__agreement');
  $('.request__agreement').niceScroll({
    cursorcolor: '#f4c07c',
    cursorwidth: '4px',
    cursorborder: 'none',
    zindex: '99999',
    autohidemode: false,
    background: 'rgba(49, 49, 49, .5)',
  });
  $('.mainscreen__header-btn').click(function () {
    $('.site-wrapper').fadeOut();
    $('.request').fadeIn();
    scrollBarResize(450);
  });
  $('.request__return').click(function () {
    $('.request').fadeOut();
    $('.site-wrapper').fadeIn();
    scrollBarResize(450);
  });

  function scrollBarResize(time) {
    setTimeout(() => {
      scrollBar.getNiceScroll().resize();
    }, time);
  }
  $('.btn').each(function (i) {
    $(this).on('click', function () {
      $('.modal__btn .btn__inner').text($('.btn__inner').eq(i).text());
    });
  });
  ukrNumber('.input__number');
  ukrNumber('.request__number');
  ukrNumber('.request__trustednumber');

  function ukrNumber(el) {
    $(el).mask('+99 (999) 999-99-99', {
      translation: {
        9: { pattern: /[0-9]/ },
      },
    });
    $(el).focusin(function () {
      if ($(this).val().length === 0) {
        $(this).val('+38 (0');
      }
    });
    $(el).focusout(function () {
      if ($(this).val().length < 7) {
        $(this).val('');
      }
    });
  }
  $('.modal__btn_main').click(function () {
    $('.modal__fakebtn_main').trigger('click');
  });
  $('.modal__btn_default').click(function () {
    $('.modal__fakebtn_default').trigger('click');
  });
  $('.request__btn').click(function () {
    $('.request__fakebtn').trigger('click');
  });
  $('.modal__form-main').submit(function (e) {
    if ($('.modal__form-main').valid()) {
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: 'mailer/modal_form/form.php',
        data: $(this).serialize(),
      }).done(function () {
        $(this).find('input').val('');
        $('.modal__form-main').trigger('reset');
        $('.thanks').fadeIn('fast');
        parent.$.fancybox.close();
        setTimeout(function () {
          $('.thanks').fadeOut('slow');
        }, 2500);
      });
      return false;
    }
  });
  $('.modal__form-default').submit(function (e) {
    if ($('.modal__form-default').valid()) {
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: 'mailer/modal_form/form.php',
        data: $(this).serialize(),
      }).done(function () {
        $(this).find('input').val('');
        $('.modal__form-default').trigger('reset');
        $('.thanks').fadeIn('fast');
        parent.$.fancybox.close();
        setTimeout(function () {
          $('.thanks').fadeOut('slow');
        }, 2500);
      });
      return false;
    }
  });
  $('#request__form').submit(function (e) {
    if ($('#request__form').valid()) {
      e.preventDefault();
      var formData = new FormData(this);
      $.ajax({
        url: 'mailer/request_form/form.php',
        type: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        success: function (msg) {
          if (msg == 'ok') {
            $('.request__form-photo').removeClass('request__form-photo_loaded');
          } else {
            $('.request__form-photo').removeClass('request__form-photo_loaded');
          }
        },
      }).done(function () {
        $(this).find('input').val('');
        $('#request__form').trigger('reset');
        $('.request__form-photo').text('Прикріпіть фото');
        $('.request__thanks').fadeIn('fast');
        setTimeout(function () {
          $('.thanks').fadeOut('slow');
          $('.request').fadeOut();
          $('.site-wrapper').fadeIn();
        }, 2500);
      });
    }
  });
  vehiclePhotoAddition();

  function vehiclePhotoAddition() {
    $('#userfile').on('change', function () {
      if ($('#userfile').get(0).files.length === 0) {
        $('.request__form-photo').removeClass('request__form-photo_loaded');
        $('.request__form-photo').text('Прикріпіть фото');
      } else if ($('#userfile').get(0).files.length === 5) {
        $('.request__form-photo').addClass('request__form-photo_loaded');
        $('.request__form-photo').text('Додано файлів: ' + $('#userfile').get(0).files.length);
        $(this).valid();
      } else if ($('#userfile').get(0).files.length > 5) {
        $('.request__form-photo').removeClass('request__form-photo_loaded');
        $('.request__form-photo').text('Завантажте не більше 5 файлів');
      } else {
        $('.request__form-photo').removeClass('request__form-photo_loaded');
        $('.request__form-photo').text(
          'Додано файлів: ' + $('#userfile').get(0).files.length + ' із 5',
        );
      }
    });
  }
  var modalOnTimer = setTimeout(function () {
    $.fancybox.open({
      src: '#modal_default',
    });
  }, 40000);
  $('[data-src], .mainscreen__header-btn').on('click', function () {
    clearTimeout(modalOnTimer);
  });

  let dateObject = new Date(),
    currentDate = dateObject.getDate(),
    months = [
      'січня',
      'лютого',
      'березня',
      'квітня',
      'травня',
      'червня',
      'липня',
      'серпня',
      'вересня',
      'жовтня',
      'листопада',
      'грудня',
    ],
    currentMonth = months[dateObject.getMonth()],
    currentYear = dateObject.getFullYear();

  if (currentDate < 10) {
    document.querySelector('#currentDate').textContent = `0${currentDate}`;
  } else {
    document.querySelector('#currentDate').textContent = currentDate;
  }
  document.querySelector('#currentMonth').textContent = currentMonth;
  document.querySelector('#currentYear').textContent = currentYear;
});
