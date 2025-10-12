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
  // Use logs directory that's mounted in docker-compose
  private static logDir =
    process.env.NODE_ENV === "production" ? "/var/log/app" : "./logs";
  private static logFile = path.join(Report.logDir, "game.log");
  private static writeStream: fs.WriteStream | null = null;

  // Initialize write stream with directory creation
  private static initializeLogger() {
    if (!Report.writeStream) {
      try {
        // Ensure log directory exists
        if (!fs.existsSync(Report.logDir)) {
          fs.mkdirSync(Report.logDir, { recursive: true });
        }

        Report.writeStream = fs.createWriteStream(Report.logFile, {
          flags: "a",
        });

        // Handle write stream errors
        Report.writeStream.on("error", (err) => {
          console.error("Log file write error:", err);
        });
      } catch (error) {
        console.error("Failed to initialize logger:", error);
        // Fallback to console-only logging
        Report.writeStream = null;
      }
    }
  }

  private static log(
    level: LogLevel,
    msg: string,
    context?: Record<string, unknown>,
  ) {
    // Ensure logger is initialized
    Report.initializeLogger();
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

    // 2) File (structured JSON, one per line) - only if writeStream is available
    if (Report.writeStream) {
      try {
        Report.writeStream.write(JSON.stringify(entry) + "\n");
      } catch (error) {
        console.error("Failed to write to log file:", error);
      }
    }
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
