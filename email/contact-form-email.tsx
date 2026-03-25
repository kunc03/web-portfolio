import React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
  Img,
} from "@react-email/components";
// Removed Tailwind import due to compatibility issue with React 19


type ContactFormEmailProps = {
  message: string;
  senderEmail: string;
};

export default function ContactFormEmail({
  message,
  senderEmail,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>You have a new contact message from your portfolio</Preview>
      <Body style={{ backgroundColor: '#f4f5f7', color: '#000000', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
        <Container style={{ margin: '40px auto', maxWidth: '600px', padding: '16px' }}>
          {/* Top Gradient Banner */}
          <Section style={{ height: '6px', background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)', borderRadius: '16px 16px 0 0' }} />

          {/* Main Card */}
          <Section style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderTop: 'none', padding: '40px', borderRadius: '0 0 16px 16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)' }}>
            <Heading style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px', letterSpacing: '-0.025em' }}>
              New Message from Your Portfolio Contact Form
            </Heading>

            <Text style={{ fontSize: '15px', color: '#6b7280', marginBottom: '24px' }}>
              You have received a new contact submission from your web portfolio. Below are the details:
            </Text>

            <Hr style={{ margin: '24px 0', borderColor: '#f3f4f6' }} />

            {/* Inset Subcard for Message */}
            <Section style={{ backgroundColor: '#f9fafb', padding: '24px', borderRadius: '12px', border: '1px solid #f3f4f6', marginBottom: '24px' }}>
              <Text style={{ textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.05em', fontWeight: 'bold', color: '#6b7280', margin: '0 0 8px 0' }}>
                Message
              </Text>
              <Text style={{ fontSize: '15px', color: '#1f2937', whiteSpace: 'pre-line', lineHeight: '1.6', margin: 0 }}>
                {message}
              </Text>
            </Section>

            {/* Inset Subcard for Sender Info */}
            <Section style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #f3f4f6', marginBottom: '24px' }}>
              <Text style={{ fontSize: '14px', color: '#374151', margin: '0 0 4px 0' }}>
                <strong style={{ color: '#111827' }}>Sender's Email:</strong>
              </Text>
              <Text style={{ fontSize: '15px', color: '#4f46e5', fontWeight: '500', margin: 0 }}>
                <a href={`mailto:${senderEmail}`} style={{ color: '#4f46e5', textDecoration: 'none' }}>
                  {senderEmail}
                </a>
              </Text>
            </Section>

            <Hr style={{ margin: '24px 0', borderColor: '#f3f4f6' }} />

            <Text style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center', marginTop: '24px' }}>
              This is an automated notification. Reply directly to this email to respond to the sender.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
