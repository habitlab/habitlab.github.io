//require('css!./assets/css/main.css')
//require('css!./montserrat.css')
//require('css!./montserrat100.css')
//require('css!./font-awesome.min.css')
require('script-loader!./assets/js/jquery.min.js')
require('script-loader!./assets/js/jquery.scrolly.min.js')
require('script-loader!./assets/js/skel.min.js')
require('script-loader!./assets/js/util.js')
require('script-loader!./jssor.slider-22.2.16.mini.js')
require('script-loader!./assets/js/main.js')

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

function generate_random_id() {
  var output = ''
  for (var i = 0; i < 24; ++i) {
    output += '0123456789abcdef'[Math.floor(Math.random() * 16)]
  }
  return output
}

var userid = localStorage.getItem('userid')

if (userid == null) {
  userid = generate_random_id()
  localStorage.setItem('userid', userid)
}

function log_action_for_user(userid, action, callback) {
  var domain = window.location.host
  jQuery.getJSON('https://habitlab.herokuapp.com/logwebvisit?callback=?&' + jQuery.param({
    userid: userid,
    domain: domain,
    action: action
  })).then(function() {
    if (callback != null) {
      callback()
    }
  })
}

function log_visit_for_user(userid, callback) {
  log_action_for_user(userid, 'visit', callback)
}

function log_install_clicked_for_user(userid, callback) {
  log_action_for_user(userid, 'install_clicked', callback)
}

function log_install_accept_for_user(userid, callback) {
  log_action_for_user(userid, 'install_accept', callback)
}

function log_install_reject_for_user(userid, callback) {
  log_action_for_user(userid, 'install_reject', callback)
}

var is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(window.navigator.userAgent)

if (chrome && chrome.app && chrome.webstore && !is_mobile && window.location.protocol == 'https:' && (window.location.hostname == 'habitlab.netlify.com' || window.location.hostname == 'habitlab.github.io' || window.location.hostname == 'habitlab.stanford.edu')) {

  log_visit_for_user(userid)
  window.history.pushState({}, null, '/#hashdata|source=webvisit|userid=' + userid)
  window.history.pushState({}, null, '/')


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
        log_install_clicked_for_user(userid)
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
            set_install_button_text('HabitLab has been installed')
            //setTimeout(function() {
            //  window.location.href = onboarding_url
            //}, 2000)
            log_install_accept_for_user(userid)
          },
          function() {
            // failure
            log_install_reject_for_user(userid, function() {
              window.location.href = chrome_store_url
            })
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
  //set_install_button_url(onboarding_url)
  set_install_button_url(chrome_store_url)
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

