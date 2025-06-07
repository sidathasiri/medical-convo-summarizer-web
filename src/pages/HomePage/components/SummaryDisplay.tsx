import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { styles } from "../HomePage.styles";
import { FaFileAlt } from "react-icons/fa";

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
        <FaFileAlt style={{ verticalAlign: "middle" }} />
        <span>Generated Summary</span>
      </h3>
      <div style={{ ...styles.transcriptionContent, padding: "2rem" }}>
        <div className="markdown-content">
          <ReactMarkdown rehypePlugins={[remarkGfm]}>{summary}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
};
