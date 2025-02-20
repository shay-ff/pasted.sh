import { useState } from "react";
import { Eye, EyeOff, Dices as Dice } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/cards";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { Select, SelectItem } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { nanoid } from "nanoid";
import { useLanguage } from "../middleware/LanguageContext";

export default function SnippetForm() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [expTime, setExpTime] = useState("never");
    const languageContext = useLanguage();
    const language = languageContext?.language ?? "plaintext";
    const setLanguage = languageContext?.setLanguage ?? (() => {});
    const genPass = () => {
        setPassword(nanoid(9));
    };
    console.log(language);

    return (
    <Card className="max-w-md bg-[#141414] border-white text-white rounded-lg">
        <div className="space-y-4">
            <Select className="bg-gray-800 text-white border-gray-700"
                value={language}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLanguage(e.target.value)}
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
                className="bg-gray-800 text-white border-gray-700"
                placeholder="Title (Optional)"
            />
            <Textarea
                className="bg-gray-800 text-white border-gray-700"
                placeholder="Description (Optional)"
            />

            <div className="relative">
                <Input
                    type={passwordVisible ? "text" : "password"}
                    className="bg-gray-800 text-white border-gray-700"
                    placeholder="Password (Optional)"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                    }
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center text-gray-300"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                >
                    {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                <button
                    type="button"
                    className="absolute inset-y-0 right-8 flex items-center text-gray-300"
                    onClick={() => genPass()}
                >
                    <Dice size={20} />
                </button>
            </div>

            <Select
                className="bg-gray-800 text-white border-gray-700"
                value={expTime}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setExpTime(e.target.value)}
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

            <div className="flex flex-col space-y-2">
                <Checkbox label="Indexable" className="text-gray-300" defaultChecked />
                <Checkbox label="Comments" className="text-gray-300" defaultChecked />
                <Checkbox label="User Only" className="text-gray-300" />
                <Checkbox label="Encrypt" className="text-gray-300" />
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white">
                Save Snippet
            </Button>
        </div>
    </Card>
    );
}