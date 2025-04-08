/// <reference types="vite/client" />

// Declare react-icons modules to ensure they are properly recognized
declare module 'react-icons/fa' {
  export * from '@react-icons/all-files/fa';
}

declare module 'react-icons/fi' {
  export * from '@react-icons/all-files/fi';
}

declare module 'react-icons/*' {
  const content: any;
  export default content;
}
