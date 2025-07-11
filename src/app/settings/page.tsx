
'use client';

import { useState, useEffect, ChangeEvent, useRef } from 'react';
import { MainLayout } from '@/components/main-layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { User, Camera } from 'lucide-react';

export default function SettingsPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('userEmail');
      const pic = localStorage.getItem('profilePicture');
      setUserEmail(email);
      setProfilePic(pic);
      setPreview(pic);
    }
  }, []);

  const getInitials = (email: string | null) => {
    if (!email) return 'U';
    return email.charAt(0).toUpperCase();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (preview) {
      localStorage.setItem('profilePicture', preview);
      setProfilePic(preview);
      toast({
        title: 'Success',
        description: 'Your profile picture has been updated.',
      });
      // Force header to re-render by reloading, since it doesn't share state directly
      window.dispatchEvent(new Event("storage"));
    }
  };
  
  const handleRemovePicture = () => {
    localStorage.removeItem('profilePicture');
    setProfilePic(null);
    setPreview(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
    toast({
        title: 'Success',
        description: 'Your profile picture has been removed.',
    });
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings.</p>
      </div>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>
            Upload a new photo to personalize your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
             <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={preview || ''} alt="User avatar" data-ai-hint="person face"/>
                <AvatarFallback className="text-3xl">
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-0 right-0 rounded-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="h-4 w-4" />
                <span className="sr-only">Change picture</span>
              </Button>
            </div>
            
            <div className="flex-grow space-y-2">
                <Label htmlFor="picture">Update your photo</Label>
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file:text-primary file:font-medium"
                  ref={fileInputRef}
                />
                <p className="text-xs text-muted-foreground">
                    Recommended size: 200x200px. Max file size: 2MB.
                </p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            {profilePic && (
                <Button variant="outline" onClick={handleRemovePicture}>Remove Photo</Button>
            )}
            <Button onClick={handleSave} disabled={!preview || preview === profilePic}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
