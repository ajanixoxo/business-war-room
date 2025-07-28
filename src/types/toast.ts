export interface ToastOptions {
    title?: string;
    description?: string;
    variant?: 'default' | 'destructive' | 'success' | 'warning';
    duration?: number;
    action?: {
      label: string;
      onClick: () => void;
    };
  }
  
  export interface Toast extends ToastOptions {
    id: string;
    timestamp: number;
  }
  