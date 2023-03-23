import Link from "next/link";
import Search from "./Search";
import styles from "@/styles/Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Taiwan Attractions</Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href="/attractions/add">Add Attractions</Link>
          </li>
          <li>
            <Link href="/attractions">Attractions</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
