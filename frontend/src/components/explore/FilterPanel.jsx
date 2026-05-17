import React from 'react';
import { Filter } from 'lucide-react';

const SKILLS = ['React', 'Node.js', 'Python', 'Java', 'TypeScript', 'AWS', 'Docker', 'Go', 'Rust', 'Vue.js'];
const EXP_LEVELS = ['Beginner', 'Junior', 'Mid-Level', 'Senior', 'Lead'];

export const FilterPanel = ({ filters, setFilters }) => {
  const toggleSkill = (skill) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    setFilters({ ...filters, skills: newSkills });
  };

  const toggleExp = (exp) => {
    const newExp = filters.experience.includes(exp)
      ? filters.experience.filter(e => e !== exp)
      : [...filters.experience, exp];
    setFilters({ ...filters, experience: newExp });
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="text-brand-purple" size={20} />
        <h3 className="font-semibold text-lg text-slate-100">Filters</h3>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-slate-400 mb-3">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map(skill => {
            const isSelected = filters.skills.includes(skill);
            return (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                  isSelected 
                    ? 'bg-brand-purple/20 border-brand-purple text-brand-purple' 
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {skill}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-slate-400 mb-3">Experience Level</h4>
        <div className="flex flex-wrap gap-2">
          {EXP_LEVELS.map(exp => {
            const isSelected = filters.experience.includes(exp);
            return (
              <button
                key={exp}
                onClick={() => toggleExp(exp)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                  isSelected 
                    ? 'bg-brand-blue/20 border-brand-blue text-brand-blue' 
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {exp}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
