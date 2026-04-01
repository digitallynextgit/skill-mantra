import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface EmailError {
  message: string;
  code?: string;
  response?: string;
}

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false,
        ciphers: 'SSLv3'
      }
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: 'New Scholarship Application Received',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">New Scholarship Application</h2>
          
          <div style="background-color: #f9f9f9; padding: 15px; margin: 15px 0; border-radius: 5px;">
            <h3 style="color: #2980b9;">Personal Information</h3>
            <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
            <p><strong>Gender:</strong> ${formData.gender}</p>
            <p><strong>Category:</strong> ${formData.category}</p>
            <p><strong>Date of Birth:</strong> ${formData.dob}</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 15px; margin: 15px 0; border-radius: 5px;">
            <h3 style="color: #2980b9;">Contact Information</h3>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Contact:</strong> ${formData.contact}</p>
            <p><strong>Location:</strong> ${formData.city}, ${formData.state}</p>
            <p><strong>Address:</strong> ${formData.address}</p>
            <p><strong>Annual Family Income:</strong> ₹${formData.income}</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 15px; margin: 15px 0; border-radius: 5px;">
            <h3 style="color: #2980b9;">Educational Information</h3>
            <p><strong>Qualification:</strong> ${formData.qualification}</p>
            <p><strong>Institute:</strong> ${formData.college}</p>
            <p><strong>Passing Year:</strong> ${formData.passingYear}</p>
            <p><strong>Basic Accounting Knowledge:</strong> ${formData.accounting}</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);

    return NextResponse.json({ 
      success: true,
      message: 'Form submitted successfully' 
    }, { status: 200 });

  } catch (error: unknown) {
    console.error('Error submitting form:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    return NextResponse.json({
      success: false,
      message: 'Error submitting form. Please try again later.',
      error: errorMessage
    }, { status: 500 });
  }
}
