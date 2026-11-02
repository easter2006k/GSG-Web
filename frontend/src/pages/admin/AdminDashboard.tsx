import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Users,
  BookOpen,
  Award,
  Search,
  LogOut,
  ShieldCheck,
  Calendar,
  Phone,
  MessageSquare,
  CheckCircle2,
  Trash2,
  Download,
  Filter,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { getStudentSubmissions } from '../../lib/firebase';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [studentSubmissions, setStudentSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStandard, setFilterStandard] = useState('ALL');
  const [filterCounselling, setFilterCounselling] = useState('ALL');

  const fetchSubmissions = async () => {
    setLoading(true);
    const submissions = await getStudentSubmissions();
    if (submissions && submissions.length > 0) {
      // Filter out sample dummy records if any exist in localStorage
      const realSubmissions = submissions.filter(
        (s: any) => s.id !== 'STU-948210' && s.id !== 'STU-102938' && s.id !== 'STU-567890'
      );
      setStudentSubmissions(realSubmissions);
    } else {
      setStudentSubmissions([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    const isLogged = localStorage.getItem('gsg_admin_logged_in');
    if (!isLogged) {
      navigate('/admin/login');
      return;
    }
    // Clean up old sample records from localStorage if present
    const stored = localStorage.getItem('gsg_student_submissions');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const cleaned = parsed.filter(
          (s: any) => s.id !== 'STU-948210' && s.id !== 'STU-102938' && s.id !== 'STU-567890'
        );
        localStorage.setItem('gsg_student_submissions', JSON.stringify(cleaned));
      } catch (e) {}
    }

    fetchSubmissions();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('gsg_admin_logged_in');
    localStorage.removeItem('gsg_admin_email');
    navigate('/admin/login');
  };

  const handleClearSubmissions = () => {
    if (window.confirm('Are you sure you want to clear all student submissions?')) {
      localStorage.removeItem('gsg_student_submissions');
      setStudentSubmissions([]);
    }
  };

  // Filtered student list
  const filteredStudents = studentSubmissions.filter((stu) => {
    const matchesSearch =
      stu.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stu.mobileNumber?.includes(searchTerm) ||
      stu.id?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStandard = filterStandard === 'ALL' || stu.standard === filterStandard;
    const matchesCounselling = filterCounselling === 'ALL' || stu.counsellingNeeded === filterCounselling;

    return matchesSearch && matchesStandard && matchesCounselling;
  });

  const totalRegistered = studentSubmissions.length;
  const counsellingCount = studentSubmissions.filter(s => s.counsellingNeeded === 'yes').length;

  const stats = [
    { title: 'Registered Students', value: totalRegistered.toString(), icon: Users, color: 'bg-blue-600' },
    { title: 'Counselling Requests', value: counsellingCount.toString(), icon: MessageSquare, color: 'bg-amber-500' },
    { title: 'Programmes Active', value: '12', icon: BookOpen, color: 'bg-emerald-600' },
    { title: 'Scholarships Listed', value: '28', icon: Award, color: 'bg-rose-600' },
  ];

  const standardDistData = [
    { name: '10th Std', value: studentSubmissions.filter(s => s.standard === '10th').length },
    { name: '11th Std', value: studentSubmissions.filter(s => s.standard === '11th').length },
    { name: '12th Std', value: studentSubmissions.filter(s => s.standard === '12th').length },
  ];

  return (
    <div className="min-h-screen bg-slate-100 pb-20">
      {/* Top Bar */}
      <header className="bg-[#071c35] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-[#071c35] flex items-center justify-center font-bold shadow">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">GSG Staff Admin Dashboard (Firebase Connected)</h1>
              <p className="text-xs text-slate-300">Logged in as: {localStorage.getItem('gsg_admin_email') || 'admin@gsgtrust.org'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={fetchSubmissions}
              variant="outline"
              className="border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-white text-xs font-semibold"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} /> Refresh DB
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-white text-xs font-semibold"
            >
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-0 shadow-md bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">{stat.title}</p>
                      <p className="text-3xl font-extrabold text-[#071c35]">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-md lg:col-span-2 bg-white">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-lg font-bold text-[#071c35] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" /> Student Registrations Overview (Firebase DB)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={standardDistData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#071c35" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-lg font-bold text-[#071c35]">Counselling Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Counselling Yes', value: counsellingCount },
                      { name: 'Counselling No', value: totalRegistered - counsellingCount },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={75}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    <Cell fill="#f59e0b" />
                    <Cell fill="#071c35" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Student Portal Submissions Management Table */}
        <Card className="border-0 shadow-lg bg-white overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-900 to-[#071c35] text-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Users className="w-6 h-6 text-amber-400" /> Student Portal Form Submissions (Firebase Cloud Firestore)
              </CardTitle>
              <p className="text-xs text-slate-300 mt-1">
                Connected to Firebase project <code className="text-amber-300 font-mono">gsg-trust</code>.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => {
                  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(studentSubmissions, null, 2));
                  const downloadAnchor = document.createElement('a');
                  downloadAnchor.setAttribute("href", dataStr);
                  downloadAnchor.setAttribute("download", "gsg_student_submissions.json");
                  document.body.appendChild(downloadAnchor);
                  downloadAnchor.click();
                  downloadAnchor.remove();
                }}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs font-semibold"
              >
                <Download className="w-4 h-4 mr-1.5" /> Export JSON
              </Button>
              {studentSubmissions.length > 0 && (
                <Button
                  onClick={handleClearSubmissions}
                  variant="outline"
                  className="bg-red-500/20 border-red-400/30 text-red-200 hover:bg-red-500 hover:text-white text-xs font-semibold"
                >
                  <Trash2 className="w-4 h-4 mr-1.5" /> Clear Data
                </Button>
              )}
            </div>
          </CardHeader>

          <div className="p-6 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by student name or mobile..."
                className="pl-9 bg-white border-slate-300 text-sm"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 w-full md:w-auto items-center">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                <Filter className="w-4 h-4" /> Standard:
              </div>
              <select
                value={filterStandard}
                onChange={(e) => setFilterStandard(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#071c35]"
              >
                <option value="ALL">All Standards</option>
                <option value="10th">10th Standard</option>
                <option value="11th">11th Standard</option>
                <option value="12th">12th Standard</option>
              </select>

              <select
                value={filterCounselling}
                onChange={(e) => setFilterCounselling(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#071c35]"
              >
                <option value="ALL">All Counselling</option>
                <option value="yes">Counselling: Yes</option>
                <option value="no">Counselling: No</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="py-16 text-center text-slate-500 flex flex-col items-center justify-center">
                <RefreshCw className="w-8 h-8 animate-spin text-[#071c35] mb-2" />
                <p className="font-semibold text-sm">Fetching student records from Firebase Firestore...</p>
              </div>
            ) : filteredStudents.length === 0 ? (
              <div className="py-16 text-center text-slate-500">
                <Users className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p className="font-semibold text-base">No student submissions found.</p>
                <p className="text-xs text-slate-400 mt-1">New registrations submitted through the Student Portal will appear here in real time.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4">Student & ID</th>
                    <th className="py-3 px-4">Date of Birth</th>
                    <th className="py-3 px-4">Standard & Group</th>
                    <th className="py-3 px-4">Mobile Number</th>
                    <th className="py-3 px-4">Counselling Status & Message</th>
                    <th className="py-3 px-4">Registered At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm">
                  {filteredStudents.map((stu, index) => (
                    <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-bold text-[#071c35]">{stu.fullName}</div>
                        <div className="text-xs text-slate-500 font-mono">{stu.id}</div>
                      </td>
                      <td className="py-4 px-4 text-slate-700 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {stu.dateOfBirth}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-bold mb-1">
                          {stu.standard} Standard
                        </span>
                        {stu.group && stu.group !== 'N/A (10th Standard)' && (
                          <div className="text-xs text-slate-600 font-medium">{stu.group}</div>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5 text-slate-800 font-mono text-xs font-semibold">
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          +91 {stu.mobileNumber}
                        </div>
                        {stu.otpVerified && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mt-1 font-semibold border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" /> OTP Verified
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 max-w-xs">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                            stu.counsellingNeeded === 'yes' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                          }`}>
                            Counselling: {stu.counsellingNeeded}
                          </span>
                          {stu.languageMode && (
                            <span className="text-[10px] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded uppercase font-semibold border border-indigo-200">
                              {stu.languageMode}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2 bg-slate-50 p-2 rounded border border-slate-200 font-sans">
                          {stu.counsellingMessage}
                        </p>
                      </td>
                      <td className="py-4 px-4 text-xs text-slate-500 font-medium">
                        {new Date(stu.registeredAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
