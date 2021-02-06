import * as path from "path";
import * as fs from "fs";

export class Logger {
    private name: string
    private dir: string
    constructor(name: string) {
        this.name = name;
        this.dir = path.join(process.cwd(), "logs");
        this.checkDir();
    }
    private checkDir() {
        if (!fs.existsSync(this.dir)) {
            fs.mkdirSync(this.dir, { recursive: true });
        }
    }
    write(level: string, ...args: Array<any>) {
        const filePath = path.join(this.dir, `${this.name}.${level}.log`);
        args.unshift(`[${new Date().toLocaleString()}]`);
        args.push("\n");
        try {
            fs.appendFileSync(filePath, args.join(" "), {
                encoding: "utf8"
            });
        } catch (err) {
            console.warn(`write file(${filePath}) failed: `, err);
            this.checkDir();
        }
        return `[${new Date().toLocaleString()} ${level}] ${args.join(" ")}`;
    }
    debug(...args: Array<any>) {
        return this.write("debug", Array.from(arguments));
    }
    warn(...args: Array<any>) {
        return this.write("warn", Array.from(arguments));
    }
    error(...args: Array<any>) {
        return this.write("error", args);
    }
}