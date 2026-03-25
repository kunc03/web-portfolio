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
      className="group flex items-center justify-center gap-2 h-12 w-[8.5rem] bg-gray-900 text-white outline-none rounded-full transition-all hover:-translate-y-1 hover:shadow-lg focus:ring-4 focus:ring-gray-900/20 active:scale-95 disabled:hover:translate-y-0 disabled:scale-100 disabled:opacity-65 disabled:cursor-not-allowed dark:bg-primary-600 dark:hover:bg-primary-500 font-medium"
    >
      {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white "></div>
      ) : (
        <>
          Submit{' '}
          <FaPaperPlane className="text-xs opacity-80 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
        </>
      )}
    </button>
  );
}
