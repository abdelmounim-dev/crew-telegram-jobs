
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, Employer } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { enableBackButton, setMainButton } from '@/lib/telegram';

const EmployerProfile = () => {
  const { telegramUser, employerProfile, setEmployerProfile } = useApp();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<Partial<Employer>>({
    telegramId: telegramUser?.id || 0,
    companyName: '',
    description: '',
    contactName: telegramUser ? `${telegramUser.first_name} ${telegramUser.last_name || ''}`.trim() : '',
    contactInfo: telegramUser?.username ? `@${telegramUser.username}` : ''
  });
  
  useEffect(() => {
    if (employerProfile) {
      setProfile({
        ...employerProfile
      });
    }
    
    // Handle back button
    const cleanupBackButton = enableBackButton(() => {
      navigate('/');
    });
    
    // Handle main button
    const cleanupMainButton = setMainButton('Save Profile', handleSave, {
      color: '#1c77c3',
      textColor: '#ffffff'
    });
    
    return () => {
      if (cleanupBackButton) cleanupBackButton();
      if (cleanupMainButton) cleanupMainButton();
    };
  }, [employerProfile]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    if (!profile.companyName || !profile.contactName) {
      alert('Please fill in all required fields');
      return;
    }
    
    const newProfile: Employer = {
      id: employerProfile?.id || `employer_${Date.now()}`,
      telegramId: profile.telegramId || 0,
      companyName: profile.companyName || '',
      description: profile.description,
      contactName: profile.contactName || '',
      contactInfo: profile.contactInfo,
      logo: profile.logo
    };
    
    setEmployerProfile(newProfile);
    navigate('/dashboard');
  };
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Your Company Profile</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Company Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                name="companyName"
                value={profile.companyName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Company Description</Label>
              <Textarea
                id="description"
                name="description"
                value={profile.description || ''}
                onChange={handleInputChange}
                placeholder="Brief description of your company or yacht..."
                className="min-h-[100px]"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Person *</Label>
              <Input
                id="contactName"
                name="contactName"
                value={profile.contactName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contactInfo">Contact Information</Label>
              <Input
                id="contactInfo"
                name="contactInfo"
                value={profile.contactInfo || ''}
                onChange={handleInputChange}
                placeholder="Telegram username, email, or phone number"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="pb-20">
        <Button 
          onClick={handleSave}
          className="w-full"
        >
          Save Profile
        </Button>
      </div>
    </div>
  );
};

export default EmployerProfile;
