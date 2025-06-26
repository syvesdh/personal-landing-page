import { BlogPosts } from "app/components/posts";
import { PageScramble } from "./PageScramble";
import { projects } from "app/data/projects";
import { ProjectCard } from "app/components/ProjectCard";
import styles from "./components/ProjectCard.module.css";

export default function Page() {
  return (
    <section>
      <PageScramble>
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

        <div className="my-8">
          <BlogPosts />
        </div>

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
