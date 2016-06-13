document.addEventListener 'DOMContentLoaded', ->
  if window.location.href.indexOf('http://habitlab.github.io') == 0
    window.location.href = 'https://habitlab.github.io/'

export install_extension = ->
  if chrome? and chrome.webstore? and chrome.webstore.install? and window.location.protocol == 'https:'
    chrome.webstore.install(
      url='https://chrome.google.com/webstore/detail/mogonddkdjlindkbpkagjfkbckgjjmem',
      successCallback= ->
        console.log 'extension install finished'
    )
  else
    window.open('https://chrome.google.com/webstore/detail/mogonddkdjlindkbpkagjfkbckgjjmem')
