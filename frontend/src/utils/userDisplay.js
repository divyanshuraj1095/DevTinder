const DEFAULT_ABOUT = 'This is default description about the user please update it';

export function getPhotoUrl(user) {
  if (!user) return null;
  return user.photoUrl || user.photo || null;
}

export function getAbout(user) {
  return user?.about || '';
}

export function getDisplayName(user) {
  if (!user) return 'Developer';
  return [user.firstName, user.lastName].filter(Boolean).join(' ') || 'Developer';
}

export function getProfileCompletion(user) {
  if (!user) return 0;

  const checks = [
    Boolean(user.firstName?.trim()),
    Boolean(user.lastName?.trim()),
    Boolean(user.age),
    Boolean(user.gender),
    Boolean(user.about?.trim() && user.about !== DEFAULT_ABOUT),
    Array.isArray(user.skills) && user.skills.length > 0,
    Boolean(getPhotoUrl(user)),
  ];

  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}
