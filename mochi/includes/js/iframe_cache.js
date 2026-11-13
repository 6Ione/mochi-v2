/* Mochi self-host adapter for Mochi legacy AppCache; optional feature, not an exploit modification. */
(function () {
  var app = window.applicationCache;
  function send(type, extra) {
    var data = {type:type};
    if(extra) for(var k in extra) if(Object.prototype.hasOwnProperty.call(extra,k)) data[k]=extra[k];
    try { parent.postMessage(data, location.origin || '*'); } catch(e) { parent.postMessage(data, '*'); }
  }
  if (!app) { send('CACHE_ERROR',{reason:'AppCache is not supported by this browser'}); return; }
  var done=false;
  function finish(type) {if(done)return; done=true; send(type);}
  app.addEventListener('checking',function(){send('CACHE_CHECKING');});
  app.addEventListener('downloading',function(){send('CACHE_DOWNLOADING');});
  app.addEventListener('progress',function(e){var l=e.loaded||0,t=e.total||0;send('CACHE_PROGRESS',{loaded:l,total:t,percent:t?Math.round(100*l/t):-1});});
  app.addEventListener('cached',function(){finish('CACHE_COMPLETE');});
  app.addEventListener('updateready',function(){finish('CACHE_COMPLETE');});
  app.addEventListener('noupdate',function(){finish('CACHE_EXISTS');});
  app.addEventListener('error',function(){finish('CACHE_ERROR');});
  try {if(app.status===app.IDLE)send('CACHE_CHECKING');}catch(e){}
})();
