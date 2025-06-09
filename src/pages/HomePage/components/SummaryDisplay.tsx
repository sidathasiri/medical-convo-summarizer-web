import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { styles } from "../HomePage.styles";
import { FaFileAlt, FaMagic } from "react-icons/fa";
import { Loader } from "../../../components/Loader/Loader";

interface SummaryDisplayProps {
  summary: string;
}

export const SummaryDisplay = ({ summary }: SummaryDisplayProps) => {
  return (
    <section style={styles.recordingSection}>
      <h3
        style={{
          ...styles.recordingTitle,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <FaMagic style={{ marginRight: 8, color: "#D69E2E", verticalAlign: "middle" }} />
        <span>Generated Summary</span>
      </h3>
      <div style={{ ...styles.transcriptionContent, padding: "2rem" }}>
        <div className="markdown-content">
          {summary === "Generating summary..." ? (
            <Loader size="medium" message="Generating your summary..." />
          ) : (
            <ReactMarkdown rehypePlugins={[remarkGfm]}>{summary}</ReactMarkdown>
          )}
        </div>
      </div>
    </section>
  );
};
