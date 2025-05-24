import { Logger } from "./logger";

const spyDebug = jest.spyOn(console, "debug").mockImplementation(() => {});
const spyInfo  = jest.spyOn(console, "info").mockImplementation(() => {});
const spyWarn  = jest.spyOn(console, "warn").mockImplementation(() => {});
const spyError = jest.spyOn(console, "error").mockImplementation(() => {});

afterEach(() => jest.clearAllMocks());

describe("Logger", () => {
  it("logs an info message with timestamp and level", () => {
    Logger.info("Hello world");

    expect(spyInfo).toHaveBeenCalledTimes(1);
    const logged = spyInfo.mock.calls[0][0] as string;
    expect(logged).toMatch(/\[INFO]/);
    expect(logged).toContain("Hello world");
  });

  it("logs with a namespace", () => {
    const log = Logger.withNS("drivers");
    log.error("Boom");

    expect(spyError).toHaveBeenCalledTimes(1);
    const logged = spyError.mock.calls[0][0] as string;
    expect(logged).toMatch(/\[ERROR]/);
    expect(logged).toMatch(/\[drivers]/);
    expect(logged).toContain("Boom");
  });

  it("forwards extra metadata args", () => {
    const meta = { foo: "bar" };
    Logger.debug("Check meta", meta);

    expect(spyDebug).toHaveBeenCalledWith(
      expect.stringContaining("[DEBUG]"),
      meta
    );
  });

  it("logs a warn message", () => {
    Logger.warn("Heads up");

    expect(spyWarn).toHaveBeenCalledTimes(1);
    const logged = spyWarn.mock.calls[0][0] as string;
    expect(logged).toMatch(/\[WARN]/);
    expect(logged).toContain("Heads up");
  });
});
