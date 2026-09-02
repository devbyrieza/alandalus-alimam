import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

export function useFormAutosave<T extends object>(
  form: UseFormReturn<T>,
  formKey: string,
  isSubmitted: boolean
) {
  const [isRestored, setIsRestored] = useState(false);

  // 1. State Restoration (on mount)
  useEffect(() => {
    try {
      const draft = localStorage.getItem(formKey);
      if (draft && !isSubmitted) {
        const parsedData = JSON.parse(draft);
        // Ensure we don't overwrite if form already has data from server (depends on implementation)
        // Usually reset is used, but we'll use reset with parsedData
        form.reset((prev) => ({ ...prev, ...parsedData }));
      }
    } catch (e) {
      console.error("Failed to restore draft:", e);
    }
    setIsRestored(true);
  }, [form, formKey, isSubmitted]);

  // 2. Autosave Implementation (subscription)
  useEffect(() => {
    if (!isRestored || isSubmitted) return;
    
    const subscription = form.watch((value) => {
      localStorage.setItem(formKey, JSON.stringify(value));
    });
    
    return () => subscription.unsubscribe();
  }, [form, formKey, isRestored, isSubmitted]);

  // 3. Data Clearance (handled externally on submit success, but can expose a clear function)
  const clearDraft = () => {
    localStorage.removeItem(formKey);
  };

  return { isRestored, clearDraft };
}
