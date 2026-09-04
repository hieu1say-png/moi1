/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * TEACHER & CLASS IDENTITY BADGE COMPONENT
 * Formats and displays dynamic teacher and class identity:
 * "${currentClass.name} • ${teacherProfile.title} ${teacherProfile.fullName} • ${teacherProfile.schoolName}"
 * 
 * Directly subscribed to TeacherProfile & CurrentClass state for instant reactivity.
 */

import React from 'react';
import { useTeacherStore, formatTeacherClassDisplay } from '../../stores/useTeacherStore';
import { School, UserCheck, GraduationCap } from 'lucide-react';

export interface TeacherClassBadgeProps {
  className?: string; // Custom CSS class
  targetClassName?: string; // Override class e.g. "Lớp 9A2"
  teacherName?: string; // Override teacher name
  schoolName?: string; // Override school name
  variant?: 'inline' | 'pill' | 'banner' | 'card' | 'subtle';
  showIcons?: boolean;
  onClick?: () => void;
}

export const TeacherClassBadge: React.FC<TeacherClassBadgeProps> = ({
  className = '',
  targetClassName,
  teacherName: customTeacherName,
  schoolName: customSchoolName,
  variant = 'pill',
  showIcons = true,
  onClick,
}) => {
  const { profile, teacherName: storeTeacherName, schoolName: storeSchoolName, currentClassName } = useTeacherStore();

  const activeClassName = targetClassName || currentClassName || 'Lớp 9A2';
  const activeTeacher = customTeacherName || storeTeacherName || (profile?.fullName ? `${profile?.title || 'ThS.'} ${profile.fullName}` : 'Chưa cập nhật hồ sơ giáo viên');
  const activeSchool = customSchoolName || storeSchoolName || profile?.schoolName || 'Trường Phổ Thông Thực Hành Sư Phạm';

  const fullDisplayString = formatTeacherClassDisplay(
    activeClassName,
    profile,
    activeSchool
  );

  if (variant === 'inline') {
    return (
      <span className={`inline-flex items-center gap-1.5 text-xs text-black font-bold ${className}`}>
        {fullDisplayString}
      </span>
    );
  }

  if (variant === 'subtle') {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFF9E6] border-2 border-black text-xs text-black shadow-neo-sm font-bold ${className}`}
        onClick={onClick}
      >
        {showIcons && <GraduationCap className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />}
        <span className="font-black text-black">{activeClassName}</span>
        <span className="text-black">•</span>
        <span className="font-bold text-black">{activeTeacher}</span>
        {activeSchool && (
          <>
            <span className="text-black">•</span>
            <span className="text-gray-800 truncate font-semibold">{activeSchool}</span>
          </>
        )}
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div
        className={`flex items-center justify-between gap-3 p-3.5 rounded-md bg-[#FFF9E6] border-3 border-black shadow-neo-sm text-xs ${className}`}
        onClick={onClick}
      >
        <div className="flex items-center gap-2.5 flex-wrap min-w-0">
          <div className="w-7 h-7 rounded bg-[#FF6B00] text-white border-2 border-black flex items-center justify-center font-black text-xs shadow-neo-sm shrink-0">
            {activeClassName.replace('Lớp ', '')}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-black text-black text-sm">{activeClassName}</span>
            <span className="text-black">•</span>
            <span className="font-bold text-black flex items-center gap-1">
              {showIcons && <UserCheck className="w-3.5 h-3.5 text-blue-600" />}
              {activeTeacher}
            </span>
            {activeSchool && (
              <>
                <span className="text-black">•</span>
                <span className="text-gray-800 flex items-center gap-1 font-semibold">
                  {showIcons && <School className="w-3.5 h-3.5 text-black" />}
                  {activeSchool}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default 'pill' / badge
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FFF9E6] border-2 border-black text-xs text-black shadow-neo-sm font-bold flex-wrap ${className}`}
      onClick={onClick}
    >
      <span className="font-black text-[#FF6B00]">{activeClassName}</span>
      <span className="text-black">•</span>
      <span className="font-black text-black">{activeTeacher}</span>
      {activeSchool && (
        <>
          <span className="text-black">•</span>
          <span className="text-gray-800 truncate font-semibold">{activeSchool}</span>
        </>
      )}
    </div>
  );
};
