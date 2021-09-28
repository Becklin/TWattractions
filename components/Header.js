import Link from "next/link";
import Search from "./Search";
import styles from "@/styles/Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Taiwan Attractions</a>
        </Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href="/attractions/add">
              <a>Add Attractions</a>
            </Link>
          </li>
          <li>
            <Link href="/attractions">
              <a>Attractions</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
