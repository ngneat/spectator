import { DebugElement, Type } from '@angular/core';
import { ComponentFixture, TestModuleMetadata } from '@angular/core/testing';
export declare class EasyTest<T> {
    fixture: ComponentFixture<T>;
    tested: DebugElement;
    testedComponent: T;
    testedElement: HTMLElement | any;
    /**
     * Run detect changes on the host component
     */
    detectChanges(): void;
    /**
     * Query a DOM element from the tested element
     * @param selector
     * @returns {any}
     */
    query(selector: string): any;
    /**
     * Query a DOM elements from the tested element
     * @param selector
     * @returns {any}
     */
    queryAll(selector: string): any;
    /**
     *
     * @param input
     * @param inputValue
     */
    whenInput(input: object | string, inputValue?: any): void;
    /**
     *
     * @param output
     * @param cb
     */
    whenOutput<T>(output: string, cb: (result: T) => any): void;
    /**
     * Trigger event on the element via DebugElement.triggerEventHandler()
     * @param event
     * @param selector
     * @param eventObj
     */
    trigger(event: string, selector: string, eventObj?: any): void;
}
export declare class EasyTestWithHost<T, H = HostComponent> extends EasyTest<T> {
    create: (template: string) => any;
    hostComponent: H;
    hostFixture: ComponentFixture<H>;
    /**
     * Run detect changes on the host component
     */
    detectChangesHost(): void;
}
/**
 *
 * @param testedType
 * @param moduleMetadata
 */
export declare function easyTest<T>(testedType: Type<T>, moduleMetadata?: TestModuleMetadata): void;
export declare class HostComponent {
}
export declare function createHost<T, H>(testedType: Type<T>, hostType?: Type<H>, moduleMetadata?: TestModuleMetadata): void;
export declare class EasyTestService<S> {
    service: S;
}
/**
 *
 * @param service
 * @param mock
 */
export declare function testService<S, M = null>(service: Type<S>, mock?: Type<M>): void;
