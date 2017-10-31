function getResult( pass : boolean, message? : string ) {
  const result : jasmine.CustomMatcherResult = {
    pass: pass,
    message: !pass ? message : ''
  }
  return result;
}

export const customMatchers : jasmine.CustomMatcherFactories = {
  toContainText: function ( util : jasmine.MatchersUtil, customEqualityTesters : Array<jasmine.CustomEqualityTester> ) : jasmine.CustomMatcher {
    return {
      compare: function ( actual : any, expected : any ) : jasmine.CustomMatcherResult {
        const pass : boolean = actual.textContent.indexOf(expected) > -1;
        return getResult(pass, `Expected ${actual.nodeName} to contain text - '${expected}'`);
      }
    };
  },
  toHaveClass: function ( util : jasmine.MatchersUtil, customEqualityTesters : Array<jasmine.CustomEqualityTester> ) : jasmine.CustomMatcher {
    return {
      compare: function ( actual : any, expected : any ) : jasmine.CustomMatcherResult {
        const pass : boolean = actual.classList.contains(expected);
        return getResult(pass, `Expected ${actual.nodeName} to have class - '${expected}'`);
      }
    };
  },
  toHaveStyle: function ( util : jasmine.MatchersUtil, customEqualityTesters : Array<jasmine.CustomEqualityTester> ) : jasmine.CustomMatcher {
    return {
      compare: function ( actual : any, expected : any ) : jasmine.CustomMatcherResult {

        const elementStyles = window.getComputedStyle(actual);

        let passed = false;
        Object.keys(expected).forEach(cssKey => {
          const propValue = elementStyles[cssKey];
          // We are only have support for rgba and Hex values
          if( expected[cssKey].indexOf('rgb') > -1 ) {
            passed = propValue === expected[cssKey];
          } else if( expected[cssKey].indexOf('#') > -1 ) {
            passed = rgbToHex(propValue) === expected[cssKey];
          } else {
            passed = propValue === expected[cssKey];
          }
        });
        return getResult(passed, `Expected ${actual.nodeName} to have style - '${JSON.stringify(expected)}'`);
      }
    };
  },
  toHaveHtml: function ( util : jasmine.MatchersUtil, customEqualityTesters : Array<jasmine.CustomEqualityTester> ) : jasmine.CustomMatcher {
    return {
      compare: function ( actual : any, expected : any ) : jasmine.CustomMatcherResult {
        const pass : boolean = actual.innerHTML.indexOf(expected) > -1;
        return getResult(pass, `Expected ${actual.nodeName} to have HTML - '${expected}'`);
      }
    };
  },
  toBeDisabled: function ( util : jasmine.MatchersUtil, customEqualityTesters : Array<jasmine.CustomEqualityTester> ) : jasmine.CustomMatcher {
    return {
      compare: function ( actual : any, expected : any ) : jasmine.CustomMatcherResult {
        const pass : boolean = !!actual.disabled;
        return getResult(pass, `Expected ${actual.nodeName} to be disabled`);
      }
    };
  },
  toBeChecked: function ( util : jasmine.MatchersUtil, customEqualityTesters : Array<jasmine.CustomEqualityTester> ) : jasmine.CustomMatcher {
    return {
      compare: function ( actual : any, expected : any ) : jasmine.CustomMatcherResult {
        const pass : boolean = !!actual.checked;
        return getResult(pass, `Expected ${actual.nodeName} to be checked`);
      }
    };
  },
  toHaveValue: function ( util : jasmine.MatchersUtil, customEqualityTesters : Array<jasmine.CustomEqualityTester> ) : jasmine.CustomMatcher {
    return {
      compare: function ( actual : any, expected : any ) : jasmine.CustomMatcherResult {
        // Only for elements on which val can be called (input, textarea, etc)
        const pass : boolean = actual.value === expected;
        return getResult(pass, `Expected ${actual.nodeName} to have value - '${expected}'`);
      }
    };
  },
  toBeInDOM: function ( util : jasmine.MatchersUtil, customEqualityTesters : Array<jasmine.CustomEqualityTester> ) : jasmine.CustomMatcher {
    return {
      compare: function ( actual : any, expected : any ) : jasmine.CustomMatcherResult {
        const pass : boolean = typeof actual === 'string' ? document.querySelector(actual) : actual;
        return getResult(pass, `Expected ${actual.nodeName} to be in DOM`);
      }
    };
  },
  toHaveAttr: function ( util : jasmine.MatchersUtil, customEqualityTesters : Array<jasmine.CustomEqualityTester> ) : jasmine.CustomMatcher {
    return {
      compare: function ( actual : any, { attr, val } : any ) : jasmine.CustomMatcherResult {
        const pass : boolean = actual.getAttribute(attr) === val;
        return getResult(pass, `Expected ${actual.nodeName} '${attr}' attribute to be '${val}'`);
      }
    };
  },
};

/**
 *
 * @param red
 * @param green
 * @param blue
 * @param alpha
 * @returns {string}
 */
function rgbToHex( red, green?, blue?, alpha? ) {
  const isPercent = (red + (alpha || '')).toString().includes('%');

  if( typeof red === 'string' ) {
    const res = red.match(/(0?\.?\d{1,3})%?\b/g).map(Number);
    // TODO: use destructuring when targeting Node.js 6
    red = res[0];
    green = res[1];
    blue = res[2];
    alpha = res[3];
  } else if( alpha !== undefined ) {
    alpha = parseFloat(alpha);
  }

  if( typeof red !== 'number' ||
    typeof green !== 'number' ||
    typeof blue !== 'number' ||
    red > 255 ||
    green > 255 ||
    blue > 255 ) {
    throw new TypeError('Expected three numbers below 256');
  }

  if( typeof alpha === 'number' ) {
    if( !isPercent && alpha >= 0 && alpha <= 1 ) {
      alpha = Math.round(255 * alpha);
    } else if( isPercent && alpha >= 0 && alpha <= 100 ) {
      alpha = Math.round(255 * alpha / 100);
    } else {
      throw new TypeError(`Expected alpha value (${alpha}) as a fraction or percentage`);
    }
    alpha = (alpha | 1 << 8).toString(16).slice(1);
  } else {
    alpha = '';
  }

  return '#' + ((blue | green << 8 | red << 16) | 1 << 24).toString(16).slice(1) + alpha;
};
