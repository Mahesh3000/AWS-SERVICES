// /src/services/aws-services/sesService.ts
import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "../config/awsConfig";

// Send an email using SES
const sendEmail = async (toAddress: string, subject: string, body: string) => {
  const params = {
    Destination: {
      ToAddresses: [toAddress], // Receiver email address
    },
    Message: {
      Body: {
        Text: { Data: body }, // Email body
      },
      Subject: { Data: subject }, // Email subject
    },
    Source: "your-email@example.com", // Verified sender email address
  };

  const command = new SendEmailCommand(params);

  try {
    const result = await sesClient.send(command); // Send the email command
    return result;
  } catch (error: any) {
    throw new Error("Error sending email: " + error.message);
  }
};

export { sendEmail };
