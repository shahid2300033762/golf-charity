import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from './ui/Button';

interface UploadProofProps {
  drawId: string;
  userId: string;
  onSuccess: () => void;
}

export function UploadProof({ drawId, userId, onSuccess }: UploadProofProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      
      // Validation: Size Max 5MB, Image or PDF Only
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      if (!['image/jpeg', 'image/png', 'application/pdf'].includes(selectedFile.type)) {
        setError('File must be a JPEG, PNG, or PDF');
        return;
      }
      
      setFile(selectedFile);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setLoading(true);
    setError('');

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}_${drawId}_${Math.random()}.${fileExt}`;
      const filePath = `winner-proofs/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('proofs')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('proofs')
        .getPublicUrl(filePath);

      // Update the winners table with the proof URL
      const { error: updateError } = await supabase
        .from('winners')
        .update({ proof_url: publicUrl, status: 'pending' })
        .match({ user_id: userId, draw_id: drawId });

      if (updateError) throw updateError;
      
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'An error occurred during upload');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 border border-outline-variant/30 p-6 rounded-xl bg-surface-container-highest">
      <h3 className="text-white font-manrope font-bold text-lg">Upload Identity & Winning Proof</h3>
      <p className="text-sm text-on-surface-variant mb-2">Please upload a valid image (JPEG/PNG) or PDF. Max size: 5MB.</p>
      
      <input 
        type="file" 
        accept="image/jpeg, image/png, application/pdf"
        onChange={handleFileChange}
        className="text-sm text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
      />
      
      {error && <p className="text-error text-sm">{error}</p>}
      
      <Button 
        onClick={handleUpload} 
        disabled={!file || loading}
        className="w-full mt-2"
      >
        {loading ? 'Uploading Securely...' : 'Submit Proof'}
      </Button>
    </div>
  );
}
