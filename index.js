var extension_id = 'obghclocpdgcekcognpkblghkedcpdgd'
if (window.location.hostname == 'habitlab.netlify.com') {
  extension_id = 'bleifeoekkfhicamkpadfoclfhfmmina'
}
var chrome_store_url = 'https://chrome.google.com/webstore/detail/habitlab/' + extension_id
var chrome_store_url_bare = 'https://chrome.google.com/webstore/detail/' + extension_id
var onboarding_url = 'chrome-extension://' + extension_id + '/options.html#onboarding'
$('#chrome_webstore_item').attr('href', chrome_store_url_bare)

var is_habitlab_installed = false

function set_install_button_url(url) {
  $('#add_button_top').attr('href', url)
  $('#add_button').attr('href', url)
}

set_install_button_url(chrome_store_url)

function show_installing_page() {
  window.scrollTo(0, 0)
  window.location.hash = 'installing'
  set_install_button_text('HabitLab is being installed')
  //$('#mainpage').hide()
  //$('#installing_page').show()
}


if (chrome && chrome.app && chrome.webstore && window.location.protocol == 'https:' && (window.location.hostname == 'habitlab.netlify.com' || window.location.hostname == 'habitlab.stanford.edu')) {
  jQuery(document).ready(function() {
    var install_already_clicked = false

    if (!is_habitlab_installed) {

      var install_habitlab_button_clicked = function(evt) {
        if (is_habitlab_installed) {
          return
        }
        if (install_already_clicked) {
          window.location.href = chrome_store_url
        }
        evt.preventDefault();
        evt.stopPropagation();
        install_already_clicked = true
        show_installing_page()
        $('#install_text_top').off()
        $('#install_text_bottom').off()
        chrome.webstore.install(
          chrome_store_url_bare,
          function() {
            // success
            //$('#install_text_top').text('Installing HabitLab')
            //$('#install_text_bottom').text('Installing HabitLab')
            //window.location.href = 'https://chrome.google.com/webstore/detail/habitlab/obghclocpdgcekcognpkblghkedcpdgd'
            window.location.href = onboarding_url
          },
          function() {
            // failure
            window.location.href = chrome_store_url
          }
        )
      }
      $('#add_button_top').click(install_habitlab_button_clicked)
      $('#add_button').click(install_habitlab_button_clicked)

    }
  })
}

function set_install_button_text(text) {
  if (!$('#install_text_top').attr('orig_install_text')) {
    var orig_text = $('#install_text_top').text()
    $('#install_text_top').attr('orig_install_text', orig_text)

  }
  $('#install_text_top').text(text)
  $('#install_text_bottom').text(text)
}

function reset_install_button_text() {
  if ($('#install_text_top').attr('orig_install_text') !== null) {
    var text = $('#install_text_top').attr('orig_install_text')
    $('#install_text_top').text(text)
    $('#install_text_bottom').text(text)
  }
}

function is_habitlab_already_installed_checker() {
  if (document.getElementById('habitlab_already_installed_marker')) {
    show_already_installed_page()
    return true
  }
  return false
}

var check_habitlab_already_installed = null;

function show_already_installed_page() {
  if (is_habitlab_installed) {
    return
  }
  clearInterval(check_habitlab_already_installed)
  check_habitlab_already_installed = null
  is_habitlab_installed = true
  $('#install_text_top').off()
  $('#install_text_bottom').off()
  set_install_button_text('HabitLab is already installed')
  set_install_button_url(onboarding_url)
}

var skip_install_check = false

if (window && window.location && window.location.search) {
  if (window.location.search == '?installing') {
    show_installing_page()
  }
  if (window.location.search == '?installed') {
    show_already_installed_page()
  }
  if (window.location.search == '?skipinstallcheck') {
    skip_install_check = true
  }
}

if (!skip_install_check) {
  if (!is_habitlab_already_installed_checker()) {
    check_habitlab_already_installed = setInterval(is_habitlab_already_installed_checker, 1000)
  }
}
