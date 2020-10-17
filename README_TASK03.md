## Task 3. Logging & Error Handling

Add logging functionality to already existing REST service.

1. Add express middleware which will log incoming requests to service (url, query parameters, body).
2. Add express middleware which will log all unhandled errors and return a standard message with HTTP code 500 (Internal Server Error).

3. Add errors handling to `process.on(‘uncaughtException’,...)`.
4. Add Unhandled promise rejection listener to log error
5. `console.log` or writing to a file can be used for logging. Any third-party logging library can also be used for this purpose.

Код логирования находится в модуле src/errors/logger.js

Применяется в src/app.js

![Скриншот старта приложения](doc/task03_start.png "Скриншот старта приложения")

![Скриншот прохождения тестов](doc/task03_test.png "Скриншот прохождения тестов")

![Скриншот логгирования](doc/task03_logging.png "Скриншот логгирования")

![Скриншот обработки UNCAUGHT](doc/task03_exception_UNCAUGHT.png "Скриншот обработки UNCAUGHT")

![Скриншот обработки UNHANDLED](doc/task03_exception_UNHANDLED.png "Скриншот обработки UNHANDLED")