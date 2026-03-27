'use client';

import { useSectionInView } from '@/lib/hooks';
import React, { useMemo, useState } from 'react';
import SectionHeading from './section-heading';
import { motion } from 'framer-motion';
import { sendEmail } from '@/actions/sendEmail';
import SubmitBtn from './submit-btn';
import toast from 'react-hot-toast';

export default function Contact() {
  const { ref } = useSectionInView('#contact');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');

  const isFormFilled = useMemo(() => {
    return senderEmail.trim().length > 0 && message.trim().length > 0;
  }, [message, senderEmail]);

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] scroll-mt-28 text-center relative"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{ once: true }}
    >
      <SectionHeading>Contact me</SectionHeading>

      <p className="text-gray-700 dark:text-gray-300 -mt-6">
        Please contact me directly at{' '}
        <a className="underline text-gray-900 dark:text-white" href="mailto:baguskuncoro003@gmail.com">
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

          toast.success('Thanks! Your message has been sent successfully.', {
            duration: 5000,
          });
        }}
      >
        <input
          name="senderEmail"
          className="h-14 px-4 rounded-lg border border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/10 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:bg-white/80 dark:focus:bg-white/20 transition-all outline-none"
          type="email"
          required
          maxLength={500}
          placeholder="Your email"
          onChange={(e) => setSenderEmail(e.currentTarget.value)}
        />
        <textarea
          name="message"
          className="h-52 my-3 rounded-lg border border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/10 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:bg-white/80 dark:focus:bg-white/20 transition-all outline-none p-4"
          required
          maxLength={5000}
          placeholder="Your message"
          onChange={(e) => setMessage(e.currentTarget.value)}
        />

        <SubmitBtn disabled={!isFormFilled} />
      </form>

      
    </motion.section>
  );
}
