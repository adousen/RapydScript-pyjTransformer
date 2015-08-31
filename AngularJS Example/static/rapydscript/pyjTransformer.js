(function(){
  
/**
 * Actually transform the code.
 *
 * @param {string} code
 * @param {string?} url
 * @param {object?} options
 * @return {string} The transformed code.
 * @internal
 */
function transformCode(code, url, options) {
  //RapydScript options
  var rs_options = {
    "filename":"demo",
    "toplevel":null,
    "basedir": null,
    "libdir": null
  };
  var output_opts = {
    "beautify":true,
    "private_scope":false,
    "omit_baselib":true,
    "comments" : true
  };  

  var rapydscript_string = code;
  output = OutputStream(output_opts)
  rapydscript_string += '\n'; //just to be safe

  try {
      TOPLEVEL = parse(rapydscript_string, rs_options);
      TOPLEVEL.print(output);
      //(new Function(String(output) + '\n'))();
      var js_code = String(output) + '\n'
      js_code = js_code.replace('var __name__ = "__main__";', '');
      return js_code

    } catch(err) {
      console.log("ERROR: " + err.message + ". Line " + err.line + ", column " + err.col + ".");
    }
}

/**
 * Appends a script element at the end of the <head> with the content of code,
 * after transforming it.
 *
 * @param {string} code The original source code
 * @param {string?} url Where the code came from. null if inline
 * @param {object?} options Options to pass to jstransform
 * @internal
 */
function run(code, url, options) {
  var scriptEl = document.createElement('script');
  scriptEl.text = transformCode(code, url, options);
  if (options.otype) {
    scriptEl.type = options.otype
  }
  headEl.appendChild(scriptEl);
}

/**
 * Load script from the provided url and pass the content to the callback.
 *
 * @param {string} script The script
 * @param {function} callback Function to call with the content of url
 * @internal
 */
function load(script, successCallback, errorCallback) {
  var xhr;
  xhr = window.ActiveXObject ? new window.ActiveXObject('Microsoft.XMLHTTP')
                             : new XMLHttpRequest();

  // async, however scripts will be executed in the order they are in the
  // DOM to mirror normal script loading.
  xhr.open('GET', 
    script.src, 
    script.options.async
    );
  if ('overrideMimeType' in xhr) {
    xhr.overrideMimeType('text/plain');
  }
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 0 || xhr.status === 200) {
        successCallback(xhr.responseText);
      } else {
        errorCallback();
        throw new Error("Could not load " + script.src);
      }
    }
  };
  return xhr.send(null);
}

/**
 * Loop over provided script tags and get the content, via innerHTML if an
 * inline script, or by using XHR. Transforms are applied if needed. The scripts
 * are executed in the order they are found on the page.
 *
 * @param {array} scripts The <script> elements to load and run.
 * @internal
 */
function loadScripts(scripts) {
  var result = [];
  var count = scripts.length;

  function check() {
    var script, i;

    for (i = 0; i < count; i++) {
      script = result[i];

      if (script.loaded && !script.executed) {
        script.executed = true;
        if (script.options.async) {
          if (window.addEventListener) {
            window.addEventListener('DOMContentLoaded', function(){run(script.content, script.url, script.options);}, false);
          } else {
            window.attachEvent('onload', function(){run(script.content, script.url, script.options);});
          }
        }
        else{
          run(script.content, script.url, script.options);
        }
        
      } else if (!script.loaded && !script.error && !script.async) {
        break;
      }
    }
  }

  scripts.forEach(function(script, i) {
    var options = {
      sourceMap: true,
      otype: script.getAttribute('otype'),
      // script.async is always true for non-javascript script tags
      async: script.getAttribute('async').toLowerCase()=='false' ? false: true,
    };
    if (/;harmony=true(;|$)/.test(script.type)) {
      options.harmony = true
    }

    script.options = options
    
    if (script.src) {
      result[i] = {
        error: false,
        executed: false,
        content: null,
        loaded: false,
        url: script.src,
        options: options
      };

      load(script, function(content) {
        result[i].loaded = true;
        result[i].content = content;
        check();
      }, function() {
        result[i].error = true;
        check();
      });
    } else {
      result[i] = {
        error: false,
        executed: false,
        content: script.innerHTML,
        loaded: true,
        url: null,
        options: options
      };
    }
  });

  check();
}


/**
 * Find and run all script tags with type="text/pyj".
 *
 * @internal
 */
function runScripts() {
  var scripts = document.getElementsByTagName('script');

  // Array.prototype.slice cannot be used on NodeList on IE8
  var pyjScripts = [];
  for (var i = 0; i < scripts.length; i++) {
    if (/^text\/pyj(;|$)/.test(scripts.item(i).type)) {
      pyjScripts.push(scripts.item(i));
    }
  }

  if (pyjScripts.length < 1) {
    return;
  }

  console.warn(
    'You are using the in-browser pyj transformer. Also you can precompile ' +
    'your pyj for production - ' +
    'http://www.rapydscript.cn/install.html'
  );

  loadScripts(pyjScripts);
}

// Listen for load event if we're in a browser and then kick off finding and
// running of scripts.
if (typeof window !== "undefined" && window !== null) {
  headEl = document.getElementsByTagName('head')[0];
  dummyAnchor = document.createElement('a');
  runScripts()
  // if (window.addEventListener) {
  //   window.addEventListener('DOMContentLoaded', runScripts, false);
  // } else {
  //   window.attachEvent('onload', runScripts);
  // }
}

})();