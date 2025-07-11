
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
  Settings,
  Wallet,
  FileText,
  Landmark,
  Headset,
  FilePieChart,
  ChevronRight,
  Moon,
  Sun,
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
import { useTheme } from 'next-themes';
import { Separator } from '@/components/ui/separator';

export function Header() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };
  
  const loadUserData = () => {
    if (typeof window !== 'undefined') {
      const name = localStorage.getItem('userName');
      const email = localStorage.getItem('userEmail');
      const pic = localStorage.getItem('profilePicture');
      const userBalance = localStorage.getItem('userBalance');
      setUserName(name);
      setUserEmail(email);
      setProfilePic(pic);
      setBalance(userBalance);
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
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('profilePicture');
      localStorage.removeItem('userBalance');
    }
    router.push('/');
  };

  const formattedBalance = balance ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(balance)) : '₹0.00';

  const menuItems = [
    { icon: FileText, label: "All Orders", href: "#" },
    { icon: Landmark, label: "Bank Details", href: "#" },
    { icon: Headset, label: "24 x 7 Customer Support", href: "#" },
    { icon: FilePieChart, label: "Reports", href: "#" },
  ];

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
        <Link href="/dashboard">
          <Logo />
        </Link>
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
              <AvatarFallback>{getInitials(userName)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
           <div className="flex items-center justify-between p-2">
            <div>
              <p className="font-medium">{userName || 'My Account'}</p>
              <p className="text-xs text-muted-foreground">{userEmail}</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.push('/settings')}>
                <Settings className="h-4 w-4" />
            </Button>
           </div>
           <DropdownMenuSeparator />
            <DropdownMenuItem className="p-2 cursor-pointer">
              <Wallet className="mr-3 h-5 w-5 text-muted-foreground" />
              <div className="flex-grow">
                <p className="font-medium">{formattedBalance}</p>
                <p className="text-xs text-muted-foreground">Stocks, F&O balance</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuItem>
           <DropdownMenuSeparator />
           {menuItems.map((item) => (
             <DropdownMenuItem key={item.label} className="p-2 cursor-pointer" onClick={() => router.push(item.href)}>
                <item.icon className="mr-3 h-5 w-5 text-muted-foreground" />
                <span className="flex-grow">{item.label}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
             </DropdownMenuItem>
           ))}
          <DropdownMenuSeparator />
           <div className="p-2">
              <div className="flex items-center justify-between p-1 rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  <span className="sr-only">Toggle theme</span>
                  {theme === 'light' ? (
                      <Moon className="h-5 w-5 text-muted-foreground" />
                  ) : (
                      <Sun className="h-5 w-5 text-muted-foreground" />
                  )}
                </Button>

                <Separator orientation="vertical" className="h-6" />

                <Button 
                    variant="ghost" 
                    className="flex items-center gap-2 p-2 text-sm"
                    onClick={handleLogout}
                >
                    <LogOut className="h-5 w-5 text-muted-foreground" />
                    <span>Log out</span>
                </Button>
            </div>
           </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
