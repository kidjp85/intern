# “We need to support old IE. Make the Intern we really, really hate do the testing” [![Build Status](https://travis-ci.org/theintern/intern.png?branch=geezer)](https://travis-ci.org/theintern/intern)

Intern is a complete test stack for JavaScript designed to help you write and run consistent, high-quality test
cases for your JavaScript libraries and applications. It can be used to test *any* JavaScript code. Its functional
testing capabilities can even be used to test non-JavaScript Web sites and apps, if you really want.

## This branch

The `geezer` branch provides support for testing ancient browsers that do not support EcmaScript 5 (IE 6–8). It does
*not* use the Chai library, as Chai also requires ES5. Instead, there is an assertion library at `intern/assert`
that is API-compatible with Chai’s `assert`-style API. This module is not covered under the Dojo Foundation CLA
governing the rest of the Intern project.

This branch will only be maintained for as long as absolutely necessary since it is ugly and a burden.

## Features

* 100% [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD), 100% Promises/A-based API
* Instant one-off test execution in the browser or Node.js
* Full statement, branch, function, and line code coverage reporting with
  [Istanbul](https://github.com/gotwarlost/istanbul)
* Functional testing using the standard [WebDriver API](http://www.w3.org/TR/webdriver/) with a custom fluid,
  promises-wrapped interface based on [WD.js](https://github.com/admc/wd)
* Integration with [Sauce Labs](http://saucelabs.com/) for super simple continuous integration
* Tested with [Travis CI](http://travis-ci.org/)
* Extensible interfaces (comes with TDD, BDD, and objects)
* Extensible reporters (comes with basic console, WebDriver, and lcov reporters; tap planned)
* Extensible assertions using the [Chai Assertion Library](http://chaijs.com) (or any other asserion library that
  throws errors)

## Comparison

<table>
<tr>
	<th>Feature</th>
	<th><a href="https://github.com/theintern/intern">Intern</a></th>
	<th><a href="http://qunitjs.com">QUnit</a></th>
	<th><a href="http://visionmedia.github.com/mocha/">Mocha</a></th>
	<th><a href="http://pivotal.github.com/jasmine/">Jasmine</a></th>
	<th><a href="http://busterjs.org">BusterJS</a></th>
	<th><a href="http://karma-runner.github.io/0.8/index.html">Karma</a></th>
</tr>
<tr>
	<th scope="row">Code coverage analysis</th>
	<td>Yes</td>
	<td>No</td>
	<td>Yes</td>
	<td>No</td>
	<td>Extension</td>
	<td>Yes</td>
</tr>
<tr>
	<th scope="row">True<sup><a name="rev1" href="#ref1">1</a></sup> browser events</th>
	<td>Yes</td>
	<td>No</td>
	<td>No</td>
	<td>No</td>
	<td>No</td>
	<td>No</td>
</tr>
<tr>
	<th scope="row">Native AMD support</th>
	<td>Yes</td>
	<td>No</td>
	<td>No</td>
	<td>No</td>
	<td>Extension</td>
	<td>Extension</td>
</tr>
<tr>
	<th scope="row">Stand-alone<sup><a name="rev2" href="#ref2">2</a></sup> browser support</th>
	<td>Yes</td>
	<td>Yes</td>
	<td>Build required</td>
	<td>Build required</td>
	<td>No</td>
	<td>No</td>
</tr>
<tr>
	<th scope="row">Node.js support</th>
	<td>Yes</td>
	<td>No<sup><a name="rev3" href="#ref3">3</a></sup></td>
	<td>Yes</td>
	<td>Yes</td>
	<td>Yes</td>
	<td>Yes</td>
</tr>
<tr>
	<th scope="row">Any<sup><a name="rev4" href="#ref4">4</a></sup> assertion library</th>
	<td>Yes</td>
	<td>No</td>
	<td>Yes</td>
	<td>No</td>
	<td>Yes</td>
	<td>N/A</td>
</tr>
<tr>
	<th scope="row">Default test interface</th>
	<td>TDD, BDD, object</td>
	<td>TDD</td>
	<td>TDD, BDD, object</td>
	<td>BDD</td>
	<td>xUnit</td>
	<td>N/A</td>
</tr>
<tr>
	<th scope="row">Extensible test interfaces</th>
	<td>Yes</td>
	<td>No</td>
	<td>Yes</td>
	<td>No</td>
	<td>Yes</td>
	<td>N/A</td>
</tr>
<tr>
	<th scope="row">Extensible reporters</th>
	<td>Yes</td>
	<td>No</td>
	<td>Yes</td>
	<td>No</td>
	<td>Yes</td>
	<td>N/A</td>
</tr>
<tr>
	<th scope="row">Asynchronous support</th>
	<td>Promises</td>
	<td>Globals</td>
	<td>Callbacks</td>
	<td>Polling</td>
	<td>Callbacks</td>
	<td>Callbacks</td>
</tr>
<tr>
	<th scope="row">Selenium support</th>
	<td>Yes</td>
	<td>No</td>
	<td>No</td>
	<td>No</td>
	<td>No</td>
	<td>No</td>
</tr>
<tr>
	<th scope="row">Built-in CI support</th>
	<td>Yes</td>
	<td>No</td>
	<td>No</td>
	<td>No</td>
	<td>Yes</td>
	<td>Yes</td>
</tr>
<tr>
	<th scope="row">Built-in Sauce Labs integration</th>
	<td>Yes</td>
	<td>No</td>
	<td>No</td>
	<td>No</td>
	<td>No</td>
	<td>No</td>
</tr>
<tr>
	<th scope="row">Built-in Travis CI integration</th>
	<td>Yes</td>
	<td>No</td>
	<td>No</td>
	<td>No</td>
	<td>No</td>
	<td>Yes</td>
</tr>
<tr>
	<th scope="row">Grunt support</th>
	<td>Yes</td>
	<td>3rd party</td>
	<td>3rd party</td>
	<td>3rd party</td>
	<td>3rd party</td>
	<td>3rd party</td>
</tr>
</table>

<a name="ref1" href="#rev1">1</a>: True events are not generated by JavaScript within the sandbox, so are able to
accurately emulate how a user actually interacts with the application. Synthetic events generated by other test
frameworks are limited by browser security restrictions.

<a name="ref2" href="#rev2">2</a>: Stand-alone means that unit tests can be executed in a browser by navigating to a
URL without needing any special HTTP server or proxy for support.

<a name="ref3" href="#rev3">3</a>: Some older versions of QUnit can be used in conjunction with a 3rd party module to
run on Node.js, but newer versions do not support Node.js and will break even with the use of 3rd party modules.

<a name="ref4" href="#rev4">4</a>: If it throws an error on failure, it works with Intern.

## Quick start

1. Clone this repository as a sibling directory of the package (or packages) that you want to test.

   ```
   cd /my/project/root
   git clone --recursive https://github.com/theintern/intern.git
   ```

2. Use npm to install dependencies.

   ```
   cd intern
   npm install --production
   ```

3. Create a copy of the example configuration file in your package’s test directory and edit appropriately. See the
[configuration documentation](https://github.com/theintern/intern/wiki/Configuring-Intern) for a list of all available
options.

   ```
   cp tests/example.intern.js ../package/tests/intern.js
   ```

4. Verify your configuration works by running the Node.js client and seeing that no errors are output.

   ```
   node client.js config=package/tests/intern
   ```

5. Start writing tests! See the [writing tests](https://github.com/theintern/intern/wiki/Writing-Tests) documentation
to learn how.

## More information

* [Wiki Documentation](https://github.com/theintern/intern/wiki)
* [Support](https://github.com/theintern/intern/wiki/Support)

## License

Intern is available under the terms of the [New BSD License](LICENSE). All code, with the exception of
portions of the `assert.js` library and tests in the geezer branch, is developed under the terms of the
[Dojo Foundation CLA](http://dojofoundation.org/about/cla).

© 2012–2013 Colin Snover http://zetafleet.com<br>
© 2013 SitePen, Inc. http://sitepen.com<br>
All rights reserved.