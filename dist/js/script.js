'use strict'

// в мозиле прыгает текст навигации в блоке порфтолио при hover

$(document).ready(function () {
    function sliderChangeActiveNum(nextSlide) {
        return (nextSlide + 1 > 9) ? (`${nextSlide + 1}`) : (`0${nextSlide + 1}`);
    }

    function formValidation(name, phone, agreement, funcAjax) {
        let hasError = false;

        if (!agreement.prop('checked')) {
            agreement.prev().addClass('error').next().addClass('error').next().addClass('error');
            agreement.on('input', () => {
                if (agreement.prop('checked')) {
                    agreement.prev().removeClass('error').next().removeClass('error').next().removeClass('error');
                }
            })
            hasError = true;
        }

        if (phone.val().length !== 17) {
            phone.addClass('error').focus().next().addClass('error');
            phone.on('input', () => {
                if (phone.val().length === 17) {
                    phone.removeClass('error').next().removeClass('error');
                }
            })
            hasError = true;
        }

        if (name.val().trim() === '') {
            name.addClass('error').focus().next().addClass('error');
            name.on('input', () => {
                if (name.val().trim() !== '') {
                    name.removeClass('error').next().removeClass('error');
                }
            })
            hasError = true;
        }

        if (!hasError) {
            funcAjax(name.val(), phone.val());
        }
    }

    function popupWithoutErrors (nameVal, phoneVal) {
        $.ajax({
            method: "POST",
            url: "https://testologia.ru/checkout",
            data: {name: nameVal, phone: phoneVal}
        })
            .done(function (msg) {
                if (msg.success) {
                    $('#popup-form').css('display', 'none')[0].reset();
                    $('#pop-up__thanks').css('display', 'flex').hide().fadeIn();
                } else {
                    alert('Ой-ёй, что-то пошло не так :( Попробуйте еще разок')
                    $('#popup-form')[0].reset().css('display', 'none');
                }
            })
    }

    function registrationWithoutErrors (nameVal, phoneVal) {
        $.ajax({
            method: "POST",
            url: "https://testologia.ru/checkout",
            data: {name: nameVal, phone: phoneVal}
        })
            .done(function (msg) {
                if (msg.success) {
                    $('#registration-form').css('display', 'none')[0].reset();
                    $('#registration__thanks').css('display', 'flex').hide().fadeIn();
                } else {
                    alert('Ой-ёй, что-то пошло не так :( Попробуйте еще разок')
                    $('#registration-form')[0].reset();
                }
            })
    }

    let wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animate__animated',
        offset: 200,
    })
    wow.init();

    const btnToTop = $('#btn-to-top');
    window.addEventListener('scroll', e => {
        scrollY >= 300 ? btnToTop.fadeIn() : btnToTop.fadeOut();
    });

    $('.order-call').click(function () {
        $('#pop-up').addClass('pop-up_opened');

    });
    $('#pop-up__close_btn').click(function () {
        $('#pop-up').removeClass('pop-up_opened');
        setTimeout(() => {
            $('#pop-up__thanks').css('display', 'none');
            $('#popup-form').css('display', 'flex');
        }, 500);
    })

    IMask($('#form__registration-phone')[0], {
        mask: '{+7} (000) 000-0000',
    });

    IMask($('#form__popup-phone')[0], {
        mask: '{+7} (000) 000-0000',
    });

    let portfolioSliderNav = $('.portfolio__slider-nav');
    portfolioSliderNav.slick({
        autoplay: false,
        allowTouchMove: false,
        swipe: false,
        infinite: false,
        arrows: false,
        variableWidth: true,
        slidesToShow: 6,
        focusOnSelect: true,
        asNavFor: '.portfolio__slider'
    });
    portfolioSliderNav.children().children().addClass('slick-at-one-place');

    let portfolioSlider = $('.portfolio__slider');
    portfolioSlider.slick({
        infinite: false,
        centerMode: true,
        variableWidth: true,
        arrows: false,
        centerPadding: '20%',
        allowTouchMove: false,
        swipe: false,
        asNavFor: '.portfolio__slider-nav'
    });

    let reviewsNum = $('.reviews__card').length;
    let reviewsNumSum = $('#reviews__num_sum');
    let reviewsNumCenter = $('#reviews__num_center');
    //для вариации кол-ва отзывов
    (reviewsNum > 9) ? reviewsNumSum.text(`/ ${reviewsNum}`).prepend('&nbsp;') : reviewsNumSum.text(`/ 0${reviewsNum}`).prepend('&nbsp;');

    let reviewSlider = $('.reviews__cards');
    reviewSlider.slick({
        infinite: false,
        lazyLoad: 'ondemand',
        initialSlide: 1,
        centerMode: true,
        variableWidth: true,
        centerPadding: 0,
        responsive: [
            {
                // изменения при 1140р
                breakpoint: 1142,
                settings: {
                    initialSlide: 0,
                }
            },
        ],
        appendArrows: $('#reviews__num'),
        prevArrow: $('#reviews__arrow_prev'),
        nextArrow: $('#reviews__arrow_next'),
    })
        .on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            reviewsNumCenter.text(sliderChangeActiveNum(nextSlide));
        });

    $('#form__registration-submit-btn').on('click', function () {
        let name = $('#form__registration-name');
        let phone = $('#form__registration-phone');
        let agreement = $('#form__registration-agreement');
        formValidation(name, phone, agreement, registrationWithoutErrors);
    });

    $('#form__popup-submit-btn').on('click', function () {
        let name = $('#form__popup-name');
        let phone = $('#form__popup-phone');
        let agreement = $('#form__popup-agreement');
        formValidation(name, phone, agreement, popupWithoutErrors);
    });




    if (window.matchMedia('(max-device-width: 1140px)').matches) {
        reviewsNumCenter.text('01');

    }

    if (window.matchMedia('(max-device-width: 1022px)').matches) {
        $('.footer__tel')
            .prepend('<img src=\"../../images/footer/phone-call.png\" alt=\"Иконка телефона\">');
        $('#footer__icon_tel').remove();

        let advantagesNumCenter = $('#advantages__num_center');

        $('.advantages__inner').slick({
            infinite: false,
            lazyLoad: 'ondemand',
            variableWidth: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            appendArrows: $('#advantages__num'),
            prevArrow: '<button type="button" id="advantages__arrow_prev" class="slider__arrows">\n' +
                '                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">\n' +
                '                    <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>\n' +
                '                </svg>\n' +
                '            </button>',
            nextArrow: '<button type="button" id="advantages__arrow_next" class="slider__arrows">\n' +
                '                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">\n' +
                '                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>\n' +
                '                </svg>\n' +
                '            </button>',
        })
            .on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                advantagesNumCenter.text(sliderChangeActiveNum(nextSlide));
            })
    }

    if (window.matchMedia('(max-device-width: 767.5px)').matches) {
        $('#burger-menu').on('click', function () {
            $('#burger-menu__bar').fadeIn();
            $('#burger-menu__background').fadeIn();
        });
        $('.burger-menu__close').on('click', function () {
            $('#burger-menu__bar').fadeOut();
            $('#burger-menu__background').fadeOut();
        });
        $('#phone-icon').css('cursor', 'cursor-pointer').on('click', function () {
            $('#pop-up').addClass('pop-up_opened');
        });

        reviewsNumCenter.text('01');

        let portfolioNumCenter = $('#portfolio__num_center');

        portfolioSlider.slick('unslick');
        portfolioSlider = $('.portfolio__inner');

        portfolioSlider.eq(0).slick({
            infinite: false,
            lazyLoad: 'ondemand',
            slidesToScroll: 1,
            slidesToShow: 1,
            centerMode: true,
            variableWidth: true,
            prevArrow: '#portfolio__arrow_prev',
            nextArrow: '#portfolio__arrow_next',
        })
            .on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                portfolioNumCenter.text(sliderChangeActiveNum(nextSlide));
            })
            .css('display', 'flex');

        portfolioSliderNav.children().children().removeClass('slick-at-one-place');
        portfolioSliderNav.slick('slickSetOption', {
            slidesToShow: 1,
            allowTouchMove: true,
            swipe: true,
        }, true)
            .on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                portfolioSlider.eq(currentSlide).slick('unslick').css('display', 'none');
                $('#portfolio__num_center').text('01');

                portfolioSlider.eq(nextSlide).slick({
                    infinite: false,
                    lazyLoad: 'ondemand',
                    slidesToScroll: 1,
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '60px',
                    variableWidth: true,
                    prevArrow: $('#portfolio__arrow_prev'),
                    nextArrow: $('#portfolio__arrow_next'),
                })
                    .on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                        portfolioNumCenter.text(sliderChangeActiveNum(nextSlide));
                    })
                    .fadeIn(' slow ');
            })
    }

    if (window.matchMedia('(max-device-width: 424px)').matches) {
        $('#footer__work-time').html('<span>Время работы:</span> Пн-Вс с 9.00 до 21.00');
    }
})


