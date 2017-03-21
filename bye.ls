hash_data_unparsed = window.location.hash
if hash_data_unparsed.startsWith('#')
  hash_data_unparsed = hash_data_unparsed.substr(1)
window.location.hash = ''

#require('css!./bootstrap.min.css')
#require('css!./bootstrap-theme.min.css')
#require('bootstrap-loader')
$ = require('jquery')
window.$ = window.jQuery = $
require('script-loader!./bootstrap.min.js')
swal = require('./bower_components/sweetalert2/dist/sweetalert2.min.js')
window.swal = swal

list_url = [['habitlab', 'support'].join('-'), ['cs', 'stanford', 'edu'].join('.')].join('@')
$(document).ready ->
  $('#address').attr('href', 'mailto:' + list_url)
  $('#address').text(list_url)

getUrlParameters = ->
  url = window.location.href
  hash = url.lastIndexOf('#')
  if hash != -1
    url = url.slice(0, hash)
  map = {}
  parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m,key,value) ->
    #map[key] = decodeURI(value).split('+').join(' ').split('%2C').join(',') # for whatever reason this seems necessary?
    map[key] = decodeURIComponent(value).split('+').join(' ') # for whatever reason this seems necessary?
  )
  return map

params = getUrlParameters()

data = {}

base_url = "//habitlab.herokuapp.com"
#base_url = "http://localhost:5000"

$('#submit_button').click ->
  feedback = $('#feedback_textarea').val().trim()
  if feedback.length > 0
    swal {
      title: 'Thanks for your feedback!'
      text: 'Your feedback has been submitted. Thank you for helping us improve HabitLab!'
    }
    $('#feedback_textarea').val('')
    data.feedback = feedback
    $.getJSON (base_url + "/add_uninstall_feedback?#{$.param(data)}&callback=?"), null, (response) ->
      #console.log response
      return
  else
    swal {
      title: 'Please enter some text'
    }

unparsed_data = params.d ? hash_data_unparsed
if unparsed_data? and unparsed_data.length > 0
  base64_js = require('base64-js')
  msgpack_lite = require('msgpack-lite')
  data = msgpack_lite.decode(base64_js.toByteArray(unparsed_data))

  $.getJSON (base_url + "/add_uninstall?#{$.param(data)}&callback=?"), null, (response) ->
    #console.log response
    return


