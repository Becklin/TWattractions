import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 p-2 w-full h-[40px] bg-neutral text-neutral-content flex items-center gap-2">
      <a
        href="https://beckyenwen.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Resume"
      >
        Beck Lin
      </a>
      <a
        className="w-4 inline-block"
        href="https://www.linkedin.com/in/beck-yenwen/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <FontAwesomeIcon icon={["fab", "linkedin"]} />
      </a>
    </footer>
  );
}
