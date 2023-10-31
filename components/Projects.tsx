"use client";
import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { ProjectInterface } from "@/common.types";

const ProjectCardList = ({ data }: { data: ProjectInterface[] }) => {
  return (
    <>
      {data?.map((project: ProjectInterface) => (
        <ProjectCard
          key={project._id}
          id={project._id}
          image={project.image}
          title={project.title}
          name={project?.creator?.name}
          avatarUrl={project?.creator?.avatarUrl}
          userId={project?.creator?._id}
        />
      ))}
    </>
  );
};

const Projects = ({ category }: { category: string }) => {
  const [posts, setPosts] = useState<ProjectInterface[]>([]);
  const [searchedResults, setSearchedResults] = useState<ProjectInterface[]>(
    []
  );

  const filterProjects = (searchtext: string) => {
    const newFilteredProjects = posts.filter(
      (item: ProjectInterface) => item.category === searchtext
    );
    setSearchedResults(newFilteredProjects);
  };

  useEffect(() => {
    if (category && category != "" && posts) {
      filterProjects(category);
    }
  }, [category]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("/api/project");
      const data = await response.json();
      setPosts(data);
    };
    fetchProjects();
  }, []);

  return (
    <>
      {category && searchedResults.length == 0 ? (
        <section className="flexStart flex-col paddings">
          <p className="no-result-text text-center">
            No projects found, go create some first.
          </p>
        </section>
      ) : category && searchedResults.length > 0 ? (
        <section className="projects-grid">
          <ProjectCardList data={searchedResults} />
        </section>
      ) : (
        <section className="projects-grid">
          <ProjectCardList data={posts} />
        </section>
      )}
    </>
  );
};

export default Projects;
