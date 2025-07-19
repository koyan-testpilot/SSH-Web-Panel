import React from 'react';

interface IconProps {
  name: string;
  className?: string;
}

const ICONS: Record<string, React.ReactNode> = {
  dashboard: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12A2.25 2.25 0 0020.25 14.25V3.75M3.75 3h16.5M3.75 3v1.5h16.5V3M3.75 8.25h16.5M7.5 11.25h3.75m-3.75 3h3.75" />,
  users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.375m-4.002-4.236a3.75 3.75 0 10-5.25-5.25 3.75 3.75 0 005.25 5.25zM12 12.75A3.75 3.75 0 1115.75 9 3.75 3.75 0 0112 12.75z" />,
  help: <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />,
  server: <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3V7.5a3 3 0 013-3h13.5a3 3 0 013 3v3.75a3 3 0 01-3 3m-13.5 0h13.5M5.25 12h13.5" />,
  warning: <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />,
  danger: <path strokeLinecap="round" strokeLinejoin="round"d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />,
  bandwidth: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5h16.5v15H3.75v-15zm8.25 2.25v10.5M8.25 9.75h9.75" />,
  edit: <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />,
  delete: <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />,
  refresh: <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-11.667-11.668v4.992m0 0h-4.992m4.992 0l-3.181-3.183a8.25 8.25 0 0111.667 0l-3.181 3.183" />,
  close: <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />,
  user: <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />,
  'command-line': <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25z" />,
  logout: <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0110.5 3h6a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0116.5 21h-6a2.25 2.25 0 01-2.25-2.25V15m-3 0l3-3m0 0l-3-3m3 3H3" />,
  info: <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />,
  globe: <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.23-6.42l.002-.002.002-.002a.75.75 0 0 0-.256-1.124l-3.21-1.396a.75.75 0 0 0-.776.044l-1.92 1.44a.75.75 0 0 1-.844 0l-1.92-1.44a.75.75 0 0 0-.776-.044l-3.21 1.396a.75.75 0 0 0-.256 1.124l.002.002.002.002A9.004 9.004 0 0 0 12 21Zm0 0a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />,
  clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
};

const Icon: React.FC<IconProps> = ({ name, className = 'w-6 h-6' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      {ICONS[name] || <circle cx="12" cy="12" r="10" />}
    </svg>
  );
};

export default Icon;