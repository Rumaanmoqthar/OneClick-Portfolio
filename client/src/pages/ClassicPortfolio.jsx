import { useRef } from 'react';

// --- SVG Icons ---
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.92 4.8 4.8 0 0 0 .38 2.22a7.12 7.12 0 0 0 .38 2.22A2 2 0 0 1 11 11.08l-1.55 1.55a16 16 0 0 0 6.55 6.55L17.92 16a2 2 0 0 1 2-1.84 7.12 7.12 0 0 0 2.22.38 4.8 4.8 0 0 0 2.22.38A2 2 0 0 1 22 16.92z"></path></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const CodeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;


const ClassicTemplate = ({ resume, onDownloadCode }) => {
    const portfolioRef = useRef();
    if (!resume) return null;

    return (
        <div className="bg-gray-100 font-sans">
            <div ref={portfolioRef} className="max-w-4xl mx-auto bg-white shadow-2xl p-8 sm:p-12 my-8 sm:my-16">
                <header className="text-center border-b-2 pb-8 mb-10">
                    <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4 flex items-center justify-center text-gray-500 text-xs">Profile Pic</div>
                    <h1 className="text-5xl font-bold text-gray-800">{resume.name.full}</h1>
                    <h2 className="text-2xl font-light text-gray-600 mt-2">{resume.currentJobRole}</h2>
                    <div className="mt-6 flex justify-center items-center gap-x-6 gap-y-2 text-sm text-gray-500 flex-wrap">
                        <span className="flex items-center gap-2"><MailIcon /><a href={`mailto:${resume.email}`} className="hover:text-blue-600">{resume.email}</a></span>
                        <span className="flex items-center gap-2"><PhoneIcon />{resume.phone}</span>
                        <span className="flex items-center gap-2"><MapPinIcon />{resume.address?.city || 'Global'}</span>
                    </div>
                </header>

                <main className="space-y-12">
                    <Section title="About Me">
                        <p className="text-gray-700 leading-relaxed">{resume.jobDescription}</p>
                    </Section>
                    
                    <Section title="Professional Experience">
                        <div className="space-y-8">
                            {resume.experience?.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-xl font-semibold text-gray-800">{exp.role}</h3>
                                        <div className="text-sm text-gray-500 font-medium">{exp.fromDate} - {exp.toDate}</div>
                                    </div>
                                    <p className="text-lg text-gray-700 mt-1">{exp.companyName}</p>
                                    <p className="mt-2 text-gray-600 leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </Section>

                    <Section title="Featured Projects">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {resume.projects?.map((proj, index) => (
                                <div key={index} className="border-l-4 border-blue-500 pl-4">
                                    <h3 className="text-lg font-semibold text-gray-800">{proj.project_name}</h3>
                                    <p className="mt-1 text-gray-600">{proj.project_description}</p>
                                </div>
                            ))}
                        </div>
                    </Section>

                    <Section title="Skills & Expertise">
                        <div className="flex flex-wrap gap-3">
                            {resume.skills?.map((skill, index) => (
                                <span key={index} className="bg-gray-200 text-gray-800 text-sm font-medium px-4 py-2 rounded-md">{skill}</span>
                            ))}
                        </div>
                    </Section>
                </main>
            </div>
            <div className="max-w-4xl mx-auto mb-8 flex flex-wrap justify-center items-center gap-3">
                <button onClick={onDownloadCode} className="flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-2 px-5 rounded-md hover:bg-blue-700 transition-colors">
                    <CodeIcon/><span>Download Code</span>
                </button>
                <a href="/" className="bg-gray-600 text-white font-semibold py-2 px-5 rounded-md hover:bg-gray-700 transition-colors">Generate New</a>
            </div>
        </div>
    );
};

const Section = ({ title, children }) => (
    <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2>
        {children}
    </section>
);

export default ClassicTemplate;
