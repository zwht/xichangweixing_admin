import { InfomationModule } from './infomation.module';

describe('InfomationModule', () => {
  let infomationModule: InfomationModule;

  beforeEach(() => {
    infomationModule = new InfomationModule();
  });

  it('should create an instance', () => {
    expect(infomationModule).toBeTruthy();
  });
});
