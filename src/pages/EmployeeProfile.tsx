
import { useState, useEffect } from 'react';
import { showAlert } from '@/lib/telegram';
import { useNavigate } from 'react-router-dom';
import { useApp, AvailabilityStatus, Employee } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { enableBackButton, setMainButton } from '@/lib/telegram';
import { Switch } from '@/components/ui/switch';

const professions = [
  'Captain',
  'Chief Officer',
  'Second Officer',
  'Chief Engineer',
  'Second Engineer',
  'ETO',
  'Bosun',
  'Deckhand',
  'Chief Steward/ess',
  'Steward/ess',
  'Chef',
  'Sous Chef'
];

const languages = ['English', 'French', 'Italian', 'Spanish', 'German', 'Russian', 'Arabic'];

const EmployeeProfile = () => {
  const { telegramUser, employeeProfile, setEmployeeProfile } = useApp();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<Partial<Employee>>({
    telegramId: telegramUser?.id || 0,
    firstName: telegramUser?.first_name || '',
    lastName: telegramUser?.last_name || '',
    username: telegramUser?.username || '',
    profession: '',
    availability: 'looking' as AvailabilityStatus,
    description: '',
    languages: [],
    searchable: true
  });
  
  useEffect(() => {
    if (employeeProfile) {
      setProfile({
        ...employeeProfile
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
  }, [employeeProfile]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLanguageToggle = (language: string) => {
    setProfile(prev => {
      const currentLanguages = prev.languages || [];
      if (currentLanguages.includes(language)) {
        return {
          ...prev,
          languages: currentLanguages.filter(lang => lang !== language)
        };
      } else {
        return {
          ...prev,
          languages: [...currentLanguages, language]
        };
      }
    });
  };
  
  const handleSave = () => {
    if (!profile.firstName || !profile.profession) {
      showAlert('Please fill in all required fields');
      return;
    }
    
    const newProfile: Employee = {
      id: employeeProfile?.id || `employee_${Date.now()}`,
      telegramId: profile.telegramId || 0,
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      username: profile.username,
      profession: profile.profession || '',
      availability: profile.availability as AvailabilityStatus,
      description: profile.description,
      languages: profile.languages,
      searchable: profile.searchable || false,
      photo: profile.photo,
      cvUrl: profile.cvUrl
    };
    
    setEmployeeProfile(newProfile);
    navigate('/dashboard');
  };
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Your Crew Profile</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={profile.lastName || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="profession">Profession *</Label>
              <Select 
                value={profile.profession} 
                onValueChange={(value) => handleSelectChange('profession', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your profession" />
                </SelectTrigger>
                <SelectContent>
                  {professions.map(profession => (
                    <SelectItem key={profession} value={profession}>
                      {profession}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Availability Status</Label>
              <RadioGroup 
                value={profile.availability} 
                onValueChange={(value) => handleSelectChange('availability', value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="available" id="available" />
                  <Label htmlFor="available" className="text-green-600">Available Now</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="looking" id="looking" />
                  <Label htmlFor="looking" className="text-yellow-600">Looking</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="occupied" id="occupied" />
                  <Label htmlFor="occupied" className="text-red-600">Occupied</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Professional Summary</Label>
              <Textarea
                id="description"
                name="description"
                value={profile.description || ''}
                onChange={handleInputChange}
                placeholder="Briefly describe your experience, certificates, etc."
                className="min-h-[100px]"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Languages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {languages.map(language => (
              <Button
                key={language}
                type="button"
                variant={profile.languages?.includes(language) ? "default" : "outline"}
                size="sm"
                onClick={() => handleLanguageToggle(language)}
                className="text-xs"
              >
                {language}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Privacy Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="searchable" className="mr-2">
                Make my profile visible to employers
              </Label>
              <p className="text-xs text-muted-foreground">
                When enabled, employers can find your profile in search results
              </p>
            </div>
            <Switch
              id="searchable"
              checked={profile.searchable}
              onCheckedChange={(checked) => setProfile(prev => ({ ...prev, searchable: checked }))}
            />
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

export default EmployeeProfile;
