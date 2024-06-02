import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const { to, subject, text, html } = await req.json();

  try {
    const response = await axios.post('https://api.resend.io/send', {
      to,
      subject,
      text,
      html
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return NextResponse.json({ message: 'Email sent successfully', data: response.data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to send email', error: error.response?.data || error.message }, { status: 500 });
  }
}
