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
      className="mb-20 sm:mb-28 max-w-[42rem] mx-auto scroll-mt-28 text-center px-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <SectionHeading className="mb-4 text-gray-900 dark:text-white">Contact me</SectionHeading>

      <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg mb-10">
        Please contact me directly at{' '}
        <a className="text-primary-600 dark:text-primary-400 font-semibold hover:underline underline-offset-4" href="mailto:baguskuncoro003@gmail.com">
          baguskuncoro003@gmail.com
        </a>{' '}
        or through this form.
      </p>

      <form
        className="flex flex-col gap-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-sm"
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
        <div className="flex flex-col text-left">
          <label htmlFor="senderEmail" className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 ml-1">Email</label>
          <input
            id="senderEmail"
            name="senderEmail"
            className="h-14 px-5 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl focus:bg-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all font-sans"
            type="email"
            required
            maxLength={500}
            placeholder="your@email.com"
            onChange={(e) => setSenderEmail(e.currentTarget.value)}
          />
        </div>
        
        <div className="flex flex-col text-left mt-2">
          <label htmlFor="message" className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 ml-1">Message</label>
          <textarea
            id="message"
            name="message"
            className="h-48 resize-none p-5 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl focus:bg-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all font-sans"
            required
            maxLength={5000}
            placeholder="Tell me about your project..."
            onChange={(e) => setMessage(e.currentTarget.value)}
          />
        </div>

        <div className="flex justify-end mt-4">
          <SubmitBtn disabled={!isFormFilled} />
        </div>
      </form>
    </motion.section>
  );
}
