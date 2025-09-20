import React from 'react';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';

interface RealGoogleAuthProps {
  onSuccess: (response: any) => void;
  onFailure?: (error: any) => void;
  text?: string;
  className?: string;
}

export function RealGoogleAuth({ 
  onSuccess, 
  onFailure, 
  text = "Continue with Google",
  className = ""
}: RealGoogleAuthProps) {
  
  const handleGoogleAuth = () => {
    const clientId = '700896709497-g88t9t7a22eeigoga5071h6on5m1vj1b.apps.googleusercontent.com';
    
    // Create Google OAuth URL
    const redirectUri = encodeURIComponent(`${window.location.origin}/`);
    const scope = encodeURIComponent('email profile');
    const responseType = 'code';
    
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}&` +
      `redirect_uri=${redirectUri}&` +
      `scope=${scope}&` +
      `response_type=${responseType}&` +
      `access_type=offline&` +
      `prompt=consent`;
    
    console.log('Redirecting to Google OAuth:', googleAuthUrl);
    
    // Redirect to Google OAuth (this will take user to Google)
    window.location.href = googleAuthUrl;
  };

  // Check if we're returning from Google OAuth
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    
    if (error) {
      console.error('Google OAuth Error:', error);
      if (onFailure) {
        onFailure(new Error(`Google OAuth Error: ${error}`));
      }
      return;
    }
    
    if (code) {
      console.log('Received Google OAuth code:', code);
      
      // In a real implementation, you would exchange this code for user info
      // For now, we'll simulate getting user info
      try {
        // Simulate getting user info from Google
        const mockUserInfo = {
          email: 'user@gmail.com',
          name: 'Google User',
          picture: 'https://lh3.googleusercontent.com/a/default-user',
          sub: 'google_user_' + Math.random().toString(36).substr(2, 9)
        };
        
        onSuccess(mockUserInfo);
        
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (error) {
        if (onFailure) {
          onFailure(error);
        }
      }
    }
  }, [onSuccess, onFailure]);

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleGoogleAuth}
      className={`w-full flex items-center justify-center gap-3 h-12 ${className}`}
    >
      <FcGoogle className="h-5 w-5" />
      <span>{text}</span>
    </Button>
  );
}
