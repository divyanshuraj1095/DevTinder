import { useState, useEffect } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { updateProfile } from '../services/user.service';
import { getProfileCompletion, getPhotoUrl } from '../utils/userDisplay';
import toast from 'react-hot-toast';
import { Camera, X } from 'lucide-react';

export const Profile = () => {
  const { user, refreshUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    about: '',
    age: '',
    gender: '',
    skills: [],
    photoUrl: '',
  });
  const [skillInput, setSkillInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      about: user.about || '',
      age: user.age ?? '',
      gender: user.gender || '',
      skills: user.skills || [],
      photoUrl: user.photoUrl || user.photo || '',
    });
  }, [user]);

  const completion = getProfileCompletion(user);

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

  const removeSkill = (skill) => {
    setFormData({ ...formData, skills: formData.skills.filter((s) => s !== skill) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        about: formData.about,
        skills: formData.skills,
        photoUrl: formData.photoUrl,
      };
      if (formData.age) payload.age = Number(formData.age);
      if (formData.gender) payload.gender = formData.gender;

      await updateProfile(payload);
      await refreshUser();
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err.parsedMessage || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <PageWrapper className="py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Your Profile</h1>
            <p className="text-slate-400 mt-1">Complete your profile to stand out</p>
          </div>
          <div className="glass-card p-4 min-w-[200px]">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">Completion</span>
              <span className="text-brand-purple font-semibold">{completion}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-brand rounded-full transition-all duration-500" style={{ width: `${completion}%` }} />
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-slate-800">
              <Avatar src={formData.photoUrl || getPhotoUrl(user)} alt={user.firstName} size="2xl" />
              <div className="flex-1 w-full">
                <label className="block text-sm text-slate-400 mb-2 flex items-center gap-2">
                  <Camera size={16} /> Profile photo URL
                </label>
                <input
                  type="url"
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-slate-200 focus:outline-none focus:border-brand-purple"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">First name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-brand-purple" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Last name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-brand-purple" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Age</label>
                <input type="number" name="age" min={18} value={formData.age} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-brand-purple" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-brand-purple">
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">About</label>
              <textarea name="about" value={formData.about} onChange={handleChange} rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-brand-purple resize-none" placeholder="Tell others about yourself..." />
            </div>

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
                {formData.skills.map((skill) => (
                  <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-sm">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="text-slate-500 hover:text-rose-400">
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 flex justify-end">
              <Button type="submit" variant="gradient" isLoading={isLoading}>Save profile</Button>
            </div>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};
