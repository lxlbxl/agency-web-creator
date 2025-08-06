import { useState } from "react";
import { saveConfig } from "@/services/configService";

export default function BackendConfig() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [domainFormat, setDomainFormat] = useState("");
  const [emailFormat, setEmailFormat] = useState("");
  const [adminEmail, setAdminEmail] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const config = {
      apiKey,
      model,
      systemPrompt,
      domainFormat,
      emailFormat,
      adminEmail
    };

    await saveConfig(config);
    setIsLoading(false);
  };

  return (
    <div>Backend Config Form</div>
  );
}