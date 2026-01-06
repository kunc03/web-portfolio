import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Konfigurasi transport nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // email user
    pass: process.env.SMTP_PASS, // email password
  },
});

export async function POST(req: NextRequest) {
  const { to, subject, text, html } = await req.json();

  try {
    // Kirim email
    await transporter.sendMail({
      from: process.env.SMTP_FROM, // sender address
      to,
      subject,
      text,
      html,
    });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
