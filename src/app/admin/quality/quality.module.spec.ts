import { QualityModule } from './quality.module';

describe('QualityModule', () => {
  let qualityModule: QualityModule;

  beforeEach(() => {
    qualityModule = new QualityModule();
  });

  it('should create an instance', () => {
    expect(qualityModule).toBeTruthy();
  });
});
