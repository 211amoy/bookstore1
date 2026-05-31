import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

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
       // window.location.href = 'https://www.google.com';
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
              欢迎访问电子图书商城
            </CardTitle>

            <CardDescription className="text-muted-foreground">
             请登录您的账号
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
                账号
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="输入您的账号"
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
                密码
              </Label>

              <Input
                id="password"
                type="password"
                placeholder="输入您的密码"
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
                ? '正在登录...'
                : '登录'}
            </Button>

            {/* Image below button */}
            <div className="mt-6 text-center">

  {/* Description */}
  <p alien className="text-sm leading-7 text-center">
    扫码付款两元后邮或微信通知(注明微信号)，会得到账号和密码
    可以下载任意图书。
  </p>

  {/* Email */}
  <div className="mt-2">
    <a
      href="mailto:wangwensai@hotmail.com"
      className="text-blue-600 hover:underline"
    >
      Email: wangwensai@hotmail.com
    </a>
  </div>

  {/* QR Code */}
  <div className="mt-4 flex justify-center">
    <Image
      src="/qrcode1.jpg"
      alt="QR Code"
      width={300}
      height={400}
      className="rounded-lg shadow-md"
    />
  </div>

</div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
