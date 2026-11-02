import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      email.trim().toLowerCase() === 'easter.gsggroups@gmail.com' &&
      password === 'Easter@EMP2023GSG'
    ) {
      localStorage.setItem('gsg_admin_logged_in', 'true');
      localStorage.setItem('gsg_admin_email', email);
      navigate('/admin/dashboard');
    } else {
      setError('Invalid staff email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#071c35] via-slate-900 to-[#7f1026] px-4">
      <Card className="w-full max-w-md border-0 shadow-2xl bg-white/95 backdrop-blur">
        <CardContent className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#071c35] rounded-2xl flex items-center justify-center mx-auto mb-4 text-amber-400 shadow-lg">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071c35] mb-2">Staff Portal Login</h1>
            <p className="text-xs sm:text-sm text-slate-600">GSG Trust Administrative & Student Records Access</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Staff Email ID</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter staff email address"
                  required
                  className="pl-10 py-3 bg-slate-50 border-slate-300 text-sm rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter staff password"
                  required
                  className="pl-10 py-3 bg-slate-50 border-slate-300 text-sm rounded-xl"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-[#071c35] hover:bg-[#0d2e6e] text-white font-bold py-3.5 rounded-xl shadow-lg transition-all">
              Sign In to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
