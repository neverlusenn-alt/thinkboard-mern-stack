import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content.trim()) {
      toast.error("All fileds are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating note too fast", {
          duration: 4000,
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Perbaikan: t0 diubah jadi to, dan hapus backslash yang tidak sengaja */}
          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                {/* Form Control Title */}
                <div className="form-control mb-4 w-full">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  {/* Tambah input-bordered dan w-full agar melebar pas */}
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered w-full rounded-2xl"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Form Control Content */}
                <div className="form-control mb-4 w-full">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  {/* Tambah w-full agar melebar pas */}
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered w-full h-32 rounded-2xl"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
