import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DomainEmailFormProps {
  domainFormat: string;
  emailFormat: string;
  onDomainFormatChange: (value: string) => void;
  onEmailFormatChange: (value: string) => void;
}

const DomainEmailForm = ({
  domainFormat,
  emailFormat,
  onDomainFormatChange,
  onEmailFormatChange
}: DomainEmailFormProps) => {
  const { toast } = useToast();

  const handleSaveFormats = () => {
    toast({
      title: "Formats Saved",
      description: "Domain and email formats updated successfully.",
    });
  };

  return (
    <Card className="bg-gray-900/80 border border-gray-800 hover:border-gold transition-all duration-300 hover:shadow-lg hover:shadow-gold/20">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <Globe className="mr-2 text-gold" />
          Domain & Email Formats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="domainFormat" className="text-white">
            Domain Format
          </Label>
          <Input
            id="domainFormat"
            placeholder="e.g., {business}-{region}.com"
            value={domainFormat}
            onChange={(e) => onDomainFormatChange(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-gold focus:border-gold"
          />
          <p className="text-sm text-gray-400">
            Format for generated domains
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="emailFormat" className="text-white">
            Email Format
          </Label>
          <Input
            id="emailFormat"
            placeholder="e.g., contact@{domain}"
            value={emailFormat}
            onChange={(e) => onEmailFormatChange(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-gold focus:border-gold"
          />
          <p className="text-sm text-gray-400">
            Format for contact emails
          </p>
        </div>
        
        <Button 
          onClick={handleSaveFormats}
          className="w-full bg-gold text-black hover:bg-gold/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/50"
        >
          Save Formats
        </Button>
      </CardContent>
    </Card>
  );
};

export default DomainEmailForm;