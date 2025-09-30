// This function generates the HTML for the "Modern" downloadable portfolio.

export const getModernPortfolioHTML = (resume) => {
  const getBackgroundImage = (jobRole = '') => {
    const role = jobRole.toLowerCase();
    if (role.includes('backend') || role.includes('server')) return 'https://images.unsplash.com/photo-1592609931095-54a2168ae293?q=80&w=2940&auto=format&fit=crop';
    if (role.includes('frontend') || role.includes('ui')) return 'https://images.unsplash.com/photo-1545665277-5937489579f2?q=80&w=2835&auto=format&fit=crop';
    if (role.includes('full-stack')) return 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2940&auto=format&fit=crop';
    return 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=2940&auto=format&fit=crop';
  };
  const backgroundImageUrl = getBackgroundImage(resume.currentJobRole);

  const generateExperience = (experience) => experience?.map(exp => `
    <div class="relative"><div class="absolute -left-[30px] top-1 h-4 w-4 bg-cyan-400 rounded-full border-4 border-black/50"></div><p class="text-sm text-white/50">${exp.fromDate} - ${exp.toDate}</p><h3 class="text-lg font-semibold text-white mt-1">${exp.role}</h3><p class="text-cyan-300">${exp.companyName}</p><p class="text-sm text-white/70 mt-2 leading-relaxed">${exp.description}</p></div>`).join('') || '';
  const generateProjects = (projects) => projects?.map(proj => `<div class="bg-white/5 p-6 rounded-lg border border-white/10"><h3 class="text-md font-semibold text-white">${proj.project_name}</h3><p class="mt-2 text-sm text-white/70">${proj.project_description}</p></div>`).join('') || '';
  const generateSkills = (skills) => skills?.map(skill => `<span class="bg-white/10 text-cyan-200 text-sm font-medium px-4 py-1.5 rounded-full">${skill}</span>`).join('') || '';

  return `<!DOCTYPE html>
    <html lang="en" class="dark"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Portfolio | ${resume.name.full}</title><script src="https://cdn.tailwindcss.com"></script><style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');body{font-family:'Inter',sans-serif;}</style></head>
    <body class="min-h-screen bg-cover bg-center bg-fixed p-4 sm:p-8" style="background-image: url('${backgroundImageUrl}')">
      <div class="max-w-4xl mx-auto bg-black/50 backdrop-blur-xl text-white rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        <header class="p-8 sm:p-10 border-b border-white/10"><div class="flex flex-col sm:flex-row items-center gap-6"><div class="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/10 border-2 border-white/20 flex-shrink-0 flex items-center justify-center text-center text-xs text-white/50">Profile<br/>Picture</div><div class="text-center sm:text-left"><h1 class="text-4xl sm:text-5xl font-bold tracking-tight" style="background-image: linear-gradient(to right, white, #9ca3af);-webkit-background-clip: text;color: transparent;">${resume.name.full}</h1><h2 class="mt-2 text-xl font-medium text-cyan-300">${resume.currentJobRole}</h2><div class="mt-4 flex justify-center sm:justify-start items-center gap-x-5 gap-y-2 text-sm text-white/70 flex-wrap"><span><a href="mailto:${resume.email}">${resume.email}</a></span><span>${resume.phone}</span><span>${resume.address?.city || 'Global'}</span></div></div></div></header>
        <main class="p-8 sm:p-10 space-y-12"><section><h2 class="text-2xl font-bold tracking-tight text-white mb-6">About</h2><p class="text-white/80 leading-relaxed">${resume.jobDescription}</p></section><section><h2 class="text-2xl font-bold tracking-tight text-white mb-6">Experience</h2><div class="relative space-y-8 pl-6 border-l-2 border-white/10">${generateExperience(resume.experience)}</div></section><section><h2 class="text-2xl font-bold tracking-tight text-white mb-6">Projects</h2><div class="grid grid-cols-1 sm:grid-cols-2 gap-6">${generateProjects(resume.projects)}</div></section><section><h2 class="text-2xl font-bold tracking-tight text-white mb-6">Skills</h2><div class="flex flex-wrap gap-3">${generateSkills(resume.skills)}</div></section></main>
        <footer class="p-8 sm:p-10 border-t border-white/10 text-center text-white/50 text-sm"><p>${resume.hobbies || "Passion for technology."}</p></footer>
      </div>
    </body></html>`;
};
