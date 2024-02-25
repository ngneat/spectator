import { Component } from '@angular/core';
import { DeferBlockBehavior, DeferBlockState, fakeAsync } from '@angular/core/testing';
import { createComponentFactory } from '@ngneat/spectator';

describe('DeferBlock', () => {
  describe('Playthrough Behavior', () => {
    @Component({
      selector: 'app-root',
      template: `
        <button data-test="button--isVisible" (click)="isVisible = !isVisible">Toggle</button>

        @defer (when isVisible) {
        <div>empty defer block</div>
        } ,
      `,
      standalone: true,
    })
    class DummyComponent {
      isVisible = false;
    }

    const createComponent = createComponentFactory({
      component: DummyComponent,
      deferBlockBehavior: DeferBlockBehavior.Playthrough,
    });

    it('should render the defer block when isVisible is true', fakeAsync(() => {
      // Arrange
      const spectator = createComponent();

      const button = spectator.query('[data-test="button--isVisible"]')!;

      // Act
      spectator.click(button);
      spectator.tick();
      spectator.detectChanges();

      // Assert
      expect(spectator.element.outerHTML).toContain('empty defer block');
    }));
  });

  describe('Manual Behavior', () => {
    @Component({
      selector: 'app-root',
      template: `
        @defer (on viewport) {
        <div>empty defer block</div>
        } @placeholder {
        <div>placeholder</div>
        }
      `,
    })
    class DummyComponent {}

    const createComponent = createComponentFactory({
      component: DummyComponent,
      deferBlockBehavior: DeferBlockBehavior.Manual,
    });

    it('should render the complete state', async () => {
      // Arrange
      const spectator = createComponent();

      // Act
      const deferFixture = (await spectator.fixture.getDeferBlocks())[0];
      deferFixture.render(DeferBlockState.Complete);
      spectator.detectChanges();
      await spectator.fixture.whenStable();

      // Assert
      expect(spectator.element.outerHTML).toContain('empty defer block');
    });
  });
});
