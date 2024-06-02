'use client';

import { useSectionInView } from '@/lib/hooks';
import React, { FormEvent, useState } from 'react';
import SectionHeading from './section-heading';
import { motion } from 'framer-motion';
import { sendEmail } from '@/actions/sendEmail';
import SubmitBtn from './submit-btn';
import toast from 'react-hot-toast';

export default function Contact() {
  const { ref } = useSectionInView('Contact');

  // const [to, setTo] = useState<string>('');
  // const [subject, setSubject] = useState<string>('');
  // const [text, setText] = useState<string>('');
  // const [html, setHtml] = useState<string>('');
  // const [status, setStatus] = useState<string>('');

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch('/api/send', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ to, subject, text, html })
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       setStatus('Email sent successfully!');
  //     } else {
  //       setStatus(`Failed to send email: ${data.message}`);
  //     }
  //   } catch (error) {
  //     setStatus(`Failed to send email`);
  //   }
  // };

  return (
    <motion.section id="contact" ref={ref} className="mb-20 sm:mb-28 w-[min(100%, 38rem)] scroll-mt-28 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}>
      <SectionHeading>Contact me</SectionHeading>

      <p className="text-gray-700 -mt-6 dark:text-white/80">
        Please contact me directly at{' '}
        <a className="underline" href="mailto:baguskuncoro003@gmail.com">
          baguskuncoro003@gmail.com
        </a>{' '}
        or through this form.
      </p>

      <form
        className="mt-10 flex flex-col "
        action={async (formData) => {
          const { data, error } = await sendEmail(formData);

          if (error) {
            toast.error(error);
            return;
          }

          toast.success('Email sent successfully!');
        }}
      >
        <input
          name="senderEmail"
          className="h-14 px-4 rounded-lg borderBlack dark:bg-white/10 dark:text-white/80 dark:opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          type="email"
          required
          maxLength={500}
          placeholder="Your email"
        />
        <textarea
          name="message"
          className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white/10 dark:text-white/80 dark:opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          required
          maxLength={5000}
          placeholder="Your message"
        />

        <SubmitBtn />
      </form>

{/* <form onSubmit={handleSubmit} className="text-black">
        <div>
          <label>To: </label>
          <input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Subject: </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Text: </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <label>HTML: </label>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
          />
        </div>
        <button type="submit">Send Email</button>
      </form>
      {status && <p>{status}</p>} */}
    </motion.section>
  );
}
