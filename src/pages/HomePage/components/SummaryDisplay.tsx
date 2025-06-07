import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { styles } from "../HomePage.styles";

interface SummaryDisplayProps {
  summary: string;
}

export const SummaryDisplay = ({ summary }: SummaryDisplayProps) => {
  return (
    <section style={styles.recordingSection}>
      <h3 style={styles.recordingTitle}>Generated Summary</h3>
      <div style={{ ...styles.transcriptionContent, padding: "2rem" }}>
        <div className="markdown-content">
          <ReactMarkdown rehypePlugins={[remarkGfm]}>{summary}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
};
