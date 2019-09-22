export class LoggerUtility {
    public static log(data: string): void {
        console.log(`[${new Date()}]  ${data}`);
    }

    public static logError(data: string): void {
        console.log(`\x1b[31m`, `[${new Date()}]  [Error]  ${data}`);
    }

    public static logWarning(data: string): void {
        console.log('\x1b[33m', `[${new Date()}]  [Warning]  ${data}`);
    }

    public static logInfo(data: string): void {
        console.log('\x1b[36m', `[${new Date()}]  [Info]  ${data}`);
    }

    public static logDebug(data: string): void {
        console.log('\x1b[35m', `[${new Date()}]  [Debug]  ${data}`);
    }

    public static logFatal(data: string): void {
        console.log('\x1b[41m%s\x1b[0m', `[${new Date()}]  [Fatal]  ${data}`);
    }

    public static logSuccess(data: string): void {
        console.log('\x1b[32m', `[${new Date()}]  [Success]  ${data}`);
    }
}
