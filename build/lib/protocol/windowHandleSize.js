/**
 *
 * Protocol binding to get or change the size of the browser.
 *
 * <example>
    :windowHandleSize.js
    // get the size of
    // a specified window
    client.windowHandleSize('dc30381e-e2f3-9444-8bf3-12cc44e8372a');

    // the current window
    client.windowHandleSize();

    // change the size of
    // a specified window
    client.windowHandleSize('dc30381e-e2f3-9444-8bf3-12cc44e8372a', {width: 800, height: 600});

    // the current window
    client.windowHandleSize({width: 800, height: 600});
 * </example>
 *
 * @param {String=} windowHandle the window to receive/change the size
 * @param {Object=} dimension    the new size of the window
 *
 * @returns {Object} the size of the window (`{width: number, height: number}`)
 *
 * @see  https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/window/:windowHandle/size
 * @type protocol
 *
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _utilsErrorHandler = require('../utils/ErrorHandler');

var windowHandleSize = function windowHandleSize(windowHandle, size) {
    if (windowHandle === undefined) windowHandle = 'current';

    var data = {};

    if (typeof windowHandle === 'object') {
        var _ref = ['current', windowHandle];
        windowHandle = _ref[0];
        size = _ref[1];
    }

    /*!
     * protocol options
     */
    var requestOptions = {
        path: '/session/:sessionId/window/' + windowHandle + '/size',
        method: 'GET'
    };

    /*!
     * change window size if the new size is given
     */
    if (typeof size === 'object' && size.width && size.height) {
        requestOptions.method = 'POST';
        // The width and height value might return as a negative value, so
        // we make sure to use its absolute value.
        data = {
            width: Math.abs(size.width),
            height: Math.abs(size.height)
        };
    }

    /*!
     * type check
     */
    if (requestOptions.method === 'POST' && typeof data.width !== 'number' && typeof data.height !== 'number') {
        throw new _utilsErrorHandler.ProtocolError('number or type of arguments don\'t agree with windowHandleSize protocol command');
    }

    return this.requestHandler.create(requestOptions, data);
};

exports['default'] = windowHandleSize;
module.exports = exports['default'];
