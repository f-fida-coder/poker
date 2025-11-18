import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { Upload, User, Link as LinkIcon } from 'lucide-react';
import { avatarOptions } from '../data/mockData';

interface ProfilePictureSelectorProps {
  selectedAvatar: string;
  onAvatarChange: (avatar: string) => void;
  uploadedImage?: string;
  onImageUpload?: (image: string) => void;
}

export default function ProfilePictureSelector({
  selectedAvatar,
  onAvatarChange,
  uploadedImage,
  onImageUpload,
}: ProfilePictureSelectorProps) {
  const [activeTab, setActiveTab] = useState<'emoji' | 'upload' | 'creator' | 'linked'>('emoji');
  const [customAvatar, setCustomAvatar] = useState({
    skinTone: '#FFD1A1',
    hairStyle: 'short',
    hairColor: '#2C1810',
    eyeColor: '#1E6884',
    accessory: 'none',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file (PNG, JPG, or GIF)');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (onImageUpload && reader.result) {
          onImageUpload(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const hairStyles = ['short', 'long', 'curly', 'bald', 'spiky'];
  const accessories = ['none', 'glasses', 'hat', 'crown', 'sunglasses'];
  const skinTones = ['#FFD1A1', '#F1C27D', '#E0AC69', '#C68642', '#8D5524', '#654321'];

  const renderAvatarCreator = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-center mb-6">
          <div 
            className="w-32 h-32 rounded-full border-4 border-neon-text shadow-chunky-3d flex items-center justify-center text-6xl"
            style={{ backgroundColor: customAvatar.skinTone }}
          >
            {customAvatar.accessory === 'crown' && '👑'}
            {customAvatar.accessory === 'glasses' && '👓'}
            {customAvatar.accessory === 'sunglasses' && '🕶️'}
            {customAvatar.accessory === 'hat' && '🎩'}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-neon-text mb-2">Skin Tone</label>
          <div className="flex gap-2 flex-wrap">
            {skinTones.map((tone) => (
              <button
                key={tone}
                type="button"
                onClick={() => setCustomAvatar({ ...customAvatar, skinTone: tone })}
                className={`w-10 h-10 rounded-full border-4 ${
                  customAvatar.skinTone === tone ? 'border-tropical-gold' : 'border-gray-300'
                }`}
                style={{ backgroundColor: tone }}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-neon-text mb-2">Hair Style</label>
          <div className="flex gap-2 flex-wrap">
            {hairStyles.map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => setCustomAvatar({ ...customAvatar, hairStyle: style })}
                className={`px-4 py-2 rounded-xl font-bold capitalize border-4 ${
                  customAvatar.hairStyle === style
                    ? 'bg-tropical-gold border-neon-text'
                    : 'bg-white border-gray-300'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-neon-text mb-2">Accessory</label>
          <div className="flex gap-2 flex-wrap">
            {accessories.map((acc) => (
              <button
                key={acc}
                type="button"
                onClick={() => setCustomAvatar({ ...customAvatar, accessory: acc })}
                className={`px-4 py-2 rounded-xl font-bold capitalize border-4 ${
                  customAvatar.accessory === acc
                    ? 'bg-tropical-gold border-neon-text'
                    : 'bg-white border-gray-300'
                }`}
              >
                {acc}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => setActiveTab('emoji')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold border-4 transition-all ${
            activeTab === 'emoji'
              ? 'bg-tropical-gold border-neon-text shadow-chunky-3d'
              : 'bg-white border-gray-300 hover:border-tropical-gold'
          }`}
        >
          <User className="w-4 h-4" />
          Emoji
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold border-4 transition-all ${
            activeTab === 'upload'
              ? 'bg-tropical-gold border-neon-text shadow-chunky-3d'
              : 'bg-white border-gray-300 hover:border-tropical-gold'
          }`}
        >
          <Upload className="w-4 h-4" />
          Upload
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('creator')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold border-4 transition-all ${
            activeTab === 'creator'
              ? 'bg-tropical-gold border-neon-text shadow-chunky-3d'
              : 'bg-white border-gray-300 hover:border-tropical-gold'
          }`}
        >
          <User className="w-4 h-4" />
          Creator
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('linked')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold border-4 transition-all ${
            activeTab === 'linked'
              ? 'bg-tropical-gold border-neon-text shadow-chunky-3d'
              : 'bg-white border-gray-300 hover:border-tropical-gold'
          }`}
        >
          <LinkIcon className="w-4 h-4" />
          Linked
        </button>
      </div>

      {activeTab === 'emoji' && (
        <div>
          <label className="block text-sm font-bold text-neon-text mb-3">
            Choose Your Avatar
          </label>
          <div className="grid grid-cols-6 gap-3">
            {avatarOptions.map((avatar) => (
              <motion.button
                key={avatar}
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onAvatarChange(avatar)}
                className={`
                  w-full aspect-square rounded-xl text-3xl
                  flex items-center justify-center border-4
                  ${
                    selectedAvatar === avatar
                      ? 'bg-tropical-gold/30 border-tropical-gold shadow-chunky-3d'
                      : 'bg-white border-neon-text hover:border-tropical-gold'
                  }
                  transition-all duration-300
                `}
              >
                {avatar}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'upload' && (
        <div>
          <label className="block text-sm font-bold text-neon-text mb-3">
            Upload Profile Picture
          </label>
          <div className="space-y-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-4 border-dashed border-neon-text rounded-2xl p-8 text-center cursor-pointer hover:bg-tropical-gold/10 transition-all"
            >
              {uploadedImage ? (
                <div className="flex flex-col items-center gap-4">
                  <img
                    src={uploadedImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-tropical-gold"
                  />
                  <p className="text-sm font-bold text-gray-700">Click to change image</p>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 mx-auto mb-4 text-neon-text" />
                  <p className="text-sm font-bold text-gray-700 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-600">PNG, JPG or GIF (MAX. 5MB)</p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>
      )}

      {activeTab === 'creator' && renderAvatarCreator()}

      {activeTab === 'linked' && (
        <div className="space-y-3">
          <label className="block text-sm font-bold text-neon-text mb-3">
            Link Account Profile Picture
          </label>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold border-4 border-neon-text bg-white hover:bg-gray-50 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Use Google Profile Picture
          </button>
          
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold border-4 border-neon-text bg-[#5865F2] text-white hover:bg-[#4752C4] transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Use Discord Profile Picture
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold border-4 border-neon-text bg-[#171a21] text-white hover:bg-[#2a475e] transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.979 0C5.678 0 .511 4.86.511 10.85c0 6.29 5.451 11.49 11.468 10.84c6.121-.66 11.043-5.751 11.043-11.935C22.99 4.848 17.871 0 11.979 0zM9.62 16.777l-3.582-8.277h2.667l2.117 5.367l2.117-5.367h2.667l-3.582 8.277H9.62z"/>
            </svg>
            Use Steam Profile Picture
          </button>
        </div>
      )}
    </div>
  );
}
