import { Component, DebugElement, Provider, Type } from '@angular/core';
import { async, ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { customMatchers } from './easy-test.matchers';

// T = Tested component
export class EasyTest<T> {
  fixture : ComponentFixture<T>;
  debugElement : DebugElement;
  component : T;
  element : HTMLElement | any;

  /**
   * Run detect changes on the host component
   */
  detectChanges() {
    this[ 'hostFixture' ] ? this[ 'hostFixture' ].detectChanges() : this.fixture.detectChanges();
  }

  /**
   * Query a DOM element from the tested element
   * @param selector
   * @returns {any}
   */
  query( selector : string ) {
    return this.element.querySelector(selector);
  }

  /**
   * Query a DOM elements from the tested element
   * @param selector
   * @returns {any}
   */
  queryAll( selector : string ) {
    return this.element.querySelectorAll(selector);
  }

  /**
   *
   * @param input
   * @param inputValue
   */
  whenInput( input : object | string, inputValue? : any ) {
    if ( typeof input === 'string' ) {
      this.component[ input ] = inputValue;
    } else {
      Object.keys(input).forEach(inputKey => {
        this.component[ inputKey ] = input[ inputKey ];
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
    const observable = this.component[ output ];
    if ( typeof observable.subscribe === 'function' ) {
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
  trigger( event : string, selector : string | DebugElement, eventObj = null ) {
    let element = selector;
    if ( typeof selector === 'string' ) {
       element = this.debugElement.query(By.css(selector));
    }
    if ( !element ) {
      console.warn(`Element ${selector} does not exists`);
    } else {
      (element as DebugElement).triggerEventHandler(event, eventObj);
      this.detectChanges();
    }
  }

}

export class EasyTestWithHost<T, H = HostComponent> extends EasyTest<T> {
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
export function createEasyTest<T>( testedType : Type<T>, moduleMetadata : TestModuleMetadata = {} ): EasyTest<T> {

  jasmine.addMatchers(customMatchers);

  const easyTest = new EasyTest<T>();

  const declarations = [ testedType ];
  if ( moduleMetadata && moduleMetadata.declarations ) {
    declarations.push(...moduleMetadata.declarations);
  }

  TestBed.configureTestingModule({...moduleMetadata, declarations: declarations}).compileComponents();
  easyTest.fixture = TestBed.createComponent(testedType);
  easyTest.fixture.detectChanges();
  easyTest.debugElement = easyTest.fixture.debugElement;
  // The component instance
  easyTest.component = easyTest.debugElement.componentInstance;
  // The component native element
  easyTest.element = easyTest.debugElement.nativeElement;

  return easyTest;
}

@Component({selector: 'host-for-test', template: ''})
export class HostComponent {
}

export function makeCreateHost<T, H>( testedType : Type<T>, hostType : Type<H> = HostComponent as Type<H>, moduleMetadata : TestModuleMetadata = {} ) {

  beforeEach(function () {
    jasmine.addMatchers(customMatchers);
  });

  beforeEach(async(function ( this : EasyTestWithHost<T, H> ) {

    const declarations = [ testedType, hostType ];
    if ( moduleMetadata && moduleMetadata.declarations ) {
      declarations.push(...moduleMetadata.declarations);
    }
    TestBed.configureTestingModule({...moduleMetadata, declarations: declarations});
  }));

  return ( template: string, styles?: any ) : EasyTestWithHost<T, H> => {
    TestBed.overrideComponent(hostType, {set: {template: template, styles: styles || []}});
    const eastTest = new EasyTestWithHost<T, H>();
    eastTest.hostFixture = TestBed.createComponent(hostType);
    eastTest.hostFixture.detectChanges();
    eastTest.hostComponent = eastTest.hostFixture.componentInstance;
    eastTest.debugElement = eastTest.hostFixture.debugElement.query(By.directive(testedType));
    eastTest.component = eastTest.debugElement.componentInstance;
    eastTest.element = eastTest.debugElement.nativeElement;
    return eastTest;
  }
}

export class EasyTestService<S> {
  service : S
}

/**
 *
 * @param service
 * @param mock
 */
export function testService<S, M = null>( service : Type<S>, mock? : Type<M> ) {
  beforeEach(function ( this : EasyTestService<M | S> ) {
    let providers : Provider[];

    if ( typeof mock === 'function' ) {
      providers = [ {provide: service, useClass: mock} ];
    } else {
      providers = [ {provide: service, useValue: mock} ]
    }
    if ( !mock ) {
      providers = [ {provide: service, useClass: service} ]
    }
    TestBed.configureTestingModule({
      providers
    });
    this.service = TestBed.get(service);
  });
}
