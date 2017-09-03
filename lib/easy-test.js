"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const easy_test_matchers_1 = require("./easy-test.matchers");
// T = Tested component
class EasyTest {
    /**
     * Run detect changes on the host component
     */
    detectChanges() {
        this['hostFixture'] ? this['hostFixture'].detectChanges() : this.fixture.detectChanges();
    }
    /**
     * Query a DOM element from the tested element
     * @param selector
     * @returns {any}
     */
    query(selector) {
        return this.testedElement.querySelector(selector);
    }
    /**
     * Query a DOM elements from the tested element
     * @param selector
     * @returns {any}
     */
    queryAll(selector) {
        return this.testedElement.querySelectorAll(selector);
    }
    /**
     *
     * @param input
     * @param inputValue
     */
    whenInput(input, inputValue) {
        if (typeof input === 'string') {
            this.testedComponent[input] = inputValue;
        }
        else {
            Object.keys(input).forEach(inputKey => {
                this.testedComponent[inputKey] = input[inputKey];
            });
        }
        this.detectChanges();
    }
    /**
     *
     * @param output
     * @param cb
     */
    whenOutput(output, cb) {
        const observable = this.testedComponent[output];
        if (typeof observable.subscribe === 'function') {
            observable.subscribe(result => cb(result));
        }
        else {
            throw new Error(`${output} in not an @Output`);
        }
    }
    /**
     * Trigger event on the element via DebugElement.triggerEventHandler()
     * @param event
     * @param selector
     * @param eventObj
     */
    trigger(event, selector, eventObj = null) {
        const element = this.tested.query(platform_browser_1.By.css(selector));
        if (!element) {
            console.warn(`Element ${selector} does not exists`);
        }
        else {
            element.triggerEventHandler(event, eventObj);
            this.detectChanges();
        }
    }
}
exports.EasyTest = EasyTest;
class EasyTestWithHost extends EasyTest {
    /**
     * Run detect changes on the host component
     */
    detectChangesHost() {
        this.hostFixture.detectChanges();
    }
}
exports.EasyTestWithHost = EasyTestWithHost;
/**
 *
 * @param testedType
 * @param moduleMetadata
 */
function easyTest(testedType, moduleMetadata = {}) {
    beforeEach(function () {
        jasmine.addMatchers(easy_test_matchers_1.customMatchers);
        // Check why this is not working after compiling
        // Object.assign(this, EasyTest.prototype);
        extendThis.apply(this);
    });
    beforeEach(testing_1.async(function () {
        const declarations = [testedType];
        if (moduleMetadata && moduleMetadata.declarations) {
            declarations.push(...moduleMetadata.declarations);
        }
        testing_1.TestBed.configureTestingModule(Object.assign({}, moduleMetadata, { declarations: declarations }))
            .compileComponents();
    }));
    beforeEach(function () {
        this.fixture = testing_1.TestBed.createComponent(testedType);
        this.fixture.detectChanges();
        this.tested = this.fixture.debugElement;
        // The component instance
        this.testedComponent = this.tested.componentInstance;
        // The component native element
        this.testedElement = this.tested.nativeElement;
    });
    afterEach(function () {
        if (this.fixture) {
            this.fixture.destroy();
            this.fixture.nativeElement.remove();
        }
    });
}
exports.easyTest = easyTest;
let HostComponent = class HostComponent {
};
HostComponent = __decorate([
    core_1.Component({ selector: 'host-for-test', template: '' })
], HostComponent);
exports.HostComponent = HostComponent;
function createHost(testedType, hostType = HostComponent, moduleMetadata = {}) {
    beforeEach(function () {
        jasmine.addMatchers(easy_test_matchers_1.customMatchers);
    });
    beforeEach(testing_1.async(function () {
        const declarations = [testedType, hostType];
        if (moduleMetadata && moduleMetadata.declarations) {
            declarations.push(...moduleMetadata.declarations);
        }
        testing_1.TestBed.configureTestingModule(Object.assign({}, moduleMetadata, { declarations: declarations }));
    }));
    beforeEach(function () {
        this.create = (template) => {
            testing_1.TestBed.overrideComponent(hostType, { set: { template: template } });
            this.hostFixture = testing_1.TestBed.createComponent(hostType);
            this.hostFixture.detectChanges();
            this.hostComponent = this.hostFixture.componentInstance;
            this.tested = this.hostFixture.debugElement.query(platform_browser_1.By.directive(testedType));
            this.testedComponent = this.tested.componentInstance;
            this.testedElement = this.tested.nativeElement;
            extendThis.apply(this);
            return this.hostFixture;
        };
    });
    afterEach(function () {
        if (this.hostFixture) {
            this.hostFixture.destroy();
            this.hostFixture.nativeElement.remove();
        }
    });
}
exports.createHost = createHost;
function extendThis() {
    this.detectChanges = EasyTest.prototype.detectChanges;
    this.query = EasyTest.prototype.query;
    this.queryAll = EasyTest.prototype.queryAll;
    this.trigger = EasyTest.prototype.trigger;
    this.whenInput = EasyTest.prototype.whenInput;
    this.whenOutput = EasyTest.prototype.whenOutput;
    this.detectChangesHost = EasyTestWithHost.prototype.detectChangesHost;
}
