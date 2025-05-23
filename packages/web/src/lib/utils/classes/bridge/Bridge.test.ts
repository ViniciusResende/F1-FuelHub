import { IClass } from '../../../data/interfaces/CommonInterfaces';
import { Bridge } from './Bridge';
import { BridgeImplementationError } from './BridgeErrors';

describe('Bridge', () => {
  let test;

  abstract class AbstractTest {
    abstract run(...args): void;
  }

  class Test extends Bridge<AbstractTest> {
    constructor() {
      super(AbstractTest as IClass<AbstractTest>);
    }

    run(...args): void {
      this.implementation.run(...args);
    }
  }

  beforeEach(() => {
    jest.clearAllMocks();
    test = new Test();
  });

  it('should instantiate Bridge', () => {
    expect(test).toBeInstanceOf(Bridge);
    expect(test).toBeInstanceOf(Test);
  });

  it('should have reference for the abstract class', () => {
    expect(test.abstractClass).toBe(AbstractTest);
  });

  it('should throw BridgeImplementationError if missing implementation', () => {
    const accessMissingImplementation = () => {
      test.run();
    };

    const error = new BridgeImplementationError(
      'Missing bridge implementation for abstract class "AbstractTest"'
    );
    expect(accessMissingImplementation).toThrowError(error);
  });

  it('should set the implementation', () => {
    const runSpy = jest.fn();
    class TestImplementation extends test.abstractClass {
      run(...args) {
        runSpy(...args);
      }
    }

    test.setImplementation(new TestImplementation());
    test.run(123, 'abc');

    expect(runSpy).toHaveBeenCalledTimes(1);
    expect(runSpy).toHaveBeenCalledWith(123, 'abc');
  });

  it('should allow only implementation of the bridged type', () => {
    const runSpy = jest.fn();
    class TestImplementation {
      run(...args) {
        runSpy(...args);
      }
    }

    const setInvalidImplementation = () => {
      test.setImplementation(new TestImplementation());
    };

    const error = new BridgeImplementationError(
      'Bridge implementation does not extend abstract class "AbstractTest"'
    );
    expect(setInvalidImplementation).toThrowError(error);
  });
});
