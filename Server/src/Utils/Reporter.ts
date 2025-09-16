import fs from "fs";
import path from "path";

type LogLevel = "INFO" | "WARN" | "ERROR";

interface LogEntry {
  ts: string; // timestamp
  level: LogLevel;
  msg: string;
  context?: Record<string, unknown>; // optional structured data
}

class Report {
  private static logFile = path.join("/var/log/app", "game.log"); // mounted volume
  private static writeStream = fs.createWriteStream(Report.logFile, {
    flags: "a",
  });

  private static log(
    level: LogLevel,
    msg: string,
    context?: Record<string, unknown>,
  ) {
    const entry: LogEntry = {
      ts: new Date().toISOString(),
      level,
      msg,
      context,
    };

    // 1) Console (human-readable)
    if (level === "ERROR") {
      console.error(
        `[${entry.ts}] [${entry.level}] ${entry.msg}`,
        entry.context ?? "",
      );
    } else if (level === "WARN") {
      console.warn(
        `[${entry.ts}] [${entry.level}] ${entry.msg}`,
        entry.context ?? "",
      );
    } else {
      console.log(
        `[${entry.ts}] [${entry.level}] ${entry.msg}`,
        entry.context ?? "",
      );
    }

    // 2) File (structured JSON, one per line)
    Report.writeStream.write(JSON.stringify(entry) + "\n");
  }

  static info(msg: string, context?: Record<string, unknown>) {
    this.log("INFO", msg, context);
  }

  static warn(msg: string, context?: Record<string, unknown>) {
    this.log("WARN", msg, context);
  }

  static error(msg: string, context?: Record<string, unknown>) {
    this.log("ERROR", msg, context);
  }
}

export default Report;
