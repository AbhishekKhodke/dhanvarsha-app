
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  Bell,
  Home,
  LineChart,
  Package,
  PanelLeft,
  Search,
  Users2,
  LogOut,
  Settings
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';

export function Header() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const router = useRouter();

  const getInitials = (email: string | null) => {
    if (!email) return 'U';
    return email.charAt(0).toUpperCase();
  };
  
  const loadUserData = () => {
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('userEmail');
      const pic = localStorage.getItem('profilePicture');
      setUserEmail(email);
      setProfilePic(pic);
    }
  };

  useEffect(() => {
    loadUserData();
    
    // Listen for storage changes to update header UI in real-time
    window.addEventListener('storage', loadUserData);
    
    return () => {
      window.removeEventListener('storage', loadUserData);
    };

  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userEmail');
      localStorage.removeItem('profilePicture');
    }
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Logo />
              <span className="sr-only">DhanVarsha</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-5 w-5" />
              Watchlist
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Users2 className="h-5 w-5" />
              Community
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      <div className="hidden sm:block">
        <Logo />
      </div>

      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for stocks..."
          className="w-full rounded-lg bg-card pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Avatar>
              <AvatarImage src={profilePic || undefined} alt="User avatar" data-ai-hint="person face" />
              <AvatarFallback>{getInitials(userEmail)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <p className="font-medium">My Account</p>
            {userEmail && <p className="text-xs text-muted-foreground">{userEmail}</p>}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push('/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
