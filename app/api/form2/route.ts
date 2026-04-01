import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  // Parse form data
  const formData = await request.json();

  // Create a transporter using Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  // Build the email content from form data
  const emailContent = `
    Job Title: ${formData.JobTitle || 'N/A'}
    Gender: ${formData.gender || 'N/A'}
    Personality: ${formData.personality?.join(', ') || 'N/A'}
    Location: ${formData.location || 'N/A'}
    Site Preference: ${formData.sitePreference?.join(', ') || 'N/A'}
    Location Preference: ${formData.locationPreference?.join(', ') || 'N/A'}
    Availability Preference: ${formData.availabilityPreference?.join(', ') || 'N/A'}
    Communication: ${formData.communication?.join(', ') || 'N/A'}
    Experience: ${formData.experience?.join(', ') || 'N/A'}
    Industry: ${formData.industry || 'N/A'}
    Salary: ${formData.salary?.join(', ') || 'N/A'}
    Suggestion: ${formData.suggestion || 'N/A'}
  `;

  // Mail options
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,  // Send to the same email as the sender
    subject: "New Form Submission",
    text: emailContent,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error sending email", error }, { status: 500 });
  }
}
