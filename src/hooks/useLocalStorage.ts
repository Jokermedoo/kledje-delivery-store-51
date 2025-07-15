import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // الحصول على القيمة من localStorage عند التحميل
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // إرجاع نسخة محدثة من setState التي تحفظ في localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // السماح للقيمة بأن تكون دالة لتطبيق نفس منطق useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // حفظ في الحالة
      setStoredValue(valueToStore);
      
      // حفظ في localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}