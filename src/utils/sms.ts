import dotenv from "dotenv";
import { Twilio } from "twilio";
import {logger} from "./logger";

dotenv.config();

let client: Twilio;
try {
    client = new Twilio(process.env.TWILIO_SID as string, process.env.TWILIO_TOKEN as string);
} catch (e) {
    logger.error({
        file: "src/utils/sms.ts",
        message: "cpuld not instantiate twilio client",
    });
}

export const sendSMS = async (destNumber: string, message: string) => {
    if (client) {
        return await client.messages
            .create({
                body: message,
                from: process.env.PHONE_NUMBER,
                to: destNumber,
            });
    } else {
        return null;
    }
};
