import emailjs from '@emailjs/browser';

const SERVICE_ID = 'YOUR_SERVICE_ID';  // From EmailJS dashboard
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // From EmailJS dashboard
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';   // From EmailJS dashboard

export const sendWelcomeEmail = async (email: string) => {
  try {
    const templateParams = {
      to_email: email,
      subject: 'Welcome to NetGuard!',
      message: `
        Hi there,

        Welcome to the NetGuard community! 🎉 

        Thank you for subscribing to our newsletter. You've just taken the first step towards better cybersecurity awareness.

        What to expect:
        • Latest security insights and trends
        • Exclusive tips and best practices
        • Early access to new features
        • Community highlights

        Stay secure,
        The NetGuard Team 🛡️
      `
    };

    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};
