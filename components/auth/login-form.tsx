import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import qrcode from './qrcode.jpg';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { User } from '@/app/page';

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<any>;
  onSwitchToRegister: () => void;
  setUser: (user: User) => void;
  loadCurrUser: (jwtToken: string) => Promise<any>;
}

export function LoginForm({
  onLogin,
  setUser,
  loadCurrUser,
}: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await onLogin(
        email,
        password
      );

      if (response.status) {
        localStorage.setItem(
          'jwt-token',
          response.data.jwtToken
        );

        const user: User =
          await loadCurrUser(
            response.data.jwtToken
          );

        setUser(user);
      }
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary-foreground" />
          </div>

          <div>
            <CardTitle className="text-2xl font-bold">
              Welcome Back
            </CardTitle>

            <CardDescription className="text-muted-foreground">
              Sign in to your BookStore account
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">
                Password
              </Label>

              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                disabled={isLoading}
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-destructive">
                {error}
              </p>
            )}

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading
                ? 'Signing in...'
                : 'Sign In'}
            </Button>

            {/* Image below button */}
            <div className="mt-4 flex justify-center">扫码付款两元后邮件或微信通知(注明微信号)，可以下载任意图书。
            <p>
  Email:
  <a
    href="mailto:wangwensai@hotmail.com"
    className="text-blue-500 hover:underline ml-1"
  >
    wangwensai@hotmail.com
  </a>
</p>
              <img
                 src="./qrcode.jpg"
                alt="BookStore"
                className="w-full max-w-[280px] rounded-xl shadow-md object-cover"
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
