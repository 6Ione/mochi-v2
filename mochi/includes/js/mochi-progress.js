/* Mochi v1: read-only friendly progress. Keep Mochi logs and engine intact. */
(function(){
 function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn);else fn();}
 ready(function(){
   var view=document.getElementById('mochi-friendly-progress');
   var output=document.getElementById('console');
   var state=document.getElementById('state');
   if(!view||!output)return;
   var last='Ready to begin';
   function setMessage(msg){if(msg!==last){last=msg;view.textContent=msg;}}
   function cleanStatus(){
     var stateText=(state&&state.textContent||'').toLowerCase();
     var recent='';var lastNode=output.lastChild;
     if(lastNode) recent=(lastNode.textContent||'').slice(-400).toLowerCase();
     var txt=stateText+' '+recent;
     if(/(?:kernel panic|error|failed|failure|abort|unsuccessful|exception)/.test(txt)){setMessage('Something went wrong');return;}
     if(/(?:jailbreak success|jailbreak complete|jailbreak successful)/.test(stateText)){setMessage('Jailbreak finished ✿');return;}
     if(/(?:retry|trying again|attempt [2-9])/.test(txt)){setMessage('Trying again…');return;}
     if(/(?:loading|sending|launching|delivering).{0,22}goldhen/.test(txt)){setMessage('Launching GoldHEN…');return;}
     if(/(?:loading|sending|launching|delivering).{0,22}ps4hen/.test(txt)){setMessage('Launching PS4HEN…');return;}
     if(/(?:cache|caching)/.test(txt)){setMessage('Caching…');return;}
     if(/(?:kernel exploit|running exploit|jailbreak|webkit|primitive|apm)/.test(txt)){setMessage('Starting…');return;}
     if(/(?:prepare|initializing|initialising|loading)/.test(txt)){setMessage('Getting ready…');return;}
   }
   if(window.MutationObserver){
     new MutationObserver(cleanStatus).observe(output,{childList:true,subtree:true,characterData:true});
     if(state)new MutationObserver(cleanStatus).observe(state,{childList:true,subtree:true,characterData:true});
   }
   var start=document.getElementById('pslogo');
   if(start)start.addEventListener('click',function(){setMessage('Starting…');},false);
   var run=document.getElementById('exploitRun');
   if(run)run.addEventListener('click',function(){setMessage('Starting…');},false);
 });
})();
