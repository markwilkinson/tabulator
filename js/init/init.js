/**
 *
 * INITIALIZATION CODE... for the Tabulator Firefox Extension
 *
 * Tabulator has a lot of things going on.
 * Previously, all of these things were declared in one huge file.
 * Now, though, they are split up into different files that can be modified
 * more easily.  The following loadSubScript calls each make
 * different pieces of the tabulator library available, while keeping those
 * definitions out of the XPCOM code.
 * In some variations of the code, the tabulator.loadScript() calls are
 * instead actually expanded inline during library generation.
 * So these if commented out must be commented with a leading //
 *
 * The only assumption that this file makes is that the global name "tabulator"
 * has already been defined in this scope.
 *
 */

var whereInstalled = '/devel/github.com/linkeddata/tabulator-firefox/'

var mungeFilename = function(fn){
  var pref = 'chrome://tabulator/'
  if (fn.slice(0, pref.length) === pref) {
    return whereInstalled + fn.slice(pref.length)
  }
  return fn
}

dump('\nFirefox extension init.js starts.\n')
var loader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"]
    .getService(Components.interfaces.mozIJSSubScriptLoader);

tabulator.isExtension = true;
tabulator.mode = 'extension'; // can also be 'webapp'

tabulator.iconPrefix = 'chrome://tabulator/content/';
tabulator.scriptBase = 'chrome://tabulator/content/';

tabulator.loadScript = function(uri) {
    dump("@@ Loading "+uri+"\n");
    loader.loadSubScript('chrome://tabulator/content/'+ uri);
}

module = {} // try global
requireState = {}
requireState.loadedPackage = {}
requireState.loadedURI = {}

// var scriptURI = 'chrome://tabulator/content/js/init/' // here
module.scriptURI = 'chrome://tabulator/content/js/init/init.js' // here
module.packageBase = 'chrome://tabulator/content/js/' // here


// We have to be able to read the package files for NPM modules
var readJSONFile = function(filename){
  // dump('   reading file '+ filename + '\n')

  var file = Components.classes['@mozilla.org/file/local;1']
    .createInstance(Components.interfaces.nsILocalFile)
  file.initWithPath(filename)
  //
  // |file| is nsIFile
  var data = "";
  var fstream = Components.classes["@mozilla.org/network/file-input-stream;1"].
                createInstance(Components.interfaces.nsIFileInputStream);
  var cstream = Components.classes["@mozilla.org/intl/converter-input-stream;1"].
                createInstance(Components.interfaces.nsIConverterInputStream);
  fstream.init(file, -1, 0, 0);
  //cstream.init(fstream, "UTF-8", 0, 0); // you can use another encoding here if you wish

  var nativeJSON = Components.classes["@mozilla.org/dom/json;1"]
                 .createInstance(Components.interfaces.nsIJSON);


  var obj = nativeJSON.decodeFromStream(fstream, 99999)  // length parameter??
  // dump('json object: ' +obj)
  return obj

  /*
  var str = {}
  var read = 0;
  do {
      read = cstream.readString(0xffffffff, str); // read as much as we can and put it in str.value
      data += str.value;
  } while (read != 0);

  cstream.close(); // this closes fstream
  //dump(data + '\n');
  return data
  */
}

var join = function (given, base) {
  var baseColon
  var baseHash
  var baseScheme
  var baseSingle
  var colon
  var lastSlash
  var path
  baseHash = base.indexOf('#')
  if (baseHash > 0) {
    base = base.slice(0, baseHash)
  }
  if (given.length === 0) {
    return base
  }
  if (given.indexOf('#') === 0) {
    return base + given
  }
  colon = given.indexOf(':')
  if (colon >= 0) {
    return given
  }
  baseColon = base.indexOf(':')
  if (base.length === 0) {
    return given
  }
  if (baseColon < 0) {
    alert('Invalid base: ' + base + ' in join with given: ' + given)
    return given
  }
  baseScheme = base.slice(0, +baseColon + 1 || 9e9)
  if (given.indexOf('//') === 0) {
    return baseScheme + given
  }
  if (base.indexOf('//', baseColon) === baseColon + 1) {
    baseSingle = base.indexOf('/', baseColon + 3)
    if (baseSingle < 0) {
      if (base.length - baseColon - 3 > 0) {
        return base + '/' + given
      } else {
        return baseScheme + given
      }
    }
  } else {
    baseSingle = base.indexOf('/', baseColon + 1)
    if (baseSingle < 0) {
      if (base.length - baseColon - 1 > 0) {
        return base + '/' + given
      } else {
        return baseScheme + given
      }
    }
  }
  if (given.indexOf('/') === 0) {
    return base.slice(0, baseSingle) + given
  }
  path = base.slice(baseSingle)
  lastSlash = path.lastIndexOf('/')
  if (lastSlash < 0) {
    return baseScheme + given
  }
  if (lastSlash >= 0 && lastSlash < path.length - 1) {
    path = path.slice(0, +lastSlash + 1 || 9e9)
  }
  path += given
  while (path.match(/[^\/]*\/\.\.\//)) {
    path = path.replace(/[^\/]*\/\.\.\//, '')
  }
  path = path.replace(/\.\//g, '')
  path = path.replace(/\/\.$/, '/')
  return base.slice(0, baseSingle) + path
}

var dirPath = function(filename){
  return filename.slice(0, filename.lastIndexOf('/') + 1)
}

var setCount = function(set){
  var count = 0
  for (x in set) {
    count++
  }
  return count
}
var setList = function(set){
  var str = '{}'
  for (x in set) {
    str += x + ', '
  }
  return str.slice(0,-2) + '}'
}

var addJSsuffix = function(fn){
  if (fn.slice(-3) !== '.js' && fn.slice(-5) !== '.json'){
    fn += '.js'
  }
  return fn
}
// require

var require = function(relURI){
    dump(" require "+relURI+ " from " + module.scriptURI +"\n");
    // dump("    initial module.packageBase: " + module.packageBase + '\n')
    var absURI
    var packageBase
    var packageName = null;
    //if (tabulator.trace ){ // @@@@@ kludge
    //  dump("     tabulator.trace -> {" + setList(tabulator.trace)+ "}\n")
    //}
    if (relURI.indexOf('/') < 0){ // module name
      packageBase = join('node_modules/' + relURI + '/' , module.packageBase )
      dump('   package ' + relURI + ' base: ' + packageBase + '\n')
      packageName = relURI
      if (requireState.loadedPackage[packageName]){
        dump('        -------> package cache hit\n')
        return requireState.loadedPackage[packageName]
      }
      if (packageName in requireState.ignore){
        dump('        ------- ignoring package ' + packageName+'\n')
        return {}
      }
      var packageURI = packageBase + 'package.json'
      var filename = mungeFilename(packageURI)
      dump('   filename is ' + filename + '\n')
      var pack = readJSONFile(filename);
      // For e.g. http-browserify, we take the browserify version
      var mainURI = join(pack.browserify || pack.main, packageURI) // eg for http take the bowesr
      dump('   package main URI : ' + mainURI + '\n')
      absURI = addJSsuffix(mainURI)
    } else {
      var absURI = addJSsuffix(join(relURI, module.scriptURI))
      if (relURI.slice(0,2) === './' || relURI.slice(0,3) === '../'){
        packageBase = module.packageBase // keep the same when just a relative path
        // dump('aaaaa simple '+packageBase+'\n')
      } else {
        packageBase = dirPath(absURI)
        // dump('aaaaa complex '+packageBase+'\n')
      }
    }
    if (requireState.loadedURI[absURI]){
      dump("   --> " + absURI + " URI cache hit.\n");
      // dump("       i.e {" + setList(requireState.loadedURI[absURI])+ "}\n")
      return requireState.loadedURI[absURI]
    } else {
      dump("   --> " + absURI + " fetching:\n");
    }
    // dump('   cache A: '  + setCount(requireState.loadedURI)+') '+ requireState.loadedURI[absURI] + ' -- ' + absURI + '\n')

    var __dirname = absURI.slice(0, absURI.lastIndexOf('/'))
    module.__dirname = __dirname

    var result
      //module = {}
    var last = {}
    last.scriptURI = module.scriptURI
    last.packageBase = module.packageBase
    last.exports = module.exports

    // dump('    last package base ' + module.packageBase + '\n')
    last.require = require
    dump('    next package base ' + packageBase + '\n')

    module.scriptURI = absURI
    module.packageBase = packageBase
    module.exports = {}

    if (absURI.slice(-5) === '.json'){
      var jsonfn = mungeFilename(absURI)
      try {
        module.exports = readJSONFile(jsonfn)
      } catch(e){
        dump('****  Error loading JSON  ' + absURI + ': ' + e + '\n')
      }
    } else {
      try {
        loader.loadSubScript(absURI);
      } catch(e){
        dump('****  Error loading ' + absURI + ': ' + e + '\n')
      }
    }
    result = module.exports
    requireState.loadedURI[module.scriptURI] = result

    // if (tabulator.trace ){ // @@@@@ kludge
    //  dump("     tabulator.trace 2 -> {" + setList(tabulator.trace)+ "}\n")
    // }


    dump(' finished require: ' + module.scriptURI + '\n')
    module.exports = last.exports // continue defining the module we are in
    module.scriptURI = last.scriptURI
    module.packageBase = last.packageBase
    require = last.require // eg N3 corrupts require

    if (packageName){
      requireState.loadedPackage[packageName] = result
    }
    // dump('   cache D: ' + setList(requireState.loadedURI) + '\n')
    return result
}

requireState.ignore = {}

///////////////////////////////////////////////////////////////////////////////
//
//
//Before anything else, load up the logger so that errors can get logged.
// dump('trying import services: \n')
// Components.utils.import("resource://gre/modules/Services.jsm");
// dump('trying require: \n')
// var foo = require("../tab/log-ext.js");

tabulator.log = require('../tab/log-ext-node.js')


var events = require('events') // load in the order which they are npm installed
var http = require('http-browserify')
requireState.loadedPackage['http'] = requireState.loadedPackage['http-browserify']


//  Require the solid-compatible UI module which pulls in lots
var temp = module.packageBase
module.packageBase = join('solid-ui/', module.packageBase)
var UI = tabulator.UI = require('../solid-ui/index.js')
module.packageBase = temp
// Because it wasn't loaded as a module (yet) we cheat
requireState.loadedPackage['solid-ui'] = tabulator.UI

var $rdf = tabulator.rdf = UI.rdf
$rdf.log = tabulator.log


tabulator.Util = tabulator.UI.utils
tabulator.ns = UI.ns


tabulator.OutlineObject  = require('../panes/outline/manager.js')

// later in the context of a window and a document:
// dom.outline = new tabulator.OutlineObject(dom)

// This is because Firefox silently throws away any errors here alas
try {

    //Load the icons namespace onto tabulator.
    tabulator.loadScript("js/init/icons.js");
    //And Namespaces..
    // tabulator.loadScript("js/init/namespaces.js");
    //And Panes.. (see the below file to change which panes are included)
    tabulator.panes = UI.panes = require("../panes/index.js")


    // tabulator.loadScript("js/init/panes.js");
    // tabulator.loadScript("js/jscolor/jscolor.js");
    tabulator.panes.jscolor = UI.color = require('../jscolor/jscolor.js')
    //And Preferences mechanisms.
    tabulator.loadScript("js/init/prefs.js");


    tabulator.loadScript("js/tab/sources-ext.js");

    //And, finally, all non-pane UI code.
    tabulator.loadScript("js/tab/labeler.js");
    tabulator.loadScript("js/tab/request.js");
    // tabulator.loadScript("js/tab/outlineinit.js");
    tabulator.loadScript("js/tab/userinput.js"); // moved to panes
    // tabulator.loadScript("js/tab/outline.js");

    //Oh, and the views!
    tabulator.loadScript("js/init/views.js");

/////////// code below was in init-mashup for FF ext is in xpcom.js (which loaded init.js)
//
// See ../../../components/xpcom.js
//
/*
    tabulator.kb = new tabulator.rdf.IndexedFormula();
    tabulator.sf = tabulator.fetcher = new tabulator.rdf.Fetcher(tabulator.kb); // .sf deprecated

    tabulator.qs = new tabulator.rdf.QuerySource();
    // tabulator.sourceWidget = new SourceWidget();
    tabulator.sourceURI = "resource://tabulator/";
    tabulator.sparql = new tabulator.rdf.UpdateManager(tabulator.kb);
    // tabulator.rc = new RequestConnector();
    tabulator.requestCache = [];
    tabulator.cacheEntry = {};

    tabulator.lb = new Labeler(tabulator.kb, tabulator.preferences.get('languages')); // @@ was LanguagePreference
    tabulator.kb.predicateCallback = tabulator.rdf.Util.AJAR_handleNewTerm; // @@ needed??
    tabulator.kb.typeCallback = tabulator.rdf.Util.AJAR_handleNewTerm;

    tabulator.requestUUIDs = {};

    if (typeof document !== 'undefined') { // Not in FF extension
        tabulator.outline = new tabulator.OutlineObject(document);

    // we don't currently have a uuid generator code in non-extension mode
    // var a =$jq('.TabulatorOutline', doc).attr('id', uuidString);
        tabulator.outline.init();
    }
*/
//////////////////////////////////////////////////////////  FF EXTENSION ONLY

    tabulator.requestUUIDs = {};

    var Cc = Components.classes;
    var Ci = Components.interfaces;

    function CCIN(cName, ifaceName) {
        return Cc[cName].createInstance(Ci[ifaceName]);
    }

    function TracingListener() {
    }
    TracingListener.prototype =
    {
        originalListener: null,
        receivedData: [],   // array for incoming data.

        onDataAvailable: function(request, context, inputStream, offset, count)
        {

            var binaryInputStream = CCIN("@mozilla.org/binaryinputstream;1",
                    "nsIBinaryInputStream");
            var storageStream = CCIN("@mozilla.org/storagestream;1", "nsIStorageStream");
            var binaryOutputStream = CCIN("@mozilla.org/binaryoutputstream;1",
                    "nsIBinaryOutputStream");

            binaryInputStream.setInputStream(inputStream);
            storageStream.init(8192, count, null);
            binaryOutputStream.setOutputStream(storageStream.getOutputStream(0));

            // Copy received data as they come.
            var data = binaryInputStream.readBytes(count);
            this.receivedData.push(data);

            binaryOutputStream.writeBytes(data, count);

            //this.originalListener.onDataAvailable(request, context,
            //storageStream.newInputStream(0), offset, count);
        },

        onStartRequest: function(request, context) {
            this.receivedData = [];
            //this.originalListener.onStartRequest(request, context);
        },

        onStopRequest: function(request, context, statusCode)
        {
            //var responseSource = this.receivedData.join(); //entire file in responseSource
            //parse responseSource through tabulator
            var uuidGenerator =
                Components.classes["@mozilla.org/uuid-generator;1"]
                .getService(Components.interfaces.nsIUUIDGenerator);
            var uuid = uuidGenerator.generateUUID();
            var uuidString = uuid.toString();

            tabulator.requestUUIDs[uuidString] = request.name;

            //send html file to originalListener
            var storageStream = CCIN("@mozilla.org/storagestream;1", "nsIStorageStream");
            var binaryOutputStream = CCIN("@mozilla.org/binaryoutputstream;1",
                    "nsIBinaryOutputStream");

            var data =
            "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n"+
            "<html id='docHTML'>\n"+
            "    <head><meta charset='UTF-8'>\n"+
            "        <title>Tabulator: Data Browser</title>\n"+
            "        <link rel=\"stylesheet\" href=\"chrome://tabulator/content/tabbedtab.css\" type=\"text/css\" />\n"+
            "        <link rel=\"stylesheet\" href=\"chrome://tabulator/content/js/widgets/style.css\" type=\"text/css\" />\n"+
            "    </head>\n"+
            "    <body>\n"+
            "        <div class=\"TabulatorOutline\" id=\""+uuidString+"\">\n"+
            "            <table id=\"outline\"></table>\n"+
            "        </div>\n"+
            "    </body>\n"+
            "</html>\n";

            storageStream.init(8192, data.length, null);
            binaryOutputStream.setOutputStream(storageStream.getOutputStream(0));
            binaryOutputStream.writeBytes(data, data.length);
            this.originalListener.onStartRequest(request, context);
            this.originalListener.onDataAvailable(request, context,
                   storageStream.newInputStream(0), 0, data.length);
            this.originalListener.onStopRequest(request, context, statusCode);
        },

        QueryInterface: function (aIID) {
            if (aIID.equals(Ci.nsIStreamListener) ||
                aIID.equals(Ci.nsISupports)) {
                return this;
            }
            throw Components.results.NS_NOINTERFACE;
        }
    }

    var httpRequestObserver =
    {
        observe : function(aSubject, aTopic, aData)
        {
            var chan = aSubject.QueryInterface(Ci.nsIChannel);
            var isBrowserLoad = chan.loadFlags & chan.LOAD_INITIAL_DOCUMENT_URI;

            if (aTopic.slice(0,4) != 'http')  dump("init.js Observer @@ isBrowserLoad="+isBrowserLoad+", aTopic="+aTopic+"\n");
            if (isBrowserLoad && (aTopic == "http-on-examine-response" ||
                            aTopic == "http-on-examine-merged-response" ||
                            aTopic == "http-on-examine-cached-response"))
            {
                var newListener = new TracingListener();
                aSubject.QueryInterface(Ci.nsIHttpChannel);
                var ct = aSubject.QueryInterface(Components.interfaces.nsIChannel)
                    .contentType
                if( ct.indexOf("application/rdf+xml") === 0 ||
                    ct.indexOf("text/n3") === 0 ||
                    ct.indexOf("text/rdf+n3") === 0 ||
                    ct.indexOf("text/turtle") === 0 ) {
                    aSubject.QueryInterface(Components.interfaces.nsIChannel)
                        .contentType = "text/html";
                    aSubject.QueryInterface(Ci.nsITraceableChannel);
                    newListener.originalListener =
                        aSubject.setNewListener(newListener);
                }
            }
        },

        QueryInterface : function (aIID)
        {
            if (aIID.equals(Ci.nsIObserver) ||
                aIID.equals(Ci.nsISupports))
            {
                return this;
            }

            throw Components.results.NS_NOINTERFACE;

        }
    };

    var observerService = Cc["@mozilla.org/observer-service;1"]
        .getService(Ci.nsIObserverService);

    observerService.addObserver(httpRequestObserver,
        "http-on-examine-response", false);
    observerService.addObserver(httpRequestObserver,
        "http-on-examine-merged-response", false);
    observerService.addObserver(httpRequestObserver,
        "http-on-examine-cached-response", false);

    ///////////////////////////////////////////////////////////////////

    tabulator.pumpRDFa = function(e){


        // if (typeof tabulator == 'undefined') var tabulator = Components.classes["@dig.csail.mit.edu/tabulator;1"].getService(Components.interfaces.nsISupports).wrappedJSObject;
        var uri = gURLBar.value;

        // From init/init.js
        var uuidGenerator =
            Components.classes["@mozilla.org/uuid-generator;1"]
            .getService(Components.interfaces.nsIUUIDGenerator);
        var uuid = uuidGenerator.generateUUID();
        var uuidString = uuid.toString();

        tabulator.requestUUIDs[uuidString] = uri;

        var doc = window.content.document;
        //Remove all the style sheet elements and scripts

        $jq('head', doc).empty();
        $jq('body', doc).empty();
        $jq('html', doc).attr("id","docHTML");
        // doc.innerHTML = tabulator.outlineTemplate; // Reset doc entirely


    //@@ from jambo, WARNING ! the way that this code operates HAS BEEN CHANGED
    // a UUID nonce is now used to identify the document to display.
    // I am not sure if this will affect the execution of this code when
    // it gets re-enabled.  If you experience issues, feel free to email
    // me and I will help resolve it.
    // For refs on how to do this, see init/init.js, where
    // tabulator.requestUUIDs is used.

        $jq('head', doc).append("<title>Data View</title>\n"+
        "        <link rel=\"stylesheet\" href=\"chrome://tabulator/content/tabbedtab.css\" type=\"text/css\" />\n"+
        "        <link rel=\"stylesheet\" href=\"chrome://tabulator/content/js/widgets/style.css\" type=\"text/css\" />\n"
        );
        $jq('body', doc).append("<div class=\"TabulatorOutline\" id=\"DummyUUID\">\n"+
        "<table id=\"outline\"></table>\n"+
        "</div>\n"
        );

        //Add the Tabulator outliner
        var outline = new tabulator.OutlineObject(doc)

        var a =$jq('.TabulatorOutline', doc).attr('id', uuidString);

        outline.init();

        var nsIURI = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI(uri, null, null); //ToDo: make sure the encoding is correct
        gBrowser.getBrowserForDocument(doc).webNavigation.setCurrentURI(nsIURI);

        var queryButton = doc.createElement('input');
        queryButton.setAttribute('id','queryButton');
        queryButton.setAttribute('style','display:none;');
        queryButton.setAttribute('type','button');
        queryButton.setAttribute('value','Find All');
        doc.body.appendChild(queryButton);
        queryButton.addEventListener('click',outline.viewAndSaveQuery,false);


        outline.GotoSubject(tabulator.kb.sym(uri),true);

    }

    tabulator.log.error("@@ init.js test 90 tabulator.log.error: $rdf.log.error)"+$rdf.log.error);
} catch(e) {
    dump('Tabulator init.js:  Aaaaagh loading failed\n');
    dump('Tabulator init.js: '+tabulator.Util.stackString(e)+'\n');
}
dump('626 typeof tabulator.rdf.IndexedFormula ' + typeof tabulator.rdf.IndexedFormula + '\n')
// Ends
dump("@@ init.js END\n");
