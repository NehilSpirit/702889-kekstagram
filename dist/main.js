/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ "./node_modules/axios/lib/helpers/btoa.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ( true &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");
var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/btoa.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/btoa.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./src/css/normalize.css":
/*!*******************************!*\
  !*** ./src/css/normalize.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/js/App.js":
/*!***********************!*\
  !*** ./src/js/App.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _views__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./views */ "./src/js/views/index.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var App =
/*#__PURE__*/
function () {
  function App() {
    _classCallCheck(this, App);

    var picturesContainer = document.querySelector('.pictures');
    var bigpicContainer = document.querySelector('.big-picture');
    var formContainer = document.querySelector('.img-upload__overlay');
    var urlLoad = 'https://js.dump.academy/kekstagram/data';
    var data = [];
    var pics = [];
    this.state = {
      bigpicContainer: bigpicContainer,
      picturesContainer: picturesContainer,
      formContainer: formContainer,
      urlLoad: urlLoad,
      data: data,
      pics: pics
    };
  }

  _createClass(App, [{
    key: "load",
    value: function load() {
      var _this = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(this.state.urlLoad).then(function (response) {
        return response.data;
      }).then(function (data) {
        _this.state.data = data;

        _this.renderPics(_toConsumableArray(data));
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: "renderPics",
    value: function renderPics(toRender) {
      var _this2 = this;

      var fragment = document.createDocumentFragment();
      this.state.pics = toRender.map(function (data) {
        var picture = new _views__WEBPACK_IMPORTED_MODULE_1__["Picture"](data);
        picture.onClick = _this2.renderBigPicture.bind(_this2, data);
        picture.bind();
        picture.append(fragment);
        return picture;
      });
      this.removePics();
      this.state.picturesContainer.appendChild(fragment);
    }
  }, {
    key: "removePics",
    value: function removePics() {
      this.state.pics.forEach(function (pic) {
        pic.remove();
      });
      this.state.pics = [];
      this.state.picturesContainer.querySelectorAll('a.picture').forEach(function (pic) {
        pic.parentNode.removeChild(pic);
      });
    }
  }, {
    key: "renderBigPicture",
    value: function renderBigPicture(data) {
      var bigpic = new _views__WEBPACK_IMPORTED_MODULE_1__["BigPicture"](data);
      bigpic.bind();
      bigpic.append(this.state.bigpicContainer);
      this.renderComents(data.comments);
    }
  }, {
    key: "renderComents",
    value: function renderComents(data) {
      var comment = new _views__WEBPACK_IMPORTED_MODULE_1__["Comment"](data);
      comment.addComents(data);
    } // filters methods

  }, {
    key: "onClickFilterPopular",
    value: function onClickFilterPopular() {
      var pops = this.state.data.slice(0);
      this.renderPics(pops);
    }
  }, {
    key: "onClickFilterNew",
    value: function onClickFilterNew() {
      var newPhoto = this.state.data.slice(0, 10);
      this.renderPics(newPhoto);
    }
  }, {
    key: "onClickFilterDiscussed",
    value: function onClickFilterDiscussed() {
      var discussed = this.state.data.slice(0);
      discussed.sort(function (a, b) {
        return a.likes - b.likes;
      });
      this.renderPics(discussed.reverse());
    } // создает форму 

  }, {
    key: "renderForm",
    value: function renderForm() {
      var form = new _views__WEBPACK_IMPORTED_MODULE_1__["Form"]();
      form.bind();
      form.append(this.state.formContainer);
    }
  }, {
    key: "run",
    value: function run() {
      this.load(); // создаем фильтры и размещаем их при запуске приложения

      var filters = new _views__WEBPACK_IMPORTED_MODULE_1__["Filters"]();
      filters.bind();
      filters.append(); // вешаем обработчкик

      filters.onClickFilterPopular = this.onClickFilterPopular.bind(this);
      filters.onClickFilterNew = this.onClickFilterNew.bind(this);
      filters.onClickFilterDiscussed = this.onClickFilterDiscussed.bind(this);
      this.renderForm();
    }
  }]);

  return App;
}();



/***/ }),

/***/ "./src/js/consts.js":
/*!**************************!*\
  !*** ./src/js/consts.js ***!
  \**************************/
/*! exports provided: NEWNUM, commentsArray, descriptions, Num, escCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEWNUM", function() { return NEWNUM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commentsArray", function() { return commentsArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "descriptions", function() { return descriptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Num", function() { return Num; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escCode", function() { return escCode; });
var NEWNUM = 10;
var commentsArray = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var descriptions = ['Тестим новую камеру!', 'Затусили с друзьями на море)))', 'Как же круто тут кормят!', 'Отдыхаем...что ли', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var Num = 25;
var escCode = 27;

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ "./src/js/App.js");

var app = new _App__WEBPACK_IMPORTED_MODULE_0__["default"]();
app.run();

/***/ }),

/***/ "./src/js/templates/bigpicture.js":
/*!****************************************!*\
  !*** ./src/js/templates/bigpicture.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var bigPictureTemplate = function bigPictureTemplate(data) {
  var url = data.url,
      comments = data.comments,
      description = data.description,
      likes = data.likes;
  return "<h2 class=\"big-picture__title  hidden\">\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438</h2>\n      <div class=\"big-picture__preview\">\n\n        <!-- \u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F -->\n        <div class=\"big-picture__img\">\n          <img src=\"".concat(url, "\" alt=\"\u0414\u0435\u0432\u0443\u0448\u043A\u0430 \u0432 \u043A\u0443\u043F\u0430\u043B\u044C\u043D\u0438\u043A\u0435\" width=\"600\" height=\"600\">\n        </div>\n\n        <!-- \u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E\u0431 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0438. \u041F\u043E\u0434\u043F\u0438\u0441\u044C, \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438, \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043B\u0430\u0439\u043A\u043E\u0432 -->\n        <div class=\"big-picture__social  social\">\n          <div class=\"social__header\">\n            <img class=\"social__picture\" src=\"img/avatar-1.svg\" alt=\"\u0410\u0432\u0430\u0442\u0430\u0440 \u0430\u0432\u0442\u043E\u0440\u0430 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438\" width=\"35\" height=\"35\">\n            <p class=\"social__caption\">").concat(description, "</p>\n            <p class=\"social__likes\">\u041D\u0440\u0430\u0432\u0438\u0442\u0441\u044F <span class=\"likes-count\">").concat(likes, "</span></p>\n          </div>\n\n          <!-- \u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438 \u043A \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044E -->\n          <div class=\"social__comment-count\">5 \u0438\u0437 <span class=\"comments-count\">").concat(comments.length, "</span> \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0435\u0432</div>\n          <ul class=\"social__comments\">\n          \n          </ul>\n\n          <!-- \u041A\u043D\u043E\u043F\u043A\u0430 \u0434\u043B\u044F \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u043D\u043E\u0432\u043E\u0439 \u043F\u043E\u0440\u0446\u0438\u0438 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0435\u0432 -->\n          <button type=\"button\" class=\"social__comments-loader  comments-loader\">\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0435\u0449\u0435</button>\n\n          <!-- \u0424\u043E\u0440\u043C\u0430 \u0434\u043B\u044F \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u044F -->\n          <div class=\"social__footer\">\n            <img class=\"social__picture\" src=\"img/avatar-6.svg\" alt=\"\u0410\u0432\u0430\u0442\u0430\u0440 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0442\u043E\u0440\u0430 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438\" width=\"35\" height=\"35\">\n            <input type=\"text\" class=\"social__footer-text\" placeholder=\"\u0412\u0430\u0448 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439...\">\n            <button type=\"button\" class=\"social__footer-btn\" name=\"button\">\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C</button>\n          </div>\n        </div>\n\n        <!-- \u041A\u043D\u043E\u043F\u043A\u0430 \u0434\u043B\u044F \u0432\u044B\u0445\u043E\u0434\u0430 \u0438\u0437 \u043F\u043E\u043B\u043D\u043E\u044D\u043A\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F -->\n        <button type=\"reset\" class=\"big-picture__cancel  cancel\" id=\"picture-cancel\">\u0417\u0430\u043A\u0440\u044B\u0442\u044C</button>");
};

/* harmony default export */ __webpack_exports__["default"] = (bigPictureTemplate);

/***/ }),

/***/ "./src/js/templates/comment.js":
/*!*************************************!*\
  !*** ./src/js/templates/comment.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var commentTemplate = function commentTemplate(comment) {
  var avatar = comment.avatar,
      message = comment.message;
  return "<li class=\"social__comment\">\n<img class=\"social__picture\" src=\"".concat(avatar, "\" alt=\"\u0410\u0432\u0430\u0442\u0430\u0440 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0442\u043E\u0440\u0430 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438\" width=\"35\" height=\"35\">\n<p class=\"social__text\">").concat(message, "</p>\n</li>");
};

/* harmony default export */ __webpack_exports__["default"] = (commentTemplate);

/***/ }),

/***/ "./src/js/templates/filters.js":
/*!*************************************!*\
  !*** ./src/js/templates/filters.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var filtersTemplate = function filtersTemplate() {
  return "\n<h2 class=\"img-filters__title  visually-hidden\">\u0424\u0438\u043B\u044C\u0442\u0440 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0439</h2>\n      <form class=\"img-filters__form\" action=\"index.html\" method=\"get\" autocomplete=\"off\">\n        <button type=button class=\"img-filters__button  img-filters__button--active\" id=\"filter-popular\">\u041F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0435</button>\n        <button type=button class=\"img-filters__button\" id=\"filter-new\">\u041D\u043E\u0432\u044B\u0435</button>\n        <button type=button class=\"img-filters__button\" id=\"filter-discussed\">\u041E\u0431\u0441\u0443\u0436\u0434\u0430\u0435\u043C\u044B\u0435</button>\n      </form>";
};

/* harmony default export */ __webpack_exports__["default"] = (filtersTemplate);

/***/ }),

/***/ "./src/js/templates/form.js":
/*!**********************************!*\
  !*** ./src/js/templates/form.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var formTemplate = function formTemplate() {
  return " <div class=\"img-upload__wrapper\">\n      <div class=\"img-upload__preview-container\">\n\n        <!-- \u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u0440\u0430\u0437\u043C\u0435\u0440\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F -->\n        <fieldset class=\"img-upload__scale  scale\">\n          <button type=\"button\" class=\"scale__control  scale__control--smaller\">\u0423\u043C\u0435\u043D\u044C\u0448\u0438\u0442\u044C</button>\n          <input type=\"text\" class=\"scale__control  scale__control--value\" value=\"100%\" title=\"Image Scale\" name=\"scale\">\n          <button type=\"button\" class=\"scale__control  scale__control--bigger\">\u0423\u0432\u0435\u043B\u0438\u0447\u0438\u0442\u044C</button>\n        </fieldset>\n\n        <!-- \u041F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F -->\n        <div class=\"img-upload__preview\">\n          <img src= \"img/upload-default-image.jpg\" alt=\"\u041F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438\" class = \"effects__preview--none\">\n        </div>\n\n        <!-- \u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u0433\u043B\u0443\u0431\u0438\u043D\u044B \u044D\u0444\u0444\u0435\u043A\u0442\u0430, \u043D\u0430\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u0435\u043C\u043E\u0433\u043E \u043D\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 -->\n        <fieldset class=\"img-upload__effect-level  effect-level hidden\">\n          <input class=\"effect-level__value\" type=\"number\" name=\"effect-level\" value=\"20\">\n          <div class=\"effect-level__line\">\n            <div class=\"effect-level__pin\" tabindex=\"0\">\u041A\u043D\u043E\u043F\u043A\u0430 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0433\u043B\u0443\u0431\u0438\u043D\u044B \u044D\u0444\u0444\u0435\u043A\u0442\u0430 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438</div>\n            <div class=\"effect-level__depth\">\u0413\u043B\u0443\u0431\u0438\u043D\u0430 \u044D\u0444\u0444\u0435\u043A\u0442\u0430 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438</div>\n          </div>\n        </fieldset>\n\n        <!-- \u041A\u043D\u043E\u043F\u043A\u0430 \u0434\u043B\u044F \u0437\u0430\u043A\u0440\u044B\u0442\u0438\u044F \u0444\u043E\u0440\u043C\u044B \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F -->\n        <button type=\"reset\" class=\"img-upload__cancel  cancel\" id=\"upload-cancel\">\u0417\u0430\u043A\u0440\u044B\u0442\u044C</button>\n      </div>\n\n      <!-- \u041D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u044D\u0444\u0444\u0435\u043A\u0442\u0430 \u043D\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 -->\n      <fieldset class=\"img-upload__effects  effects\">\n        <ul class=\"effects__list\">\n          <li class=\"effects__item\">\n            <input type=\"radio\" class=\"effects__radio  visually-hidden\" name=\"effect\" id=\"effect-none\" value=\"none\">\n            <label for=\"effect-none\" class=\"effects__label\">\n              <span class=\"effects__preview  effects__preview--none\">\u041F\u0440\u0435\u0432\u044C\u044E \u0444\u043E\u0442\u043E \u0431\u0435\u0437 \u044D\u0444\u0444\u0435\u043A\u0442\u0430</span>\n              \u041E\u0440\u0438\u0433\u0438\u043D\u0430\u043B\n            </label>\n          </li>\n          <li class=\"effects__item\">\n            <input type=\"radio\" class=\"effects__radio  visually-hidden\" name=\"effect\" id=\"effect-chrome\" value=\"chrome\">\n            <label for=\"effect-chrome\" class=\"effects__label\">\n              <span class=\"effects__preview  effects__preview--chrome\">\u041F\u0440\u0435\u0432\u044C\u044E \u044D\u0444\u0444\u0435\u043A\u0442\u0430 \u0425\u0440\u043E\u043C</span>\n              \u0425\u0440\u043E\u043C\n            </label>\n          </li>\n          <li class=\"effects__item\">\n            <input type=\"radio\" class=\"effects__radio  visually-hidden\" name=\"effect\" id=\"effect-sepia\" value=\"sepia\">\n            <label for=\"effect-sepia\" class=\"effects__label\">\n              <span class=\"effects__preview  effects__preview--sepia\">\u041F\u0440\u0435\u0432\u044C\u044E \u044D\u0444\u0444\u0435\u043A\u0442\u0430 \u0421\u0435\u043F\u0438\u044F</span>\n              \u0421\u0435\u043F\u0438\u044F\n            </label>\n          </li>\n          <li class=\"effects__item\">\n            <input type=\"radio\" class=\"effects__radio  visually-hidden\" name=\"effect\" id=\"effect-marvin\" value=\"marvin\">\n            <label for=\"effect-marvin\" class=\"effects__label\">\n              <span class=\"effects__preview  effects__preview--marvin\">\u041F\u0440\u0435\u0432\u044C\u044E \u044D\u0444\u0444\u0435\u043A\u0442\u0430 \u041C\u0430\u0440\u0432\u0438\u043D</span>\n              \u041C\u0430\u0440\u0432\u0438\u043D\n            </label>\n          </li>\n          <li class=\"effects__item\">\n            <input type=\"radio\" class=\"effects__radio  visually-hidden\" name=\"effect\" id=\"effect-phobos\" value=\"phobos\">\n            <label for=\"effect-phobos\" class=\"effects__label\">\n              <span class=\"effects__preview  effects__preview--phobos\">\u041F\u0440\u0435\u0432\u044C\u044E \u044D\u0444\u0444\u0435\u043A\u0442\u0430 \u0424\u043E\u0431\u043E\u0441</span>\n              \u0424\u043E\u0431\u043E\u0441\n            </label>\n          </li>\n          <li class=\"effects__item\">\n            <input type=\"radio\" class=\"effects__radio  visually-hidden\" name=\"effect\" id=\"effect-heat\" value=\"heat\" checked>\n            <label for=\"effect-heat\" class=\"effects__label\">\n              <span class=\"effects__preview  effects__preview--heat\">\u041F\u0440\u0435\u0432\u044C\u044E \u044D\u0444\u0444\u0435\u043A\u0442\u0430 \u0417\u043D\u043E\u0439</span>\n              \u0417\u043D\u043E\u0439\n            </label>\n          </li>\n        </ul>\n      </fieldset>\n\n      <!-- \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0445\u044D\u0448-\u0442\u0435\u0433\u043E\u0432 \u0438 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u044F \u043A \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044E -->\n      <fieldset class=\"img-upload__text text\">\n        <input class=\"text__hashtags\" name=\"hashtags\" placeholder=\"#\u0445\u044D\u0448-\u0442\u0435\u0433\">\n        <textarea class=\"text__description\" name=\"description\" placeholder=\"\u0412\u0430\u0448 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439...\"></textarea>\n      </fieldset>\n\n      <!-- \u041A\u043D\u043E\u043F\u043A\u0430 \u0434\u043B\u044F \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u0434\u0430\u043D\u043D\u044B\u0445 \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440 -->\n      <button type=\"submit\" class=\"img-upload__submit\" id=\"upload-submit\">\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C</button>\n    </div>";
};

/* harmony default export */ __webpack_exports__["default"] = (formTemplate);

/***/ }),

/***/ "./src/js/templates/index.js":
/*!***********************************!*\
  !*** ./src/js/templates/index.js ***!
  \***********************************/
/*! exports provided: pictureTemplate, bigPictureTemplate, filtersTemplate, formTemplate, successTemplate, errorTemplate, commentTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _picture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./picture */ "./src/js/templates/picture.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pictureTemplate", function() { return _picture__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _bigpicture__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bigpicture */ "./src/js/templates/bigpicture.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bigPictureTemplate", function() { return _bigpicture__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _filters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./filters */ "./src/js/templates/filters.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "filtersTemplate", function() { return _filters__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./form */ "./src/js/templates/form.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formTemplate", function() { return _form__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./messages */ "./src/js/templates/messages.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "successTemplate", function() { return _messages__WEBPACK_IMPORTED_MODULE_4__["successTemplate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "errorTemplate", function() { return _messages__WEBPACK_IMPORTED_MODULE_4__["errorTemplate"]; });

/* harmony import */ var _comment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./comment */ "./src/js/templates/comment.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "commentTemplate", function() { return _comment__WEBPACK_IMPORTED_MODULE_5__["default"]; });









/***/ }),

/***/ "./src/js/templates/messages.js":
/*!**************************************!*\
  !*** ./src/js/templates/messages.js ***!
  \**************************************/
/*! exports provided: successTemplate, errorTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "successTemplate", function() { return successTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "errorTemplate", function() { return errorTemplate; });
var successTemplate = function successTemplate() {
  return "<section class=\"success\">\n      <div class=\"success__inner\">\n        <h2 class=\"success__title\">\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E</h2>\n        <button type=\"button\" class=\"success__button\">\u041A\u0440\u0443\u0442\u043E!</button>\n      </div>\n    </section>";
};

var errorTemplate = function errorTemplate() {
  return "<section class=\"error\">\n    <div class=\"error__inner\">\n      <h2 class=\"error__title\">\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0444\u0430\u0439\u043B\u0430</h2>\n      <div class=\"error__buttons\">\n        <button type=\"button\" class=\"error__button\">\u041F\u043E\u043F\u0440\u043E\u0431\u043E\u0432\u0430\u0442\u044C \u0441\u043D\u043E\u0432\u0430</button>\n        <button type=\"button\" class=\"error__button\">\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0434\u0440\u0443\u0433\u043E\u0439 \u0444\u0430\u0439\u043B</button>\n      </div>\n    </div>\n  </section>";
};



/***/ }),

/***/ "./src/js/templates/picture.js":
/*!*************************************!*\
  !*** ./src/js/templates/picture.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var pictureTemplate = function pictureTemplate(data) {
  var url = data.url,
      comments = data.comments,
      likes = data.likes;
  return "<a href=\"#\" class=\"picture\">\n    <img class=\"picture__img\" src=\"".concat(url, "\" width=\"182\" height=\"182\" alt=\"\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u0430\u044F \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u044F\">\n    <p class=\"picture__info\">\n        <span class=\"picture__comments\">").concat(comments.length, "</span>\n        <span class=\"picture__likes\">").concat(likes, "</span>\n    </p>\n</a>");
};

/* harmony default export */ __webpack_exports__["default"] = (pictureTemplate);

/***/ }),

/***/ "./src/js/views/AbstractView.js":
/*!**************************************!*\
  !*** ./src/js/views/AbstractView.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AbstarctView; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AbstarctView =
/*#__PURE__*/
function () {
  function AbstarctView(template, initData) {
    _classCallCheck(this, AbstarctView);

    this.data = initData;
    this.template = template;
  }

  _createClass(AbstarctView, [{
    key: "render",
    value: function render() {
      var template = this.template,
          data = this.data;
      var node = document.createElement('template');
      node.innerHTML = template(data);
      this.rendered = node.content;
    }
  }]);

  return AbstarctView;
}();



/***/ }),

/***/ "./src/js/views/BigPicture.js":
/*!************************************!*\
  !*** ./src/js/views/BigPicture.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BigPicture; });
/* harmony import */ var _AbstractView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractView */ "./src/js/views/AbstractView.js");
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../templates */ "./src/js/templates/index.js");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../consts */ "./src/js/consts.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var BigPicture =
/*#__PURE__*/
function (_AbstractView) {
  _inherits(BigPicture, _AbstractView);

  function BigPicture(data) {
    var _this;

    _classCallCheck(this, BigPicture);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BigPicture).call(this, _templates__WEBPACK_IMPORTED_MODULE_1__["bigPictureTemplate"], data));
    _this.body = document.querySelector('body');

    _this.render();

    return _this;
  }

  _createClass(BigPicture, [{
    key: "bind",
    value: function bind() {
      var _this2 = this;

      var closeBtn = this.rendered.querySelector('#picture-cancel');
      closeBtn.addEventListener('click', function (e) {
        _this2.remove();

        document.removeEventListener('keydown', _this2.onEscClosePicture);
      });
      this.onEscClosePicture = this.onEscClosePicture.bind(this);
      document.addEventListener('keydown', this.onEscClosePicture);
    }
  }, {
    key: "onEscClosePicture",
    value: function onEscClosePicture(evt) {
      if (evt.keyCode === _consts__WEBPACK_IMPORTED_MODULE_2__["escCode"]) {
        this.remove();
        document.removeEventListener('keydown', this.onEscClosePicture);
      }
    }
  }, {
    key: "remove",
    value: function remove() {
      this.data = null;
      this.template = null;
      this.rendered = null;
      this.container.innerHTML = '';
      this.container.classList.add('hidden');
      this.body.classList.remove('.modal-open');
      this.container = null;
    }
  }, {
    key: "append",
    value: function append(container) {
      this.container = container;
      this.container.appendChild(this.rendered);
      this.container.classList.remove('hidden');
      this.body.classList.add('.modal-open');
    }
  }]);

  return BigPicture;
}(_AbstractView__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/js/views/Comment.js":
/*!*********************************!*\
  !*** ./src/js/views/Comment.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Comment; });
/* harmony import */ var _AbstractView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractView */ "./src/js/views/AbstractView.js");
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../templates */ "./src/js/templates/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Comment =
/*#__PURE__*/
function (_AbstarctView) {
  _inherits(Comment, _AbstarctView);

  function Comment(data) {
    var _this;

    _classCallCheck(this, Comment);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Comment).call(this));
    _this.template = _templates__WEBPACK_IMPORTED_MODULE_1__["commentTemplate"];
    _this.fragment = document.createDocumentFragment();
    _this.socialComments = document.querySelector('.social__comments');
    _this.commentsLoader = document.querySelector('.social__comments-loader');
    _this.commentCount = document.querySelector('.social__comment-count');
    _this.rendered = _this.render(_templates__WEBPACK_IMPORTED_MODULE_1__["commentTemplate"], data);
    return _this;
  }

  _createClass(Comment, [{
    key: "render",
    value: function render(template, data) {
      var _this2 = this;

      data.slice(0, 5).map(function (comment) {
        var node = document.createElement('template');
        node.innerHTML = template(comment);
        _this2.rendered = node.content;

        _this2.fragment.appendChild(_this2.rendered);

        return comment;
      });
      this.socialComments.appendChild(this.fragment);
    }
  }, {
    key: "append",
    value: function append(container) {
      this.container = container;
      this.container.appendChild(this.rendered);
    }
  }, {
    key: "remove",
    value: function remove() {
      this.data = null;
      this.template = null;
      this.rendered = null;
      this.container = null;
    } // добавляет новые комменты

  }, {
    key: "addComents",
    value: function addComents(data) {
      var _this3 = this;

      var step = 5;
      var count = 5;
      this.commentsLoader.addEventListener('click', function () {
        _this3.render(_templates__WEBPACK_IMPORTED_MODULE_1__["commentTemplate"], data.slice(count, count + step));

        if (count < data.length) {
          count += step;
        }

        if (count >= data.length) {
          count = data.length;

          _this3.commentsLoader.classList.add('hidden');
        }

        _this3.commentCount.innerHTML = "".concat(count, " \u0438\u0437 <span class=\"comments-count\">").concat(data.length, "</span> \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0435\u0432");
      });
    }
  }]);

  return Comment;
}(_AbstractView__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/js/views/Effects.js":
/*!*********************************!*\
  !*** ./src/js/views/Effects.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Effects; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Effects =
/*#__PURE__*/
function () {
  function Effects() {
    _classCallCheck(this, Effects);

    this.maxX = 455;
    this.propScale = 100;
    this.step = 25;
    this.minSize = 25;
    this.maxXSize = 100;
    this.uploadFile = document.querySelector('#upload-file');
    this.imgUploadOverlay = document.querySelector('.img-upload__overlay');
    this.uploadCancel = document.querySelector('#upload-cancel');
    this.imgUploadEffects = document.querySelector('.img-upload__effects');
    this.imgUploadPreviewImg = document.querySelector('.img-upload__preview img');
    this.imgUpload = document.querySelector('.img-upload__effect-level');
    this.effectLevelDepth = document.querySelector('.effect-level__depth');
    this.previewImg = document.querySelector('.img-upload__preview img');
    this.dialogHandle = document.querySelector('.effect-level__pin');
    this.controlSmaller = document.querySelector('.scale__control--smaller');
    this.controlBigger = document.querySelector('.scale__control--bigger');
    this.controlValue = document.querySelector('.scale__control--value');
    this.effectsPreview = document.querySelectorAll('.effects__preview');
    this.Effect = {
      none: 'effects__preview--none',
      chrome: 'effects__preview--chrome',
      sepia: 'effects__preview--sepia',
      marvin: 'effects__preview--marvin',
      phobos: 'effects__preview--phobos',
      heat: 'effects__preview--heat'
    };
  }
  /* удаляет класс hidden у переданого обьекта */


  _createClass(Effects, [{
    key: "removeClass",
    value: function removeClass(obj, className) {
      obj.classList.remove(className);
    }
    /* добавляет класс hidden у переданого обьекта */

  }, {
    key: "addClass",
    value: function addClass(obj, className) {
      obj.classList.add(className);
    }
    /* загружает фото  пользователя */

  }, {
    key: "previewFile",
    value: function previewFile(elem) {
      var _this = this;

      var preview = elem;
      var file = document.querySelector('input[type=file]').files[0];
      var reader = new FileReader();

      reader.onloadend = function () {
        preview.src = reader.result;

        _this.effectsPreview.forEach(function (elem) {
          elem.style.backgroundImage = "url('".concat(reader.result, "')");
        });
      };

      if (file) {
        reader.readAsDataURL(file);
      } else {
        preview.src = '../img/upload-default-image.jpg';
        this.effectsPreview = '../img/upload-default-image.jpg';
      }
    } // изменить размер изображения

  }, {
    key: "changeSizeImg",
    value: function changeSizeImg() {
      var _this2 = this;

      this.controlSmaller.addEventListener('click', function () {
        _this2.reduceImg();
      });
      this.controlBigger.addEventListener('click', function () {
        _this2.enlargeImg();
      });
    } // уменьшает изображение

  }, {
    key: "reduceImg",
    value: function reduceImg() {
      var val = this.controlValue.value;

      if (parseInt(val) >= this.minSize && parseInt(val) <= this.maxXSize) {
        if (parseInt(val) != this.minSize) {
          this.controlValue.value = "".concat(parseInt(val) - this.step, "%");
          this.imgUploadPreviewImg.style.transform = "scale(".concat((parseInt(val) - this.step) / this.propScale, ")");
        }
      }
    } // увеличить изображение

  }, {
    key: "enlargeImg",
    value: function enlargeImg() {
      var val = this.controlValue.value;

      if (parseInt(val) >= this.minSize && parseInt(val) <= this.maxXSize) {
        if (parseInt(val) != this.maxXSize) {
          this.controlValue.value = "".concat(parseInt(val) + this.step, "%");
          this.imgUploadPreviewImg.style.transform = "scale(".concat((parseInt(val) + this.step) / this.propScale, ")");
        }
      }
    } // при переключении эффекта ставит полунок и длину линии на 100% */

  }, {
    key: "returnSliderDefault",
    value: function returnSliderDefault() {
      this.dialogHandle.style.left = "".concat(this.maxX, "px");
      this.effectLevelDepth.style.width = "".concat(this.maxX, "px");
      this.imgUploadPreviewImg.style.filter = '';
    }
    /* при переключении эфекта возвращает CSS по дефолту */

  }, {
    key: "returnDefaultEffect",
    value: function returnDefaultEffect(name) {
      var filter = this.imgUploadPreviewImg.style.filter;
      var img = this.imgUpload;

      if (name === this.Effect.chrome) {
        filter = 'grayscale(1)';
        this.removeClass(img, 'hidden');
        this.returnSliderDefault();
      } else if (name === this.Effect.sepia) {
        filter = 'sepia(1)';
        this.removeClass(img, 'hidden');
        this.returnSliderDefault();
      } else if (name === this.Effect.marvin) {
        filter = 'invert(100%)';
        this.removeClass(img, 'hidden');
        this.returnSliderDefault();
      } else if (name === this.Effect.phobos) {
        filter = 'blur(5px)';
        this.removeClass(img, 'hidden');
        this.returnSliderDefault();
      } else if (name === this.Effect.heat) {
        filter = 'brightness(3)';
        this.removeClass(img, 'hidden');
        this.returnSliderDefault();
      } else {
        //filter = '';
        this.returnSliderDefault();
        img.classList.add('hidden');
      }
    }
    /* переключает класс у переданого обьекта */

  }, {
    key: "toggleClass",
    value: function toggleClass(obj, className) {
      var classes = obj.classList;

      if (classes.length > 0) {
        classes.value = '';
        obj.classList.add(className);
        this.returnDefaultEffect(className);
      } else {
        obj.classList.add(className);
        this.returnDefaultEffect(className);
      }
    }
  }, {
    key: "addImg",
    value: function addImg() {
      var _this3 = this;

      this.uploadFile.addEventListener('change', function () {
        _this3.previewFile(_this3.imgUploadPreviewImg);
      });
    }
    /* при изменении значения поля вызывает функцию переключения эффектов */

  }, {
    key: "showEffect",
    value: function showEffect() {
      var _this4 = this;

      this.addImg();
      this.changeSizeImg();
      this.imgUploadEffects.addEventListener('change', function (evt) {
        var val = evt.target.value;

        _this4.toggleClass(_this4.imgUploadPreviewImg, _this4.Effect[val]);
      });
    }
  }]);

  return Effects;
}();



/***/ }),

/***/ "./src/js/views/Filters.js":
/*!*********************************!*\
  !*** ./src/js/views/Filters.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Filters; });
/* harmony import */ var _AbstractView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractView */ "./src/js/views/AbstractView.js");
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../templates */ "./src/js/templates/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Filters =
/*#__PURE__*/
function (_AbstractView) {
  _inherits(Filters, _AbstractView);

  function Filters() {
    var _this;

    _classCallCheck(this, Filters);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Filters).call(this, _templates__WEBPACK_IMPORTED_MODULE_1__["filtersTemplate"]));
    var imgFilters = document.querySelector('.img-filters');
    _this.container = imgFilters;

    _this.render();

    return _this;
  }

  _createClass(Filters, [{
    key: "bind",
    value: function bind() {
      var _this2 = this;

      var popular = this.rendered.querySelector('#filter-popular');
      var newFil = this.rendered.querySelector('#filter-new');
      var discussed = this.rendered.querySelector('#filter-discussed');
      popular.addEventListener('click', function () {
        _this2.onClickFilterPopular();
      });
      newFil.addEventListener('click', function () {
        _this2.onClickFilterNew();
      });
      discussed.addEventListener('click', function () {
        _this2.onClickFilterDiscussed();
      });
    }
  }, {
    key: "append",
    value: function append() {
      this.container.appendChild(this.rendered);
      this.container.classList.remove('img-filters--inactive');
    }
  }]);

  return Filters;
}(_AbstractView__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/js/views/Form.js":
/*!******************************!*\
  !*** ./src/js/views/Form.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Form; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AbstractView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractView */ "./src/js/views/AbstractView.js");
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../templates */ "./src/js/templates/index.js");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../consts */ "./src/js/consts.js");
/* harmony import */ var _Effects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Effects */ "./src/js/views/Effects.js");
/* harmony import */ var _Slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Slider */ "./src/js/views/Slider.js");
/* harmony import */ var _Message__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Message */ "./src/js/views/Message.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }










var Form =
/*#__PURE__*/
function (_AbstractView) {
  _inherits(Form, _AbstractView);

  function Form() {
    var _this;

    _classCallCheck(this, Form);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Form).call(this, _templates__WEBPACK_IMPORTED_MODULE_2__["formTemplate"]));
    var formContainer = document.querySelector('.img-upload__overlay');
    var urlSave = "https://js.dump.academy/kekstagram";
    _this.formContainer = formContainer;
    _this.urlSave = urlSave;

    _this.render();

    return _this;
  }

  _createClass(Form, [{
    key: "showForm",
    value: function showForm() {
      this.bindEsc();
      this.formContainer.classList.remove('hidden');
    } // вешает обработчики на клик 

  }, {
    key: "bind",
    value: function bind() {
      var _this2 = this;

      var closeBtn = this.rendered.querySelector('#upload-cancel');
      closeBtn.addEventListener('click', function (e) {
        document.removeEventListener('keydown', _this2.onEscCloseForm);

        _this2.remove();
      });
    } // вешает обработчики на esc

  }, {
    key: "bindEsc",
    value: function bindEsc() {
      this.onEscCloseForm = this.onEscCloseForm.bind(this);
      document.addEventListener('keydown', this.onEscCloseForm);
    } // скрывает  форму, удаляет обработчик

  }, {
    key: "onEscCloseForm",
    value: function onEscCloseForm(evt) {
      if (evt.keyCode === _consts__WEBPACK_IMPORTED_MODULE_3__["escCode"]) {
        this.remove();
        document.removeEventListener('keydown', this.onEscCloseForm);
      }
    } // скрывает форму

  }, {
    key: "remove",
    value: function remove() {
      this.container.classList.add('hidden');
      this.putDefault();
    } // подключает еффекты 

  }, {
    key: "toPlugEffects",
    value: function toPlugEffects() {
      var effect = new _Effects__WEBPACK_IMPORTED_MODULE_4__["default"]();
      effect.showEffect();
    } // активирует слайдер 

  }, {
    key: "toPlugSlider",
    value: function toPlugSlider() {
      var slider = new _Slider__WEBPACK_IMPORTED_MODULE_5__["default"]();
      slider.drag();
    } // добавляет форму в разметку

  }, {
    key: "append",
    value: function append(container) {
      var _this3 = this;

      this.container = container;
      this.container.appendChild(this.rendered);
      this.run();
      this.uploadFile.addEventListener('change', function () {
        _this3.showForm();
      });
    } //добавляет свойства которых нет на момент вызова конструктора 

  }, {
    key: "run",
    value: function run() {
      this.form = document.querySelector('#upload-select-image');
      this.textHashtags = document.querySelector('.text__hashtags');
      this.textDescription = document.querySelector('.text__description');
      this.uploadFile = document.querySelector('#upload-file');
      this.successContainer = document.querySelector('#success');
      this.errorContainer = document.querySelector('#error');
      this.imgUploadPreviewImg = document.querySelector('.img-upload__preview img');
      this.imgUpload = document.querySelector('.img-upload__effect-level');
      this.controlValue = document.querySelector('.scale__control--value');
      this.toPlugEffects();
      this.bindHashtags();
      this.toPlugSlider();
      this.save();
    } // обработчик на поле хештегов

  }, {
    key: "bindHashtags",
    value: function bindHashtags() {
      var _this4 = this;

      this.textHashtags.addEventListener('change', function (evt) {
        var val = evt.target.value; //this.validity(val);

        _this4.validityHeshtags(val);
      });
    } // очищает поля формы после загрузки

  }, {
    key: "putDefault",
    value: function putDefault() {
      this.uploadFile.value = '';
      this.textHashtags.value = '';
      this.textHashtags.style.border = '';
      this.textDescription.value = '';
      this.imgUploadPreviewImg.style.filter = '';
      this.imgUploadPreviewImg.style.transform = '';
      this.controlValue.value = '100%';
      var classes = this.imgUploadPreviewImg.classList;
      classes.value = 'effects__preview--none';
      this.imgUpload.classList.add('hidden');
    } // создает сообщение успешной отправки формы

  }, {
    key: "renderMessageSuccess",
    value: function renderMessageSuccess() {
      this.remove();
      document.removeEventListener('keydown', this.onEscCloseForm);
      var success = new _Message__WEBPACK_IMPORTED_MODULE_6__["default"](_templates__WEBPACK_IMPORTED_MODULE_2__["successTemplate"]);
      success.bindSuccess();
      success.append(this.successContainer);
    } // создает сообщение неуспешной отправки формы

  }, {
    key: "renderMessageError",
    value: function renderMessageError() {
      this.remove();
      document.removeEventListener('keydown', this.onEscCloseForm);
      var error = new _Message__WEBPACK_IMPORTED_MODULE_6__["default"](_templates__WEBPACK_IMPORTED_MODULE_2__["errorTemplate"]);
      error.bindError();
      error.append(this.errorContainer);
    } //валидация хештегов

  }, {
    key: "validityHeshtags",
    value: function validityHeshtags(items) {
      var max = 20;
      var min = 2;
      var maxLength = 5;
      var fs = '#';
      var valid = true; // подготовка к валидации

      var filter = items.trim().split(' ').filter(function (item) {
        return item !== '';
      }).map(function (item) {
        return item.toUpperCase();
      });

      var _set = new Set(filter);

      var _filter = _toConsumableArray(_set);

      switch (valid) {
        case _filter.length !== filter.length:
          valid = false;
          this.validity(valid);
          break;

        case filter.some(function (item) {
          return item.lenght > max || item.lenght < min;
        }):
          valid = false;
          this.validity(valid);
          break;

        case filter.some(function (item) {
          return item[0] !== fs;
        }):
          valid = false;
          this.validity(valid);
          break;

        case filter.length > maxLength:
          valid = false;
          this.validity(valid);
          break;

        default:
          this.validity(valid);
      }
    }
  }, {
    key: "validity",
    value: function validity(val) {
      if (val) {
        this.textHashtags.style.border = '';
        this.textHashtags.setCustomValidity('');
      } else {
        this.textHashtags.style.border = '2px solid red';
        this.textHashtags.setCustomValidity('Хештег должен начинаться с #, иметь длину меньше 20 и больше 2 символов, допускается 5 разных хештегов');
      }
    }
    /* отправляет данные формы на сервер  */

  }, {
    key: "request",
    value: function request(formdata) {
      var _this5 = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(this.urlSave, formdata).then(function (response) {
        _this5.renderMessageSuccess();
      }).catch(function (err) {
        _this5.renderMessageError();
      });
    }
  }, {
    key: "save",
    value: function save() {
      var _this6 = this;

      this.form.addEventListener('submit', function (evt) {
        evt.preventDefault();
        var formData = new FormData(_this6.form);

        _this6.request(formData);
      });
    }
  }]);

  return Form;
}(_AbstractView__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ }),

/***/ "./src/js/views/Message.js":
/*!*********************************!*\
  !*** ./src/js/views/Message.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Message; });
/* harmony import */ var _AbstractView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractView */ "./src/js/views/AbstractView.js");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../consts */ "./src/js/consts.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Message =
/*#__PURE__*/
function (_AbstractView) {
  _inherits(Message, _AbstractView);

  function Message(template) {
    var _this;

    _classCallCheck(this, Message);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Message).call(this, template));

    _this.render();

    return _this;
  }

  _createClass(Message, [{
    key: "onEscCloseMessage",
    value: function onEscCloseMessage(evt) {
      if (evt.keyCode === _consts__WEBPACK_IMPORTED_MODULE_1__["escCode"]) {
        this.remove();
        document.removeEventListener('keydown', this.onEscCloseMessage);
      }
    }
  }, {
    key: "bindSuccess",
    value: function bindSuccess() {
      var _this2 = this;

      var closeBtn = this.rendered.querySelector('.success__button');
      closeBtn.addEventListener('click', function (e) {
        document.removeEventListener('keydown', _this2.onEscCloseMessage);

        _this2.remove();
      });
      this.onEscCloseMessage = this.onEscCloseMessage.bind(this);
      document.addEventListener('keydown', this.onEscCloseMessage);
    }
  }, {
    key: "bindError",
    value: function bindError() {
      var _this3 = this;

      var closeBtns = this.rendered.querySelectorAll('.error__button');
      closeBtns.forEach(function (elem) {
        elem.addEventListener('click', function (e) {
          _this3.remove();
        });
      });
      this.onEscCloseMessage = this.onEscCloseMessage.bind(this);
      document.addEventListener('keydown', this.onEscCloseMessage);
    }
  }, {
    key: "remove",
    value: function remove() {
      this.template = null;
      this.rendered = null;
      this.container.innerHTML = '';
      this.container = null;
    }
  }, {
    key: "append",
    value: function append(container) {
      this.container = container;
      this.container.appendChild(this.rendered);
    }
  }]);

  return Message;
}(_AbstractView__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/js/views/Picture.js":
/*!*********************************!*\
  !*** ./src/js/views/Picture.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Picture; });
/* harmony import */ var _AbstractView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractView */ "./src/js/views/AbstractView.js");
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../templates */ "./src/js/templates/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Picture =
/*#__PURE__*/
function (_AbstractView) {
  _inherits(Picture, _AbstractView);

  function Picture(data) {
    var _this;

    _classCallCheck(this, Picture);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Picture).call(this, _templates__WEBPACK_IMPORTED_MODULE_1__["pictureTemplate"], data));

    _this.render();

    return _this;
  }

  _createClass(Picture, [{
    key: "bind",
    value: function bind() {
      var _this2 = this;

      var pic = this.rendered.querySelector('a');
      pic.addEventListener('click', function () {
        _this2.onClick();
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      this.data = null;
      this.template = null;
      this.rendered = null;
      this.container = null;
    }
  }, {
    key: "append",
    value: function append(container) {
      this.container = container;
      this.container.appendChild(this.rendered);
    }
  }]);

  return Picture;
}(_AbstractView__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/js/views/Slider.js":
/*!********************************!*\
  !*** ./src/js/views/Slider.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Slider; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Slider =
/*#__PURE__*/
function () {
  function Slider() {
    _classCallCheck(this, Slider);
  }

  _createClass(Slider, [{
    key: "drag",
    value: function drag() {
      var dialogHandle = document.querySelector('.effect-level__pin');
      var effectLevelValue = document.querySelector('.effect-level__value');
      var effectLevelDepth = document.querySelector('.effect-level__depth');
      var previewImg = document.querySelector('.img-upload__preview img');
      var onePx = 46;
      var propoption = 10;
      var propPhobos = 2;
      var propHeat = 153;
      var startCoords = {};
      var dragged = '';
      var maxX = 455;
      var minX = 5;
      var Effect = {
        none: 'effects__preview--none',
        chrome: 'effects__preview--chrome',
        sepia: 'effects__preview--sepia',
        marvin: 'effects__preview--marvin',
        phobos: 'effects__preview--phobos',
        heat: 'effects__preview--heat'
      };

      function filterChrome() {
        var grayscale = Math.round(effectLevelValue.value / onePx) / propoption;
        previewImg.style.filter = "grayscale(".concat(grayscale, ")");
      }

      function filterSepia() {
        var sepia = Math.round(effectLevelValue.value / onePx) / propoption;
        previewImg.style.filter = "sepia(".concat(sepia, ")");
      }

      function filterMarvin() {
        var marvin = Math.round(effectLevelValue.value / onePx * propoption);
        previewImg.style.filter = "invert(".concat(marvin, "%)");
      }

      function filterPhobos() {
        var phobos = Math.round(effectLevelValue.value / onePx / propPhobos);
        previewImg.style.filter = "blur(".concat(phobos, "px)");
      }

      function filterHeat() {
        var heat;

        if (effectLevelValue.value <= propHeat) {
          heat = 1;
        } else if (effectLevelValue.value > propHeat && effectLevelValue.value <= propHeat * 2) {
          heat = 2;
        } else {
          heat = 3;
        }

        previewImg.style.filter = "brightness(".concat(heat, ")");
      }
      /* применяет нужный фильтр определяя класс */


      function howClass() {
        switch (previewImg.className) {
          case Effect.chrome:
            filterChrome();
            break;

          case Effect.sepia:
            filterSepia();
            break;

          case Effect.marvin:
            filterMarvin();
            break;

          case Effect.phobos:
            filterPhobos();
            break;

          case Effect.heat:
            filterHeat();
            break;

          default:
            previewImg.style.filter = '';
        }
      }
      /* изменение положения ползунка слайдера */


      function moveSlider(move) {
        effectLevelValue.value = move;
        effectLevelDepth.style.width = "".concat(move, "px");
        howClass();
      }
      /* двигает ползунок */


      function onMouseMove(evt) {
        var moveEvt = evt;
        moveEvt.preventDefault();
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        if (dialogHandle.offsetLeft - shift.x <= minX) {
          dialogHandle.style.left = "".concat(minX, "px");
        } else if (dialogHandle.offsetLeft - shift.x >= maxX) {
          dialogHandle.style.left = "".concat(maxX, "px");
        } else {
          dialogHandle.style.left = "".concat(dialogHandle.offsetLeft - shift.x, "px");
        }

        dialogHandle.style.top = '2px';
        moveSlider(dialogHandle.offsetLeft - shift.x);
      }

      function onMouseUp(upEvt) {
        upEvt.preventDefault();

        if (dragged) {
          var onClickPreventDefault = function onClickPreventDefault(evt) {
            evt.preventDefault();
            dialogHandle.removeEventListener('click', function () {
              return onClickPreventDefault();
            });
          };

          dialogHandle.addEventListener('click', function () {
            return onClickPreventDefault();
          });
        }

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      function onMouseDown(evt) {
        evt.preventDefault();
        startCoords = {
          x: evt.clientX,
          y: evt.clientY
        };
        dragged = false;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      }

      dialogHandle.addEventListener('mousedown', function (e) {
        onMouseDown(e);
      });
    }
  }]);

  return Slider;
}();



/***/ }),

/***/ "./src/js/views/index.js":
/*!*******************************!*\
  !*** ./src/js/views/index.js ***!
  \*******************************/
/*! exports provided: Picture, BigPicture, Filters, Form, Effects, Slider, Comment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Picture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Picture */ "./src/js/views/Picture.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Picture", function() { return _Picture__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _BigPicture__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BigPicture */ "./src/js/views/BigPicture.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BigPicture", function() { return _BigPicture__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Filters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Filters */ "./src/js/views/Filters.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Filters", function() { return _Filters__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Form */ "./src/js/views/Form.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Form", function() { return _Form__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _Effects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Effects */ "./src/js/views/Effects.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Effects", function() { return _Effects__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _Slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Slider */ "./src/js/views/Slider.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Slider", function() { return _Slider__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _Comment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Comment */ "./src/js/views/Comment.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Comment", function() { return _Comment__WEBPACK_IMPORTED_MODULE_6__["default"]; });










/***/ }),

/***/ 0:
/*!**************************************************************************!*\
  !*** multi ./src/css/normalize.css ./src/css/style.css ./src/js/main.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/css/normalize.css */"./src/css/normalize.css");
__webpack_require__(/*! ./src/css/style.css */"./src/css/style.css");
module.exports = __webpack_require__(/*! ./src/js/main.js */"./src/js/main.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idG9hLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nzcy9ub3JtYWxpemUuY3NzPzAwMWMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nzcy9zdHlsZS5jc3M/MTgxZSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvQXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb25zdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3RlbXBsYXRlcy9iaWdwaWN0dXJlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy90ZW1wbGF0ZXMvY29tbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdGVtcGxhdGVzL2ZpbHRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3RlbXBsYXRlcy9mb3JtLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy90ZW1wbGF0ZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3RlbXBsYXRlcy9tZXNzYWdlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdGVtcGxhdGVzL3BpY3R1cmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXdzL0Fic3RyYWN0Vmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlld3MvQmlnUGljdHVyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlld3MvQ29tbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlld3MvRWZmZWN0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlld3MvRmlsdGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlld3MvRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlld3MvTWVzc2FnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlld3MvUGljdHVyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlld3MvU2xpZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3cy9pbmRleC5qcyJdLCJuYW1lcyI6WyJBcHAiLCJwaWN0dXJlc0NvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImJpZ3BpY0NvbnRhaW5lciIsImZvcm1Db250YWluZXIiLCJ1cmxMb2FkIiwiZGF0YSIsInBpY3MiLCJzdGF0ZSIsImF4aW9zIiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwicmVuZGVyUGljcyIsImNhdGNoIiwiZXJyIiwiY29uc29sZSIsImxvZyIsInRvUmVuZGVyIiwiZnJhZ21lbnQiLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwibWFwIiwicGljdHVyZSIsIlBpY3R1cmUiLCJvbkNsaWNrIiwicmVuZGVyQmlnUGljdHVyZSIsImJpbmQiLCJhcHBlbmQiLCJyZW1vdmVQaWNzIiwiYXBwZW5kQ2hpbGQiLCJmb3JFYWNoIiwicGljIiwicmVtb3ZlIiwicXVlcnlTZWxlY3RvckFsbCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImJpZ3BpYyIsIkJpZ1BpY3R1cmUiLCJyZW5kZXJDb21lbnRzIiwiY29tbWVudHMiLCJjb21tZW50IiwiQ29tbWVudCIsImFkZENvbWVudHMiLCJwb3BzIiwic2xpY2UiLCJuZXdQaG90byIsImRpc2N1c3NlZCIsInNvcnQiLCJhIiwiYiIsImxpa2VzIiwicmV2ZXJzZSIsImZvcm0iLCJGb3JtIiwibG9hZCIsImZpbHRlcnMiLCJGaWx0ZXJzIiwib25DbGlja0ZpbHRlclBvcHVsYXIiLCJvbkNsaWNrRmlsdGVyTmV3Iiwib25DbGlja0ZpbHRlckRpc2N1c3NlZCIsInJlbmRlckZvcm0iLCJORVdOVU0iLCJjb21tZW50c0FycmF5IiwiZGVzY3JpcHRpb25zIiwiTnVtIiwiZXNjQ29kZSIsImFwcCIsInJ1biIsImJpZ1BpY3R1cmVUZW1wbGF0ZSIsInVybCIsImRlc2NyaXB0aW9uIiwibGVuZ3RoIiwiY29tbWVudFRlbXBsYXRlIiwiYXZhdGFyIiwibWVzc2FnZSIsImZpbHRlcnNUZW1wbGF0ZSIsImZvcm1UZW1wbGF0ZSIsInN1Y2Nlc3NUZW1wbGF0ZSIsImVycm9yVGVtcGxhdGUiLCJwaWN0dXJlVGVtcGxhdGUiLCJBYnN0YXJjdFZpZXciLCJ0ZW1wbGF0ZSIsImluaXREYXRhIiwibm9kZSIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJyZW5kZXJlZCIsImNvbnRlbnQiLCJib2R5IiwicmVuZGVyIiwiY2xvc2VCdG4iLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJvbkVzY0Nsb3NlUGljdHVyZSIsImV2dCIsImtleUNvZGUiLCJjb25zdHMiLCJjb250YWluZXIiLCJjbGFzc0xpc3QiLCJhZGQiLCJBYnN0cmFjdFZpZXciLCJzb2NpYWxDb21tZW50cyIsImNvbW1lbnRzTG9hZGVyIiwiY29tbWVudENvdW50Iiwic3RlcCIsImNvdW50IiwiRWZmZWN0cyIsIm1heFgiLCJwcm9wU2NhbGUiLCJtaW5TaXplIiwibWF4WFNpemUiLCJ1cGxvYWRGaWxlIiwiaW1nVXBsb2FkT3ZlcmxheSIsInVwbG9hZENhbmNlbCIsImltZ1VwbG9hZEVmZmVjdHMiLCJpbWdVcGxvYWRQcmV2aWV3SW1nIiwiaW1nVXBsb2FkIiwiZWZmZWN0TGV2ZWxEZXB0aCIsInByZXZpZXdJbWciLCJkaWFsb2dIYW5kbGUiLCJjb250cm9sU21hbGxlciIsImNvbnRyb2xCaWdnZXIiLCJjb250cm9sVmFsdWUiLCJlZmZlY3RzUHJldmlldyIsIkVmZmVjdCIsIm5vbmUiLCJjaHJvbWUiLCJzZXBpYSIsIm1hcnZpbiIsInBob2JvcyIsImhlYXQiLCJvYmoiLCJjbGFzc05hbWUiLCJlbGVtIiwicHJldmlldyIsImZpbGUiLCJmaWxlcyIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWRlbmQiLCJzcmMiLCJyZXN1bHQiLCJzdHlsZSIsImJhY2tncm91bmRJbWFnZSIsInJlYWRBc0RhdGFVUkwiLCJyZWR1Y2VJbWciLCJlbmxhcmdlSW1nIiwidmFsIiwidmFsdWUiLCJwYXJzZUludCIsInRyYW5zZm9ybSIsImxlZnQiLCJ3aWR0aCIsImZpbHRlciIsIm5hbWUiLCJpbWciLCJyZW1vdmVDbGFzcyIsInJldHVyblNsaWRlckRlZmF1bHQiLCJjbGFzc2VzIiwicmV0dXJuRGVmYXVsdEVmZmVjdCIsInByZXZpZXdGaWxlIiwiYWRkSW1nIiwiY2hhbmdlU2l6ZUltZyIsInRhcmdldCIsInRvZ2dsZUNsYXNzIiwiaW1nRmlsdGVycyIsInBvcHVsYXIiLCJuZXdGaWwiLCJ1cmxTYXZlIiwiYmluZEVzYyIsIm9uRXNjQ2xvc2VGb3JtIiwicHV0RGVmYXVsdCIsImVmZmVjdCIsInNob3dFZmZlY3QiLCJzbGlkZXIiLCJTbGlkZXIiLCJkcmFnIiwic2hvd0Zvcm0iLCJ0ZXh0SGFzaHRhZ3MiLCJ0ZXh0RGVzY3JpcHRpb24iLCJzdWNjZXNzQ29udGFpbmVyIiwiZXJyb3JDb250YWluZXIiLCJ0b1BsdWdFZmZlY3RzIiwiYmluZEhhc2h0YWdzIiwidG9QbHVnU2xpZGVyIiwic2F2ZSIsInZhbGlkaXR5SGVzaHRhZ3MiLCJib3JkZXIiLCJzdWNjZXNzIiwiTWVzc2FnZSIsImJpbmRTdWNjZXNzIiwiZXJyb3IiLCJiaW5kRXJyb3IiLCJpdGVtcyIsIm1heCIsIm1pbiIsIm1heExlbmd0aCIsImZzIiwidmFsaWQiLCJ0cmltIiwic3BsaXQiLCJpdGVtIiwidG9VcHBlckNhc2UiLCJfc2V0IiwiU2V0IiwiX2ZpbHRlciIsInZhbGlkaXR5Iiwic29tZSIsImxlbmdodCIsInNldEN1c3RvbVZhbGlkaXR5IiwiZm9ybWRhdGEiLCJwb3N0IiwicmVuZGVyTWVzc2FnZVN1Y2Nlc3MiLCJyZW5kZXJNZXNzYWdlRXJyb3IiLCJwcmV2ZW50RGVmYXVsdCIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJyZXF1ZXN0Iiwib25Fc2NDbG9zZU1lc3NhZ2UiLCJjbG9zZUJ0bnMiLCJlZmZlY3RMZXZlbFZhbHVlIiwib25lUHgiLCJwcm9wb3B0aW9uIiwicHJvcFBob2JvcyIsInByb3BIZWF0Iiwic3RhcnRDb29yZHMiLCJkcmFnZ2VkIiwibWluWCIsImZpbHRlckNocm9tZSIsImdyYXlzY2FsZSIsIk1hdGgiLCJyb3VuZCIsImZpbHRlclNlcGlhIiwiZmlsdGVyTWFydmluIiwiZmlsdGVyUGhvYm9zIiwiZmlsdGVySGVhdCIsImhvd0NsYXNzIiwibW92ZVNsaWRlciIsIm1vdmUiLCJvbk1vdXNlTW92ZSIsIm1vdmVFdnQiLCJzaGlmdCIsIngiLCJjbGllbnRYIiwieSIsImNsaWVudFkiLCJvZmZzZXRMZWZ0IiwidG9wIiwib25Nb3VzZVVwIiwidXBFdnQiLCJvbkNsaWNrUHJldmVudERlZmF1bHQiLCJvbk1vdXNlRG93biJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7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MVAsZ0JBQVEsQ0FBQzRGLG1CQUFULENBQTZCLFdBQTdCLEVBQTBDbUosV0FBMUM7QUFDQS9PLGdCQUFRLENBQUM0RixtQkFBVCxDQUE2QixTQUE3QixFQUF3QzRKLFNBQXhDO0FBQ0M7O0FBRUQsZUFBU0csV0FBVCxDQUFxQjdKLEdBQXJCLEVBQTBCO0FBQzFCQSxXQUFHLENBQUN3SCxjQUFKO0FBRUFXLG1CQUFXLEdBQUc7QUFDWmlCLFdBQUMsRUFBRXBKLEdBQUcsQ0FBQ3FKLE9BREs7QUFFWkMsV0FBQyxFQUFFdEosR0FBRyxDQUFDdUo7QUFGSyxTQUFkO0FBS0FuQixlQUFPLEdBQUcsS0FBVjtBQUNBbE8sZ0JBQVEsQ0FBQzBGLGdCQUFULENBQTBCLFdBQTFCLEVBQXVDcUosV0FBdkM7QUFDQS9PLGdCQUFRLENBQUMwRixnQkFBVCxDQUEwQixTQUExQixFQUFxQzhKLFNBQXJDO0FBQ0s7O0FBRURqSSxrQkFBWSxDQUFDN0IsZ0JBQWIsQ0FBOEIsV0FBOUIsRUFBMkMsVUFBQ0MsQ0FBRCxFQUFPO0FBQUVnSyxtQkFBVyxDQUFDaEssQ0FBRCxDQUFYO0FBQWdCLE9BQXBFO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9JSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL3BhcnNlSGVhZGVycycpO1xudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc1VSTFNhbWVPcmlnaW4nKTtcbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvY3JlYXRlRXJyb3InKTtcbnZhciBidG9hID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5idG9hICYmIHdpbmRvdy5idG9hLmJpbmQod2luZG93KSkgfHwgcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J0b2EnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB2YXIgbG9hZEV2ZW50ID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG4gICAgdmFyIHhEb21haW4gPSBmYWxzZTtcblxuICAgIC8vIEZvciBJRSA4LzkgQ09SUyBzdXBwb3J0XG4gICAgLy8gT25seSBzdXBwb3J0cyBQT1NUIGFuZCBHRVQgY2FsbHMgYW5kIGRvZXNuJ3QgcmV0dXJucyB0aGUgcmVzcG9uc2UgaGVhZGVycy5cbiAgICAvLyBET04nVCBkbyB0aGlzIGZvciB0ZXN0aW5nIGIvYyBYTUxIdHRwUmVxdWVzdCBpcyBtb2NrZWQsIG5vdCBYRG9tYWluUmVxdWVzdC5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICd0ZXN0JyAmJlxuICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB3aW5kb3cuWERvbWFpblJlcXVlc3QgJiYgISgnd2l0aENyZWRlbnRpYWxzJyBpbiByZXF1ZXN0KSAmJlxuICAgICAgICAhaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSB7XG4gICAgICByZXF1ZXN0ID0gbmV3IHdpbmRvdy5YRG9tYWluUmVxdWVzdCgpO1xuICAgICAgbG9hZEV2ZW50ID0gJ29ubG9hZCc7XG4gICAgICB4RG9tYWluID0gdHJ1ZTtcbiAgICAgIHJlcXVlc3Qub25wcm9ncmVzcyA9IGZ1bmN0aW9uIGhhbmRsZVByb2dyZXNzKCkge307XG4gICAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7fTtcbiAgICB9XG5cbiAgICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkIHx8ICcnO1xuICAgICAgcmVxdWVzdEhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0Lm9wZW4oY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcblxuICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGVcbiAgICByZXF1ZXN0W2xvYWRFdmVudF0gPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0IHx8IChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQgJiYgIXhEb21haW4pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIWNvbmZpZy5yZXNwb25zZVR5cGUgfHwgY29uZmlnLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnID8gcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIC8vIElFIHNlbmRzIDEyMjMgaW5zdGVhZCBvZiAyMDQgKGh0dHBzOi8vZ2l0aHViLmNvbS9heGlvcy9heGlvcy9pc3N1ZXMvMjAxKVxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzID09PSAxMjIzID8gMjA0IDogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzID09PSAxMjIzID8gJ05vIENvbnRlbnQnIDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdOZXR3b3JrIEVycm9yJywgY29uZmlnLCBudWxsLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcigndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICB2YXIgY29va2llcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb29raWVzJyk7XG5cbiAgICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgICAgdmFyIHhzcmZWYWx1ZSA9IChjb25maWcud2l0aENyZWRlbnRpYWxzIHx8IGlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID9cbiAgICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgICAgdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzW2NvbmZpZy54c3JmSGVhZGVyTmFtZV0gPSB4c3JmVmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMsIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0RGF0YSA9PT0gJ3VuZGVmaW5lZCcgJiYga2V5LnRvTG93ZXJDYXNlKCkgPT09ICdjb250ZW50LXR5cGUnKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1trZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyd2lzZSBhZGQgaGVhZGVyIHRvIHRoZSByZXF1ZXN0XG4gICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEV4cGVjdGVkIERPTUV4Y2VwdGlvbiB0aHJvd24gYnkgYnJvd3NlcnMgbm90IGNvbXBhdGlibGUgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMi5cbiAgICAgICAgLy8gQnV0LCB0aGlzIGNhbiBiZSBzdXBwcmVzc2VkIGZvciAnanNvbicgdHlwZSBhcyBpdCBjYW4gYmUgcGFyc2VkIGJ5IGRlZmF1bHQgJ3RyYW5zZm9ybVJlc3BvbnNlJyBmdW5jdGlvbi5cbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVqZWN0KGNhbmNlbCk7XG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVxdWVzdERhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZSh1dGlscy5tZXJnZShkZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBDYW5jZWwobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xufTtcblxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcblxuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vLi4vZGVmYXVsdHMnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSB1dGlscy5tZXJnZSh7XG4gICAgICB1cmw6IGFyZ3VtZW50c1swXVxuICAgIH0sIGFyZ3VtZW50c1sxXSk7XG4gIH1cblxuICBjb25maWcgPSB1dGlscy5tZXJnZShkZWZhdWx0cywge21ldGhvZDogJ2dldCd9LCB0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuXG4gIC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmxcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCkge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVuaGFuY2VFcnJvciA9IHJlcXVpcmUoJy4vZW5oYW5jZUVycm9yJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBTdXBwb3J0IGJhc2VVUkwgY29uZmlnXG4gIGlmIChjb25maWcuYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChjb25maWcudXJsKSkge1xuICAgIGNvbmZpZy51cmwgPSBjb21iaW5lVVJMcyhjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gIH1cblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzIHx8IHt9XG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgcmVzcG9uc2UuZGF0YSxcbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cbiAgZXJyb3IucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gIHJldHVybiBlcnJvcjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICB2YXIgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIC8vIE5vdGU6IHN0YXR1cyBpcyBub3QgZXhwb3NlZCBieSBYRG9tYWluUmVxdWVzdFxuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChjcmVhdGVFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICBudWxsLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuXG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gYnRvYSBwb2x5ZmlsbCBmb3IgSUU8MTAgY291cnRlc3kgaHR0cHM6Ly9naXRodWIuY29tL2RhdmlkY2hhbWJlcnMvQmFzZTY0LmpzXG5cbnZhciBjaGFycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPSc7XG5cbmZ1bmN0aW9uIEUoKSB7XG4gIHRoaXMubWVzc2FnZSA9ICdTdHJpbmcgY29udGFpbnMgYW4gaW52YWxpZCBjaGFyYWN0ZXInO1xufVxuRS5wcm90b3R5cGUgPSBuZXcgRXJyb3I7XG5FLnByb3RvdHlwZS5jb2RlID0gNTtcbkUucHJvdG90eXBlLm5hbWUgPSAnSW52YWxpZENoYXJhY3RlckVycm9yJztcblxuZnVuY3Rpb24gYnRvYShpbnB1dCkge1xuICB2YXIgc3RyID0gU3RyaW5nKGlucHV0KTtcbiAgdmFyIG91dHB1dCA9ICcnO1xuICBmb3IgKFxuICAgIC8vIGluaXRpYWxpemUgcmVzdWx0IGFuZCBjb3VudGVyXG4gICAgdmFyIGJsb2NrLCBjaGFyQ29kZSwgaWR4ID0gMCwgbWFwID0gY2hhcnM7XG4gICAgLy8gaWYgdGhlIG5leHQgc3RyIGluZGV4IGRvZXMgbm90IGV4aXN0OlxuICAgIC8vICAgY2hhbmdlIHRoZSBtYXBwaW5nIHRhYmxlIHRvIFwiPVwiXG4gICAgLy8gICBjaGVjayBpZiBkIGhhcyBubyBmcmFjdGlvbmFsIGRpZ2l0c1xuICAgIHN0ci5jaGFyQXQoaWR4IHwgMCkgfHwgKG1hcCA9ICc9JywgaWR4ICUgMSk7XG4gICAgLy8gXCI4IC0gaWR4ICUgMSAqIDhcIiBnZW5lcmF0ZXMgdGhlIHNlcXVlbmNlIDIsIDQsIDYsIDhcbiAgICBvdXRwdXQgKz0gbWFwLmNoYXJBdCg2MyAmIGJsb2NrID4+IDggLSBpZHggJSAxICogOClcbiAgKSB7XG4gICAgY2hhckNvZGUgPSBzdHIuY2hhckNvZGVBdChpZHggKz0gMyAvIDQpO1xuICAgIGlmIChjaGFyQ29kZSA+IDB4RkYpIHtcbiAgICAgIHRocm93IG5ldyBFKCk7XG4gICAgfVxuICAgIGJsb2NrID0gYmxvY2sgPDwgOCB8IGNoYXJDb2RlO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnRvYTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lNDAvZ2ksICdAJykuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgY29va2llLnB1c2gobmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuXG4gICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgfSxcblxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgfVxuICAgIH07XG4gIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGRcXCtcXC1cXC5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBoYXZlIGZ1bGwgc3VwcG9ydCBvZiB0aGUgQVBJcyBuZWVkZWQgdG8gdGVzdFxuICAvLyB3aGV0aGVyIHRoZSByZXF1ZXN0IFVSTCBpcyBvZiB0aGUgc2FtZSBvcmlnaW4gYXMgY3VycmVudCBsb2NhdGlvbi5cbiAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgdmFyIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIHZhciBvcmlnaW5VUkw7XG5cbiAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICBmdW5jdGlvbiByZXNvbHZlVVJMKHVybCkge1xuICAgICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgfVxuXG4gICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcblxuICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaHJlZjogdXJsUGFyc2luZ05vZGUuaHJlZixcbiAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgc2VhcmNoOiB1cmxQYXJzaW5nTm9kZS5zZWFyY2ggPyB1cmxQYXJzaW5nTm9kZS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgIHBvcnQ6IHVybFBhcnNpbmdOb2RlLnBvcnQsXG4gICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICB9O1xuICAgIH1cblxuICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbihyZXF1ZXN0VVJMKSB7XG4gICAgICB2YXIgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICB9O1xuICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgbm9ybWFsaXplZE5hbWUpIHtcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUgIT09IG5vcm1hbGl6ZWROYW1lICYmIG5hbWUudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZE5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgaGVhZGVyc1tub3JtYWxpemVkTmFtZV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8vIEhlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG52YXIgaWdub3JlRHVwbGljYXRlT2YgPSBbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXTtcblxuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZUhlYWRlcnMoaGVhZGVycykge1xuICB2YXIgcGFyc2VkID0ge307XG4gIHZhciBrZXk7XG4gIHZhciB2YWw7XG4gIHZhciBpO1xuXG4gIGlmICghaGVhZGVycykgeyByZXR1cm4gcGFyc2VkOyB9XG5cbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAga2V5ID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cigwLCBpKSkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKGkgKyAxKSk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2YuaW5kZXhPZihrZXkpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gKHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gOiBbXSkuY29uY2F0KFt2YWxdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gcGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcGFyc2VkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIGlzQnVmZmVyID0gcmVxdWlyZSgnaXMtYnVmZmVyJyk7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW1cbn07XG4iLCIvKiFcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCdWZmZXJcbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cHM6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbi8vIFRoZSBfaXNCdWZmZXIgY2hlY2sgaXMgZm9yIFNhZmFyaSA1LTcgc3VwcG9ydCwgYmVjYXVzZSBpdCdzIG1pc3Npbmdcbi8vIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgKGlzQnVmZmVyKG9iaikgfHwgaXNTbG93QnVmZmVyKG9iaikgfHwgISFvYmouX2lzQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiAhIW9iai5jb25zdHJ1Y3RvciAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG5cbi8vIEZvciBOb2RlIHYwLjEwIHN1cHBvcnQuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG5mdW5jdGlvbiBpc1Nsb3dCdWZmZXIgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iai5yZWFkRmxvYXRMRSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnNsaWNlID09PSAnZnVuY3Rpb24nICYmIGlzQnVmZmVyKG9iai5zbGljZSgwLCAwKSlcbn1cbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgUGljdHVyZSwgQmlnUGljdHVyZSwgRmlsdGVycywgRm9ybSwgQ29tbWVudCB9IGZyb20gJy4vdmlld3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBwaWN0dXJlc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5waWN0dXJlcycpO1xuICAgIGNvbnN0IGJpZ3BpY0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iaWctcGljdHVyZScpO1xuICAgIGNvbnN0IGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nLXVwbG9hZF9fb3ZlcmxheScpO1xuICAgIGNvbnN0IHVybExvYWQgPSAnaHR0cHM6Ly9qcy5kdW1wLmFjYWRlbXkva2Vrc3RhZ3JhbS9kYXRhJztcbiAgICBjb25zdCBkYXRhID0gW107XG4gICAgY29uc3QgcGljcyA9IFtdO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBiaWdwaWNDb250YWluZXIsXG4gICAgICBwaWN0dXJlc0NvbnRhaW5lcixcbiAgICAgIGZvcm1Db250YWluZXIsXG4gICAgICB1cmxMb2FkLFxuICAgICAgZGF0YSxcbiAgICAgIHBpY3MsXG4gICAgfTtcbiAgfVxuXG4gIGxvYWQoKSB7XG4gICAgYXhpb3MuZ2V0KHRoaXMuc3RhdGUudXJsTG9hZClcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmRhdGEpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge3RoaXMuc3RhdGUuZGF0YSA9IGRhdGE7IHRoaXMucmVuZGVyUGljcyhbLi4uZGF0YV0pOyB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHsgY29uc29sZS5sb2coZXJyKX0pO1xuICB9XG5cbiAgcmVuZGVyUGljcyh0b1JlbmRlcikge1xuICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIHRoaXMuc3RhdGUucGljcyA9IHRvUmVuZGVyLm1hcCgoZGF0YSkgPT4ge1xuICAgICAgY29uc3QgcGljdHVyZSA9IG5ldyBQaWN0dXJlKGRhdGEpO1xuICAgICAgcGljdHVyZS5vbkNsaWNrID0gdGhpcy5yZW5kZXJCaWdQaWN0dXJlLmJpbmQodGhpcywgZGF0YSk7XG4gICAgICBwaWN0dXJlLmJpbmQoKTtcbiAgICAgIHBpY3R1cmUuYXBwZW5kKGZyYWdtZW50KTtcbiAgICAgIHJldHVybiBwaWN0dXJlO1xuICAgICAgXG4gICAgfSk7XG4gICAgdGhpcy5yZW1vdmVQaWNzKCk7XG4gICAgdGhpcy5zdGF0ZS5waWN0dXJlc0NvbnRhaW5lci5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG4gIH1cblxuICByZW1vdmVQaWNzKCkge1xuICAgIHRoaXMuc3RhdGUucGljcy5mb3JFYWNoKChwaWMpID0+IHtcbiAgICAgIHBpYy5yZW1vdmUoKTtcbiAgICB9KTtcbiAgICB0aGlzLnN0YXRlLnBpY3MgPSBbXTtcbiAgICB0aGlzLnN0YXRlLnBpY3R1cmVzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EucGljdHVyZScpLmZvckVhY2goKHBpYykgPT4ge1xuICAgICAgcGljLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocGljKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlckJpZ1BpY3R1cmUoZGF0YSkge1xuICAgIGNvbnN0IGJpZ3BpYyA9IG5ldyBCaWdQaWN0dXJlKGRhdGEpO1xuICAgIGJpZ3BpYy5iaW5kKCk7XG4gICAgYmlncGljLmFwcGVuZCh0aGlzLnN0YXRlLmJpZ3BpY0NvbnRhaW5lcik7XG4gICAgdGhpcy5yZW5kZXJDb21lbnRzKGRhdGEuY29tbWVudHMpO1xuICB9XG5cbiAgcmVuZGVyQ29tZW50cyhkYXRhKSB7XG4gICAgY29uc3QgY29tbWVudCA9IG5ldyBDb21tZW50KGRhdGEpO1xuICAgIGNvbW1lbnQuYWRkQ29tZW50cyhkYXRhKTtcbiAgfVxuXG4gIC8vIGZpbHRlcnMgbWV0aG9kc1xuICBvbkNsaWNrRmlsdGVyUG9wdWxhcigpIHtcbiAgICBjb25zdCBwb3BzID0gdGhpcy5zdGF0ZS5kYXRhLnNsaWNlKDApO1xuICAgIHRoaXMucmVuZGVyUGljcyhwb3BzKTtcbiAgfVxuXG4gIG9uQ2xpY2tGaWx0ZXJOZXcoKSB7XG4gICAgY29uc3QgbmV3UGhvdG8gPSB0aGlzLnN0YXRlLmRhdGEuc2xpY2UoMCwgMTApO1xuICAgIHRoaXMucmVuZGVyUGljcyhuZXdQaG90byk7XG4gIH1cblxuICBvbkNsaWNrRmlsdGVyRGlzY3Vzc2VkKCkge1xuICAgIGNvbnN0IGRpc2N1c3NlZCA9IHRoaXMuc3RhdGUuZGF0YS5zbGljZSgwKTtcbiAgICBkaXNjdXNzZWQuc29ydCgoYSwgYikgPT4gYS5saWtlcyAtIGIubGlrZXMpO1xuICAgIHRoaXMucmVuZGVyUGljcyhkaXNjdXNzZWQucmV2ZXJzZSgpKTtcbiAgfVxuICBcbiAgLy8g0YHQvtC30LTQsNC10YIg0YTQvtGA0LzRgyBcbiByZW5kZXJGb3JtKCkge1xuICAgIGNvbnN0IGZvcm0gPSBuZXcgRm9ybSgpO1xuICAgIGZvcm0uYmluZCgpO1xuICAgIGZvcm0uYXBwZW5kKHRoaXMuc3RhdGUuZm9ybUNvbnRhaW5lcik7XG4gIH0gXG5cbiAgcnVuKCkge1xuICAgIHRoaXMubG9hZCgpO1xuICAgIC8vINGB0L7Qt9C00LDQtdC8INGE0LjQu9GM0YLRgNGLINC4INGA0LDQt9C80LXRidCw0LXQvCDQuNGFINC/0YDQuCDQt9Cw0L/Rg9GB0LrQtSDQv9GA0LjQu9C+0LbQtdC90LjRj1xuICAgIGNvbnN0IGZpbHRlcnMgPSBuZXcgRmlsdGVycygpO1xuICAgIGZpbHRlcnMuYmluZCgpO1xuICAgIGZpbHRlcnMuYXBwZW5kKCk7XG4gICAgLy8g0LLQtdGI0LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQutC40LpcbiAgICBmaWx0ZXJzLm9uQ2xpY2tGaWx0ZXJQb3B1bGFyID0gdGhpcy5vbkNsaWNrRmlsdGVyUG9wdWxhci5iaW5kKHRoaXMpO1xuICAgIGZpbHRlcnMub25DbGlja0ZpbHRlck5ldyA9IHRoaXMub25DbGlja0ZpbHRlck5ldy5iaW5kKHRoaXMpO1xuICAgIGZpbHRlcnMub25DbGlja0ZpbHRlckRpc2N1c3NlZCA9IHRoaXMub25DbGlja0ZpbHRlckRpc2N1c3NlZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMucmVuZGVyRm9ybSgpO1xuICB9XG4gIFxuXG59XG5cbiIsImV4cG9ydCBjb25zdCBORVdOVU0gPSAxMDtcbmV4cG9ydCBjb25zdCBjb21tZW50c0FycmF5ID0gW1xuICAn0JLRgdGRINC+0YLQu9C40YfQvdC+IScsXG4gICfQkiDRhtC10LvQvtC8INCy0YHRkSDQvdC10L/Qu9C+0YXQvi4g0J3QviDQvdC1INCy0YHRkS4nLFxuICAn0JrQvtCz0LTQsCDQstGLINC00LXQu9Cw0LXRgtC1INGE0L7RgtC+0LPRgNCw0YTQuNGOLCDRhdC+0YDQvtGI0L4g0LHRiyDRg9Cx0LjRgNCw0YLRjCDQv9Cw0LvQtdGGINC40Lcg0LrQsNC00YDQsC4g0JIg0LrQvtC90YbQtSDQutC+0L3RhtC+0LIg0Y3RgtC+INC/0YDQvtGB0YLQviDQvdC10L/RgNC+0YTQtdGB0YHQuNC+0L3QsNC70YzQvdC+LicsXG4gICfQnNC+0Y8g0LHQsNCx0YPRiNC60LAg0YHQu9GD0YfQsNC50L3QviDRh9C40YXQvdGD0LvQsCDRgSDRhNC+0YLQvtCw0L/Qv9Cw0YDQsNGC0L7QvCDQsiDRgNGD0LrQsNGFINC4INGDINC90LXRkSDQv9C+0LvRg9GH0LjQu9Cw0YHRjCDRhNC+0YLQvtCz0YDQsNGE0LjRjyDQu9GD0YfRiNC1LicsXG4gICfQryDQv9C+0YHQutC+0LvRjNC30L3Rg9C70YHRjyDQvdCwINCx0LDQvdCw0L3QvtCy0L7QuSDQutC+0LbRg9GA0LUg0Lgg0YPRgNC+0L3QuNC7INGE0L7RgtC+0LDQv9C/0LDRgNCw0YIg0L3QsCDQutC+0YLQsCDQuCDRgyDQvNC10L3RjyDQv9C+0LvRg9GH0LjQu9Cw0YHRjCDRhNC+0YLQvtCz0YDQsNGE0LjRjyDQu9GD0YfRiNC1LicsXG4gICfQm9C40YbQsCDRgyDQu9GO0LTQtdC5INC90LAg0YTQvtGC0LrQtSDQv9C10YDQtdC60L7RiNC10L3Riywg0LrQsNC6INCx0YPQtNGC0L4g0LjRhSDQuNC30LHQuNCy0LDRjtGCLiDQmtCw0Log0LzQvtC20L3QviDQsdGL0LvQviDQv9C+0LnQvNCw0YLRjCDRgtCw0LrQvtC5INC90LXRg9C00LDRh9C90YvQuSDQvNC+0LzQtdC90YI/IScsXG5dO1xuZXhwb3J0IGNvbnN0IGRlc2NyaXB0aW9ucyA9IFtcbiAgJ9Ci0LXRgdGC0LjQvCDQvdC+0LLRg9GOINC60LDQvNC10YDRgyEnLFxuICAn0JfQsNGC0YPRgdC40LvQuCDRgSDQtNGA0YPQt9GM0Y/QvNC4INC90LAg0LzQvtGA0LUpKSknLFxuICAn0JrQsNC6INC20LUg0LrRgNGD0YLQviDRgtGD0YIg0LrQvtGA0LzRj9GCIScsXG4gICfQntGC0LTRi9GF0LDQtdC8Li4u0YfRgtC+INC70LgnLFxuICAn0KbQtdC90LjRgtC1INC60LDQttC00L7QtSDQvNCz0L3QvtCy0LXQvdGM0LUuINCm0LXQvdC40YLQtSDRgtC10YUsINC60YLQviDRgNGP0LTQvtC8INGBINCy0LDQvNC4INC4INC+0YLQs9C+0L3Rj9C50YLQtSDQstGB0LUg0YHQvtC80L3QtdC90YzRjy4g0J3QtSDQvtCx0LjQttCw0LnRgtC1INCy0YHQtdGFINGB0LvQvtCy0LDQvNC4Li4uLi4uJyxcbiAgJ9CS0L7RgiDRjdGC0L4g0YLQsNGH0LrQsCEnLFxuXTtcblxuZXhwb3J0IGNvbnN0IE51bSA9IDI1O1xuZXhwb3J0IGNvbnN0IGVzY0NvZGUgPSAyNztcblxuIiwiaW1wb3J0IEFwcCBmcm9tICcuL0FwcCc7XG5cblxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuYXBwLnJ1bigpO1xuXG4iLCJjb25zdCBiaWdQaWN0dXJlVGVtcGxhdGUgPSAoZGF0YSkgPT4ge1xuICBjb25zdCB7dXJsLCBjb21tZW50cywgZGVzY3JpcHRpb24sIGxpa2VzIH0gPSBkYXRhO1xuICByZXR1cm4gYDxoMiBjbGFzcz1cImJpZy1waWN0dXJlX190aXRsZSAgaGlkZGVuXCI+0J/RgNC+0YHQvNC+0YLRgCDRhNC+0YLQvtCz0YDQsNGE0LjQuDwvaDI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYmlnLXBpY3R1cmVfX3ByZXZpZXdcIj5cblxuICAgICAgICA8IS0tINCf0YDQvtGB0LzQvtGC0YAg0LjQt9C+0LHRgNCw0LbQtdC90LjRjyAtLT5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJpZy1waWN0dXJlX19pbWdcIj5cbiAgICAgICAgICA8aW1nIHNyYz1cIiR7dXJsfVwiIGFsdD1cItCU0LXQstGD0YjQutCwINCyINC60YPQv9Cw0LvRjNC90LjQutC1XCIgd2lkdGg9XCI2MDBcIiBoZWlnaHQ9XCI2MDBcIj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPCEtLSDQmNC90YTQvtGA0LzQsNGG0LjRjyDQvtCxINC40LfQvtCx0YDQsNC20LXQvdC40LguINCf0L7QtNC/0LjRgdGMLCDQutC+0LzQvNC10L3RgtCw0YDQuNC4LCDQutC+0LvQuNGH0LXRgdGC0LLQviDQu9Cw0LnQutC+0LIgLS0+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiaWctcGljdHVyZV9fc29jaWFsICBzb2NpYWxcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic29jaWFsX19oZWFkZXJcIj5cbiAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJzb2NpYWxfX3BpY3R1cmVcIiBzcmM9XCJpbWcvYXZhdGFyLTEuc3ZnXCIgYWx0PVwi0JDQstCw0YLQsNGAINCw0LLRgtC+0YDQsCDRhNC+0YLQvtCz0YDQsNGE0LjQuFwiIHdpZHRoPVwiMzVcIiBoZWlnaHQ9XCIzNVwiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJzb2NpYWxfX2NhcHRpb25cIj4ke2Rlc2NyaXB0aW9ufTwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwic29jaWFsX19saWtlc1wiPtCd0YDQsNCy0LjRgtGB0Y8gPHNwYW4gY2xhc3M9XCJsaWtlcy1jb3VudFwiPiR7bGlrZXN9PC9zcGFuPjwvcD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDwhLS0g0JrQvtC80LzQtdC90YLQsNGA0LjQuCDQuiDQuNC30L7QsdGA0LDQttC10L3QuNGOIC0tPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzb2NpYWxfX2NvbW1lbnQtY291bnRcIj41INC40LcgPHNwYW4gY2xhc3M9XCJjb21tZW50cy1jb3VudFwiPiR7Y29tbWVudHMubGVuZ3RofTwvc3Bhbj4g0LrQvtC80LzQtdC90YLQsNGA0LjQtdCyPC9kaXY+XG4gICAgICAgICAgPHVsIGNsYXNzPVwic29jaWFsX19jb21tZW50c1wiPlxuICAgICAgICAgIFxuICAgICAgICAgIDwvdWw+XG5cbiAgICAgICAgICA8IS0tINCa0L3QvtC/0LrQsCDQtNC70Y8g0LfQsNCz0YDRg9C30LrQuCDQvdC+0LLQvtC5INC/0L7RgNGG0LjQuCDQutC+0LzQvNC10L3RgtCw0YDQuNC10LIgLS0+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzb2NpYWxfX2NvbW1lbnRzLWxvYWRlciAgY29tbWVudHMtbG9hZGVyXCI+0JfQsNCz0YDRg9C30LjRgtGMINC10YnQtTwvYnV0dG9uPlxuXG4gICAgICAgICAgPCEtLSDQpNC+0YDQvNCwINC00LvRjyDQvtGC0L/RgNCw0LLQutC4INC60L7QvNC80LXQvdGC0LDRgNC40Y8gLS0+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNvY2lhbF9fZm9vdGVyXCI+XG4gICAgICAgICAgICA8aW1nIGNsYXNzPVwic29jaWFsX19waWN0dXJlXCIgc3JjPVwiaW1nL2F2YXRhci02LnN2Z1wiIGFsdD1cItCQ0LLQsNGC0LDRgCDQutC+0LzQvNC10L3RgtCw0YLQvtGA0LAg0YTQvtGC0L7Qs9GA0LDRhNC40LhcIiB3aWR0aD1cIjM1XCIgaGVpZ2h0PVwiMzVcIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwic29jaWFsX19mb290ZXItdGV4dFwiIHBsYWNlaG9sZGVyPVwi0JLQsNGIINC60L7QvNC80LXQvdGC0LDRgNC40LkuLi5cIj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic29jaWFsX19mb290ZXItYnRuXCIgbmFtZT1cImJ1dHRvblwiPtCe0YLQv9GA0LDQstC40YLRjDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8IS0tINCa0L3QvtC/0LrQsCDQtNC70Y8g0LLRi9GF0L7QtNCwINC40Lcg0L/QvtC70L3QvtGN0LrRgNCw0L3QvdC+0LPQviDQv9GA0L7RgdC80L7RgtGA0LAg0LjQt9C+0LHRgNCw0LbQtdC90LjRjyAtLT5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwicmVzZXRcIiBjbGFzcz1cImJpZy1waWN0dXJlX19jYW5jZWwgIGNhbmNlbFwiIGlkPVwicGljdHVyZS1jYW5jZWxcIj7Ql9Cw0LrRgNGL0YLRjDwvYnV0dG9uPmA7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBiaWdQaWN0dXJlVGVtcGxhdGU7XG4iLCJjb25zdCBjb21tZW50VGVtcGxhdGUgPSAoY29tbWVudCkgPT4ge1xuICAgIGNvbnN0IHthdmF0YXIsIG1lc3NhZ2V9ID0gY29tbWVudDtcbiAgICByZXR1cm4gYDxsaSBjbGFzcz1cInNvY2lhbF9fY29tbWVudFwiPlxuPGltZyBjbGFzcz1cInNvY2lhbF9fcGljdHVyZVwiIHNyYz1cIiR7YXZhdGFyfVwiIGFsdD1cItCQ0LLQsNGC0LDRgCDQutC+0LzQvNC10L3RgtCw0YLQvtGA0LAg0YTQvtGC0L7Qs9GA0LDRhNC40LhcIiB3aWR0aD1cIjM1XCIgaGVpZ2h0PVwiMzVcIj5cbjxwIGNsYXNzPVwic29jaWFsX190ZXh0XCI+JHttZXNzYWdlfTwvcD5cbjwvbGk+YFxufVxuXG5leHBvcnQgZGVmYXVsdCBjb21tZW50VGVtcGxhdGU7IiwiY29uc3QgZmlsdGVyc1RlbXBsYXRlID0gKCkgPT4gYFxuPGgyIGNsYXNzPVwiaW1nLWZpbHRlcnNfX3RpdGxlICB2aXN1YWxseS1oaWRkZW5cIj7QpNC40LvRjNGC0YAg0YTQvtGC0L7Qs9GA0LDRhNC40Lk8L2gyPlxuICAgICAgPGZvcm0gY2xhc3M9XCJpbWctZmlsdGVyc19fZm9ybVwiIGFjdGlvbj1cImluZGV4Lmh0bWxcIiBtZXRob2Q9XCJnZXRcIiBhdXRvY29tcGxldGU9XCJvZmZcIj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPWJ1dHRvbiBjbGFzcz1cImltZy1maWx0ZXJzX19idXR0b24gIGltZy1maWx0ZXJzX19idXR0b24tLWFjdGl2ZVwiIGlkPVwiZmlsdGVyLXBvcHVsYXJcIj7Qn9C+0L/Rg9C70Y/RgNC90YvQtTwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIHR5cGU9YnV0dG9uIGNsYXNzPVwiaW1nLWZpbHRlcnNfX2J1dHRvblwiIGlkPVwiZmlsdGVyLW5ld1wiPtCd0L7QstGL0LU8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPWJ1dHRvbiBjbGFzcz1cImltZy1maWx0ZXJzX19idXR0b25cIiBpZD1cImZpbHRlci1kaXNjdXNzZWRcIj7QntCx0YHRg9C20LTQsNC10LzRi9C1PC9idXR0b24+XG4gICAgICA8L2Zvcm0+YDtcblxuZXhwb3J0IGRlZmF1bHQgZmlsdGVyc1RlbXBsYXRlO1xuIiwiY29uc3QgZm9ybVRlbXBsYXRlID0gKCkgPT4ge1xucmV0dXJuIGAgPGRpdiBjbGFzcz1cImltZy11cGxvYWRfX3dyYXBwZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbWctdXBsb2FkX19wcmV2aWV3LWNvbnRhaW5lclwiPlxuXG4gICAgICAgIDwhLS0g0JjQt9C80LXQvdC10L3QuNC1INGA0LDQt9C80LXRgNCwINC40LfQvtCx0YDQsNC20LXQvdC40Y8gLS0+XG4gICAgICAgIDxmaWVsZHNldCBjbGFzcz1cImltZy11cGxvYWRfX3NjYWxlICBzY2FsZVwiPlxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2NhbGVfX2NvbnRyb2wgIHNjYWxlX19jb250cm9sLS1zbWFsbGVyXCI+0KPQvNC10L3RjNGI0LjRgtGMPC9idXR0b24+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJzY2FsZV9fY29udHJvbCAgc2NhbGVfX2NvbnRyb2wtLXZhbHVlXCIgdmFsdWU9XCIxMDAlXCIgdGl0bGU9XCJJbWFnZSBTY2FsZVwiIG5hbWU9XCJzY2FsZVwiPlxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2NhbGVfX2NvbnRyb2wgIHNjYWxlX19jb250cm9sLS1iaWdnZXJcIj7Qo9Cy0LXQu9C40YfQuNGC0Yw8L2J1dHRvbj5cbiAgICAgICAgPC9maWVsZHNldD5cblxuICAgICAgICA8IS0tINCf0YDQtdC00LLQsNGA0LjRgtC10LvRjNC90YvQuSDQv9GA0L7RgdC80L7RgtGAINC40LfQvtCx0YDQsNC20LXQvdC40Y8gLS0+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbWctdXBsb2FkX19wcmV2aWV3XCI+XG4gICAgICAgICAgPGltZyBzcmM9IFwiaW1nL3VwbG9hZC1kZWZhdWx0LWltYWdlLmpwZ1wiIGFsdD1cItCf0YDQtdC00LLQsNGA0LjRgtC10LvRjNC90YvQuSDQv9GA0L7RgdC80L7RgtGAINGE0L7RgtC+0LPRgNCw0YTQuNC4XCIgY2xhc3MgPSBcImVmZmVjdHNfX3ByZXZpZXctLW5vbmVcIj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPCEtLSDQmNC30LzQtdC90LXQvdC40LUg0LPQu9GD0LHQuNC90Ysg0Y3RhNGE0LXQutGC0LAsINC90LDQutC70LDQtNGL0LLQsNC10LzQvtCz0L4g0L3QsCDQuNC30L7QsdGA0LDQttC10L3QuNC1IC0tPlxuICAgICAgICA8ZmllbGRzZXQgY2xhc3M9XCJpbWctdXBsb2FkX19lZmZlY3QtbGV2ZWwgIGVmZmVjdC1sZXZlbCBoaWRkZW5cIj5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJlZmZlY3QtbGV2ZWxfX3ZhbHVlXCIgdHlwZT1cIm51bWJlclwiIG5hbWU9XCJlZmZlY3QtbGV2ZWxcIiB2YWx1ZT1cIjIwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImVmZmVjdC1sZXZlbF9fbGluZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVmZmVjdC1sZXZlbF9fcGluXCIgdGFiaW5kZXg9XCIwXCI+0JrQvdC+0L/QutCwINC40LfQvNC10L3QtdC90LjRjyDQs9C70YPQsdC40L3RiyDRjdGE0YTQtdC60YLQsCDRhNC+0YLQvtCz0YDQsNGE0LjQuDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVmZmVjdC1sZXZlbF9fZGVwdGhcIj7Qk9C70YPQsdC40L3QsCDRjdGE0YTQtdC60YLQsCDRhNC+0YLQvtCz0YDQsNGE0LjQuDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2ZpZWxkc2V0PlxuXG4gICAgICAgIDwhLS0g0JrQvdC+0L/QutCwINC00LvRjyDQt9Cw0LrRgNGL0YLQuNGPINGE0L7RgNC80Ysg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRjyDQuNC30L7QsdGA0LDQttC10L3QuNGPIC0tPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJyZXNldFwiIGNsYXNzPVwiaW1nLXVwbG9hZF9fY2FuY2VsICBjYW5jZWxcIiBpZD1cInVwbG9hZC1jYW5jZWxcIj7Ql9Cw0LrRgNGL0YLRjDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDwhLS0g0J3QsNC70L7QttC10L3QuNC1INGN0YTRhNC10LrRgtCwINC90LAg0LjQt9C+0LHRgNCw0LbQtdC90LjQtSAtLT5cbiAgICAgIDxmaWVsZHNldCBjbGFzcz1cImltZy11cGxvYWRfX2VmZmVjdHMgIGVmZmVjdHNcIj5cbiAgICAgICAgPHVsIGNsYXNzPVwiZWZmZWN0c19fbGlzdFwiPlxuICAgICAgICAgIDxsaSBjbGFzcz1cImVmZmVjdHNfX2l0ZW1cIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBjbGFzcz1cImVmZmVjdHNfX3JhZGlvICB2aXN1YWxseS1oaWRkZW5cIiBuYW1lPVwiZWZmZWN0XCIgaWQ9XCJlZmZlY3Qtbm9uZVwiIHZhbHVlPVwibm9uZVwiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImVmZmVjdC1ub25lXCIgY2xhc3M9XCJlZmZlY3RzX19sYWJlbFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImVmZmVjdHNfX3ByZXZpZXcgIGVmZmVjdHNfX3ByZXZpZXctLW5vbmVcIj7Qn9GA0LXQstGM0Y4g0YTQvtGC0L4g0LHQtdC3INGN0YTRhNC10LrRgtCwPC9zcGFuPlxuICAgICAgICAgICAgICDQntGA0LjQs9C40L3QsNC7XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPGxpIGNsYXNzPVwiZWZmZWN0c19faXRlbVwiPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGNsYXNzPVwiZWZmZWN0c19fcmFkaW8gIHZpc3VhbGx5LWhpZGRlblwiIG5hbWU9XCJlZmZlY3RcIiBpZD1cImVmZmVjdC1jaHJvbWVcIiB2YWx1ZT1cImNocm9tZVwiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImVmZmVjdC1jaHJvbWVcIiBjbGFzcz1cImVmZmVjdHNfX2xhYmVsXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZWZmZWN0c19fcHJldmlldyAgZWZmZWN0c19fcHJldmlldy0tY2hyb21lXCI+0J/RgNC10LLRjNGOINGN0YTRhNC10LrRgtCwINCl0YDQvtC8PC9zcGFuPlxuICAgICAgICAgICAgICDQpdGA0L7QvFxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDxsaSBjbGFzcz1cImVmZmVjdHNfX2l0ZW1cIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBjbGFzcz1cImVmZmVjdHNfX3JhZGlvICB2aXN1YWxseS1oaWRkZW5cIiBuYW1lPVwiZWZmZWN0XCIgaWQ9XCJlZmZlY3Qtc2VwaWFcIiB2YWx1ZT1cInNlcGlhXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiZWZmZWN0LXNlcGlhXCIgY2xhc3M9XCJlZmZlY3RzX19sYWJlbFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImVmZmVjdHNfX3ByZXZpZXcgIGVmZmVjdHNfX3ByZXZpZXctLXNlcGlhXCI+0J/RgNC10LLRjNGOINGN0YTRhNC10LrRgtCwINCh0LXQv9C40Y88L3NwYW4+XG4gICAgICAgICAgICAgINCh0LXQv9C40Y9cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgICA8bGkgY2xhc3M9XCJlZmZlY3RzX19pdGVtXCI+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgY2xhc3M9XCJlZmZlY3RzX19yYWRpbyAgdmlzdWFsbHktaGlkZGVuXCIgbmFtZT1cImVmZmVjdFwiIGlkPVwiZWZmZWN0LW1hcnZpblwiIHZhbHVlPVwibWFydmluXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiZWZmZWN0LW1hcnZpblwiIGNsYXNzPVwiZWZmZWN0c19fbGFiZWxcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJlZmZlY3RzX19wcmV2aWV3ICBlZmZlY3RzX19wcmV2aWV3LS1tYXJ2aW5cIj7Qn9GA0LXQstGM0Y4g0Y3RhNGE0LXQutGC0LAg0JzQsNGA0LLQuNC9PC9zcGFuPlxuICAgICAgICAgICAgICDQnNCw0YDQstC40L1cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgICA8bGkgY2xhc3M9XCJlZmZlY3RzX19pdGVtXCI+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgY2xhc3M9XCJlZmZlY3RzX19yYWRpbyAgdmlzdWFsbHktaGlkZGVuXCIgbmFtZT1cImVmZmVjdFwiIGlkPVwiZWZmZWN0LXBob2Jvc1wiIHZhbHVlPVwicGhvYm9zXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiZWZmZWN0LXBob2Jvc1wiIGNsYXNzPVwiZWZmZWN0c19fbGFiZWxcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJlZmZlY3RzX19wcmV2aWV3ICBlZmZlY3RzX19wcmV2aWV3LS1waG9ib3NcIj7Qn9GA0LXQstGM0Y4g0Y3RhNGE0LXQutGC0LAg0KTQvtCx0L7RgTwvc3Bhbj5cbiAgICAgICAgICAgICAg0KTQvtCx0L7RgVxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDxsaSBjbGFzcz1cImVmZmVjdHNfX2l0ZW1cIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBjbGFzcz1cImVmZmVjdHNfX3JhZGlvICB2aXN1YWxseS1oaWRkZW5cIiBuYW1lPVwiZWZmZWN0XCIgaWQ9XCJlZmZlY3QtaGVhdFwiIHZhbHVlPVwiaGVhdFwiIGNoZWNrZWQ+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiZWZmZWN0LWhlYXRcIiBjbGFzcz1cImVmZmVjdHNfX2xhYmVsXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZWZmZWN0c19fcHJldmlldyAgZWZmZWN0c19fcHJldmlldy0taGVhdFwiPtCf0YDQtdCy0YzRjiDRjdGE0YTQtdC60YLQsCDQl9C90L7QuTwvc3Bhbj5cbiAgICAgICAgICAgICAg0JfQvdC+0LlcbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZmllbGRzZXQ+XG5cbiAgICAgIDwhLS0g0JTQvtCx0LDQstC70LXQvdC40LUg0YXRjdGILdGC0LXQs9C+0LIg0Lgg0LrQvtC80LzQtdC90YLQsNGA0LjRjyDQuiDQuNC30L7QsdGA0LDQttC10L3QuNGOIC0tPlxuICAgICAgPGZpZWxkc2V0IGNsYXNzPVwiaW1nLXVwbG9hZF9fdGV4dCB0ZXh0XCI+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cInRleHRfX2hhc2h0YWdzXCIgbmFtZT1cImhhc2h0YWdzXCIgcGxhY2Vob2xkZXI9XCIj0YXRjdGILdGC0LXQs1wiPlxuICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJ0ZXh0X19kZXNjcmlwdGlvblwiIG5hbWU9XCJkZXNjcmlwdGlvblwiIHBsYWNlaG9sZGVyPVwi0JLQsNGIINC60L7QvNC80LXQvdGC0LDRgNC40LkuLi5cIj48L3RleHRhcmVhPlxuICAgICAgPC9maWVsZHNldD5cblxuICAgICAgPCEtLSDQmtC90L7Qv9C60LAg0LTQu9GPINC+0YLQv9GA0LDQstC60Lgg0LTQsNC90L3Ri9GFINC90LAg0YHQtdGA0LLQtdGAIC0tPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJpbWctdXBsb2FkX19zdWJtaXRcIiBpZD1cInVwbG9hZC1zdWJtaXRcIj7QntC/0YPQsdC70LjQutC+0LLQsNGC0Yw8L2J1dHRvbj5cbiAgICA8L2Rpdj5gXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1UZW1wbGF0ZTsiLCJpbXBvcnQgcGljdHVyZVRlbXBsYXRlIGZyb20gJy4vcGljdHVyZSc7XG5pbXBvcnQgYmlnUGljdHVyZVRlbXBsYXRlIGZyb20gJy4vYmlncGljdHVyZSc7XG5pbXBvcnQgZmlsdGVyc1RlbXBsYXRlIGZyb20gJy4vZmlsdGVycyc7XG5pbXBvcnQgZm9ybVRlbXBsYXRlIGZyb20gJy4vZm9ybSc7XG5pbXBvcnQgeyBzdWNjZXNzVGVtcGxhdGUsIGVycm9yVGVtcGxhdGUgfSBmcm9tICcuL21lc3NhZ2VzJztcbmltcG9ydCBjb21tZW50VGVtcGxhdGUgZnJvbSAnLi9jb21tZW50JztcblxuZXhwb3J0IHsgcGljdHVyZVRlbXBsYXRlLCBcbiAgICAgYmlnUGljdHVyZVRlbXBsYXRlLFxuICAgICBmaWx0ZXJzVGVtcGxhdGUsIFxuICAgICBmb3JtVGVtcGxhdGUsIFxuICAgICBzdWNjZXNzVGVtcGxhdGUsXG4gICAgIGVycm9yVGVtcGxhdGUsIFxuICAgICBjb21tZW50VGVtcGxhdGV9O1xuIiwiXG5jb25zdCBzdWNjZXNzVGVtcGxhdGUgPSAoKSA9PiB7XG5yZXR1cm4gYDxzZWN0aW9uIGNsYXNzPVwic3VjY2Vzc1wiPlxuICAgICAgPGRpdiBjbGFzcz1cInN1Y2Nlc3NfX2lubmVyXCI+XG4gICAgICAgIDxoMiBjbGFzcz1cInN1Y2Nlc3NfX3RpdGxlXCI+0JjQt9C+0LHRgNCw0LbQtdC90LjQtSDRg9GB0L/QtdGI0L3QviDQt9Cw0LPRgNGD0LbQtdC90L48L2gyPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInN1Y2Nlc3NfX2J1dHRvblwiPtCa0YDRg9GC0L4hPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+YFxufVxuXG4gY29uc3QgZXJyb3JUZW1wbGF0ZSA9ICgpID0+IHtcbiAgICByZXR1cm4gYDxzZWN0aW9uIGNsYXNzPVwiZXJyb3JcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZXJyb3JfX2lubmVyXCI+XG4gICAgICA8aDIgY2xhc3M9XCJlcnJvcl9fdGl0bGVcIj7QntGI0LjQsdC60LAg0LfQsNCz0YDRg9C30LrQuCDRhNCw0LnQu9CwPC9oMj5cbiAgICAgIDxkaXYgY2xhc3M9XCJlcnJvcl9fYnV0dG9uc1wiPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImVycm9yX19idXR0b25cIj7Qn9C+0L/RgNC+0LHQvtCy0LDRgtGMINGB0L3QvtCy0LA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJlcnJvcl9fYnV0dG9uXCI+0JfQsNCz0YDRg9C30LjRgtGMINC00YDRg9Cz0L7QuSDRhNCw0LnQuzwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvc2VjdGlvbj5gXG5cbn1cbmV4cG9ydCB7IHN1Y2Nlc3NUZW1wbGF0ZSwgZXJyb3JUZW1wbGF0ZSB9OyIsIlxuY29uc3QgcGljdHVyZVRlbXBsYXRlID0gKGRhdGEpID0+IHtcbiAgY29uc3QgeyB1cmwsIGNvbW1lbnRzLCBsaWtlcyB9ID0gZGF0YTtcbiAgcmV0dXJuIGA8YSBocmVmPVwiI1wiIGNsYXNzPVwicGljdHVyZVwiPlxuICAgIDxpbWcgY2xhc3M9XCJwaWN0dXJlX19pbWdcIiBzcmM9XCIke3VybH1cIiB3aWR0aD1cIjE4MlwiIGhlaWdodD1cIjE4MlwiIGFsdD1cItCh0LvRg9GH0LDQudC90LDRjyDRhNC+0YLQvtCz0YDQsNGE0LjRj1wiPlxuICAgIDxwIGNsYXNzPVwicGljdHVyZV9faW5mb1wiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInBpY3R1cmVfX2NvbW1lbnRzXCI+JHtjb21tZW50cy5sZW5ndGh9PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInBpY3R1cmVfX2xpa2VzXCI+JHtsaWtlc308L3NwYW4+XG4gICAgPC9wPlxuPC9hPmA7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwaWN0dXJlVGVtcGxhdGU7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBYnN0YXJjdFZpZXcge1xuICBjb25zdHJ1Y3Rvcih0ZW1wbGF0ZSwgaW5pdERhdGEpIHtcbiAgICB0aGlzLmRhdGEgPSBpbml0RGF0YTtcbiAgICB0aGlzLnRlbXBsYXRlID0gdGVtcGxhdGU7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyB0ZW1wbGF0ZSwgZGF0YSB9ID0gdGhpcztcbiAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgICBub2RlLmlubmVySFRNTCA9IHRlbXBsYXRlKGRhdGEpO1xuICAgIHRoaXMucmVuZGVyZWQgPSBub2RlLmNvbnRlbnQ7XG4gIH1cblxuXG59XG4iLCJpbXBvcnQgQWJzdHJhY3RWaWV3IGZyb20gJy4vQWJzdHJhY3RWaWV3JztcbmltcG9ydCB7IGJpZ1BpY3R1cmVUZW1wbGF0ZSB9IGZyb20gJy4uL3RlbXBsYXRlcyc7XG5pbXBvcnQgKiBhcyBjb25zdHMgZnJvbSAnLi4vY29uc3RzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmlnUGljdHVyZSBleHRlbmRzIEFic3RyYWN0VmlldyB7XG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICBzdXBlcihiaWdQaWN0dXJlVGVtcGxhdGUsIGRhdGEpO1xuICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgYmluZCgpIHtcbiAgICBjb25zdCBjbG9zZUJ0biA9IHRoaXMucmVuZGVyZWQucXVlcnlTZWxlY3RvcignI3BpY3R1cmUtY2FuY2VsJyk7XG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uRXNjQ2xvc2VQaWN0dXJlICk7XG4gICAgfSk7XG4gICAgdGhpcy5vbkVzY0Nsb3NlUGljdHVyZSA9IHRoaXMub25Fc2NDbG9zZVBpY3R1cmUuYmluZCh0aGlzKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uRXNjQ2xvc2VQaWN0dXJlKTtcbiAgfVxuXG4gIG9uRXNjQ2xvc2VQaWN0dXJlKGV2dCkge1xuICAgIGlmIChldnQua2V5Q29kZSA9PT0gY29uc3RzLmVzY0NvZGUpIHtcbiAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uRXNjQ2xvc2VQaWN0dXJlICk7XG4gICB9XG4gIH1cblxuICByZW1vdmUoKSB7XG4gICAgdGhpcy5kYXRhID0gbnVsbDtcbiAgICB0aGlzLnRlbXBsYXRlID0gbnVsbDtcbiAgICB0aGlzLnJlbmRlcmVkID0gbnVsbDtcbiAgICB0aGlzLmNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnLm1vZGFsLW9wZW4nKTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gIH1cblxuICBhcHBlbmQoY29udGFpbmVyKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJlZCk7XG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoJy5tb2RhbC1vcGVuJyk7XG4gIH1cbn1cbiIsImltcG9ydCBBYnN0YXJjdFZpZXcgZnJvbSAnLi9BYnN0cmFjdFZpZXcnO1xuaW1wb3J0IHsgY29tbWVudFRlbXBsYXRlIH0gZnJvbSAnLi4vdGVtcGxhdGVzJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21tZW50IGV4dGVuZHMgQWJzdGFyY3RWaWV3IHtcbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IGNvbW1lbnRUZW1wbGF0ZTtcbiAgICB0aGlzLmZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIHRoaXMuc29jaWFsQ29tbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc29jaWFsX19jb21tZW50cycpO1xuICAgIHRoaXMuY29tbWVudHNMb2FkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc29jaWFsX19jb21tZW50cy1sb2FkZXInKTsgXG4gICAgdGhpcy5jb21tZW50Q291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc29jaWFsX19jb21tZW50LWNvdW50Jyk7XG4gICAgdGhpcy5yZW5kZXJlZCA9IHRoaXMucmVuZGVyKGNvbW1lbnRUZW1wbGF0ZSwgZGF0YSk7XG4gIH1cblxuICByZW5kZXIodGVtcGxhdGUsIGRhdGEpIHtcbiAgIGRhdGEuc2xpY2UoMCwgNSkubWFwKChjb21tZW50KSA9PiB7XG4gICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gICAgbm9kZS5pbm5lckhUTUwgPSB0ZW1wbGF0ZShjb21tZW50KTtcbiAgICB0aGlzLnJlbmRlcmVkID0gbm9kZS5jb250ZW50O1xuICAgIHRoaXMuZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJlZCk7XG4gICAgcmV0dXJuIGNvbW1lbnQ7XG4gIH0pO1xuICAgdGhpcy5zb2NpYWxDb21tZW50cy5hcHBlbmRDaGlsZCh0aGlzLmZyYWdtZW50KTtcbiAgXG4gIH1cbiAgXG4gIGFwcGVuZChjb250YWluZXIpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcmVkKTtcbiAgIFxuICB9IFxuXG4gIHJlbW92ZSgpIHtcbiAgICB0aGlzLmRhdGEgPSBudWxsO1xuICAgIHRoaXMudGVtcGxhdGUgPSBudWxsO1xuICAgIHRoaXMucmVuZGVyZWQgPSBudWxsO1xuICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgfVxuICBcbiAgLy8g0LTQvtCx0LDQstC70Y/QtdGCINC90L7QstGL0LUg0LrQvtC80LzQtdC90YLRi1xuICBhZGRDb21lbnRzKGRhdGEpIHtcbiAgbGV0IHN0ZXAgPSA1O1xuICBsZXQgY291bnQgPSA1O1xuICB0aGlzLmNvbW1lbnRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICB0aGlzLnJlbmRlcihjb21tZW50VGVtcGxhdGUsIGRhdGEuc2xpY2UoY291bnQgLCBjb3VudCArIHN0ZXApKTsgXG4gIGlmKGNvdW50IDwgZGF0YS5sZW5ndGgpIHtcbiAgICBjb3VudCArPSBzdGVwOyBcbiAgfVxuICAgIGlmKGNvdW50ID49IGRhdGEubGVuZ3RoICkge1xuICAgICAgY291bnQgPSBkYXRhLmxlbmd0aDsgXG4gICAgICB0aGlzLmNvbW1lbnRzTG9hZGVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIH0gXG4gICAgdGhpcy5jb21tZW50Q291bnQuaW5uZXJIVE1MID0gYCR7Y291bnR9INC40LcgPHNwYW4gY2xhc3M9XCJjb21tZW50cy1jb3VudFwiPiR7ZGF0YS5sZW5ndGh9PC9zcGFuPiDQutC+0LzQvNC10L3RgtCw0YDQuNC10LJgO1xuXG4gIH0pO1xufVxuICBcbn1cblxuIiwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZmZlY3RzIHtcbmNvbnN0cnVjdG9yKCkge1xudGhpcy5tYXhYID0gNDU1O1xudGhpcy5wcm9wU2NhbGUgPSAxMDA7XG50aGlzLnN0ZXAgPSAyNTtcbnRoaXMubWluU2l6ZSA9IDI1O1xudGhpcy5tYXhYU2l6ZSA9IDEwMDtcbnRoaXMudXBsb2FkRmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1cGxvYWQtZmlsZScpO1xudGhpcy5pbWdVcGxvYWRPdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZy11cGxvYWRfX292ZXJsYXknKTtcbnRoaXMudXBsb2FkQ2FuY2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VwbG9hZC1jYW5jZWwnKTtcbnRoaXMuaW1nVXBsb2FkRWZmZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWctdXBsb2FkX19lZmZlY3RzJyk7XG50aGlzLmltZ1VwbG9hZFByZXZpZXdJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nLXVwbG9hZF9fcHJldmlldyBpbWcnKTtcbnRoaXMuaW1nVXBsb2FkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZy11cGxvYWRfX2VmZmVjdC1sZXZlbCcpO1xudGhpcy5lZmZlY3RMZXZlbERlcHRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVmZmVjdC1sZXZlbF9fZGVwdGgnKTtcbnRoaXMucHJldmlld0ltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWctdXBsb2FkX19wcmV2aWV3IGltZycpO1xudGhpcy5kaWFsb2dIYW5kbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZWZmZWN0LWxldmVsX19waW4nKTtcbnRoaXMuY29udHJvbFNtYWxsZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NhbGVfX2NvbnRyb2wtLXNtYWxsZXInKTtcbnRoaXMuY29udHJvbEJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY2FsZV9fY29udHJvbC0tYmlnZ2VyJyk7XG50aGlzLmNvbnRyb2xWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY2FsZV9fY29udHJvbC0tdmFsdWUnKTtcbnRoaXMuZWZmZWN0c1ByZXZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZWZmZWN0c19fcHJldmlldycpO1xuXG50aGlzLkVmZmVjdCA9IHtcbiAgbm9uZTogJ2VmZmVjdHNfX3ByZXZpZXctLW5vbmUnLFxuICBjaHJvbWU6ICdlZmZlY3RzX19wcmV2aWV3LS1jaHJvbWUnLFxuICBzZXBpYTogJ2VmZmVjdHNfX3ByZXZpZXctLXNlcGlhJyxcbiAgbWFydmluOiAnZWZmZWN0c19fcHJldmlldy0tbWFydmluJyxcbiAgcGhvYm9zOiAnZWZmZWN0c19fcHJldmlldy0tcGhvYm9zJyxcbiAgaGVhdDogJ2VmZmVjdHNfX3ByZXZpZXctLWhlYXQnLFxufTtcbn1cblxuLyog0YPQtNCw0LvRj9C10YIg0LrQu9Cw0YHRgSBoaWRkZW4g0YMg0L/QtdGA0LXQtNCw0L3QvtCz0L4g0L7QsdGM0LXQutGC0LAgKi9cbnJlbW92ZUNsYXNzKG9iaiwgY2xhc3NOYW1lKSB7XG4gIG9iai5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG59XG5cbi8qINC00L7QsdCw0LLQu9GP0LXRgiDQutC70LDRgdGBIGhpZGRlbiDRgyDQv9C10YDQtdC00LDQvdC+0LPQviDQvtCx0YzQtdC60YLQsCAqL1xuYWRkQ2xhc3Mob2JqLCBjbGFzc05hbWUpIHtcbiAgb2JqLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbn1cblxuLyog0LfQsNCz0YDRg9C20LDQtdGCINGE0L7RgtC+ICDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y8gKi9cbnByZXZpZXdGaWxlKGVsZW0pIHtcbiAgY29uc3QgcHJldmlldyA9IGVsZW07XG4gIGNvbnN0IGZpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPWZpbGVdJykuZmlsZXNbMF07XG4gIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgcmVhZGVyLm9ubG9hZGVuZCA9ICgpID0+IHtcbiAgICBwcmV2aWV3LnNyYyA9IHJlYWRlci5yZXN1bHQ7XG4gICAgdGhpcy5lZmZlY3RzUHJldmlldy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgZWxlbS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgID1gdXJsKCcke3JlYWRlci5yZXN1bHR9JylgO1xuICB9KTtcbiAgfTtcblxuICBpZiAoZmlsZSkge1xuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICB9IGVsc2Uge1xuICAgIHByZXZpZXcuc3JjID0gJy4uL2ltZy91cGxvYWQtZGVmYXVsdC1pbWFnZS5qcGcnO1xuICAgIHRoaXMuZWZmZWN0c1ByZXZpZXcgPSAnLi4vaW1nL3VwbG9hZC1kZWZhdWx0LWltYWdlLmpwZyc7XG4gIH1cbn1cblxuLy8g0LjQt9C80LXQvdC40YLRjCDRgNCw0LfQvNC10YAg0LjQt9C+0LHRgNCw0LbQtdC90LjRj1xuY2hhbmdlU2l6ZUltZygpIHtcbiAgdGhpcy5jb250cm9sU21hbGxlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsgXG4gICAgdGhpcy5yZWR1Y2VJbWcoKVxuICB9KTtcbiAgdGhpcy5jb250cm9sQmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4geyBcbiAgICB0aGlzLmVubGFyZ2VJbWcoKTtcbiAgICB9KTtcbn1cblxuLy8g0YPQvNC10L3RjNGI0LDQtdGCINC40LfQvtCx0YDQsNC20LXQvdC40LVcbnJlZHVjZUltZygpIHtcbiAgbGV0IHZhbCA9IHRoaXMuY29udHJvbFZhbHVlLnZhbHVlO1xuICBpZihwYXJzZUludCh2YWwpID49IHRoaXMubWluU2l6ZSAmJiBwYXJzZUludCh2YWwpIDw9IHRoaXMubWF4WFNpemUpIHtcbiAgICBpZihwYXJzZUludCh2YWwpICE9IHRoaXMubWluU2l6ZSkge1xuICAgICAgdGhpcy5jb250cm9sVmFsdWUudmFsdWUgPSBgJHtwYXJzZUludCh2YWwpIC0gdGhpcy5zdGVwfSVgO1xuICAgICAgdGhpcy5pbWdVcGxvYWRQcmV2aWV3SW1nLnN0eWxlLnRyYW5zZm9ybSA9IGBzY2FsZSgkeyhwYXJzZUludCh2YWwpIC0gdGhpcy5zdGVwICkvdGhpcy5wcm9wU2NhbGV9KWBcbiAgICB9XG4gIH1cbn1cbi8vINGD0LLQtdC70LjRh9C40YLRjCDQuNC30L7QsdGA0LDQttC10L3QuNC1XG5lbmxhcmdlSW1nKCkge1xuICBsZXQgdmFsID0gdGhpcy5jb250cm9sVmFsdWUudmFsdWU7XG4gIGlmKHBhcnNlSW50KHZhbCkgPj0gdGhpcy5taW5TaXplICYmIHBhcnNlSW50KHZhbCkgPD0gdGhpcy5tYXhYU2l6ZSkge1xuICAgIGlmKHBhcnNlSW50KHZhbCkgIT0gdGhpcy5tYXhYU2l6ZSkge1xuICAgICAgdGhpcy5jb250cm9sVmFsdWUudmFsdWUgPSBgJHtwYXJzZUludCh2YWwpICsgdGhpcy5zdGVwfSVgO1xuICAgICAgdGhpcy5pbWdVcGxvYWRQcmV2aWV3SW1nLnN0eWxlLnRyYW5zZm9ybSA9IGBzY2FsZSgkeyhwYXJzZUludCh2YWwpICsgdGhpcy5zdGVwICkvIHRoaXMucHJvcFNjYWxlfSlgXG4gICAgfVxuICB9XG59XG4vLyDQv9GA0Lgg0L/QtdGA0LXQutC70Y7Rh9C10L3QuNC4INGN0YTRhNC10LrRgtCwINGB0YLQsNCy0LjRgiDQv9C+0LvRg9C90L7QuiDQuCDQtNC70LjQvdGDINC70LjQvdC40Lgg0L3QsCAxMDAlICovXG5yZXR1cm5TbGlkZXJEZWZhdWx0KCkge1xuIHRoaXMuZGlhbG9nSGFuZGxlLnN0eWxlLmxlZnQgPSBgJHt0aGlzLm1heFh9cHhgO1xuIHRoaXMuZWZmZWN0TGV2ZWxEZXB0aC5zdHlsZS53aWR0aCA9IGAke3RoaXMubWF4WH1weGA7IFxuIHRoaXMuaW1nVXBsb2FkUHJldmlld0ltZy5zdHlsZS5maWx0ZXIgPSAnJztcbn1cblxuLyog0L/RgNC4INC/0LXRgNC10LrQu9GO0YfQtdC90LjQuCDRjdGE0LXQutGC0LAg0LLQvtC30LLRgNCw0YnQsNC10YIgQ1NTINC/0L4g0LTQtdGE0L7Qu9GC0YMgKi9cbnJldHVybkRlZmF1bHRFZmZlY3QobmFtZSkge1xuICBsZXQgZmlsdGVyID0gdGhpcy5pbWdVcGxvYWRQcmV2aWV3SW1nLnN0eWxlLmZpbHRlcjtcbiAgY29uc3QgaW1nID0gdGhpcy5pbWdVcGxvYWQ7XG4gIGlmIChuYW1lID09PSB0aGlzLkVmZmVjdC5jaHJvbWUpIHtcbiAgICBmaWx0ZXIgPSAnZ3JheXNjYWxlKDEpJztcbiAgICB0aGlzLnJlbW92ZUNsYXNzKGltZywgJ2hpZGRlbicpO1xuICAgIHRoaXMucmV0dXJuU2xpZGVyRGVmYXVsdCgpOyBcbiAgfSBlbHNlIGlmIChuYW1lID09PSB0aGlzLkVmZmVjdC5zZXBpYSkge1xuICAgIGZpbHRlciA9ICdzZXBpYSgxKSc7XG4gICAgdGhpcy5yZW1vdmVDbGFzcyhpbWcsICdoaWRkZW4nKTtcbiAgICB0aGlzLnJldHVyblNsaWRlckRlZmF1bHQoKTtcbiAgfSBlbHNlIGlmIChuYW1lID09PSB0aGlzLkVmZmVjdC5tYXJ2aW4pIHtcbiAgICBmaWx0ZXIgPSAnaW52ZXJ0KDEwMCUpJztcbiAgICB0aGlzLnJlbW92ZUNsYXNzKGltZywgJ2hpZGRlbicpO1xuICAgIHRoaXMucmV0dXJuU2xpZGVyRGVmYXVsdCgpO1xuICB9IGVsc2UgaWYgKG5hbWUgPT09IHRoaXMuRWZmZWN0LnBob2Jvcykge1xuICAgIGZpbHRlciA9ICdibHVyKDVweCknO1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoaW1nLCAnaGlkZGVuJyk7XG4gICAgdGhpcy5yZXR1cm5TbGlkZXJEZWZhdWx0KCk7XG4gIH0gZWxzZSBpZiAobmFtZSA9PT0gdGhpcy5FZmZlY3QuaGVhdCkge1xuICAgIGZpbHRlciA9ICdicmlnaHRuZXNzKDMpJztcbiAgICB0aGlzLnJlbW92ZUNsYXNzKGltZywgJ2hpZGRlbicpO1xuICAgIHRoaXMucmV0dXJuU2xpZGVyRGVmYXVsdCgpO1xuICB9IGVsc2Uge1xuICAgIC8vZmlsdGVyID0gJyc7XG4gICAgdGhpcy5yZXR1cm5TbGlkZXJEZWZhdWx0KCk7XG4gICAgaW1nLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICB9XG59XG5cbi8qINC/0LXRgNC10LrQu9GO0YfQsNC10YIg0LrQu9Cw0YHRgSDRgyDQv9C10YDQtdC00LDQvdC+0LPQviDQvtCx0YzQtdC60YLQsCAqL1xudG9nZ2xlQ2xhc3Mob2JqLCBjbGFzc05hbWUpIHtcbiAgY29uc3QgY2xhc3NlcyA9IG9iai5jbGFzc0xpc3Q7XG4gIGlmIChjbGFzc2VzLmxlbmd0aCA+IDApIHtcbiAgICBjbGFzc2VzLnZhbHVlID0gJyc7XG4gICAgb2JqLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICB0aGlzLnJldHVybkRlZmF1bHRFZmZlY3QoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBvYmouY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIHRoaXMucmV0dXJuRGVmYXVsdEVmZmVjdChjbGFzc05hbWUpO1xuICB9XG59XG5cbmFkZEltZygpIHtcbiAgdGhpcy51cGxvYWRGaWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHsgXG4gICAgdGhpcy5wcmV2aWV3RmlsZSh0aGlzLmltZ1VwbG9hZFByZXZpZXdJbWcpOyB9KTtcbn1cblxuLyog0L/RgNC4INC40LfQvNC10L3QtdC90LjQuCDQt9C90LDRh9C10L3QuNGPINC/0L7Qu9GPINCy0YvQt9GL0LLQsNC10YIg0YTRg9C90LrRhtC40Y4g0L/QtdGA0LXQutC70Y7Rh9C10L3QuNGPINGN0YTRhNC10LrRgtC+0LIgKi9cbnNob3dFZmZlY3QoKSB7XG4gIHRoaXMuYWRkSW1nKCk7XG4gIHRoaXMuY2hhbmdlU2l6ZUltZygpO1xudGhpcy5pbWdVcGxvYWRFZmZlY3RzLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChldnQpID0+IHtcbiAgY29uc3QgdmFsID0gZXZ0LnRhcmdldC52YWx1ZTtcbiAgdGhpcy50b2dnbGVDbGFzcyh0aGlzLmltZ1VwbG9hZFByZXZpZXdJbWcsIHRoaXMuRWZmZWN0W3ZhbF0pO1xufSk7XG59XG5cbn1cbiIsImltcG9ydCBBYnN0cmFjdFZpZXcgZnJvbSAnLi9BYnN0cmFjdFZpZXcnO1xuaW1wb3J0IHsgZmlsdGVyc1RlbXBsYXRlIH0gZnJvbSAnLi4vdGVtcGxhdGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmlsdGVycyBleHRlbmRzIEFic3RyYWN0VmlldyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKGZpbHRlcnNUZW1wbGF0ZSk7XG4gICAgY29uc3QgaW1nRmlsdGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWctZmlsdGVycycpO1xuICAgIHRoaXMuY29udGFpbmVyID0gaW1nRmlsdGVycztcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgYmluZCgpIHtcbiAgICBjb25zdCBwb3B1bGFyID0gdGhpcy5yZW5kZXJlZC5xdWVyeVNlbGVjdG9yKCcjZmlsdGVyLXBvcHVsYXInKTtcbiAgICBjb25zdCBuZXdGaWwgPSB0aGlzLnJlbmRlcmVkLnF1ZXJ5U2VsZWN0b3IoJyNmaWx0ZXItbmV3Jyk7XG4gICAgY29uc3QgZGlzY3Vzc2VkID0gdGhpcy5yZW5kZXJlZC5xdWVyeVNlbGVjdG9yKCcjZmlsdGVyLWRpc2N1c3NlZCcpO1xuICAgIHBvcHVsYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IHRoaXMub25DbGlja0ZpbHRlclBvcHVsYXIoKTsgfSk7XG4gICAgbmV3RmlsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4geyB0aGlzLm9uQ2xpY2tGaWx0ZXJOZXcoKTsgfSk7XG4gICAgZGlzY3Vzc2VkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4geyB0aGlzLm9uQ2xpY2tGaWx0ZXJEaXNjdXNzZWQoKTsgfSk7XG4gIH1cblxuICBhcHBlbmQoKSB7XG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJlZCk7XG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaW1nLWZpbHRlcnMtLWluYWN0aXZlJyk7XG4gIH1cbn1cbiIsImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgQWJzdHJhY3RWaWV3IGZyb20gJy4vQWJzdHJhY3RWaWV3JztcbmltcG9ydCB7IGZvcm1UZW1wbGF0ZSB9IGZyb20gJy4uL3RlbXBsYXRlcyc7XG5pbXBvcnQgKiBhcyBjb25zdHMgZnJvbSAnLi4vY29uc3RzJztcbmltcG9ydCBFZmZlY3RzIGZyb20gJy4vRWZmZWN0cyc7XG5pbXBvcnQgU2xpZGVyIGZyb20gJy4vU2xpZGVyJztcbmltcG9ydCBNZXNzYWdlIGZyb20gJy4vTWVzc2FnZSc7XG5pbXBvcnQgeyBzdWNjZXNzVGVtcGxhdGUsIGVycm9yVGVtcGxhdGUgfSBmcm9tICcuLi90ZW1wbGF0ZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtIGV4dGVuZHMgQWJzdHJhY3RWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKGZvcm1UZW1wbGF0ZSk7XG4gICAgICBjb25zdCBmb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZy11cGxvYWRfX292ZXJsYXknKTtcbiAgICAgIGNvbnN0IHVybFNhdmUgPSBcImh0dHBzOi8vanMuZHVtcC5hY2FkZW15L2tla3N0YWdyYW1cIjtcbiAgICAgIHRoaXMuZm9ybUNvbnRhaW5lciA9IGZvcm1Db250YWluZXI7XG4gICAgICB0aGlzLnVybFNhdmUgPSB1cmxTYXZlO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBzaG93Rm9ybSgpIHtcbiAgICAgIHRoaXMuYmluZEVzYygpO1xuICAgICAgdGhpcy5mb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIH1cbiAgXG4gIC8vINCy0LXRiNCw0LXRgiDQvtCx0YDQsNCx0L7RgtGH0LjQutC4INC90LAg0LrQu9C40LogXG4gICAgYmluZCgpIHtcbiAgICAgIGNvbnN0IGNsb3NlQnRuID0gdGhpcy5yZW5kZXJlZC5xdWVyeVNlbGVjdG9yKCcjdXBsb2FkLWNhbmNlbCcpO1xuICAgICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbkVzY0Nsb3NlRm9ybSApO1xuICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4vLyDQstC10YjQsNC10YIg0L7QsdGA0LDQsdC+0YLRh9C40LrQuCDQvdCwIGVzY1xuYmluZEVzYygpIHtcbiAgICAgIHRoaXMub25Fc2NDbG9zZUZvcm0gPSB0aGlzLm9uRXNjQ2xvc2VGb3JtLmJpbmQodGhpcyk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbkVzY0Nsb3NlRm9ybSk7XG59XG4gICAgXG4vLyDRgdC60YDRi9Cy0LDQtdGCICDRhNC+0YDQvNGDLCDRg9C00LDQu9GP0LXRgiDQvtCx0YDQsNCx0L7RgtGH0LjQulxuICAgb25Fc2NDbG9zZUZvcm0oZXZ0KSB7XG4gIGlmIChldnQua2V5Q29kZSA9PT0gY29uc3RzLmVzY0NvZGUpIHtcbiAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25Fc2NDbG9zZUZvcm0gKTtcbiB9XG59IFxuLy8g0YHQutGA0YvQstCw0LXRgiDRhNC+0YDQvNGDXG4gICAgcmVtb3ZlKCkge1xuICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICB0aGlzLnB1dERlZmF1bHQoKTtcbiAgICB9XG5cbiAvLyDQv9C+0LTQutC70Y7Rh9Cw0LXRgiDQtdGE0YTQtdC60YLRiyBcbiAgICB0b1BsdWdFZmZlY3RzKCkge1xuICAgICAgICBjb25zdCBlZmZlY3QgPSBuZXcgRWZmZWN0cygpO1xuICAgICAgICBlZmZlY3Quc2hvd0VmZmVjdCgpO1xuICAgIH1cbi8vINCw0LrRgtC40LLQuNGA0YPQtdGCINGB0LvQsNC50LTQtdGAIFxuICAgIHRvUGx1Z1NsaWRlcigpIHtcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbmV3IFNsaWRlcigpO1xuICAgICAgICBzbGlkZXIuZHJhZygpO1xuICAgIH1cbi8vINC00L7QsdCw0LLQu9GP0LXRgiDRhNC+0YDQvNGDINCyINGA0LDQt9C80LXRgtC60YNcbiAgICBhcHBlbmQoY29udGFpbmVyKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyZWQpO1xuICAgICAgdGhpcy5ydW4oKTtcbiAgICAgIHRoaXMudXBsb2FkRmlsZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7IHRoaXMuc2hvd0Zvcm0oKSB9KTtcbiAgICB9XG5cbiAgICAgLy/QtNC+0LHQsNCy0LvRj9C10YIg0YHQstC+0LnRgdGC0LLQsCDQutC+0YLQvtGA0YvRhSDQvdC10YIg0L3QsCDQvNC+0LzQtdC90YIg0LLRi9C30L7QstCwINC60L7QvdGB0YLRgNGD0LrRgtC+0YDQsCBcbiAgICBydW4oKSB7IFxuICAgIHRoaXMuZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1cGxvYWQtc2VsZWN0LWltYWdlJyk7XG4gICAgdGhpcy50ZXh0SGFzaHRhZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dF9faGFzaHRhZ3MnKTtcbiAgICB0aGlzLnRleHREZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0X19kZXNjcmlwdGlvbicpO1xuICAgIHRoaXMudXBsb2FkRmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1cGxvYWQtZmlsZScpO1xuICAgIHRoaXMuc3VjY2Vzc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdWNjZXNzJyk7XG4gICAgdGhpcy5lcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlcnJvcicpO1xuICAgIHRoaXMuaW1nVXBsb2FkUHJldmlld0ltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWctdXBsb2FkX19wcmV2aWV3IGltZycpO1xuICAgIHRoaXMuaW1nVXBsb2FkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZy11cGxvYWRfX2VmZmVjdC1sZXZlbCcpO1xuICAgIHRoaXMuY29udHJvbFZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjYWxlX19jb250cm9sLS12YWx1ZScpO1xuICAgIHRoaXMudG9QbHVnRWZmZWN0cygpO1xuICAgIHRoaXMuYmluZEhhc2h0YWdzKCk7XG4gICAgdGhpcy50b1BsdWdTbGlkZXIoKTtcbiAgICB0aGlzLnNhdmUoKTtcbiAgICB9XG5cbiAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQvdCwINC/0L7Qu9C1INGF0LXRiNGC0LXQs9C+0LJcbiAgYmluZEhhc2h0YWdzKCkge1xuICAgIHRoaXMudGV4dEhhc2h0YWdzLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChldnQpID0+IHtcbiAgICAgIGNvbnN0IHZhbCA9IGV2dC50YXJnZXQudmFsdWU7XG4gICAgICAvL3RoaXMudmFsaWRpdHkodmFsKTtcbiAgICAgIHRoaXMudmFsaWRpdHlIZXNodGFncyh2YWwpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8g0L7Rh9C40YnQsNC10YIg0L/QvtC70Y8g0YTQvtGA0LzRiyDQv9C+0YHQu9C1INC30LDQs9GA0YPQt9C60LhcbiAgcHV0RGVmYXVsdCgpIHtcbiAgICB0aGlzLnVwbG9hZEZpbGUudmFsdWUgPSAnJztcbiAgICB0aGlzLnRleHRIYXNodGFncy52YWx1ZSA9ICcnO1xuICAgIHRoaXMudGV4dEhhc2h0YWdzLnN0eWxlLmJvcmRlciA9ICcnO1xuICAgIHRoaXMudGV4dERlc2NyaXB0aW9uLnZhbHVlID0gJyc7XG4gICAgdGhpcy5pbWdVcGxvYWRQcmV2aWV3SW1nLnN0eWxlLmZpbHRlciA9ICcnO1xuICAgIHRoaXMuaW1nVXBsb2FkUHJldmlld0ltZy5zdHlsZS50cmFuc2Zvcm0gPSAnJztcbiAgICB0aGlzLmNvbnRyb2xWYWx1ZS52YWx1ZSA9ICcxMDAlJztcbiAgICBjb25zdCBjbGFzc2VzID0gdGhpcy5pbWdVcGxvYWRQcmV2aWV3SW1nLmNsYXNzTGlzdDtcbiAgICBjbGFzc2VzLnZhbHVlID0gJ2VmZmVjdHNfX3ByZXZpZXctLW5vbmUnO1xuICAgIHRoaXMuaW1nVXBsb2FkLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICB9XG4gIFxuLy8g0YHQvtC30LTQsNC10YIg0YHQvtC+0LHRidC10L3QuNC1INGD0YHQv9C10YjQvdC+0Lkg0L7RgtC/0YDQsNCy0LrQuCDRhNC+0YDQvNGLXG4gIHJlbmRlck1lc3NhZ2VTdWNjZXNzKCkge1xuICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25Fc2NDbG9zZUZvcm0gKTtcbiAgICBjb25zdCBzdWNjZXNzID0gbmV3IE1lc3NhZ2Uoc3VjY2Vzc1RlbXBsYXRlKTtcbiAgICBzdWNjZXNzLmJpbmRTdWNjZXNzKCk7XG4gICAgc3VjY2Vzcy5hcHBlbmQodGhpcy5zdWNjZXNzQ29udGFpbmVyKTtcbiAgfVxuXG4gIC8vINGB0L7Qt9C00LDQtdGCINGB0L7QvtCx0YnQtdC90LjQtSDQvdC10YPRgdC/0LXRiNC90L7QuSDQvtGC0L/RgNCw0LLQutC4INGE0L7RgNC80YtcbiAgcmVuZGVyTWVzc2FnZUVycm9yKCkge1xuICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25Fc2NDbG9zZUZvcm0gKTtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBNZXNzYWdlKGVycm9yVGVtcGxhdGUpO1xuICAgIGVycm9yLmJpbmRFcnJvcigpO1xuICAgIGVycm9yLmFwcGVuZCh0aGlzLmVycm9yQ29udGFpbmVyKTtcbiAgfVxuXG4gICAgLy/QstCw0LvQuNC00LDRhtC40Y8g0YXQtdGI0YLQtdCz0L7QslxuIHZhbGlkaXR5SGVzaHRhZ3MoaXRlbXMpIHtcbiAgIGNvbnN0IG1heCA9IDIwO1xuICAgY29uc3QgbWluID0gMjtcbiAgIGNvbnN0IG1heExlbmd0aCA9IDU7XG4gICBjb25zdCBmcyA9ICcjJztcbiAgIGxldCB2YWxpZCA9IHRydWU7XG5cbi8vINC/0L7QtNCz0L7RgtC+0LLQutCwINC6INCy0LDQu9C40LTQsNGG0LjQuFxuICAgbGV0IGZpbHRlciA9IGl0ZW1zLnRyaW0oKS5zcGxpdCgnICcpLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09ICcnKS5tYXAoaXRlbSA9PiBpdGVtLnRvVXBwZXJDYXNlKCkpXG4gICBsZXQgIF9zZXQgPSBuZXcgU2V0KGZpbHRlcik7XG4gICBsZXQgIF9maWx0ZXIgPSBbLi4uX3NldF07XG5cbiAgICBzd2l0Y2godmFsaWQpIHtcbiAgICAgIGNhc2UgX2ZpbHRlci5sZW5ndGggIT09IGZpbHRlci5sZW5ndGg6IFxuICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgIHRoaXMudmFsaWRpdHkodmFsaWQpO1xuICAgIGJyZWFrO1xuICAgICAgY2FzZSBmaWx0ZXIuc29tZShpdGVtID0+ICBpdGVtLmxlbmdodCA+IG1heCB8fCBpdGVtLmxlbmdodCA8IG1pbiApOlxuICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgIHRoaXMudmFsaWRpdHkodmFsaWQpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGZpbHRlci5zb21lKGl0ZW0gPT4gIGl0ZW1bMF0gIT09IGZzICk6XG4gICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgdGhpcy52YWxpZGl0eSh2YWxpZCk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgZmlsdGVyLmxlbmd0aCA+IG1heExlbmd0aDpcbiAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICB0aGlzLnZhbGlkaXR5KHZhbGlkKTtcbiAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDogIHRoaXMudmFsaWRpdHkodmFsaWQpO1xuICAgIH1cbiB9XG5cbiB2YWxpZGl0eSh2YWwpIHtcbiAgIGlmKHZhbCkge1xuICAgICB0aGlzLnRleHRIYXNodGFncy5zdHlsZS5ib3JkZXIgPSAnJztcbiAgICAgdGhpcy50ZXh0SGFzaHRhZ3Muc2V0Q3VzdG9tVmFsaWRpdHkoJycpO1xufSBlbHNlICB7IFxuICAgICB0aGlzLnRleHRIYXNodGFncy5zdHlsZS5ib3JkZXIgPSAnMnB4IHNvbGlkIHJlZCc7XG4gICAgIHRoaXMudGV4dEhhc2h0YWdzLnNldEN1c3RvbVZhbGlkaXR5KCfQpdC10YjRgtC10LMg0LTQvtC70LbQtdC9INC90LDRh9C40L3QsNGC0YzRgdGPINGBICMsINC40LzQtdGC0Ywg0LTQu9C40L3RgyDQvNC10L3RjNGI0LUgMjAg0Lgg0LHQvtC70YzRiNC1IDIg0YHQuNC80LLQvtC70L7Qsiwg0LTQvtC/0YPRgdC60LDQtdGC0YHRjyA1INGA0LDQt9C90YvRhSDRhdC10YjRgtC10LPQvtCyJyk7XG4gIH1cbn1cblxuLyog0L7RgtC/0YDQsNCy0LvRj9C10YIg0LTQsNC90L3Ri9C1INGE0L7RgNC80Ysg0L3QsCDRgdC10YDQstC10YAgICovXG5yZXF1ZXN0KGZvcm1kYXRhKSB7XG4gICAgYXhpb3MucG9zdCh0aGlzLnVybFNhdmUsIGZvcm1kYXRhIClcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHsgdGhpcy5yZW5kZXJNZXNzYWdlU3VjY2VzcygpfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7dGhpcy5yZW5kZXJNZXNzYWdlRXJyb3IoKX0pO1xuICB9IFxuXG4gIHNhdmUoKXtcbnRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZ0KSA9PiB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEodGhpcy5mb3JtKTtcbiAgICB0aGlzLnJlcXVlc3QoZm9ybURhdGEpO1xuICB9KTtcbiAgfVxuICBcblxuICB9XG5cbiIsImltcG9ydCBBYnN0cmFjdFZpZXcgZnJvbSAnLi9BYnN0cmFjdFZpZXcnO1xuaW1wb3J0ICogYXMgY29uc3RzIGZyb20gJy4uL2NvbnN0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2UgZXh0ZW5kcyBBYnN0cmFjdFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKHRlbXBsYXRlKSB7XG4gICAgICBzdXBlcih0ZW1wbGF0ZSk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIG9uRXNjQ2xvc2VNZXNzYWdlKGV2dCkgeyBcbiAgICAgICAgaWYgKGV2dC5rZXlDb2RlID09PSBjb25zdHMuZXNjQ29kZSkge1xuICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbkVzY0Nsb3NlTWVzc2FnZSApO1xuICAgICAgIH1cbiAgICAgIH1cbiAgICBcbiAgICBiaW5kU3VjY2VzcygpIHtcbiAgICAgICAgY29uc3QgY2xvc2VCdG4gPSB0aGlzLnJlbmRlcmVkLnF1ZXJ5U2VsZWN0b3IoJy5zdWNjZXNzX19idXR0b24nKTtcbiAgICAgICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uRXNjQ2xvc2VNZXNzYWdlICk7XG4gICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5vbkVzY0Nsb3NlTWVzc2FnZSA9IHRoaXMub25Fc2NDbG9zZU1lc3NhZ2UuYmluZCh0aGlzKTtcbiAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbkVzY0Nsb3NlTWVzc2FnZSk7XG4gICAgICB9XG5cbiAgICAgIGJpbmRFcnJvcigpIHtcbiAgICAgICAgY29uc3QgY2xvc2VCdG5zID0gdGhpcy5yZW5kZXJlZC5xdWVyeVNlbGVjdG9yQWxsKCcuZXJyb3JfX2J1dHRvbicpO1xuICAgICAgICBjbG9zZUJ0bnMuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuICAgIH0pOyAgICAgICAgXG4gICAgICAgIHRoaXMub25Fc2NDbG9zZU1lc3NhZ2UgPSB0aGlzLm9uRXNjQ2xvc2VNZXNzYWdlLmJpbmQodGhpcyk7XG4gICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25Fc2NDbG9zZU1lc3NhZ2UpO1xuICAgICAgfVxuXG5cbiAgICAgIHJlbW92ZSgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IG51bGw7XG4gICAgICAgIHRoaXMucmVuZGVyZWQgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBudWxsO1xuICAgICAgfVxuICAgIFxuICAgICAgYXBwZW5kKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJlZCk7XG4gICAgICB9XG4gICAgfVxuICAgICIsImltcG9ydCBBYnN0cmFjdFZpZXcgZnJvbSAnLi9BYnN0cmFjdFZpZXcnO1xuaW1wb3J0IHsgcGljdHVyZVRlbXBsYXRlIH0gZnJvbSAnLi4vdGVtcGxhdGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGljdHVyZSBleHRlbmRzIEFic3RyYWN0VmlldyB7XG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICBzdXBlcihwaWN0dXJlVGVtcGxhdGUsIGRhdGEpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBiaW5kKCkge1xuICAgIGNvbnN0IHBpYyA9IHRoaXMucmVuZGVyZWQucXVlcnlTZWxlY3RvcignYScpO1xuICAgIHBpYy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57IHRoaXMub25DbGljaygpOyB9KTtcbiAgfVxuXG4gIHJlbW92ZSgpIHtcbiAgICB0aGlzLmRhdGEgPSBudWxsO1xuICAgIHRoaXMudGVtcGxhdGUgPSBudWxsO1xuICAgIHRoaXMucmVuZGVyZWQgPSBudWxsO1xuICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgfVxuXG4gIGFwcGVuZChjb250YWluZXIpe1xuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyZWQpOyAgICBcbiAgfVxufVxuIiwiXG4gZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpZGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbn1cblxuZHJhZygpIHtcbmNvbnN0IGRpYWxvZ0hhbmRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZmZlY3QtbGV2ZWxfX3BpbicpO1xuY29uc3QgZWZmZWN0TGV2ZWxWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZmZlY3QtbGV2ZWxfX3ZhbHVlJyk7XG5jb25zdCBlZmZlY3RMZXZlbERlcHRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVmZmVjdC1sZXZlbF9fZGVwdGgnKTtcbmNvbnN0IHByZXZpZXdJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nLXVwbG9hZF9fcHJldmlldyBpbWcnKTtcbmNvbnN0IG9uZVB4ID0gNDY7XG5jb25zdCBwcm9wb3B0aW9uID0gMTA7XG5jb25zdCBwcm9wUGhvYm9zID0gMjtcbmNvbnN0IHByb3BIZWF0ID0gMTUzO1xubGV0IHN0YXJ0Q29vcmRzID0ge307XG5sZXQgZHJhZ2dlZCA9ICcnO1xuY29uc3QgbWF4WCA9IDQ1NTtcbmNvbnN0IG1pblggPSA1O1xuXG5jb25zdCBFZmZlY3QgPSB7XG4gIG5vbmU6ICdlZmZlY3RzX19wcmV2aWV3LS1ub25lJyxcbiAgY2hyb21lOiAnZWZmZWN0c19fcHJldmlldy0tY2hyb21lJyxcbiAgc2VwaWE6ICdlZmZlY3RzX19wcmV2aWV3LS1zZXBpYScsXG4gIG1hcnZpbjogJ2VmZmVjdHNfX3ByZXZpZXctLW1hcnZpbicsXG4gIHBob2JvczogJ2VmZmVjdHNfX3ByZXZpZXctLXBob2JvcycsXG4gIGhlYXQ6ICdlZmZlY3RzX19wcmV2aWV3LS1oZWF0Jyxcbn07XG5cbmZ1bmN0aW9uIGZpbHRlckNocm9tZSgpIHtcbiAgY29uc3QgZ3JheXNjYWxlID0gTWF0aC5yb3VuZChlZmZlY3RMZXZlbFZhbHVlLnZhbHVlIC9vbmVQeCkgL3Byb3BvcHRpb247XG4gIHByZXZpZXdJbWcuc3R5bGUuZmlsdGVyID0gYGdyYXlzY2FsZSgke2dyYXlzY2FsZX0pYDtcbn1cbmZ1bmN0aW9uIGZpbHRlclNlcGlhKCkge1xuICBjb25zdCBzZXBpYSA9IE1hdGgucm91bmQoZWZmZWN0TGV2ZWxWYWx1ZS52YWx1ZSAvIG9uZVB4KSAvcHJvcG9wdGlvbjtcbiAgcHJldmlld0ltZy5zdHlsZS5maWx0ZXIgPSBgc2VwaWEoJHtzZXBpYX0pYDtcbn1cblxuZnVuY3Rpb24gZmlsdGVyTWFydmluKCkge1xuICBjb25zdCBtYXJ2aW4gPSBNYXRoLnJvdW5kKGVmZmVjdExldmVsVmFsdWUudmFsdWUgLyBvbmVQeCAqIHByb3BvcHRpb24pO1xuICBwcmV2aWV3SW1nLnN0eWxlLmZpbHRlciA9IGBpbnZlcnQoJHttYXJ2aW59JSlgO1xufVxuXG5mdW5jdGlvbiBmaWx0ZXJQaG9ib3MoKSB7XG4gIGNvbnN0IHBob2JvcyA9IE1hdGgucm91bmQoZWZmZWN0TGV2ZWxWYWx1ZS52YWx1ZSAvIG9uZVB4IC8gcHJvcFBob2Jvcyk7XG4gIHByZXZpZXdJbWcuc3R5bGUuZmlsdGVyID0gYGJsdXIoJHtwaG9ib3N9cHgpYDtcbn1cblxuZnVuY3Rpb24gZmlsdGVySGVhdCgpIHtcbiAgbGV0IGhlYXQ7XG4gIGlmIChlZmZlY3RMZXZlbFZhbHVlLnZhbHVlIDw9IHByb3BIZWF0KSB7XG4gICAgaGVhdCA9IDE7XG4gIH0gZWxzZSBpZiAoZWZmZWN0TGV2ZWxWYWx1ZS52YWx1ZSA+IHByb3BIZWF0ICYmIGVmZmVjdExldmVsVmFsdWUudmFsdWUgPD0gcHJvcEhlYXQgKiAyKSB7XG4gICAgaGVhdCA9IDI7XG4gIH0gZWxzZSB7XG4gICAgaGVhdCA9IDM7XG4gIH1cbiAgcHJldmlld0ltZy5zdHlsZS5maWx0ZXIgPSBgYnJpZ2h0bmVzcygke2hlYXR9KWA7XG59XG4vKiDQv9GA0LjQvNC10L3Rj9C10YIg0L3Rg9C20L3Ri9C5INGE0LjQu9GM0YLRgCDQvtC/0YDQtdC00LXQu9GP0Y8g0LrQu9Cw0YHRgSAqL1xuZnVuY3Rpb24gaG93Q2xhc3MoKSB7XG4gIHN3aXRjaCAocHJldmlld0ltZy5jbGFzc05hbWUpIHtcbiAgICBjYXNlIEVmZmVjdC5jaHJvbWU6XG4gICAgICAgZmlsdGVyQ2hyb21lKCk7XG4gICAgICAgYnJlYWs7XG4gICAgY2FzZSBFZmZlY3Quc2VwaWE6XG4gICAgICAgZmlsdGVyU2VwaWEoKTtcbiAgICAgICBicmVhaztcbiAgICBjYXNlIEVmZmVjdC5tYXJ2aW46XG4gICAgICBmaWx0ZXJNYXJ2aW4oKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgRWZmZWN0LnBob2JvczpcbiAgICAgZmlsdGVyUGhvYm9zKCk7XG4gICAgIGJyZWFrO1xuICAgIGNhc2UgRWZmZWN0LmhlYXQ6XG4gICAgIGZpbHRlckhlYXQoKTtcbiAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICBwcmV2aWV3SW1nLnN0eWxlLmZpbHRlciA9ICcnO1xuICB9XG59ICBcblxuLyog0LjQt9C80LXQvdC10L3QuNC1INC/0L7Qu9C+0LbQtdC90LjRjyDQv9C+0LvQt9GD0L3QutCwINGB0LvQsNC50LTQtdGA0LAgKi9cbmZ1bmN0aW9uIG1vdmVTbGlkZXIobW92ZSkge1xuZWZmZWN0TGV2ZWxWYWx1ZS52YWx1ZSA9IG1vdmU7XG5lZmZlY3RMZXZlbERlcHRoLnN0eWxlLndpZHRoID0gYCR7bW92ZX1weGA7XG5ob3dDbGFzcygpO1xufVxuXG4vKiDQtNCy0LjQs9Cw0LXRgiDQv9C+0LvQt9GD0L3QvtC6ICovXG5mdW5jdGlvbiBvbk1vdXNlTW92ZShldnQpIHtcbmNvbnN0IG1vdmVFdnQgPSBldnQ7XG5tb3ZlRXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbmNvbnN0IHNoaWZ0ID0ge1xuICB4OiBzdGFydENvb3Jkcy54IC0gbW92ZUV2dC5jbGllbnRYLFxuICB5OiBzdGFydENvb3Jkcy55IC0gbW92ZUV2dC5jbGllbnRZLFxufTtcblxuc3RhcnRDb29yZHMgPSB7XG4gIHg6IG1vdmVFdnQuY2xpZW50WCxcbiAgeTogbW92ZUV2dC5jbGllbnRZLFxufTtcblxuaWYgKGRpYWxvZ0hhbmRsZS5vZmZzZXRMZWZ0IC0gc2hpZnQueCA8PSBtaW5YKSB7XG4gIGRpYWxvZ0hhbmRsZS5zdHlsZS5sZWZ0ID0gYCR7bWluWH1weGA7XG59IGVsc2UgaWYgKGRpYWxvZ0hhbmRsZS5vZmZzZXRMZWZ0IC0gc2hpZnQueCA+PSBtYXhYKSB7XG4gIGRpYWxvZ0hhbmRsZS5zdHlsZS5sZWZ0ID0gYCR7bWF4WH1weGA7XG59IGVsc2Uge1xuZGlhbG9nSGFuZGxlLnN0eWxlLmxlZnQgPSBgJHtkaWFsb2dIYW5kbGUub2Zmc2V0TGVmdCAtIHNoaWZ0Lnh9cHhgO1xufVxuXG5kaWFsb2dIYW5kbGUuc3R5bGUudG9wID0gJzJweCc7XG5tb3ZlU2xpZGVyKGRpYWxvZ0hhbmRsZS5vZmZzZXRMZWZ0IC0gc2hpZnQueCk7XG59XG5cbmZ1bmN0aW9uIG9uTW91c2VVcCh1cEV2dCkge1xudXBFdnQucHJldmVudERlZmF1bHQoKTtcbmlmIChkcmFnZ2VkKSB7XG4gIGNvbnN0IG9uQ2xpY2tQcmV2ZW50RGVmYXVsdCA9IChldnQpID0+IHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBkaWFsb2dIYW5kbGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBvbkNsaWNrUHJldmVudERlZmF1bHQoKSk7XG4gIH07XG4gIGRpYWxvZ0hhbmRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+ICBvbkNsaWNrUHJldmVudERlZmF1bHQoKSk7XG59XG5cbmRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlKTtcbmRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbk1vdXNlVXApO1xufVxuXG5mdW5jdGlvbiBvbk1vdXNlRG93bihldnQpIHtcbmV2dC5wcmV2ZW50RGVmYXVsdCgpOyBcblxuc3RhcnRDb29yZHMgPSB7XG4gIHg6IGV2dC5jbGllbnRYLFxuICB5OiBldnQuY2xpZW50WSxcbn07XG5cbmRyYWdnZWQgPSBmYWxzZTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbk1vdXNlVXApOyAgXG4gICAgfVxuICAgIFxuICAgIGRpYWxvZ0hhbmRsZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4geyBvbk1vdXNlRG93bihlKSB9KTtcbiAgfVxufSAgIiwiaW1wb3J0IFBpY3R1cmUgZnJvbSAnLi9QaWN0dXJlJztcbmltcG9ydCBCaWdQaWN0dXJlIGZyb20gJy4vQmlnUGljdHVyZSc7XG5pbXBvcnQgRmlsdGVycyBmcm9tICcuL0ZpbHRlcnMnO1xuaW1wb3J0IEZvcm0gZnJvbSAnLi9Gb3JtJztcbmltcG9ydCBFZmZlY3RzIGZyb20gJy4vRWZmZWN0cyc7XG5pbXBvcnQgU2xpZGVyIGZyb20gJy4vU2xpZGVyJztcbmltcG9ydCBDb21tZW50IGZyb20gJy4vQ29tbWVudCc7XG5cbmV4cG9ydCB7IFBpY3R1cmUsIEJpZ1BpY3R1cmUsIEZpbHRlcnMsIEZvcm0sIEVmZmVjdHMsIFNsaWRlciwgQ29tbWVudH07Il0sInNvdXJjZVJvb3QiOiIifQ==