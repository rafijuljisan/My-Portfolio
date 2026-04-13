"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type Project = {
  id: number;
  year: string;
  title: string;
  description: string;
  tags: string;
  imgSrc?: string;
  liveSiteUrl?: string;
  sourceCodeUrl?: string;
  layout: string;
  order: number;
};

const emptyForm = {
  year: new Date().getFullYear().toString(),
  title: "",
  description: "",
  tags: "",
  imgSrc: "",
  liveSiteUrl: "",
  sourceCodeUrl: "",
  layout: "1-col",
  order: 0,
};

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      order: Number(form.order),
    };

    const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (res.ok) {
      setMessage(editingId ? "✅ Project updated!" : "✅ Project added!");
      setForm(emptyForm);
      setShowForm(false);
      setEditingId(null);
      fetchProjects();
    } else {
      setMessage("❌ Something went wrong");
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setForm({
      year: project.year,
      title: project.title,
      description: project.description,
      tags: JSON.parse(project.tags).join(", "),
      imgSrc: project.imgSrc || "",
      liveSiteUrl: project.liveSiteUrl || "",
      sourceCodeUrl: project.sourceCodeUrl || "",
      layout: project.layout,
      order: project.order,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    fetchProjects();
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Top Bar */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-lime-400">Portfolio Admin</h1>
          <p className="text-gray-400 text-sm">{session?.user?.email}</p>
        </div>
        <div className="flex gap-3">
          
          <a href="/" className="px-4 py-2 text-sm border border-gray-600 text-gray-300 rounded-full hover:bg-gray-800 transition-colors">
            View Site
          </a>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="px-4 py-2 text-sm bg-red-900 text-red-300 rounded-full hover:bg-red-800 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Message */}
        {message && (
          <div className="mb-6 bg-gray-800 border border-gray-600 px-4 py-3 rounded-lg text-sm">
            {message}
          </div>
        )}

        {/* Add / Edit Form */}
        {showForm && (
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-6 text-lime-400">
              {editingId ? "Edit Project" : "Add New Project"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Year *</label>
                  <input
                    required
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-lime-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Layout</label>
                  <select
                    value={form.layout}
                    onChange={(e) => setForm({ ...form, layout: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-lime-400"
                  >
                    <option value="1-col">Normal (1 column)</option>
                    <option value="2-col">Wide (2 columns)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Title *</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="My Awesome Project"
                  className="w-full bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-lime-400"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe your project..."
                  className="w-full bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-lime-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Tags * <span className="text-gray-600">(comma separated: React, Laravel, MySQL)</span>
                </label>
                <input
                  required
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="React, Next.js, Tailwind CSS"
                  className="w-full bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-lime-400"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Image URL <span className="text-gray-600">(paste Cloudinary or public path like /School Website.png)</span>
                </label>
                <input
                  value={form.imgSrc}
                  onChange={(e) => setForm({ ...form, imgSrc: e.target.value })}
                  placeholder="/School Website.png or https://res.cloudinary.com/..."
                  className="w-full bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-lime-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Live Site URL</label>
                  <input
                    value={form.liveSiteUrl}
                    onChange={(e) => setForm({ ...form, liveSiteUrl: e.target.value })}
                    placeholder="https://yoursite.com"
                    className="w-full bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-lime-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Source Code URL</label>
                  <input
                    value={form.sourceCodeUrl}
                    onChange={(e) => setForm({ ...form, sourceCodeUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-lime-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Display Order <span className="text-gray-600">(0 = first)</span>
                </label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                  className="w-32 bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-lime-400"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-lime-400 text-black font-bold rounded-full hover:bg-lime-500 disabled:opacity-50 transition-all"
                >
                  {saving ? "Saving..." : editingId ? "Update Project" : "Add Project"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setForm(emptyForm);
                  }}
                  className="px-6 py-2 border border-gray-600 text-gray-300 rounded-full hover:bg-gray-800 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Header Row */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Projects{" "}
            <span className="text-gray-500 text-lg font-normal">
              ({projects.length})
            </span>
          </h2>
          {!showForm && (
            <button
              onClick={() => {
                setShowForm(true);
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="px-5 py-2 bg-lime-400 text-black font-bold rounded-full hover:bg-lime-500 transition-all"
            >
              + Add Project
            </button>
          )}
        </div>

        {/* Projects List */}
        <div className="space-y-3">
          {projects.length === 0 && (
            <div className="text-center py-16 text-gray-600">
              <p className="text-lg">No projects yet.</p>
              <p className="text-sm mt-1">Click "Add Project" to get started.</p>
            </div>
          )}
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-900 border border-gray-700 rounded-xl p-4 flex items-center gap-4"
            >
              {project.imgSrc && (
                <img
                  src={project.imgSrc}
                  alt={project.title}
                  className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
                />
              )}
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-500">{project.year}</span>
                  <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">
                    {project.layout}
                  </span>
                  <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">
                    order: {project.order}
                  </span>
                </div>
                <h3 className="font-semibold text-white truncate">{project.title}</h3>
                <p className="text-sm text-gray-400 truncate">{project.description}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleEdit(project)}
                  className="px-3 py-1.5 text-sm border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="px-3 py-1.5 text-sm bg-red-900/50 text-red-400 border border-red-800 rounded-lg hover:bg-red-900 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}