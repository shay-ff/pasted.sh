import { useState } from "react";
import { Eye, EyeOff, Dices as Dice } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/cards";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Input } from "@/app/components/ui/input";
import { Select, SelectItem } from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { nanoid } from "nanoid";
import { useLanguage } from "@/app/middleware/LanguageContext";
import { useCode } from "@/app/middleware/codeContext";
import SaveSnippetPopup from "@/app/components/saveSnippetPopup";

export default function SnippetForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [expTime, setExpTime] = useState("never");
  const [, setSnippet] = useState("");
  const [snippetLink, setSnippetLink] = useState<string>("");
  const [showLinkPopup, setShowLinkPopup] = useState<boolean>(false);

  const languageContext = useLanguage();
  const codeContext = useCode();
  const language = languageContext?.language ?? "plaintext";

  const setLanguage = languageContext?.setLanguage ?? (() => {
    console.error("Language context not found");
  });

  const genPass = () => {
    setPassword(nanoid(9));
  };

  const genId = () => nanoid(14);

  const handleSaveSnippet = async () => {
    const snippetId = genId();
    const snippetData = {
      snippetId,
      code: codeContext?.code ?? "// User's code",
      language,
      title: (
        document.querySelector('input[placeholder="Title (Optional)"]') as HTMLInputElement
      )?.value ?? "",
      description: (
        document.querySelector('textarea[placeholder="Description (Optional)"]') as HTMLTextAreaElement
      )?.value ?? "",
      password,
      expTime,
      preferences: {
        indexable: (
          document.querySelector('input[type="checkbox"][label="Indexable"]') as HTMLInputElement
        )?.checked ?? false,
        comments: (
          document.querySelector('input[type="checkbox"][label="Comments"]') as HTMLInputElement
        )?.checked ?? false,
        userOnly: (
          document.querySelector('input[type="checkbox"][label="User Only"]') as HTMLInputElement
        )?.checked ?? false,
        encrypt: (
          document.querySelector('input[type="checkbox"][label="Encrypt"]') as HTMLInputElement
        )?.checked ?? false,
      },
    };
    setSnippet(JSON.stringify(snippetData));
    console.log("Snippet Data:", snippetData);

    try {
      const response = await fetch("/api/snippet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(snippetData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Snippet saved:", data);
      console.log("Snippet ID:", data.snippet._id);
      const savedSnippetId = data.snippet._id;
      const newSnippetLink = `${window.location.origin}/snippet/${savedSnippetId}`;
      console.log("Snippet Link:", newSnippetLink);

      setSnippetLink(newSnippetLink);
      setShowLinkPopup(true);
    } catch (error) {
      console.error("Error saving snippet:", error);
    }
  };

  return (
    <Card className="max-w-md bg-[#161b22] border border-[#30363d] text-[#c9d1d9] rounded-lg p-3">
      <div className="space-y-3">
        <Select
          className="bg-[#0d1117] text-[#c9d1d9] border border-[#30363d]"
          value={language}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setLanguage(e.target.value)
          }
        >
          <SelectItem value="plaintext">Plain Text</SelectItem>
          <SelectItem value="javascript">JavaScript</SelectItem>
          <SelectItem value="python">Python</SelectItem>
          <SelectItem value="cpp">C++</SelectItem>
          <SelectItem value="bash">Bash</SelectItem>
          <SelectItem value="typescript">TypeScript</SelectItem>
          <SelectItem value="java">Java</SelectItem>
          <SelectItem value="csharp">C#</SelectItem>
          <SelectItem value="go">Go</SelectItem>
          <SelectItem value="rust">Rust</SelectItem>
          <SelectItem value="ruby">Ruby</SelectItem>
          <SelectItem value="php">PHP</SelectItem>
          <SelectItem value="html">HTML</SelectItem>
          <SelectItem value="css">CSS</SelectItem>
          <SelectItem value="sql">SQL</SelectItem>
          <SelectItem value="json">JSON</SelectItem>
          <SelectItem value="yaml">YAML</SelectItem>
          <SelectItem value="markdown">Markdown</SelectItem>
          <SelectItem value="shell">Shell</SelectItem>
          <SelectItem value="powershell">PowerShell</SelectItem>
        </Select>

        <Input
          className="bg-[#0d1117] text-[#c9d1d9] border border-[#30363d]"
          placeholder="Title (Optional)"
        />

        <Textarea
          className="bg-[#0d1117] text-[#c9d1d9] border border-[#30363d]"
          placeholder="Description (Optional)"
        />

        <div className="relative">
          <Input
            type={passwordVisible ? "text" : "password"}
            className="bg-[#0d1117] text-[#c9d1d9] border border-[#30363d] pr-10"
            placeholder="Password (Optional)"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <button
            type="button"
            className="absolute inset-y-0 right-2 flex items-center text-[#58a6ff]"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          <button
            type="button"
            className="absolute inset-y-0 right-8 flex items-center text-[#58a6ff]"
            onClick={() => genPass()}
          >
            <Dice size={20} />
          </button>
        </div>

        <Select
          className="bg-[#0d1117] text-[#c9d1d9] border border-[#30363d]"
          value={expTime}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setExpTime(e.target.value)
          }
        >
          <option value="once">Burn After Read</option>
          <option value="5m">5 Minutes</option>
          <option value="15m">15 Minutes</option>
          <option value="30m">30 Minutes</option>
          <option value="1h">1 Hour</option>
          <option value="10h">10 Hours</option>
          <option value="24h">24 Hours</option>
          <option value="never">Never</option>
        </Select>

        <div className="flex flex-col pl-1 space-y-1">
          <Checkbox label="Indexable" className="text-[#c9d1d9]" defaultChecked />
          <Checkbox label="User Only" className="text-[#c9d1d9]" />
        </div>

        <Button
          className="w-full bg-[#58a6ff] hover:bg-[#79b8ff] text-[#0d1117] font-semibold"
          onClick={handleSaveSnippet}
        >
          Save Snippet
        </Button>
      </div>

      {showLinkPopup && (
        <SaveSnippetPopup
          snippetLink={snippetLink}
          onClose={() => setShowLinkPopup(false)}
        />
      )}
    </Card>
  );
}

