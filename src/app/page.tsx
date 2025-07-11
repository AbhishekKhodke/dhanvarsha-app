
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { GoogleIcon } from '@/components/google-icon';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(5, 'Password must be at least 5 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const fundTypes = [
  'F&O',
  'IPO',
  'MTF',
  'Intraday',
  'Stocks',
  'ETFs',
  'Mutual Funds',
];

export default function LoginPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % fundTypes.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const onSubmit = (data: LoginFormValues) => {
    if (typeof window !== 'undefined') {
      const nameFromEmail = data.email.split('@')[0];
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('userName', nameFromEmail);
      localStorage.setItem('userBalance', '1000');
      localStorage.removeItem('profilePicture');
    }
    router.push('/dashboard');
  };
  
  const AnimatedBackground = () => (
      <div className="background">
          {[...Array(12)].map((_, i) => (
            <span key={i}></span>
          ))}
      </div>
  )

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4 animate-fade-in-down">
      <AnimatedBackground />
      <Card className="w-full max-w-4xl shadow-2xl overflow-hidden z-10 animate-scale-in">
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative bg-primary text-primary-foreground p-12 flex-col justify-between hidden md:flex">
                <div className="relative z-10">
                    <h2 className="text-4xl font-bold tracking-tight">Simple, Free</h2>
                    <h2 className="text-4xl font-bold tracking-tight">Investing.</h2>
                </div>
                 <div className="relative z-10 h-10 overflow-hidden">
                   <div key={currentIndex} className="text-xl font-medium text-slider-item">
                      {fundTypes[currentIndex]}
                    </div>
                </div>
            </div>
            <div className="p-8 md:p-12">
                 <h2 className="text-2xl font-bold tracking-tight text-center mb-2">Welcome to DhanVarsha</h2>
                 
                 <Button variant="outline" className="w-full text-lg h-12">
                    <GoogleIcon className="mr-3" />
                    Continue with Google
                 </Button>

                 <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-muted"></div>
                    <span className="flex-shrink mx-4 text-muted-foreground text-sm">Or</span>
                    <div className="flex-grow border-t border-muted"></div>
                 </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="sr-only">Your Email Address</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Your Email Address"
                                className="h-12 text-base"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="sr-only">Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Password"
                                className="h-12 text-base"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    <Button type="submit" className="w-full h-12 text-lg">
                        Continue
                    </Button>
                  </form>
                </Form>
                 <p className="mt-6 text-center text-xs text-muted-foreground">
                    By proceeding, I agree to T&C, Privacy Policy & Tariff Rates
                 </p>
            </div>
        </div>
      </Card>
    </main>
  );
}
