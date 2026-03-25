import React from 'react';
import { useFormStatus } from 'react-dom';
import { FaPaperPlane } from 'react-icons/fa';

type SubmitBtnProps = {
  disabled?: boolean;
};

export default function SubmitBtn({ disabled }: SubmitBtnProps) {
  const { pending } = useFormStatus();
  const isDisabled = pending || disabled;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className="group flex items-center justify-center h-[3rem] w-[8rem] bg-gray-900 border border-transparent dark:border-white/10 text-white outline-none rounded-full transition-all duration-300 focus:scale-105 hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] active:scale-95 disabled:scale-100 disabled:bg-opacity-65 disabled:cursor-not-allowed dark:bg-white/10 dark:hover:bg-white/20 dark:text-white/90 glass"
    >
      {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white "></div>
      ) : (
        <>
          Submit <FaPaperPlane className="text-xs opacity-70 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />{' '}
        </>
      )}
    </button>
  );
}
