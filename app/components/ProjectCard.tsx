"use client";

import { Project } from "app/types/project";
import React, { useState } from "react";
import styles from "./ProjectCard.module.css";

export function ProjectCard({ project }: { project: Project }) {
  const [current, setCurrent] = useState(0);
  const total = project.images.length;

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  };
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title} title={project.name}>
        {project.name}
      </h2>
      <div className={styles.slider}>
        <button
          className={styles.arrow}
          onClick={prevImage}
          aria-label="Previous image"
        >
          &#8592;
        </button>
        <img
          className={styles.image}
          src={project.images[current]}
          alt={`${project.name} screenshot ${current + 1}`}
        />
        <button
          className={styles.arrow}
          onClick={nextImage}
          aria-label="Next image"
        >
          &#8594;
        </button>
      </div>
      <p
        className={styles.description + " " + styles.truncateDescription}
        title={project.description}
      >
        {project.description}
      </p>
      <ul className={styles.skills}>
        {project.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}
