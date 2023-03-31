import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    // <footer className="fixed bottom-0 text-white w-full mx-4">
    <footer className="fixed bottom-0 p-2 w-full h-[40px] bg-neutral text-neutral-content flex items-center gap-2">
      <Link
        href="https://beckyenwen.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Resume"
      >
        Beck Lin
      </Link>
      <Link
        className="w-4 inline-block"
        href="https://www.linkedin.com/in/beck-lin/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <FontAwesomeIcon icon={faLinkedin} />
      </Link>
    </footer>
  );
}
