/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - AUTH DEBUG PANEL (V4.0)
 * Real-time HUD inspector for developers & pedagogical administrators:
 * - Auth ready status
 * - Student session state (id, username, fullName, className)
 * - Teacher session state (id, username, fullName)
 * - Current route and selected shape
 * - Fast toggle / collapse
 */

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Terminal, ChevronUp, ChevronDown, CheckCircle2, XCircle, Shield, GraduationCap } from 'lucide-react';

export const AuthDebugPanel: React.FC = () => {
  const {
    authReady,
    studentSession,
    teacherSession,
    isStudentAuthenticated,
    isTeacherAuthenticated
  } = useAuth();
  const { currentRoute, selectedShape } = useApp();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div
      id="auth-debug-panel"
      className="fixed bottom-3 right-3 z-50 select-none font-mono text-[11px]"
    >
      {!isExpanded ? (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/85 hover:bg-slate-900 text-slate-200 border border-slate-700/60 shadow-lg backdrop-blur-md transition-all cursor-pointer hover:scale-105 active:scale-95"
          title="Mở Auth Debug Panel"
        >
          <Terminal className="w-3.5 h-3.5 text-orange-400" />
          <span className="font-semibold text-[10px] tracking-wider text-slate-300">AUTH HUD</span>
          <span className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${isStudentAuthenticated ? 'bg-emerald-400' : 'bg-slate-500'}`} title="Student Auth" />
            <span className={`w-2 h-2 rounded-full ${isTeacherAuthenticated ? 'bg-indigo-400' : 'bg-slate-500'}`} title="Teacher Auth" />
          </span>
          <ChevronUp className="w-3 h-3 text-slate-400" />
        </button>
      ) : (
        <div className="w-80 rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-2xl backdrop-blur-md text-slate-200 p-4 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-orange-400" />
              <span className="font-bold text-xs text-white tracking-wide">AUTH INSPECTOR HUD</span>
            </div>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* System status */}
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="bg-slate-800/60 p-2 rounded-lg border border-slate-700/50">
              <div className="text-slate-400 text-[9px] uppercase tracking-wider">AUTH READY</div>
              <div className="flex items-center gap-1.5 mt-0.5 font-bold">
                {authReady ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-emerald-300">READY (TRUE)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="text-amber-300">LOADING</span>
                  </>
                )}
              </div>
            </div>

            <div className="bg-slate-800/60 p-2 rounded-lg border border-slate-700/50">
              <div className="text-slate-400 text-[9px] uppercase tracking-wider">ROUTE / SHAPE</div>
              <div className="mt-0.5 font-bold text-slate-200 truncate">
                {currentRoute} • {selectedShape}
              </div>
            </div>
          </div>

          {/* Student session details */}
          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/70 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-bold text-slate-200">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                <span>STUDENT SESSION</span>
              </span>
              <span
                className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                  isStudentAuthenticated
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {studentSession.status}
              </span>
            </div>

            {studentSession.user ? (
              <div className="text-[10px] text-slate-300 space-y-0.5 pl-5">
                <div>User: <strong className="text-white">{studentSession.user.username}</strong> ({studentSession.user.fullName})</div>
                <div>Lớp: <span className="text-slate-400">{studentSession.user.className}</span> • XP: <span className="text-amber-400">{studentSession.user.xp}</span></div>
              </div>
            ) : (
              <div className="text-[10px] text-slate-500 italic pl-5">Chưa đăng nhập học sinh</div>
            )}
          </div>

          {/* Teacher session details */}
          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/70 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-bold text-slate-200">
                <Shield className="w-3.5 h-3.5 text-indigo-400" />
                <span>TEACHER SESSION</span>
              </span>
              <span
                className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                  isTeacherAuthenticated
                    ? 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {teacherSession.status}
              </span>
            </div>

            {teacherSession.user ? (
              <div className="text-[10px] text-slate-300 space-y-0.5 pl-5">
                <div>Teacher: <strong className="text-white">{teacherSession.user.fullName}</strong></div>
                <div>ID: <span className="text-slate-400">{teacherSession.user.username}</span> • {teacherSession.user.school}</div>
              </div>
            ) : (
              <div className="text-[10px] text-slate-500 italic pl-5">Chưa đăng nhập giáo viên</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
