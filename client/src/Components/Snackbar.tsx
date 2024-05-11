import React, { useEffect, useState } from 'react';

interface SnackbarProps {
  title: string;
}

const Snackbar = ({ title }: SnackbarProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`transition-all duration-500 transform ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      } fixed inset-x-0 mx-auto w-fit bottom-8 bg-teal-500 rounded-md p-2`}
    >
      {title}
    </div>
  );
};

export default Snackbar;
