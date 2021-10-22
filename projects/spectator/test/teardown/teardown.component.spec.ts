import { createComponentFactory } from '@ngneat/spectator';
import { TestBed } from '@angular/core/testing';

import { TeardownComponent } from './teardown.component';

describe('TeardownComponent', () => {
  describe('destroyAfterEach', () => {
    describe('destroyAfterEach equals false', () => {
      const createComponent = createComponentFactory({
        component: TeardownComponent,
        teardown: {
          destroyAfterEach: false,
        },
      });

      it('should not call `ngOnDestroy` on the root provider if `destroyAfterEach` is falsy', () => {
        // Arrange
        const spectator = createComponent();
        const teardownService = spectator.component.teardownService;
        const ngOnDestroySpy = spyOn(teardownService, 'ngOnDestroy');
        // Act
        TestBed.resetTestingModule();
        // Assert
        expect(ngOnDestroySpy).not.toHaveBeenCalled();
      });
    });

    describe('destroyAfterEach equals true', () => {
      const createComponent = createComponentFactory({
        component: TeardownComponent,
        teardown: {
          destroyAfterEach: true,
        },
      });

      it('should call `ngOnDestroy` on the root provider if `destroyAfterEach` is truthy', () => {
        // Arrange
        const spectator = createComponent();
        const teardownService = spectator.component.teardownService;
        const ngOnDestroySpy = spyOn(teardownService, 'ngOnDestroy');
        // Act
        TestBed.resetTestingModule();
        // Assert
        expect(ngOnDestroySpy).toHaveBeenCalled();
      });
    });
  });

  describe('rethrowErrors', () => {
    describe('rethrowErrors equals false', () => {
      const createComponent = createComponentFactory({
        component: TeardownComponent,
        teardown: {
          rethrowErrors: false,
          destroyAfterEach: true,
        },
      });

      it('should not rethrow errors after the fixture is destroyed if `teardown.rethrowErrors` is falsy', () => {
        // Arrange & act
        createComponent({
          props: { rethrowErrors: true },
        });
        // Assert
        expect(() => TestBed.resetTestingModule()).not.toThrowError();
      });
    });

    describe('rethrowErrors equals true', () => {
      const createComponent = createComponentFactory({
        component: TeardownComponent,
        teardown: {
          rethrowErrors: true,
          destroyAfterEach: true,
        },
      });

      it('should not rethrow errors after the fixture is destroyed if `teardown.rethrowErrors` is falsy', () => {
        // Arrange & act
        createComponent({
          props: { rethrowErrors: true },
        });
        // Assert
        expect(() => TestBed.resetTestingModule()).toThrowError(/component threw errors during cleanup/);
      });
    });
  });
});
