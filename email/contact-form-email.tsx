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
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

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
      <Tailwind>
        <Body className="bg-gray-100 text-black">
          <Container className="mx-auto max-w-lg">
            <Section className="bg-white border border-gray-300 my-10 px-10 py-8 rounded-md shadow-md">
              <Heading className="text-xl font-bold mb-4 text-black">
                New Message from Your Portfolio Contact Form
              </Heading>

              <Text className="text-sm text-gray-700 mb-2">
                You’ve received a new message. Below are the details:
              </Text>

              <Hr className="my-4" />

              <Text className="text-base text-gray-800 whitespace-pre-line">
                <strong>Message:</strong> <br />
                {message}
              </Text>

              <Hr className="my-4" />

              <Text className="text-sm text-gray-700">
                <strong>Sender's Email:</strong> {senderEmail}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
