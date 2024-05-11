import React, { useEffect, useState } from 'react';

interface SnackbarProps {
  title: string;
}

const Snackbar = ({ title }: SnackbarProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Set show to true after a short delay to trigger the animation
    const timeout = setTimeout(() => {
      setShow(true);
    }, 100); // Adjust the delay time as needed

    // Clean up the timeout
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`transition-transform duration-500 transform ${
        show ? 'translate-y-0' : 'translate-y-24'
      } fixed inset-x-0 mx-auto w-fit bottom-8 bg-teal-500 rounded-md p-2`}
    >
      {title}
    </div>
  );
};

export default Snackbar;
