import { Employee } from '@/contexts/AppContext';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import StatusBadge from './StatusBadge';

interface ProfileCardProps {
  profile: Employee;
  onContact: () => void;
}

const ProfileCard = ({ profile, onContact }: ProfileCardProps) => {
  if (!profile.firstName && !profile.lastName) {
    return null; // or a fallback UI
  }
  const initials = `${profile.firstName?.charAt(0) || ''}${profile.lastName?.charAt(0) || ''}`;  
  const languages = Array.isArray(profile.languages)
    ? profile.languages
    : typeof profile.languages === 'string'
      ? profile.languages.split(',').map(l => l.trim()).filter(Boolean)
      : [];
  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={profile.photo} alt={`${profile.firstName} ${profile.lastName}`} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="font-semibold">{profile.firstName} {profile.lastName}</h3>
          <p className="text-sm text-muted-foreground">{profile.profession}</p>
        </div>
        <div className="ml-auto">
          <StatusBadge status={profile.availability} />
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        {profile.description && (
          <p className="text-sm text-gray-600 mb-2">{profile.description}</p>
        )}
        {languages.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {languages.map(language => (
              <span 
                key={language}
                className="px-2 py-0.5 text-xs bg-secondary rounded-full"
              >
                {language}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          onClick={onContact} 
          className="w-full"
          variant="outline"
        >
          Contact
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
