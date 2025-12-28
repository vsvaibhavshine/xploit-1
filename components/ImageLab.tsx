import React, { useState, useRef } from 'react';
import { Button } from './ui/Button';
import { editImage } from '../services/geminiService';

export const ImageLab: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File too large. Maximum size 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setGeneratedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!image || !prompt) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await editImage(image, prompt);
      setGeneratedImage(result);
    } catch (err: any) {
      setError(err.message || "Operation failed. Unable to process image.");
    } finally {
      setIsLoading(false);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
       <div className="border-l-4 border-emerald-500 pl-4 mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 font-display uppercase tracking-widest">Forensics Image Lab</h2>
        <p className="text-slate-400 font-mono">Upload evidence and apply advanced modification algorithms.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Source Panel */}
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 flex flex-col h-[500px]">
          <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2 font-display tracking-widest uppercase">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            SOURCE_EVIDENCE
          </h3>
          
          <div className="flex-1 bg-black/50 border border-dashed border-slate-700 rounded-lg flex items-center justify-center overflow-hidden relative group">
            {image ? (
              <>
                 <img src={image} alt="Original" className="max-w-full max-h-full object-contain" />
                 <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="secondary" onClick={triggerUpload}>REPLACE EVIDENCE</Button>
                 </div>
              </>
            ) : (
              <div className="text-center p-8">
                <svg className="w-12 h-12 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-slate-500 mb-4 font-display">No evidence loaded</p>
                <Button onClick={triggerUpload}>UPLOAD IMAGE</Button>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
        </div>

        {/* Control & Output Panel */}
        <div className="flex flex-col gap-6">
            {/* Controls */}
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
                <h3 className="text-emerald-400 font-bold mb-4 font-display tracking-widest uppercase">COMMAND_CONSOLE</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-display tracking-widest text-slate-500 mb-2">MODIFICATION_PROMPT</label>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder='e.g., "Enhance the text on the sticky note", "Remove the background person", "Apply thermal vision filter"'
                            className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-slate-200 focus:outline-none focus:border-emerald-500 font-mono text-sm h-24 resize-none"
                        />
                    </div>
                    {error && (
                        <div className="p-3 bg-red-900/20 border border-red-800 text-red-400 text-sm font-mono">
                            ERROR: {error}
                        </div>
                    )}
                    <Button 
                        onClick={handleEdit} 
                        disabled={!image || !prompt || isLoading} 
                        className="w-full"
                    >
                        {isLoading ? 'PROCESSING ALGORITHMS...' : 'EXECUTE MODIFICATION'}
                    </Button>
                </div>
            </div>

            {/* Output */}
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 flex-1 flex flex-col h-[280px]">
                <h3 className="text-cyan-400 font-bold mb-4 flex items-center gap-2 font-display tracking-widest uppercase">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                    PROCESSED_RESULT
                </h3>
                <div className="flex-1 bg-black/50 border border-dashed border-slate-700 rounded-lg flex items-center justify-center overflow-hidden">
                    {generatedImage ? (
                        <img src={generatedImage} alt="Generated" className="max-w-full max-h-full object-contain" />
                    ) : (
                        <span className="text-slate-600 font-display tracking-wide text-xs text-center uppercase">
                            {isLoading ? 'RENDERING...' : 'WAITING FOR OUTPUT...'}
                        </span>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};