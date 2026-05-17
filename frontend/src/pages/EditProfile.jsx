import React, { useState, useEffect } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { updateProfile } from '../services/user.service';
import toast from 'react-hot-toast';
import { Camera, X } from 'lucide-react';

export const EditProfile = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    skills: [],
    photoUrl: '',
    githubUrl: '',
    linkedinUrl: ''
  });
  const [skillInput, setSkillInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        bio: user.bio || '',
        skills: user.skills || [],
        photoUrl: user.photoUrl || '',
        githubUrl: user.githubUrl || '',
        linkedinUrl: user.linkedinUrl || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
        setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
        setSkillInput('');
      }
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skillToRemove) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await updateProfile(formData);
      setUser(res.user);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper className="py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Edit Profile</h1>
        
        <div className="glass-panel rounded-3xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Avatar Upload UI */}
            <div className="flex flex-col items-center sm:items-start gap-4 pb-8 border-b border-slate-800">
              <h3 className="text-lg font-medium text-slate-100">Profile Photo</h3>
              <div className="flex items-center gap-6 w-full">
                <div className="relative group cursor-pointer">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-800 border-2 border-slate-700">
                    {formData.photoUrl ? (
                      <img src={formData.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={24} className="text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-slate-400 mb-2">Image URL</label>
                  <input
                    type="text"
                    name="photoUrl"
                    value={formData.photoUrl}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-slate-200 focus:outline-none focus:border-brand-purple"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-brand-purple"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-brand-purple"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-brand-purple resize-none"
                placeholder="Tell others about yourself..."
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Skills</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleAddSkill}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-slate-200 focus:outline-none focus:border-brand-purple"
                  placeholder="e.g. React, Node.js"
                />
                <Button type="button" variant="secondary" onClick={handleAddSkill}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map(skill => (
                  <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-sm">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="text-slate-500 hover:text-rose-400">
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4 pt-6 border-t border-slate-800">
              <h3 className="text-lg font-medium text-slate-100">Social Profiles</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">GitHub URL</label>
                  <input
                    type="text"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-slate-200 focus:outline-none focus:border-brand-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">LinkedIn URL</label>
                  <input
                    type="text"
                    name="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-slate-200 focus:outline-none focus:border-brand-purple"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 flex justify-end gap-4">
              <Button type="button" variant="ghost">Cancel</Button>
              <Button type="submit" variant="gradient" isLoading={isLoading}>Save Changes</Button>
            </div>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};
