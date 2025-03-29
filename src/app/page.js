import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-t800 mb-6">
          Welcome to <span className="text-indigo-600">AWS Knowledge Bot</span>
        </h1>
        <p className="text-xl text-gray-t600 max-w-2xl mx-auto mb-10">
          The purpose of AWS Knowledge Bot is to act as an intelligent query-answering bot that provides users with precise, context-aware insights derived from the AWS Well-Architected Framework.
        </p>
        <Link
          href="/chat"
          className="bg-blue-500 hover:bg-blue-400 text-white font-medium py-3 px-8 rounded-lg transition duration-300"
        >
          Start →
        </Link>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-t800 mb-12">
          What I Can Help With
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '💡',
              title: 'Instant Answers',
              description: 'Get quick responses to your questions'
            },
            {
              icon: '🔍',
              title: 'Deep Knowledge',
              description: 'Access to comprehensive information about AWS Cloud'
            },
            {
              icon: '⚡',
              title: 'Fast Processing',
              description: 'Quick analysis of complex queries'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-t600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Author & Tech Stack */}
      <section className="container mx-auto px-4 py-16 bg-white rounded-t-3xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-t800 mb-12">
            About This Project
          </h2>

          <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center text-4xl">
                <Image src="/profile.png" alt="Naga Srinivas" width={128} height={128} className="rounded-full" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Author Details</h3>
              <p className="text-gray-t600 mb-4">
                Created by Naga Srinivas - Java Architect. Connect with me on:
              </p>
              <div className="flex gap-4">
                <a href="https://github.com/nagasrinu88" target="_blank" className="text-indigo-600 hover:text-indigo-800">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/naga-srinivas-kapusetti/" target="_blank" className="text-indigo-600 hover:text-indigo-800">
                  LinkedIn
                </a>
                <a href="https://nagasrinu88.github.io/" target="_blank" className="text-indigo-600 hover:text-indigo-800">
                  Website
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Technology Stack</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                'Next.js',
                'React',
                'Tailwind CSS',
                'Node.js',
                'Gemini AI',
                'Pinecone'
              ].map((tech, index) => (
                <div key={index} className="bg-gray-50 px-4 py-3 rounded-lg">
                  <Link href={`https://www.google.com/search?q=${tech}`} target="_blank" className="text-indigo-600 hover:text-indigo-800">
                    {tech}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://github.com/nagasrinu88/rag-app-ui"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
            >
              View Source Code on GitHub
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
