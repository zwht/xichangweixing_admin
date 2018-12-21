import { LogisticsModule } from './logistics.module';

describe('LogisticsModule', () => {
  let logisticsModule: LogisticsModule;

  beforeEach(() => {
    logisticsModule = new LogisticsModule();
  });

  it('should create an instance', () => {
    expect(logisticsModule).toBeTruthy();
  });
});
