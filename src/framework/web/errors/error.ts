import winston from "winston/lib/winston/config";
import morgan from "morgan"
import fs from "fs"
import path from "path"


const logStream =fs.createWriteStream("accessLog", {flags: "a"})
export {logStream}