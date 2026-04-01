import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { name, phone, emailAddress, city, accountType, companyName } =
      await request.json();

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: "New Form Submission",
      text: `
        Name: ${name}
        Phone: ${phone}
        Email: ${emailAddress}
        City/State: ${city}
        Account Type: ${accountType}
        ${companyName ? `Company Name: ${companyName}` : ""}
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Your details have been submitted successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending email", error },
      { status: 500 }
    );
  }
}
