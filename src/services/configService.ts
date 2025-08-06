import { toast } from '@/hooks/use-toast';

type AppConfig = {
  apiKey?: string;
  model?: string;
  systemPrompt?: string;
  domainFormat?: string;
  emailFormat?: string;
  adminEmail?: string;
};

export const saveConfig = async (config: AppConfig): Promise<boolean> => {
  try {
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

export const getConfig = (): AppConfig | null => {
  try {
    const config = localStorage.getItem('appConfig');
    return config ? JSON.parse(config) : null;
  } catch {
    return null;
  }
};