import dotenv from "dotenv";
import { Twilio } from "twilio";

dotenv.config();

const client = new Twilio(process.env.TWILIO_SID as string, process.env.TWILIO_TOKEN as string);

export const sendSMS = async (destNumber: string, message: string) => {
    return await client.messages
        .create({
            body: message,
            from: process.env.PHONE_NUMBER,
            to: destNumber,
        });
};
