import { useRef } from 'react';

// --- SVG Icons (Copy from your existing Portfolio.jsx) ---
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.92 4.8 4.8 0 0 0 .38 2.22a7.12 7.12 0 0 0 .38 2.22A2 2 0 0 1 11 11.08l-1.55 1.55a16 16 0 0 0 6.55 6.55L17.92 16a2 2 0 0 1 2-1.84 7.12 7.12 0 0 0 2.22.38 4.8 4.8 0 0 0 2.22.38A2 2 0 0 1 22 16.92z"></path></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const CodeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;

const getBackgroundImage = (jobRole = '') => {
  const role = jobRole.toLowerCase();
  if (role.includes('backend') || role.includes('server')) return 'https://images.unsplash.com/photo-1592609931095-54a2168ae293?q=80&w=2940&auto=format&fit=crop';
  if (role.includes('frontend') || role.includes('ui') || role.includes('design')) return 'https://images.unsplash.com/photo-1545665277-5937489579f2?q=80&w=2835&auto=format&fit=crop';
  if (role.includes('full-stack')) return 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2940&auto=format&fit=crop';
  return 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=2940&auto=format&fit=crop';
};

// MODIFICATION: Component now accepts props
const ModernTemplate = ({ resume, onDownloadCode }) => {
    const portfolioRef = useRef();
    if (!resume) return null;
    const backgroundImageUrl = getBackgroundImage(resume.currentJobRole);

    return (
        <div 
          className="min-h-screen bg-cover bg-center bg-fixed p-4 sm:p-8" 
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >
          <div ref={portfolioRef} className="max-w-4xl mx-auto bg-black/50 backdrop-blur-xl text-white rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            <header className="p-8 sm:p-10 border-b border-white/10">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/10 border-2 border-white/20 flex-shrink-0 flex items-center justify-center text-center text-xs text-white/50">
                  Profile<br/>Picture
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">{resume.name.full}</h1>
                  <h2 className="mt-2 text-xl font-medium text-cyan-300">{resume.currentJobRole}</h2>
                  <div className="mt-4 flex justify-center sm:justify-start items-center gap-x-5 gap-y-2 text-sm text-white/70 flex-wrap">
                    <span className="flex items-center gap-2"><MailIcon /><a href={`mailto:${resume.email}`} className="hover:text-cyan-300 transition-colors">{resume.email}</a></span>
                    <span className="flex items-center gap-2"><PhoneIcon />{resume.phone}</span>
                    <span className="flex items-center gap-2"><MapPinIcon />{resume.address?.city || 'Global'}</span>
                  </div>
                </div>
              </div>
            </header>
            <main className="p-8 sm:p-10 space-y-12">
              <Section title="About"><p className="text-white/80 leading-relaxed">{resume.jobDescription}</p></Section>
              <Section title="Experience">
                <div className="relative space-y-8 pl-6 border-l-2 border-white/10">
                  {resume.experience?.map((exp, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-[30px] top-1 h-4 w-4 bg-cyan-400 rounded-full border-4 border-black/50"></div>
                      <p className="text-sm text-white/50">{exp.fromDate} - {exp.toDate}</p>
                      <h3 className="text-lg font-semibold text-white mt-1">{exp.role}</h3>
                      <p className="text-cyan-300">{exp.companyName}</p>
                      <p className="text-sm text-white/70 mt-2 leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </Section>
              <Section title="Projects">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {resume.projects?.map((proj, index) => (
                    <div key={index} className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-cyan-400/50 transition-colors group">
                      <h3 className="text-md font-semibold text-white group-hover:text-cyan-300 transition-colors">{proj.project_name}</h3>
                      <p className="mt-2 text-sm text-white/70">{proj.project_description}</p>
                    </div>
                  ))}
                </div>
              </Section>
              <Section title="Skills">
                <div className="flex flex-wrap gap-3">
                  {resume.skills?.map((skill, index) => (
                    <span key={index} className="bg-white/10 text-cyan-200 text-sm font-medium px-4 py-1.5 rounded-full">{skill}</span>
                  ))}
                </div>
              </Section>
            </main>
            <footer className="p-8 sm:p-10 border-t border-white/10 text-center text-white/50 text-sm">
                <p>{resume.hobbies || "Passion for technology and continuous learning."}</p>
            </footer>
          </div>
          <div className="max-w-4xl mx-auto mt-6 flex flex-wrap justify-center items-center gap-3">
            {/* MODIFICATION: Use the passed-in function */}
            <button onClick={onDownloadCode} className="flex items-center justify-center gap-2 bg-cyan-600/80 text-white font-semibold py-2 px-5 rounded-md hover:bg-cyan-500 transition-colors backdrop-blur-sm border border-cyan-500/50">
                <CodeIcon/><span>Download Code</span>
            </button>
            <a href="/" className="bg-gray-700/80 text-white font-semibold py-2 px-5 rounded-md hover:bg-gray-600 transition-colors backdrop-blur-sm border border-gray-600/50">Generate New</a>
          </div>
        </div>
    );
};

const Section = ({ title, children }) => (
    <section>
        <h2 className="text-2xl font-bold tracking-tight text-white mb-6">{title}</h2>
        {children}
    </section>
);

export default ModernTemplate;
