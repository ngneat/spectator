import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Spectator, createTestComponentFactory } from '@netbasal/spectator';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IntegrationParentComponent } from './integration-parent.component';
import { IntegrationModule } from './integration.module';

describe('IntegrationParentComponent', () => {
  let spectator: Spectator<IntegrationParentComponent>;
  const createComponent = createTestComponentFactory({
    component: IntegrationParentComponent,
    imports: [IntegrationModule, HttpClientTestingModule],
    declareComponent: false
  });

  it('should exist', () => {
    spectator = createComponent();
    expect(spectator.component).toBeDefined();
  });
});
