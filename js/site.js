(function () {
  // Constants
  var CONTACT_FORM_SELECTOR = '#contact-form';
  var CONTACT_FORM_NAME_SELECTOR = '#contact-input-name';
  var CONTACT_FORM_EMAIL_SUBJECT_SELECTOR = '#contact-email-subject';
  var EMAIL_SUBSCRIPTION_FORM_SELECTOR = '#mc-embedded-subscribe-form';
  var SOCIALS_BUTTON_SELECTOR = '.socials-link';

  var SMOOTH_SCROLL_ANIM_OFFSET = -16;

  var onContactFormSubmit = function () {
    // Include the user's name in the contact form subject to assist email threading
    var $nameInput = $(CONTACT_FORM_NAME_SELECTOR);
    var $emailSubject = $(CONTACT_FORM_EMAIL_SUBJECT_SELECTOR);
    var name = $nameInput.val();
    $emailSubject.val('New submission from neoarcade.games - ' + name);

    // Submit analytics event
    gtag('event', 'contact_form_submit', {
      'event_category': 'engagement',
      'event_label': 'home_page'
    });
  }

  var isDrawerOpen = function(sectionId) {
    var $targetSection = $(sectionId);
    return $targetSection.hasClass('show');
  }

  var smoothScrollToSection = function(a_evt) {
    // Smooth scroll to the section only if it isn't already open
    var $buttonSelector = $(a_evt.delegateTarget);
    if (!isDrawerOpen($buttonSelector.attr('href'))) {
      var buttonTop = $buttonSelector.offset().top;
      $('html, body').stop().animate({ scrollTop: buttonTop + SMOOTH_SCROLL_ANIM_OFFSET }, 500);
    }
  }

  var bindPageAnalytics = function () {
    // Submit analytics event for opening a content section section
    $('[data-toggle="collapse"]').on('click', function (a_evt) {
      var $buttonSelector = $(a_evt.delegateTarget);
      var targetId = $buttonSelector.attr('href');
      if (!isDrawerOpen(targetId)) {
        gtag('event', 'open_section', {
          'event_category': 'engagement',
          'event_label': 'Open section: ' + targetId
        });
      }
    });

    // Submit analytics event for submitting the email subscribe
    var $emailSubscriptionForm = $(EMAIL_SUBSCRIPTION_FORM_SELECTOR);
    $emailSubscriptionForm.on('submit', function (a_evt) {
      gtag('event', 'email_subscription', {
        'event_category': 'engagement',
        'event_label': 'home_page'
      });
    });

    // Submit analytics event for clicking the socials link
    $(SOCIALS_BUTTON_SELECTOR).on('click', function (a_evt) {
      var $buttonSelector = $(a_evt.delegateTarget);
      var socialsTitle = $buttonSelector.attr('title');
      gtag('event', 'click_socials_link', {
        'event_category': 'engagement',
        'event_label': socialsTitle
      });
    });
  }

  var initSiteScript = function() {
    var $contactForm = $(CONTACT_FORM_SELECTOR);
    $contactForm.on('submit', onContactFormSubmit);

    // Bind smooth scroll to section on section button press
    $('[data-toggle="collapse"]').on('click', smoothScrollToSection);

    bindPageAnalytics();
  };

  $(initSiteScript);
}());
