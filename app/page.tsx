import { BlogPosts } from "app/components/posts";
import { PageScramble } from "./PageScramble";
import { projects } from "app/data/projects";
import { ProjectCard } from "app/components/ProjectCard";
import styles from "./components/ProjectCard.module.css";
import ThreeDViewer from "./components/ThreeDViewer";

export default function Page() {
  return (
    <section style={{ marginLeft: "1rem", marginRight: "1rem" }}>
      <PageScramble>
        <div
          className="hero-page"
          style={{
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "4rem 2rem",
            background: "linear-gradient(120deg, #d4b5f0 0%, #7ab3e8 100%)",
            borderRadius: "2rem",
            margin: "1rem 1rem",
            overflow: "hidden",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            Hi! I&apos;m Steven{" "}
            <span role="img" aria-label="wave" style={{ marginLeft: "0.5rem" }}>
              👋
            </span>
          </h1>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 400,
              marginBottom: "0.5rem",
            }}
          >
            and I am a(n)
          </h2>
          <h2
            style={{
              fontSize: "2.2rem",
              fontWeight: 800,
              letterSpacing: "0.1em",
              marginBottom: "1.5rem",
            }}
          >
            PROGRAMMER
          </h2>
          <p
            style={{
              maxWidth: "55vw",
              fontSize: "1.1rem",
              marginBottom: "0.5rem",
            }}
          >
            a 2025 graduate from National Tsing Hua University in Electrical
            Engineering and Computer Science. I specialize in AI, robotics, and
            human-computer integration, with a focus on machine learning,
            computer vision, SLAM, and system integration.
          </p>
          <p
            style={{
              maxWidth: "55vw",
              fontSize: "1.1rem",
              marginBottom: "0.5rem",
            }}
          >
            I have practical experience with ROS2 and Unity, and have developed
            3D scanning tools and hand gesture data collection platforms.
            Currently, I&apos;m researching automated skeleton generation from
            3D meshes.
          </p>
          <p style={{ maxWidth: "700px", fontSize: "1.1rem" }}>
            Fluent in Indonesian and English; intermediate proficiency in
            Mandarin Chinese.
          </p>
          <div style={{ position: "relative" }}>
            <ThreeDViewer />
          </div>
        </div>
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
          My Portfolio
        </h1>
        <p className="mb-4">
          {`I'm a Vim enthusiast and tab advocate, finding unmatched efficiency in
          Vim's keystroke commands and tabs' flexibility for personal viewing
          preferences. This extends to my support for static typing, where its
          early error detection ensures cleaner code, and my preference for dark
          mode, which eases long coding sessions by reducing eye strain.`}
        </p>
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
          My Projects
        </h1>
        <div className={styles.masonry}>
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </PageScramble>
    </section>
  );
}
