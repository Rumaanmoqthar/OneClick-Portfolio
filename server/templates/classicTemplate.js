// This function generates the HTML for the "Classic" downloadable portfolio.

export const getClassicPortfolioHTML = (resume) => {
  const generateExperience = (experience) => experience?.map(exp => `
    <div class="mb-8">
      <div class="flex justify-between items-baseline">
        <h3 class="text-xl font-semibold text-gray-800">${exp.role || ''}</h3>
        <div class="text-sm text-gray-500 font-medium">${exp.fromDate || ''} - ${exp.toDate || ''}</div>
      </div>
      <p class="text-lg text-gray-700 mt-1">${exp.companyName || ''}</p>
      <p class="mt-2 text-gray-600 leading-relaxed">${exp.description || ''}</p>
    </div>
  `).join('') || '';

  const generateProjects = (projects) => projects?.map(proj => `
    <div class="border-l-4 border-blue-500 pl-4">
      <h3 class="text-lg font-semibold text-gray-800">${proj.project_name || ''}</h3>
      <p class="mt-1 text-gray-600">${proj.project_description || ''}</p>
    </div>
  `).join('') || '';

  const generateSkills = (skills) => skills?.map(skill => `
    <span class="bg-gray-200 text-gray-800 text-sm font-medium px-4 py-2 rounded-md">${skill}</span>
  `).join('') || '';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Portfolio | ${resume.name.full}</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Source+Sans+Pro:wght@300;400;600&display=swap');
        body { font-family: 'Source Sans Pro', sans-serif; }
        h1, h2, h3 { font-family: 'Lora', serif; }
      </style>
    </head>
    <body class="bg-gray-100">
      <div class="max-w-4xl mx-auto bg-white shadow-2xl p-8 sm:p-12 my-8 sm:my-16">
        <header class="text-center border-b-2 pb-8 mb-10">
          <div class="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4 flex items-center justify-center text-gray-500 text-xs">Profile Pic</div>
          <h1 class="text-5xl font-bold text-gray-800">${resume.name.full}</h1>
          <h2 class="text-2xl font-light text-gray-600 mt-2">${resume.currentJobRole}</h2>
          <div class="mt-6 flex justify-center items-center gap-x-6 gap-y-2 text-sm text-gray-500 flex-wrap">
            <a href="mailto:${resume.email}" class="hover:text-blue-600">${resume.email}</a>
            <span>${resume.phone}</span>
            <span>${resume.address?.city || 'Global'}</span>
          </div>
        </header>
        <main class="space-y-12">
          <section>
            <h2 class="text-3xl font-bold text-gray-800 mb-6">About Me</h2>
            <p class="text-gray-700 leading-relaxed">${resume.jobDescription}</p>
          </section>
          <section>
            <h2 class="text-3xl font-bold text-gray-800 mb-6">Professional Experience</h2>
            <div class="space-y-8">${generateExperience(resume.experience)}</div>
          </section>
          <section>
            <h2 class="text-3xl font-bold text-gray-800 mb-6">Featured Projects</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">${generateProjects(resume.projects)}</div>
          </section>
          <section>
            <h2 class="text-3xl font-bold text-gray-800 mb-6">Skills & Expertise</h2>
            <div class="flex flex-wrap gap-3">${generateSkills(resume.skills)}</div>
          </section>
        </main>
      </div>
    </body>
    </html>
  `;
};

