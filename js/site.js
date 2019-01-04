(function () {
  // Constants
  var CONTACT_FORM_SELECTOR = "#contact-form";
  var CONTACT_FORM_NAME_SELECTOR = "#contact-input-name";
  var CONTACT_FORM_EMAIL_SUBJECT_SELECTOR = "#contact-email-subject";

  var SMOOTH_SCROLL_ANIM_OFFSET = -16;

  var onContactFormSubmit = function () {
    // Include the user's name in the contact form subject to assist email threading
    var $nameInput = $(CONTACT_FORM_NAME_SELECTOR);
    var $emailSubject = $(CONTACT_FORM_EMAIL_SUBJECT_SELECTOR);
    var name = $nameInput.val();
    $emailSubject.val("New submission from neoarcade.games - " + name);

    // Submit analytics event
    gtag('event', 'contact_form_submit', {
      'event_category': 'enquiry',
      'event_label': 'home_page'
    });
  }

  var smoothScrollToSection = function(a_evt) {
    // Smooth scroll to the section only if it isn't already open
    var $buttonSelector = $(a_evt.delegateTarget);
    var $targetSection = $($buttonSelector.attr('href'));
    if (!$targetSection.hasClass('show')) {
      var buttonTop = $buttonSelector.offset().top;
      $("html, body").stop().animate({ scrollTop: buttonTop + SMOOTH_SCROLL_ANIM_OFFSET }, 500);
    }
  }

  var initSiteScript = function() {
    var $contactForm = $(CONTACT_FORM_SELECTOR);
    $contactForm.on('submit', onContactFormSubmit);

    // Bind smooth scroll to section on section button press
    $('[data-toggle="collapse"]').on('click', smoothScrollToSection);
  };

  $(initSiteScript);
}());
