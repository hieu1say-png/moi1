/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - HUSKY DEN INTERACTIVE LOGIN PAGE
 * 100% Faithful interactive implementation featuring:
 * 1. 🐶 Interactive Husky Mascot ("Watch husky eyes!"):
 *    - Pupils dynamically follow username length and look down towards the input field.
 *    - Paws slide up to cover eyes when password field is focused & masked.
 *    - Paws drop and eyes widen with surprise when password is unmasked (eye toggle).
 *    - Happy smiling celebratory face and blush when login succeeds.
 * 2. 🚪 "Sign In Is A Door" 3D Doorway Button:
 *    - 3D door panel swings open at -72deg (`rotateY(-72deg)`).
 *    - Brilliant golden ambient glow lights up the interior.
 *    - Stickman pedestrian walks through doorway with swinging legs (`animation: thighFrontWalk`).
 *    - Stickman crosses threshold and vanishes into light (`translateX(36px); opacity: 0;`).
 *    - Button label transitions to "Welcome back!" accompanied by Husky happiness.
 * 3. 📱 Glassmorphism Den Layout:
 *    - Curved pill header with search bar ("Tìm nội dung liên quan").
 *    - Social authentication options [ Google ] & [ Apple ].
 *    - Role tabs [ Học Sinh ] & [ Giáo Viên ] with 1-click demo credential chips.
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Compass,
  GraduationCap,
  ShieldCheck,
  Eye,
  EyeOff,
  User,
  Lock,
  Search,
  AlertCircle,
  Sparkles,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { GeometricBackground } from './GeometricBackground';

interface HuskyInteractiveLoginPageProps {
  initialMode?: 'student' | 'teacher';
  onSuccessRedirect?: () => void;
  onSwitchToClassic?: () => void;
}

export const HuskyInteractiveLoginPage: React.FC<HuskyInteractiveLoginPageProps> = ({
  initialMode = 'student',
  onSuccessRedirect,
  onSwitchToClassic
}) => {
  const { login, teacherLogin } = useAuth();
  const { showSuccess, showInfo } = useToast();

  const [authMode, setAuthMode] = useState<'student' | 'teacher'>(initialMode);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Door Animation States
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [isPersonOut, setIsPersonOut] = useState(false);
  const [isHappy, setIsHappy] = useState(false);
  const [btnLabel, setBtnLabel] = useState('Đăng nhập vào Den');

  // Mascot pupil positions (default center-ish)
  // Left eye center is around (65, 70), right eye center is around (95, 70)
  const [pupilOffset, setPupilOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Update pupil position when username changes
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUsername(val);
    if (generalError) setGeneralError(null);

    const len = val.length;
    // Calculate horizontal eye tracking based on text length:
    // When text is short, look slightly left; as it grows, track right
    const offsetX = Math.min(Math.max((len - 4) * 0.8, -5), 5);
    // Looking slightly downwards towards the keyboard/input field
    const offsetY = len > 0 ? 3.5 : 0;

    setPupilOffset({ x: offsetX, y: offsetY });
  };

  // Determine if husky should cover eyes
  const isCoveringEyes = isPasswordFocused && !showPassword;

  // Mascot dynamic status message
  const getMascotMessage = () => {
    if (isHappy) return 'Welcome back! Chúc em buổi học thật tuyệt vời! ✨';
    if (isDoorOpen) return 'Cánh cửa mở rồi! Mời em bước vào phòng thí nghiệm! 🚪';
    if (generalError) return 'Ái chà! Em kiểm tra lại tài khoản hoặc mật khẩu nhé! 🐶';
    if (isCoveringEyes) return 'Suỵt! Husky che mắt rồi, không nhìn lén mật khẩu đâu! 🙈';
    if (showPassword && isPasswordFocused) return 'Oa! Mật khẩu hiện rõ rồi nha! 👀✨';
    if (username.length > 0) return 'Husky đang theo dõi từng ký tự em gõ nè! 🐾';
    return 'Gâu gâu! Chào mừng bạn đến với Geometry Lab! 🐶';
  };

  // Quick fill helper
  const handleQuickFill = (role: 'student' | 'teacher') => {
    setAuthMode(role);
    setGeneralError(null);
    if (role === 'student') {
      setUsername('demo9a2');
      setPassword('Demo@123');
      setPupilOffset({ x: 2.4, y: 3.5 });
    } else {
      setUsername('hieu1say');
      setPassword('gvtoan9@2025');
      setPupilOffset({ x: 2.8, y: 3.5 });
    }
  };

  // Social Login Mock / Guidance
  const handleSocialLogin = (provider: string) => {
    showInfo(`Tính năng đăng nhập với ${provider} (SSO Google Workspace) đang ở chế độ liên kết học đường.`);
  };

  // Form Submission with Door Animation Sequence
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setGeneralError(null);

    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    if (!trimmedUser) {
      setGeneralError('Vui lòng nhập tên tài khoản.');
      return;
    }
    if (!trimmedPass) {
      setGeneralError('Vui lòng nhập mật khẩu.');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Authenticate with backend / context
      const res = authMode === 'student'
        ? await login(trimmedUser, trimmedPass)
        : await teacherLogin(trimmedUser, trimmedPass);

      if (res.success && res.user) {
        // 2. Play Door Opening & Walking Animation Sequence
        // Step A: Door swings open 72 degrees with golden glow
        setIsDoorOpen(true);
        setBtnLabel('Đang mở cửa...');
        await new Promise((resolve) => setTimeout(resolve, 380));

        // Step B: Person starts walking forward with legs swinging
        setIsWalking(true);
        setIsPersonOut(true);
        await new Promise((resolve) => setTimeout(resolve, 760));

        // Step C: Door closes, husky smiles happily, button displays welcome
        setIsWalking(false);
        setIsDoorOpen(false);
        setIsHappy(true);
        setBtnLabel('Welcome back!');
        showSuccess(`Xin chào ${res.user.fullName || res.user.username}!`);

        // Step D: Delay slightly so user can enjoy the celebration, then redirect
        setTimeout(() => {
          if (onSuccessRedirect) {
            onSuccessRedirect();
          }
        }, 650);
      } else {
        setIsLoading(false);
        setGeneralError(res.error || 'Tài khoản hoặc mật khẩu chưa đúng. Em kiểm tra lại nhé.');
      }
    } catch {
      setIsLoading(false);
      setGeneralError('Không thể kết nối máy chủ. Em vui lòng thử lại.');
    }
  };

  return (
    <div
      id="husky-login-page"
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-[#F3F4F6] to-orange-50/40 px-4 py-8 sm:py-12 select-none overflow-hidden"
    >
      {/* Background SVG Grid Pattern */}
      <GeometricBackground />

      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center space-y-4">
        {/* Top Floating Pill / Search Bar ("Tìm nội dung liên quan") */}
        <div className="w-full max-w-sm flex items-center justify-between px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-white/80 shadow-xs text-xs text-slate-500 transition-all hover:bg-white/95 hover:shadow-sm">
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-orange-500" />
            <span className="font-medium truncate">Tìm nội dung liên quan: Hình trụ, nón, cầu...</span>
          </div>
          <span className="text-[10px] bg-orange-100/80 text-orange-700 font-bold px-2 py-0.5 rounded-full shrink-0">
            Toán 9
          </span>
        </div>

        {/* 🐶 THE HUSKY INTERACTIVE MASCOT */}
        <div className="flex flex-col items-center relative -mb-3 z-20">
          {/* Dynamic Mascot Thought / Speech Bubble */}
          <div className="mb-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200/80 shadow-xs text-[11px] font-semibold text-slate-700 flex items-center gap-1.5 animate-in fade-in slide-in-from-bottom-1 duration-200">
            <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
            <span>{getMascotMessage()}</span>
          </div>

          {/* Husky SVG Container */}
          <div
            id="husky"
            className={`relative w-36 h-36 sm:w-40 sm:h-40 transition-transform duration-300 ${
              isCoveringEyes ? 'husky-covering-eyes' : ''
            } ${isHappy ? 'scale-105' : ''}`}
          >
            <svg
              viewBox="0 0 160 150"
              className="w-full h-full drop-shadow-md overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Back Ears */}
              <path
                d="M 32 46 L 46 12 L 68 38 Z"
                fill="#334155"
                stroke="#1E293B"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path
                d="M 38 42 L 48 20 L 62 38 Z"
                fill="#FDA4AF"
              />
              <path
                d="M 128 46 L 114 12 L 92 38 Z"
                fill="#334155"
                stroke="#1E293B"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path
                d="M 122 42 L 112 20 L 98 38 Z"
                fill="#FDA4AF"
              />

              {/* Husky Head Base Coat (Charcoal Blue) */}
              <ellipse
                cx="80"
                cy="76"
                rx="52"
                ry="46"
                fill="#334155"
                stroke="#1E293B"
                strokeWidth="2.5"
              />

              {/* Husky White Face Mask & Cheeks */}
              <path
                d="M 80 44 
                   C 66 44, 46 54, 44 76 
                   C 42 94, 58 114, 80 114 
                   C 102 114, 118 94, 116 76 
                   C 114 54, 94 44, 80 44 Z"
                fill="#FFFFFF"
              />

              {/* Forehead Stripe / Star (Distinctive Husky blaze) */}
              <path
                d="M 76 34 L 84 34 L 82 58 L 78 58 Z"
                fill="#FFFFFF"
              />

              {/* Brow Markings (Cute husky eye dots) */}
              <ellipse cx="64" cy="52" rx="4" ry="2.5" fill="#FFFFFF" />
              <ellipse cx="96" cy="52" rx="4" ry="2.5" fill="#FFFFFF" />

              {/* EYES (OPEN STATE) */}
              <g
                id="husky-eyes"
                className={`transition-opacity duration-150 ${
                  isCoveringEyes ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                {/* Left Eye White */}
                <ellipse
                  cx="65"
                  cy="70"
                  rx="10"
                  ry="12"
                  fill="#FFFFFF"
                  stroke="#1E293B"
                  strokeWidth="2"
                />
                {/* Right Eye White */}
                <ellipse
                  cx="95"
                  cy="70"
                  rx="10"
                  ry="12"
                  fill="#FFFFFF"
                  stroke="#1E293B"
                  strokeWidth="2"
                />

                {/* Left Pupil with tracking */}
                <g className="transition-transform duration-75">
                  <circle
                    id="pupil-left"
                    cx={65 + pupilOffset.x}
                    cy={70 + pupilOffset.y}
                    r={showPassword ? 6 : 5}
                    fill="#1E293B"
                  />
                  {/* Iris shine */}
                  <circle
                    cx={65 + pupilOffset.x - 1.8}
                    cy={70 + pupilOffset.y - 1.8}
                    r="1.8"
                    fill="#FFFFFF"
                  />
                  {showPassword && (
                    <circle
                      cx={65 + pupilOffset.x + 2}
                      cy={70 + pupilOffset.y + 2}
                      r="1"
                      fill="#FFFFFF"
                    />
                  )}
                </g>

                {/* Right Pupil with tracking */}
                <g className="transition-transform duration-75">
                  <circle
                    id="pupil-right"
                    cx={95 + pupilOffset.x}
                    cy={70 + pupilOffset.y}
                    r={showPassword ? 6 : 5}
                    fill="#1E293B"
                  />
                  {/* Iris shine */}
                  <circle
                    cx={95 + pupilOffset.x - 1.8}
                    cy={70 + pupilOffset.y - 1.8}
                    r="1.8"
                    fill="#FFFFFF"
                  />
                  {showPassword && (
                    <circle
                      cx={95 + pupilOffset.x + 2}
                      cy={70 + pupilOffset.y + 2}
                      r="1"
                      fill="#FFFFFF"
                    />
                  )}
                </g>
              </g>

              {/* EYES (CLOSED / SQUINT STATE) */}
              <g
                id="husky-eyes-closed"
                className={`transition-opacity duration-150 ${
                  isCoveringEyes || isHappy ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                {/* Left closed crescent */}
                <path
                  d="M 57 70 Q 65 62 73 70"
                  fill="none"
                  stroke="#1E293B"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Right closed crescent */}
                <path
                  d="M 87 70 Q 95 62 103 70"
                  fill="none"
                  stroke="#1E293B"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </g>

              {/* Blushing Cheeks when Happy */}
              {isHappy && (
                <g className="animate-in fade-in duration-300">
                  <ellipse cx="52" cy="84" rx="7" ry="4" fill="#FDA4AF" opacity="0.8" />
                  <ellipse cx="108" cy="84" rx="7" ry="4" fill="#FDA4AF" opacity="0.8" />
                </g>
              )}

              {/* Snout & Nose */}
              <ellipse
                cx="80"
                cy="88"
                rx="18"
                ry="13"
                fill="#F8FAFC"
                stroke="#E2E8F0"
                strokeWidth="1"
              />
              {/* Cute heart-shaped nose */}
              <path
                d="M 75 83 C 75 80, 80 81, 80 84 C 80 81, 85 80, 85 83 C 85 87, 80 90, 80 90 C 80 90, 75 87, 75 83 Z"
                fill="#0F172A"
              />

              {/* Mouth */}
              {isHappy ? (
                // Happy open smiling mouth with tongue!
                <g>
                  <path
                    d="M 73 90 Q 80 98 87 90"
                    fill="#F43F5E"
                    stroke="#0F172A"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <ellipse cx="80" cy="94" rx="3.5" ry="2.5" fill="#FDA4AF" />
                </g>
              ) : (
                // Gentle cute mouth line (・ω・)
                <path
                  d="M 73 91 Q 77 94 80 91 Q 83 94 87 91"
                  fill="none"
                  stroke="#1E293B"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}

              {/* 🐾 HUSKY PAWS (Slide up to cover eyes on password focus) */}
              <g
                id="husky-paws"
                className="husky-paws-wrapper"
              >
                {/* Left Paw */}
                <g transform="translate(42, 98)">
                  <ellipse
                    cx="16"
                    cy="16"
                    rx="15"
                    ry="13"
                    fill="#FFFFFF"
                    stroke="#1E293B"
                    strokeWidth="2.5"
                  />
                  {/* Pink Paw Pads */}
                  <ellipse cx="16" cy="18" rx="6" ry="4.5" fill="#FDA4AF" />
                  <circle cx="10" cy="11" r="2.5" fill="#FDA4AF" />
                  <circle cx="16" cy="9" r="2.5" fill="#FDA4AF" />
                  <circle cx="22" cy="11" r="2.5" fill="#FDA4AF" />
                </g>

                {/* Right Paw */}
                <g transform="translate(86, 98)">
                  <ellipse
                    cx="16"
                    cy="16"
                    rx="15"
                    ry="13"
                    fill="#FFFFFF"
                    stroke="#1E293B"
                    strokeWidth="2.5"
                  />
                  {/* Pink Paw Pads */}
                  <ellipse cx="16" cy="18" rx="6" ry="4.5" fill="#FDA4AF" />
                  <circle cx="10" cy="11" r="2.5" fill="#FDA4AF" />
                  <circle cx="16" cy="9" r="2.5" fill="#FDA4AF" />
                  <circle cx="22" cy="11" r="2.5" fill="#FDA4AF" />
                </g>
              </g>
            </svg>
          </div>
        </div>

        {/* 🪟 GLASSMORPHISM DEN CARD */}
        <div className="w-full bg-white/80 backdrop-blur-xl rounded-3xl border border-white/70 shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-6 sm:p-8 space-y-5">
          {/* Header Title */}
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight font-serif">
              GEOMETRY LAB <span className="text-orange-500">DEN</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Đăng nhập tài khoản trường để mở khóa không gian 3D
            </p>
          </div>

          {/* Role Toggle Selector [ Học Sinh ] [ Giáo Viên ] */}
          <div className="w-full flex p-1 rounded-2xl bg-slate-100/90 border border-slate-200/80 shadow-2xs">
            <button
              id="husky-role-student"
              type="button"
              onClick={() => {
                setAuthMode('student');
                setGeneralError(null);
              }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                authMode === 'student'
                  ? 'bg-white text-orange-600 shadow-xs border border-orange-100'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Học Sinh</span>
            </button>

            <button
              id="husky-role-teacher"
              type="button"
              onClick={() => {
                setAuthMode('teacher');
                setGeneralError(null);
              }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                authMode === 'teacher'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Giáo Viên</span>
            </button>
          </div>

          {/* Form */}
          <form id="loginForm" onSubmit={handleSubmit} className="space-y-4">
            {/* General Error Notice */}
            {generalError && (
              <div
                role="alert"
                className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2 animate-in fade-in duration-150"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                <span className="leading-relaxed">{generalError}</span>
              </div>
            )}

            {/* Username Input */}
            <div className="space-y-1">
              <label htmlFor="username" className="block text-xs font-semibold text-slate-700">
                Tên đăng nhập
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder={authMode === 'student' ? 'Ví dụ: demo9a2' : 'Ví dụ: giaovien'}
                  disabled={isLoading}
                  autoComplete="username"
                  className="w-full pl-10 pr-3.5 py-3 bg-slate-50/90 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-semibold text-slate-700">
                  Mật khẩu
                </label>
                <span className="text-[10px] text-orange-600 hover:underline cursor-pointer">
                  Quên mật khẩu?
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (generalError) setGeneralError(null);
                  }}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  placeholder="••••••••"
                  disabled={isLoading}
                  autoComplete="current-password"
                  className="w-full pl-10 pr-11 py-3 bg-slate-50/90 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all"
                />
                {/* Toggle Password Peek */}
                <button
                  id="togglePassword"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-orange-600" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* 🚪 "SIGN IN IS A DOOR" 3D INTERACTIVE BUTTON */}
            <div className="pt-2">
              <button
                id="doorBtn"
                type="submit"
                disabled={isLoading}
                className={`doorbtn w-full relative overflow-hidden py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-sm shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-between cursor-pointer ${
                  isDoorOpen ? 'dooropen' : ''
                } ${isWalking ? 'walking' : ''} ${isPersonOut ? 'out' : ''}`}
              >
                {/* 3D Doorway Miniature Interactive Scene */}
                <div className="doorbtn-scene relative w-9 h-9 shrink-0 flex items-center justify-center bg-black/20 rounded-lg p-1">
                  {/* Golden radiant interior glow behind open door */}
                  <div
                    className={`doorbtn__glow absolute inset-1 rounded-sm bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-400 opacity-0 pointer-events-none ${
                      isDoorOpen ? 'opacity-95' : ''
                    }`}
                    style={{
                      boxShadow: isDoorOpen ? '0 0 16px rgba(251, 191, 36, 0.9)' : 'none'
                    }}
                  />

                  {/* 3D Door Panel (Swings -72deg) */}
                  <div
                    className="doorbtn__panel absolute left-1.5 top-1.5 bottom-1.5 w-3.5 bg-amber-800 rounded-xs border border-amber-900/60 shadow-xs flex items-center justify-end pr-0.5"
                    style={{
                      transform: isDoorOpen ? 'rotateY(-72deg)' : 'rotateY(0deg)'
                    }}
                  >
                    {/* Golden Door Handle Knob */}
                    <div className="w-1 h-1 rounded-full bg-yellow-300 shadow-2xs" />
                  </div>

                  {/* Stickman Pedestrian Figure */}
                  <div
                    className="doorbtn__person relative z-10 flex flex-col items-center -ml-3"
                    style={{
                      transform: isPersonOut ? 'translateX(36px)' : 'translateX(0)',
                      opacity: isPersonOut ? 0 : 1
                    }}
                  >
                    {/* Head */}
                    <div className="w-2 h-2 rounded-full bg-white" />
                    {/* Body */}
                    <div className="w-0.5 h-3 bg-white" />
                    {/* Legs with walking animation */}
                    <div className="relative w-3 h-2.5">
                      <div className="leg--front absolute left-0.5 top-0 w-0.5 h-2.5 bg-white rounded-full" />
                      <div className="leg--back absolute right-0.5 top-0 w-0.5 h-2.5 bg-white/70 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Text Label */}
                <span className="doorbtn__label flex-1 text-center font-extrabold tracking-wide">
                  {btnLabel}
                </span>

                {/* Status Indicator Icon */}
                <div className="w-8 flex items-center justify-end">
                  {isHappy ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-300 animate-bounce" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-amber-200" />
                  )}
                </div>
              </button>
            </div>
          </form>

          {/* Quick 1-Click Demo Shortcut Chips */}
          <div className="pt-1 space-y-1.5 border-t border-slate-100">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Tài khoản thử nghiệm có sẵn:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('student')}
                className="px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200/80 text-orange-700 text-[11px] font-semibold hover:bg-orange-100 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <GraduationCap className="w-3 h-3" />
                <span>demo9a2 (Học sinh)</span>
              </button>
            </div>
          </div>

          {/* Toggle back to Classic Form Option */}
          {onSwitchToClassic && (
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={onSwitchToClassic}
                className="text-[11px] text-slate-400 hover:text-slate-700 underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Chuyển sang giao diện đăng nhập chuẩn</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs text-slate-400 space-y-1 pt-1">
          <p>Phòng Thí Nghiệm Hình Học Không Gian Toán 9 • GDPT 2018</p>
          <p className="text-[10px] text-slate-400">Linh vật Husky tương tác 3D • Bản quyền sư phạm</p>
        </div>
      </div>
    </div>
  );
};
