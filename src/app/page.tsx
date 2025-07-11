
'use client';

import { useState } from 'react';
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
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
    },
  });

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
  
  const TopoBackground = () => (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none">
        <path d="M-206.634 94.7578C-225.835 119.349 -244.444 144.409 -250.152 173.354C-255.86 202.299 -248.665 235.129 -235.399 261.268C-222.133 287.407 -202.825 306.855 -179.914 316.338C-157.003 325.82 -130.49 325.337 -107.037 319.492C-83.584 313.646 -63.1913 302.438 -49.6363 282.89C-36.0813 263.342 -29.3643 235.452 -28.1883 209.613C-27.0123 183.774 -31.3773 159.986 -44.0863 139.638C-56.7953 119.29 -77.8483 102.383 -100.914 94.7578C-123.98 87.1328 -149.059 88.7898 -168.734 94.7578C-188.409 100.726 -202.934 108.058 -206.634 94.7578Z" stroke="#4ADE80" strokeWidth="1.5" strokeOpacity="0.5"/>
        <path d="M-198.85 107.868C-215.82 130.82 -231.91 154.279 -237.473 181.564C-243.037 208.849 -235.458 239.9 -222.192 264.44C-208.926 288.98 -189.617 307.033 -166.706 315.821C-143.795 324.609 -117.282 323.832 -93.8293 317.779C-70.3763 311.725 -50.2973 300.274 -37.0513 281.423C-23.8053 262.571 -17.4023 235.498 -16.2263 210.428C-15.0503 185.358 -19.4153 162.339 -32.1243 142.75C-44.8333 123.161 -65.8863 106.948 -88.9523 99.6384C-112.018 92.3284 -137.097 94.2794 -156.772 100.54C-176.447 106.801 -191.688 114.636 -198.85 107.868Z" stroke="#4ADE80" strokeWidth="1.5" strokeOpacity="0.5"/>
        <path d="M-185.065 125.121C-201.721 149.19 -217.397 173.815 -222.825 202.049C-228.252 230.282 -220.359 262.46 -206.779 287.947C-193.2 313.434 -173.277 332.83 -149.753 342.13C-126.229 351.43 -98.9904 351.137 -74.9224 345.542C-50.8544 339.946 -30.0474 328.799 -16.4824 309.605C-2.91741 290.411 3.16559 262.575 1.85459 236.853C0.543594 211.131 -4.13641 187.46 -17.1594 167.165C-30.1824 146.87 -51.8484 129.815 -75.5264 121.973C-99.2044 114.131 -124.896 115.727 -145.185 121.621C-165.475 127.515 -180.701 135.533 -185.065 125.121Z" stroke="#4ADE80" strokeWidth="1.5" strokeOpacity="0.5"/>
    </svg>
  );

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-4xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative bg-primary text-primary-foreground p-12 flex-col justify-between hidden md:flex">
                <TopoBackground />
                <div className="relative z-10">
                    <h2 className="text-4xl font-bold tracking-tight">Simple, Free</h2>
                    <h2 className="text-4xl font-bold tracking-tight">Investing.</h2>
                </div>
                 <div className="relative z-10">
                    <p className="text-xl font-medium">Mutual Funds</p>
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
