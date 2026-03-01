import { projectsData } from "../data/projectsData";
import { IoLogoGithub } from "react-icons/io";

export default function Middle() {
    return (
        <div className="max-w-7xl mx-auto px-6 mt-20">
            <h1 className="text-3xl lg:text-5xl text-center text-white font-sansation mb-14">
                Projelerime Göz Atmak İster Misin?
            </h1>

            <div className="flex flex-row flex-wrap gap-8 justify-center items-stretch">
                {projectsData.map((project) => (
                    <div 
                        key={project.id} 
                        className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 rounded-2xl shadow-xl w-full sm:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)] font-sansation hover:-translate-y-2 hover:bg-white/20 transition-all duration-300 flex flex-col"
                    >
                        
                        <div className="h-45 bg-gray-100 rounded-lg mb-4 w-full object-cover">
                            <img src={project.image} alt={project.title} className="h-full w-full shadow-2xl object-cover rounded-lg bg-purple-100" />
                        </div>

                        <h2 className="text-2xl font-bold mb-3 text-white">
                            {project.title}
                        </h2>
                        
                        <p className="text-gray-300 flex leading-relaxed">
                            {project.description}
                        </p>

                        {/* Örnek: İleride kullanmak isteyebileceğin teknoloji etiketleri */}
                        <div className="mt-6 flex flex-wrap gap-2 mb-2">
                            {project.techStack?.map((tech, index) => (
                                <span key={index} className="text-xs text-pink-300 bg-pink-500/10 px-2 py-1 rounded-md">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="text-gray-300 leading-relaxed flex items-center gap-1">
                        <IoLogoGithub />
                        <a href={project.link}>GitHub Linki</a>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}