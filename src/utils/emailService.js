// Example usage in your React components
export const sendEmail = async (emailData) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailData)
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};

// Usage example:
// import { sendEmail } from './utils/emailService';
// 
// const handleSubmit = async () => {
//   const result = await sendEmail({
//     to: 'recipient@example.com',
//     subject: 'Test Email',
//     text: 'Plain text content',
//     html: '<h1>HTML content</h1>'
//   });
//   console.log(result);
// };
