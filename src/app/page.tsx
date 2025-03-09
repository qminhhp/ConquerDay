import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Tag,
  Layout,
  Focus,
} from "lucide-react";
import { createClient } from "../../supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              Conquer Day
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-2xl">
              A minimalist task management app that helps you organize your day
              with clarity and focus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={user ? "/dashboard" : "/sign-up"}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
              >
                {user ? "Go to Dashboard" : "Get Started Free"}
              </Link>
              <Link
                href="#features"
                className="px-8 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-all font-medium"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simplify Your Day</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our minimalist approach helps you focus on what matters most.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Smart Time Tracking",
                description:
                  "Easily assign time to tasks with natural language",
              },
              {
                icon: <Tag className="w-6 h-6" />,
                title: "Powerful Tagging",
                description: "Organize tasks with a flexible tagging system",
              },
              {
                icon: <Layout className="w-6 h-6" />,
                title: "Multiple Views",
                description:
                  "Schedule, Planner, and Boards for different workflows",
              },
              {
                icon: <Focus className="w-6 h-6" />,
                title: "Focus Mode",
                description: "Eliminate distractions and get things done",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">
                Clean, Intuitive Interface
              </h2>
              <p className="text-gray-700 mb-6">
                Our minimalist design eliminates clutter and helps you focus on
                your tasks. The smart input field understands natural language,
                making it easy to add time, projects, and tags.
              </p>
              <ul className="space-y-3">
                {[
                  "Quick task entry with smart syntax",
                  "Intuitive tagging system",
                  "Distraction-free focus mode",
                  "Light and dark themes",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 bg-white p-4 rounded-xl shadow-lg border border-gray-200">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                <div className="p-6 flex flex-col h-full">
                  <div className="mb-4 flex justify-between items-center">
                    <h3 className="font-medium">Today's Tasks</h3>
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md">
                      Ready to work!
                    </button>
                  </div>
                  <div className="flex-1">
                    <div className="mb-4 p-3 bg-white rounded-md shadow-sm border border-gray-200">
                      <input
                        type="text"
                        placeholder="What do you need to do today?"
                        className="w-full border-none focus:outline-none text-gray-800"
                      />
                    </div>
                    <div className="space-y-2">
                      {[
                        {
                          text: "Prepare presentation for meeting",
                          tags: ["work", "priority"],
                        },
                        { text: "30min yoga session", tags: ["health"] },
                        { text: "Call mom", tags: ["personal"] },
                      ].map((task, index) => (
                        <div
                          key={index}
                          className="p-3 bg-white rounded-md shadow-sm border border-gray-200 flex justify-between items-center"
                        >
                          <span>{task.text}</span>
                          <div className="flex gap-1">
                            {task.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Conquer Your Day?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of productive people who have transformed their daily
            workflow.
          </p>
          <Link
            href={user ? "/dashboard" : "/sign-up"}
            className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {user ? "Go to Dashboard" : "Start Organizing Today"}
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
