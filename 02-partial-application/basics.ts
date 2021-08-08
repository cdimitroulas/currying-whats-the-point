type ILogger = {
  log: (msg: string) => void;
}

/**
 * Class-based approach
 */
export class Car {
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  honkHorn(): void {
    this.logger.log("HONK HONK!");
  }
}

const logger = { log: console.log }

const car = new Car(logger);
car.honkHorn();

/**
 * Function-based approach
 */
export const honkHorn = (logger: ILogger) => () => logger.log("HONK HONK!");

honkHorn(logger)();

