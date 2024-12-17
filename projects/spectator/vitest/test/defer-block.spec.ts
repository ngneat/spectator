import { Component } from '@angular/core';
import { DeferBlockBehavior, fakeAsync } from '@angular/core/testing';
import { createComponentFactory } from '@ngneat/spectator/vitest';

describe('DeferBlock', () => {
  describe('Playthrough Behavior', () => {
    @Component({
      selector: 'app-root',
      template: `
        <button data-test="button--isVisible" (click)="isVisible = !isVisible">Toggle</button>

        @defer (when isVisible) {
          <div>empty defer block</div>
        }
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
          <div>this is the placeholder text</div>
        } @loading {
          <div>this is the loading text</div>
        } @error {
          <div>this is the error text</div>
        }
      `,
      standalone: false,
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
      await spectator.deferBlock().renderComplete();

      // Assert
      expect(spectator.element.outerHTML).toContain('empty defer block');
    });

    it('should render the placeholder state', async () => {
      // Arrange
      const spectator = createComponent();

      // Act
      await spectator.deferBlock().renderPlaceholder();

      // Assert
      expect(spectator.element.outerHTML).toContain('this is the placeholder text');
    });

    it('should render the loading state', async () => {
      // Arrange
      const spectator = createComponent();

      // Act
      await spectator.deferBlock().renderLoading();

      // Assert
      expect(spectator.element.outerHTML).toContain('this is the loading text');
    });

    it('should render the error state', async () => {
      // Arrange
      const spectator = createComponent();

      // Act
      await spectator.deferBlock().renderError();

      // Assert
      expect(spectator.element.outerHTML).toContain('this is the error text');
    });
  });

  describe('Manual Behavior with nested states', () => {
    @Component({
      selector: 'app-root',
      template: `
        @defer (on viewport) {
          <div>complete state #1</div>

          <!-- nested defer block -->
          @defer {
            <div>complete state #1.1</div>

            <!-- Deep nested defer block #1 -->
            @defer {
              <div>complete state #1.1.1</div>
            } @placeholder {
              <div>placeholder state #1.1.1</div>
            }
            <!-- /Deep nested defer block #1-->

            <!-- Deep nested defer block #2 -->
            @defer {
              <div>complete state #1.1.2</div>
            } @placeholder {
              <div>placeholder state #1.1.2</div>
            }
            <!-- /Deep nested defer block #2-->
          } @placeholder {
            <div>nested placeholder text</div>
          } @loading {
            <div>nested loading text</div>
          } @error {
            <div>nested error text</div>
          }
          <!-- /nested defer block -->
        } @placeholder {
          <div>placeholder state #1</div>
        } @loading {
          <div>loading state #1</div>
        } @error {
          <div>error state #1</div>
        }
      `,
      standalone: false,
    })
    class DummyComponent {}

    const createComponent = createComponentFactory({
      component: DummyComponent,
      deferBlockBehavior: DeferBlockBehavior.Manual,
    });

    it('should render the first nested complete state', async () => {
      // Arrange
      const spectator = createComponent();

      // Act
      const parentCompleteState = await spectator.deferBlock().renderComplete();
      await parentCompleteState.deferBlock().renderComplete();

      // Assert
      expect(spectator.element.outerHTML).toContain('complete state #1.1');
    });

    it('should render the first deep nested complete state', async () => {
      // Arrange
      const spectator = createComponent();

      // Act
      const parentCompleteState = await spectator.deferBlock().renderComplete();
      const childrenCompleteState = await parentCompleteState.deferBlock().renderComplete();
      await childrenCompleteState.deferBlock().renderComplete();

      // Assert
      expect(spectator.element.outerHTML).toContain('complete state #1.1.1');
    });

    it('should render the first deep nested placeholder state', async () => {
      // Arrange
      const spectator = createComponent();

      // Act
      const parentCompleteState = await spectator.deferBlock().renderComplete();
      const childrenCompleteState = await parentCompleteState.deferBlock().renderComplete();
      await childrenCompleteState.deferBlock().renderPlaceholder();

      // Assert
      expect(spectator.element.outerHTML).toContain('placeholder state #1.1.1');
    });

    it('should render the second nested complete state', async () => {
      // Arrange
      const spectator = createComponent();

      // Act
      const parentCompleteState = await spectator.deferBlock().renderComplete();
      const childrenCompleteState = await parentCompleteState.deferBlock().renderComplete();
      await childrenCompleteState.deferBlock(1).renderComplete();

      // Assert
      expect(spectator.element.outerHTML).toContain('complete state #1.1.2');
    });

    it('should render the second nested placeholder state', async () => {
      // Arrange
      const spectator = createComponent();

      // Act
      const parentCompleteState = await spectator.deferBlock().renderComplete();
      const childrenCompleteState = await parentCompleteState.deferBlock().renderComplete();
      await childrenCompleteState.deferBlock(1).renderPlaceholder();

      // Assert
      expect(spectator.element.outerHTML).toContain('placeholder state #1.1.2');
    });

    it('should render the placeholder state', async () => {
      // Arrange
      const spectator = createComponent();

      // Act
      await spectator.deferBlock().renderPlaceholder();

      // Assert
      expect(spectator.element.outerHTML).toContain('placeholder state #1');
    });

    it('should render the loading state', async () => {
      // Arrange
      const spectator = createComponent();

      // Act
      await spectator.deferBlock().renderLoading();

      // Assert
      expect(spectator.element.outerHTML).toContain('loading state #1');
    });

    it('should render the error state', async () => {
      // Arrange
      const spectator = createComponent();

      // Act
      await spectator.deferBlock().renderError();

      // Assert
      expect(spectator.element.outerHTML).toContain('error state #1');
    });
  });
});
