import { toast } from '@/hooks/use-toast';

export const saveConfig = async (config: any) => {
  try {
    // Simulate saving to localStorage
    localStorage.setItem('appConfig', JSON.stringify(config));
    toast({
      title: 'Success',
      description: 'Configuration saved successfully',
    });
    return true;
  } catch (error) {
    toast({
      title: 'Error',
      description: 'Failed to save configuration',
      variant: 'destructive',
    });
    return false;
  }
};

export const getConfig = () => {
  const config = localStorage.getItem('appConfig');
  return config ? JSON.parse(config) : null;
};