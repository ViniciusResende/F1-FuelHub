import { Logging } from './Logging';

describe('Logging', () => {
  let logging, logSpy, infoSpy, warnSpy, errorSpy, debugSpy, traceSpy;
  beforeEach(() => {
    jest.clearAllMocks();
    logSpy = jest.fn();
    infoSpy = jest.fn();
    warnSpy = jest.fn();
    errorSpy = jest.fn();
    debugSpy = jest.fn();
    traceSpy = jest.fn();

    logging = new Logging();
    class LoggingImplementation extends logging.abstractClass {
      log(...args) {
        logSpy(...args);
      }
      info(...args) {
        infoSpy(...args);
      }
      warn(...args) {
        warnSpy(...args);
      }
      error(...args) {
        errorSpy(...args);
      }
      debug(...args) {
        debugSpy(...args);
      }
      trace(...args) {
        traceSpy(...args);
      }
    }
    logging.setImplementation(new LoggingImplementation());
  });

  describe('Abstract methods', () => {
    it('should have set the log implementation', () => {
      logging.log(1, 2);
      expect(logSpy).toHaveBeenCalledWith(1, 2);
    });

    it('should have set the info implementation', () => {
      logging.info('a', 'b', 'c');
      expect(infoSpy).toHaveBeenCalledWith('a', 'b', 'c');
    });

    it('should have set the warn implementation', () => {
      logging.warn({ a: 1 });
      expect(warnSpy).toHaveBeenCalledWith({ a: 1 });
    });

    it('should have set the error implementation', () => {
      logging.error([4, 5, 6]);
      expect(errorSpy).toHaveBeenCalledWith([4, 5, 6]);
    });

    it('should have set the debug implementation', () => {
      logging.debug(null);
      expect(debugSpy).toHaveBeenCalledWith(null);
    });

    it('should have set the trace implementation', () => {
      logging.trace(undefined);
      expect(traceSpy).toHaveBeenCalledWith(undefined);
    });
  });

  describe('Disabling', () => {
    it('Should disable all log methods when logging is disabled', () => {
      logging.disable();
      logging.log(1);
      logging.info(2);
      logging.warn(3);
      logging.error(4);
      logging.debug(5);
      logging.trace(6);
      expect(logSpy).not.toHaveBeenCalled();
      expect(infoSpy).not.toHaveBeenCalled();
      expect(warnSpy).not.toHaveBeenCalled();
      expect(errorSpy).not.toHaveBeenCalled();
      expect(debugSpy).not.toHaveBeenCalled();
      expect(traceSpy).not.toHaveBeenCalled();
    });

    it('Should log after re-enabling logging', () => {
      logging.disable();
      logging.warn(123);
      expect(warnSpy).not.toHaveBeenCalled();
      logging.enable();
      logging.warn(456);
      expect(warnSpy).toHaveBeenCalledWith(456);
    });

    it('Should disable only specific log levels', () => {
      logging.disableLevel(logging.LOG_LEVEL.LOG);
      logging.disableLevel(logging.LOG_LEVEL.INFO);
      logging.log(123);
      logging.info(456);
      logging.error(789);
      expect(logSpy).not.toHaveBeenCalled();
      expect(infoSpy).not.toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalledWith(789);
    });

    it('Should log after re-enabling specific log levels', () => {
      logging.disableLevel(logging.LOG_LEVEL.WARN);
      logging.disableLevel(logging.LOG_LEVEL.ERROR);
      logging.warn(123);
      logging.error(456);
      expect(logSpy).not.toHaveBeenCalled();
      expect(infoSpy).not.toHaveBeenCalled();
      jest.clearAllMocks();
      logging.enableLevel(logging.LOG_LEVEL.ERROR);
      logging.warn('abc');
      logging.error('def');
      expect(warnSpy).not.toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalledWith('def');
    });
  });
});
