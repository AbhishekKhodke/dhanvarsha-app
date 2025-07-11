
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
import { Textarea } from '@/components/ui/textarea';

export default function SettingsPage() {
  const [userName, setUserName] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedName = localStorage.getItem('userName') || '';
      const pic = localStorage.getItem('profilePicture');
      const storedPhone = localStorage.getItem('userPhone') || '';
      const storedAddress = localStorage.getItem('userAddress') || '';
      
      setUserName(storedName);
      setName(storedName);
      setProfilePic(pic);
      setPreview(pic);
      setPhone(storedPhone);
      setAddress(storedAddress);
    }
  }, []);

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
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
    localStorage.setItem('userName', name);
    localStorage.setItem('userPhone', phone);
    localStorage.setItem('userAddress', address);
    setUserName(name);
    if (preview) {
      localStorage.setItem('profilePicture', preview);
      setProfilePic(preview);
    }
    toast({
      title: 'Success',
      description: 'Your profile has been updated.',
    });
    // Force header to re-render by reloading, since it doesn't share state directly
    window.dispatchEvent(new Event("storage"));
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
        <p className="text-muted-foreground">Manage your account settings and profile information.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>
              Update your photo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={preview || ''} alt="User avatar" data-ai-hint="person face"/>
                  <AvatarFallback className="text-5xl">
                    {preview ? getInitials(userName) : <User className="h-16 w-16" />}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-1 right-1 rounded-full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="h-4 w-4" />
                  <span className="sr-only">Change picture</span>
                </Button>
              </div>
              
              <div className="w-full space-y-2">
                  <Input
                    id="picture"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file:text-primary file:font-medium"
                    ref={fileInputRef}
                  />
                  <p className="text-xs text-muted-foreground text-center">
                      Max file size: 2MB.
                  </p>
              </div>
            </div>
             {profilePic && (
                <Button variant="outline" onClick={handleRemovePicture} className="w-full">Remove Photo</Button>
            )}
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
            <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
                Update your personal details here.
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your phone number" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Your address" />
                </div>
                 <div className="flex justify-end">
                    <Button onClick={handleSave}>Save Changes</Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
