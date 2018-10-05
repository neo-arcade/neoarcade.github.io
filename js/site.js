(function () {
  var contactFormSelector = "#contact-form";
  var contactFormNameSelector = "#contact-input-name";
  var contactFormEmailSubjectSelector = "#contact-email-subject";

  var onContactFormSubmit = function () {
    // Include the user's name in the contact form subject to assist email threading
    var $nameInput = $(contactFormNameSelector);
    var $emailSubject = $(contactFormEmailSubjectSelector);
    var name = $nameInput.val();
    $emailSubject.val("New submission from neoarcade.games - " + name);

    // Submit analytics event
    gtag('event', 'contact_form_submit', {
      'event_category': 'enquiry',
      'event_label': 'home_page'
    });
  }

  var initSiteScript = function() {
    var $contactForm = $(contactFormSelector);
    $contactForm.on('submit', onContactFormSubmit);
  };

  $(initSiteScript);
}());
