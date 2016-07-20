document.getElementById('shareButton').onclick = function() {
  FB.ui({
    method: 'share',
    mobile_iframe: true,
    href: 'habitlab.stanford.edu',
  }, function(response){});
}