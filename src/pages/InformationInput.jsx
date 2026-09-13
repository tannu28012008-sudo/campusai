import { useState } from "react";

function InformationInput({ onBack }) {
  const [notice, setNotice] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  const handleSubmit = () => {
    if (!notice.trim() && !fileName) return;

    alert("Information added successfully!");
  };

  return (
    <main className="information-page">
      <button className="information-back" onClick={onBack}>
        ← Back to Dashboard
      </button>

      <div className="information-header">
        <span>INFORMATION INPUT</span>
        <h1>Add Campus Information</h1>
        <p>
          Add a notice or upload a PDF. CampusAI will process it
          automatically.
        </p>
      </div>

      <section className="information-card">
        <div className="input-section">
          <label>Campus Notice</label>

          <textarea
            value={notice}
            onChange={(e) => setNotice(e.target.value)}
            placeholder="Paste or type a campus notice here..."
          />
        </div>

        <div className="input-divider">
          <span>OR</span>
        </div>

        <div className="upload-section">
          <label>Upload PDF</label>

          <label className="upload-box">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFile}
            />

            <div className="upload-icon">↑</div>
            <strong>
              {fileName || "Upload a campus PDF"}
            </strong>
            <span>
              PDF files only
            </span>
          </label>
        </div>

        <button
          className="process-button"
          onClick={handleSubmit}
          disabled={!notice.trim() && !fileName}
        >
          Process Information →
        </button>
      </section>
    </main>
  );
}

export default InformationInput;