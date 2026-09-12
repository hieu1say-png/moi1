import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { RouteId, ShapeType, UserStats } from '../types';
import { INITIAL_ACHIEVEMENTS } from '../data/geometryData';
import { useAuth } from './AuthContext';

interface AppSettings {
  studentName: string;
  className: string;
  soundEnabled: boolean;
  theme: 'light' | 'dark';
  formulaRenderMode: 'katex' | 'simple';
  fontSize: 'normal' | 'large';
}

interface AppContextType {
  currentRoute: RouteId;
  navigateTo: (route: RouteId) => void;
  currentRole: 'student' | 'teacher';
  switchRole: (role: 'student' | 'teacher') => void;
  selectedShape: ShapeType;
  setSelectedShape: (shape: ShapeType) => void;
  userStats: UserStats;
  settings: AppSettings;
  updateSettings: (partial: Partial<AppSettings>) => void;
  markTheoryRead: (shape: string) => void;
  markPracticeDone: (questionId: string, xpEarned?: number) => void;
  markRealWorldDone: (problemId: string) => void;
  markShapeExplored: (shape: string) => void;
  recordAttempt: (attempt: any) => void;
  resetProgress: () => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

const defaultStats: UserStats = {
  xp: 320,
  level: 2,
  completedTheories: ['cylinder'],
  completedPractices: ['p-cyl-1'],
  exploredShapes: ['cylinder', 'cone'],
  streakDays: 4,
  accuracy: 92
};

const defaultSettings: AppSettings = {
  studentName: 'Nguyễn Văn Minh',
  className: 'Lớp 9A2 – Trường Phổ Thông Thực Hành Sư Phạm',
  soundEnabled: true,
  theme: 'light',
  formulaRenderMode: 'katex',
  fontSize: 'normal'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export interface AppProviderProps {
  children: ReactNode;
  initialRole?: 'student' | 'teacher';
  initialRoute?: RouteId;
}

export const AppProvider: React.FC<AppProviderProps> = ({
  children,
  initialRole,
  initialRoute
}) => {
  const { role: authRole, isTeacher } = useAuth();
  const effectiveRole: 'student' | 'teacher' = initialRole || (authRole === 'teacher' ? 'teacher' : 'student');

  // Read hash or pathname or default to appropriate dashboard
  const getInitialRoute = (): RouteId => {
    if (initialRoute) return initialRoute;

    const validRoutes: RouteId[] = [
      '/home',
      '/theory',
      '/explore',
      '/practice',
      '/exam-prep',
      '/real-world',
      '/achievements',
      '/ai',
      '/game',
      '/settings',
      '/student-profile',
      '/login',
      '/teacher',
      '/teacher-dashboard',
      '/cylinder',
      '/cone',
      '/sphere'
    ];

    // Normalize hash: handles #/cylinder, #cylinder, etc.
    const normalizedHash = ('/' + window.location.hash.replace(/^#[/]?/, '')) as RouteId;

    if (effectiveRole === 'teacher') {
      if (normalizedHash === '/settings') return '/settings';
      if (normalizedHash === '/teacher' || normalizedHash === '/teacher-dashboard') return '/teacher-dashboard';
      if (validRoutes.includes(normalizedHash) && normalizedHash !== '/login') return normalizedHash;
      return '/teacher-dashboard';
    }

    // Student Role:
    if (validRoutes.includes(normalizedHash)) {
      if (normalizedHash === '/teacher' || normalizedHash === '/teacher-dashboard' || normalizedHash === '/settings' || normalizedHash === '/login') {
        return '/home';
      }
      return normalizedHash;
    }

    const path = window.location.pathname as RouteId;
    if (validRoutes.includes(path)) {
      if (path === '/teacher' || path === '/teacher-dashboard' || path === '/settings' || path === '/login') {
        return '/home';
      }
      return path;
    }

    return '/home';
  };

  const [currentRoute, setCurrentRoute] = useState<RouteId>(getInitialRoute);
  const currentRole: 'student' | 'teacher' = effectiveRole;

  const [selectedShape, setSelectedShapeState] = useState<ShapeType>(() => {
    const initialRoute = getInitialRoute();
    if (initialRoute === '/cone') return 'cone';
    if (initialRoute === '/sphere') return 'sphere';
    if (initialRoute === '/cylinder') return 'cylinder';
    const saved = localStorage.getItem('geometry_lab_selected_shape') as ShapeType;
    if (saved === 'cone' || saved === 'sphere' || saved === 'cylinder') return saved;
    return 'cylinder';
  });

  const setSelectedShape = (shape: ShapeType) => {
    setSelectedShapeState(shape);
    localStorage.setItem('geometry_lab_selected_shape', shape);
  };
  const [searchOpen, setSearchOpen] = useState(false);

  const switchRole = (targetRole: 'student' | 'teacher') => {
    if (targetRole === 'teacher') {
      if (isTeacher) {
        navigateTo('/teacher-dashboard');
      } else {
        console.warn('[SECURITY] Denied switch to teacher: user is not authenticated as teacher.');
        navigateTo('/teacher');
      }
    } else {
      navigateTo('/home');
    }
  };

  const [userStats, setUserStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('geometry_lab_stats');
    return saved ? JSON.parse(saved) : defaultStats;
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('geometry_lab_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.className && (parsed.className.includes('Long Đức') || parsed.className.includes('Long Duc'))) {
          parsed.className = parsed.className.replace(/THCS Long Đức|Trường THCS Long Đức|Long Đức/g, 'Trường Phổ Thông Thực Hành Sư Phạm');
          localStorage.setItem('geometry_lab_settings', JSON.stringify(parsed));
        }
        return parsed;
      } catch {}
    }
    return defaultSettings;
  });

  // Sync hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = ('/' + window.location.hash.replace(/^#[/]?/, '')) as RouteId;
      const allValidRoutes: RouteId[] = [
        '/home',
        '/theory',
        '/explore',
        '/practice',
        '/exam-prep',
        '/real-world',
        '/achievements',
        '/ai',
        '/settings',
        '/student-profile',
        '/login',
        '/teacher',
        '/teacher-dashboard',
        '/cylinder',
        '/cone',
        '/sphere'
      ];
      if (allValidRoutes.includes(hash)) {
        // Prevent authenticated users from accidentally navigating to /login via hash
        if (hash === '/login') {
          const fallback = effectiveRole === 'teacher' ? '/teacher-dashboard' : '/home';
          window.location.hash = fallback;
          setCurrentRoute(fallback);
          return;
        }

        // Strict RBAC URL Guard: Prevent students from entering teacher routes via URL hash manipulation
        if (effectiveRole === 'student' && (hash === '/teacher' || hash === '/teacher-dashboard' || hash === '/settings')) {
          console.warn('[RBAC SECURE ROUTING] Blocked student attempt to enter teacher route via hash:', hash);
          window.location.hash = '/home';
          setCurrentRoute('/home');
          return;
        }

        console.log('[NAVIGATION] Hash change route:', hash);
        setCurrentRoute(hash);
        if (hash === '/cylinder') setSelectedShape('cylinder');
        else if (hash === '/cone') setSelectedShape('cone');
        else if (hash === '/sphere') setSelectedShape('sphere');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [effectiveRole]);

  const navigateTo = (route: RouteId) => {
    // If authenticated user attempts to navigate to /login, ignore or redirect to home/dashboard
    if (route === '/login') {
      const fallback = effectiveRole === 'teacher' ? '/teacher-dashboard' : '/home';
      setCurrentRoute(fallback);
      window.location.hash = fallback;
      return;
    }

    // Strict RBAC Guard: If student attempts to navigate to teacher-only routes, block immediately
    if (effectiveRole === 'student' && (route === '/teacher' || route === '/teacher-dashboard' || route === '/settings')) {
      console.warn('[RBAC SECURE ROUTING] Blocked student attempt to navigate to teacher route:', route);
      setCurrentRoute('/home');
      window.location.hash = '/home';
      return;
    }

    console.log('[NAVIGATION] Navigating to:', route);
    setCurrentRoute(route);
    if (route === '/cylinder') setSelectedShape('cylinder');
    else if (route === '/cone') setSelectedShape('cone');
    else if (route === '/sphere') setSelectedShape('sphere');
    window.location.hash = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    localStorage.setItem('geometry_lab_stats', JSON.stringify(userStats));
  }, [userStats]);

  useEffect(() => {
    localStorage.setItem('geometry_lab_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (partial: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  const markTheoryRead = (shape: string) => {
    setUserStats((prev) => {
      if (prev.completedTheories.includes(shape)) return prev;
      return {
        ...prev,
        xp: prev.xp + 50,
        completedTheories: [...prev.completedTheories, shape]
      };
    });
  };

  const markPracticeDone = (questionId: string, xpEarned: number = 80) => {
    setUserStats((prev) => {
      const alreadyCompleted = prev.completedPractices.includes(questionId);
      return {
        ...prev,
        xp: prev.xp + (alreadyCompleted ? Math.round(xpEarned * 0.2) : xpEarned),
        completedPractices: alreadyCompleted
          ? prev.completedPractices
          : [...prev.completedPractices, questionId]
      };
    });
  };

  const recordAttempt = (attempt: any) => {
    setUserStats((prev) => {
      const existingAttempts = prev.attempts || [];
      const updatedAttempts = [attempt, ...existingAttempts];
      const correctCount = updatedAttempts.filter((a) => a.isCorrect).length;
      const accuracy = updatedAttempts.length > 0
        ? Math.round((correctCount / updatedAttempts.length) * 100)
        : prev.accuracy;

      return {
        ...prev,
        attempts: updatedAttempts,
        accuracy
      };
    });
  };

  const markRealWorldDone = (problemId: string) => {
    setUserStats((prev) => {
      const completed = prev.completedRealWorld || [];
      if (completed.includes(problemId)) return prev;
      return {
        ...prev,
        xp: prev.xp + 100,
        completedRealWorld: [...completed, problemId]
      };
    });
  };

  const markShapeExplored = (shape: string) => {
    setUserStats((prev) => {
      if (prev.exploredShapes.includes(shape)) return prev;
      return {
        ...prev,
        xp: prev.xp + 30,
        exploredShapes: [...prev.exploredShapes, shape]
      };
    });
  };

  const resetProgress = () => {
    setUserStats({
      xp: 0,
      level: 1,
      completedTheories: [],
      completedPractices: [],
      completedRealWorld: [],
      exploredShapes: [],
      streakDays: 1,
      accuracy: 100
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        navigateTo,
        currentRole,
        switchRole,
        selectedShape,
        setSelectedShape,
        userStats,
        settings,
        updateSettings,
        markTheoryRead,
        markPracticeDone,
        markRealWorldDone,
        markShapeExplored,
        recordAttempt,
        resetProgress,
        searchOpen,
        setSearchOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
