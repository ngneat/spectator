import { Component, DebugElement, Type } from '@angular/core';
import { async, ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { customMatchers } from './easy-test.matchers';

// T = Tested component
export class EasyTest<T> {
  fixture : ComponentFixture<T>;
  tested : DebugElement;
  testedComponent : T;
  testedElement : HTMLElement | any;

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
  query( selector : string ) {
    return this.testedElement.querySelector(selector);
  }

  /**
   * Query a DOM elements from the tested element
   * @param selector
   * @returns {any}
   */
  queryAll( selector : string ) {
    return this.testedElement.querySelectorAll(selector);
  }

  /**
   *
   * @param input
   * @param inputValue
   */
  whenInput( input : object | string, inputValue? : any ) {
    if( typeof input === 'string' ) {
      this.testedComponent[input] = inputValue;
    } else {
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
  whenOutput<T>( output : string, cb : ( result : T ) => any ) {
    const observable = this.testedComponent[output];
    if( typeof observable.subscribe === 'function' ) {
      observable.subscribe(result => cb(result));
    } else {
      throw new Error(`${output} in not an @Output`);
    }
  }

  /**
   * Trigger event on the element via DebugElement.triggerEventHandler()
   * @param event
   * @param selector
   * @param eventObj
   */
  trigger( event : string, selector : string, eventObj = null ) {
    const element = this.tested.query(By.css(selector));
    if( !element ) {
      console.warn(`Element ${selector} does not exists`);
    } else {
      element.triggerEventHandler(event, eventObj);
      this.detectChanges();
    }
  }

}

export class EasyTestWithHost<T, H = HostComponent> extends EasyTest<T> {
  create : ( template : string ) => any;
  hostComponent : H;
  hostFixture : ComponentFixture<H>;

  /**
   * Run detect changes on the host component
   */
  detectChangesHost() {
    this.hostFixture.detectChanges();
  }
}

/**
 *
 * @param testedType
 * @param moduleMetadata
 */
export function easyTest<T>( testedType : Type<T>, moduleMetadata : TestModuleMetadata = {} ) {
  beforeEach(function () {
    jasmine.addMatchers(customMatchers);
    // Check why this is not working after compiling
    // Object.assign(this, EasyTest.prototype);
    extendThis.apply(this);
  });
  beforeEach(async(function ( this : EasyTest<T> ) {
    const declarations = [testedType];
    if( moduleMetadata && moduleMetadata.declarations ) {
      declarations.push(...moduleMetadata.declarations);
    }
    TestBed.configureTestingModule({ ...moduleMetadata, declarations: declarations })
      .compileComponents();

  }));

  beforeEach(function ( this : EasyTest<T> ) {
    this.fixture = TestBed.createComponent(testedType);
    this.fixture.detectChanges();
    this.tested = this.fixture.debugElement;
    // The component instance
    this.testedComponent = this.tested.componentInstance;
    // The component native element
    this.testedElement = this.tested.nativeElement;
  });

  afterEach(function ( this : EasyTest<T> ) {
    if( this.fixture ) {
      this.fixture.destroy();
      this.fixture.nativeElement.remove();
    }
  });
}

@Component({ selector: 'host-for-test', template: '' })
export class HostComponent {
}

export function createHost<T, H>( testedType : Type<T>, hostType : Type<H> = HostComponent as Type<H>, moduleMetadata : TestModuleMetadata = {} ) {

  beforeEach(function () {
    jasmine.addMatchers(customMatchers);
  });
  beforeEach(async(function ( this : EasyTestWithHost<T, H> ) {
    const declarations = [testedType, hostType];
    if( moduleMetadata && moduleMetadata.declarations ) {
      declarations.push(...moduleMetadata.declarations);
    }
    TestBed.configureTestingModule({ ...moduleMetadata, declarations: declarations });
  }));

  beforeEach(function ( this : EasyTestWithHost<T, H> ) {
    this.create = ( template ) => {
      TestBed.overrideComponent(hostType, { set: { template: template } });
      this.hostFixture = TestBed.createComponent(hostType);
      this.hostFixture.detectChanges();
      this.hostComponent = this.hostFixture.componentInstance;
      this.tested = this.hostFixture.debugElement.query(By.directive(testedType));
      this.testedComponent = this.tested.componentInstance;
      this.testedElement = this.tested.nativeElement;
      extendThis.apply(this);
      return this.hostFixture as ComponentFixture<H>;
    }
  });

  afterEach(function ( this : EasyTestWithHost<T, H> ) {
    if( this.hostFixture ) {
      this.hostFixture.destroy();
      this.hostFixture.nativeElement.remove();
    }
  });
}

function extendThis() {
  this.detectChanges = EasyTest.prototype.detectChanges;
  this.query = EasyTest.prototype.query;
  this.queryAll = EasyTest.prototype.queryAll;
  this.trigger = EasyTest.prototype.trigger;
  this.whenInput = EasyTest.prototype.whenInput;
  this.whenOutput = EasyTest.prototype.whenOutput;
  this.detectChangesHost = EasyTestWithHost.prototype.detectChangesHost;
}