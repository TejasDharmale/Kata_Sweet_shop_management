// EmailJS service for feedback forms
// You need to replace "YOUR_PUBLIC_KEY" with your actual EmailJS public key

interface FeedbackData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

declare global {
  interface Window {
    emailjs: {
      send: (serviceId: string, templateId: string, templateParams: any, publicKey?: string) => Promise<any>;
      init: (config: { publicKey: string }) => void;
    };
  }
}

// Test function to verify EmailJS setup
export const testEmailJS = async (): Promise<boolean> => {
  try {
    console.log('🔍 Checking EmailJS availability...');
    console.log('window.emailjs:', window.emailjs);
    
    if (!window.emailjs) {
      console.error('❌ EmailJS not loaded - check if script is properly included');
      return false;
    }

    console.log('✅ EmailJS loaded successfully');
    console.log('🧪 Testing EmailJS with default_service and template_76jycox...');
    
    const testParams = {
      Subject: 'Test Email',
      name: 'Test User',
      time: new Date().toLocaleString(),
      message: 'This is a test email from Kata Sweet Shop',
      reply_to: 'test@example.com',
    };

    const response = await window.emailjs.send(
      'default_service',
      'template_76jycox',
      testParams
    );

    console.log('📧 EmailJS response:', response);
    
    if (response.status === 200) {
      console.log('✅ EmailJS test successful!');
      console.log('📬 Check your email at tejasdharmale6@gmail.com');
      return true;
    } else {
      console.error('❌ EmailJS test failed:', response);
      console.error('Status:', response.status);
      console.error('Text:', response.text);
      return false;
    }
  } catch (error) {
    console.error('❌ EmailJS test error:', error);
    console.error('Error details:', error);
    
    // Check if it's a public key error
    if (error instanceof Error) {
      if (error.message.includes('public key') || error.message.includes('unauthorized')) {
        console.error('🔑 Public key error - please check your EmailJS public key');
      }
      if (error.message.includes('service') || error.message.includes('template')) {
        console.error('📋 Service/Template error - please check your service and template IDs');
      }
    }
    
    return false;
  }
};

export const sendFeedbackEmail = async (feedbackData: FeedbackData): Promise<boolean> => {
  try {
    // Check if EmailJS is loaded
    if (!window.emailjs) {
      console.error('EmailJS not loaded');
      return false;
    }

    // EmailJS configuration with actual service and template IDs
    const serviceId = 'default_service';
    const templateId = 'template_76jycox';
    const publicKey = 'Rk802kjO0jY0jcAr3';

    const templateParams = {
      Subject: feedbackData.subject,
      name: feedbackData.name,
      time: new Date().toLocaleString(),
      message: feedbackData.message,
      reply_to: feedbackData.email,
    };

    console.log(' Sending feedback via EmailJS:', templateParams);

    const response = await window.emailjs.send(serviceId, templateId, templateParams);
    
    if (response.status === 200) {
      console.log(' Feedback email sent successfully via EmailJS');
      return true;
    } else {
      console.error('❌ Failed to send feedback email:', response);
      return false;
    }
  } catch (error) {
    console.error('❌ Error sending feedback email via EmailJS:', error);
    
    // Fallback: Show email content in console for manual sending
    console.log('\n' + '='.repeat(60));
    console.log('📧 MANUAL FEEDBACK EMAIL CONTENT (Copy and send manually):');
    console.log('='.repeat(60));
    console.log(`To: tejasdharmale6@gmail.com`);
    console.log(`Subject: ${feedbackData.subject}`);
    console.log(`Reply-To: ${feedbackData.email}`);
    console.log('='.repeat(60));
    console.log('📄 EMAIL CONTENT:');
    console.log('='.repeat(60));
    console.log(`New Feedback - Kata Sweet Shop

Name: ${feedbackData.name}
Email: ${feedbackData.email}
Subject: ${feedbackData.subject}

Message:
${feedbackData.message}

This feedback was sent from the Kata Sweet Shop website.`);
    console.log('='.repeat(60));
    console.log('📧 You can copy the above content and send it manually to tejasdharmale6@gmail.com');
    console.log('='.repeat(60));
    
    return false;
  }
};

export const sendContactEmailJS = async (contactData: ContactFormData): Promise<boolean> => {
  try {
    // Check if EmailJS is loaded
    if (!window.emailjs) {
      console.error('EmailJS not loaded');
      return false;
    }

    // EmailJS configuration with actual service and template IDs
    const serviceId = 'default_service';
    const templateId = 'template_76jycox';
    const publicKey = 'Rk802kjO0jY0jcAr3';

    const templateParams = {
      Subject: contactData.subject,
      name: contactData.name,
      email: contactData.email,
      time: new Date().toLocaleString(),
      message: contactData.message,
      reply_to: contactData.email,
    };

    console.log('📧 Sending contact form via EmailJS:', templateParams);
    console.log('📧 Service ID:', serviceId);
    console.log('📧 Template ID:', templateId);

    const response = await window.emailjs.send(serviceId, templateId, templateParams);
    
    console.log('📧 EmailJS response:', response);
    
    if (response.status === 200) {
      console.log('✅ Contact email sent successfully via EmailJS');
      return true;
    } else {
      console.error('❌ Failed to send contact email:', response);
      console.error('❌ Status:', response.status);
      console.error('❌ Text:', response.text);
      return false;
    }
  } catch (error) {
    console.error(' Error sending contact email via EmailJS:', error);
    return false;
  }
};

// EmailJS setup instructions
export const EMAILJS_SETUP_INSTRUCTIONS = `
 EmailJS Setup Instructions:

1. Go to https://www.emailjs.com/ and create an account
2. Create a new service (Gmail, Outlook, etc.)
3. Create email templates for:
   - Feedback form
   - Contact form
4. Get your Public Key from Account settings
5. Replace the following in the code:
   - YOUR_PUBLIC_KEY
   - YOUR_SERVICE_ID
   - YOUR_TEMPLATE_ID
   - YOUR_CONTACT_TEMPLATE_ID

6. Update the EmailJS initialization in index.html with your actual public key

Template Variables for Feedback:
- {{from_name}} - Sender's name
- {{from_email}} - Sender's email
- {{subject}} - Feedback subject
- {{message}} - Feedback message
- {{to_email}} - Your email (tejasdharmale6@gmail.com)
- {{reply_to}} - Reply to email

Template Variables for Contact:
- {{from_name}} - Sender's name
- {{from_email}} - Sender's email
- {{phone}} - Phone number
- {{subject}} - Contact subject
- {{message}} - Contact message
- {{to_email}} - Your email (tejasdharmale6@gmail.com)
- {{reply_to}} - Reply to email
`;
