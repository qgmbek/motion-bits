import styles from "./about.module.css";

export default function About() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.title}>About Motion Bits</h1>
        <p className={styles.lead}>
          Motion Bits is a collection of carefully crafted animation components
          designed for modern web interfaces.
        </p>
      </section>

      <section className={styles.section}>
        <p>
          The goal is simple: make expressive motion accessible to developers
          without adding complexity to their workflow.
        </p>

        <p>
          Every component is built with clarity and usability in mind clean
          code, predictable behavior, and animations that enhance the interface
          rather than distract from it.
        </p>

        <p>
          Motion on the web should feel intentional. Subtle reveals, fluid
          transitions, and responsive interactions can transform static
          interfaces into living systems. Motion Bits focuses on these small but
          meaningful details that elevate user experience.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Philosophy</h2>

        <p>
          Good interfaces are not static. They respond, guide attention, and
          create rhythm through motion. Animation should support usability —
          helping users understand what changed, where to look next, and how the
          interface behaves.
        </p>

        <p>
          Motion Bits embraces this philosophy by focusing on motion patterns
          that feel natural, subtle, and useful.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Built For</h2>

        <ul className={styles.list}>
          <li>Developers building modern UI systems</li>
          <li>Designers exploring motion in interfaces</li>
          <li>Teams creating polished product experiences</li>
          <li>Anyone who appreciates well-crafted interaction design</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Creator</h2>

        <p>
          Motion Bits is created by <strong>Khogambek Yersin</strong>, a
          developer focused on building clean interfaces, animation systems, and
          tools that help developers create better user experiences.
        </p>
      </section>
    </main>
  );
}
