$(document).ready(function() {
  /**
   * Tabs Component
   */
  if ($('.tabs').length > 0) {
    $('.tabs').each(function() {
      $(this).find('.tabs__item').on('click', function() {
        var tabId = $(this).attr('data-tab');

        if ($(this).hasClass('tabs__item--active')) {
          return false;
        }

        $('.tabs__item--active').removeClass('tabs__item--active');
        $(this).addClass('tabs__item--active');

        $('.tabs__panel--active').removeClass('tabs__panel--active');
        $('.tabs__panel[data-tab=' + tabId + ']').addClass('tabs__panel--active');

      });
    });
  }

  /**
   * Navigation Component
   */
  var tl = new TimelineMax();

  $('#navigation__toggle').on('click', function() {
    $(this).parent().toggleClass('navigation--active');
  });
});
