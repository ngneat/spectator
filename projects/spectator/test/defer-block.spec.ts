import { Component } from '@angular/core';
import { DeferBlockBehavior, fakeAsync } from '@angular/core/testing';
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
      spectator.deferBlocks.renderComplete();

      // Assert
      expect(spectator.element.outerHTML).toContain('empty defer block');
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
      const parentCompleteState = await spectator.deferBlocks.renderComplete();
      await parentCompleteState.deferBlocks.renderComplete();

      // Assert
      expect(spectator.element.outerHTML).toContain('complete state #1.1');
    });

    it('should render the first deep nested complete state', async () => {
      // Arrange
      const spectator = createComponent();

      // Act
      const parentCompleteState = await spectator.deferBlocks.renderComplete();
      const childrenCompleteState = await parentCompleteState.deferBlocks.renderComplete();
      await childrenCompleteState.deferBlocks.renderComplete();

      // Assert
      expect(spectator.element.outerHTML).toContain('complete state #1.1.1');
    });

    it('should render the first deep nested placeholder state', async () => {
      // Arrange
      const spectator = createComponent();

      // Act
      const parentCompleteState = await spectator.deferBlocks.renderComplete();
      const childrenCompleteState = await parentCompleteState.deferBlocks.renderComplete();
      await childrenCompleteState.deferBlocks.renderPlaceholder();

      // Assert
      expect(spectator.element.outerHTML).toContain('placeholder state #1.1.1');
    });

    it('should render the second nested complete state', async () => {
      // Arrange
      const spectator = createComponent();

      // Act
      const parentCompleteState = await spectator.deferBlocks.renderComplete();
      const childrenCompleteState = await parentCompleteState.deferBlocks.renderComplete();
      await childrenCompleteState.deferBlocks.renderComplete(1);

      // Assert
      expect(spectator.element.outerHTML).toContain('complete state #1.1.2');
    });

    it('should render the second nested placeholder state', async () => {
      // Arrange
      const spectator = createComponent();

      // Act
      const parentCompleteState = await spectator.deferBlocks.renderComplete();
      const childrenCompleteState = await parentCompleteState.deferBlocks.renderComplete();
      await childrenCompleteState.deferBlocks.renderPlaceholder(1);

      // Assert
      expect(spectator.element.outerHTML).toContain('placeholder state #1.1.2');
    });

    it('should render the placeholder state', async () => {
      // Arrange
      const spectator = createComponent();

      // Act
      await spectator.deferBlocks.renderPlaceholder();

      // Assert
      expect(spectator.element.outerHTML).toContain('placeholder state #1');
    });

    it('should render the loading state', async () => {
      // Arrange
      const spectator = createComponent();

      // Act
      await spectator.deferBlocks.renderLoading();

      // Assert
      expect(spectator.element.outerHTML).toContain('loading state #1');
    });

    it('should render the error state', async () => {
      // Arrange
      const spectator = createComponent();

      // Act
      await spectator.deferBlocks.renderError();

      // Assert
      expect(spectator.element.outerHTML).toContain('error state #1');
    });
  });
});
