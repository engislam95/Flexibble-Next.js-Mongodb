import { ProjectInterface } from "@/common.types";
import Image from "next/image";

import Link from "next/link";
import Button from "./Button";
import ProjectCard from "./ProjectCard";

type Props = {
  userData: ProjectInterface[];
};

const ProfilePage = ({ userData }: Props) => (
  <section className="flexCenter flex-col max-w-10xl w-full mx-auto paddings">
    <section className="flexBetween max-lg:flex-col gap-10 w-full">
      <div className="flex items-start flex-col w-full">
        <Image
          src={userData[0]?.creator?.avatarUrl}
          width={100}
          height={100}
          className="rounded-full"
          alt="user image"
        />
        <p className="text-4xl font-bold mt-10">{userData[0]?.creator?.name}</p>
        <p className="md:text-3xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg">
          I’m Senior Software Engineer at Vodafone 👋
        </p>

        <div className="flex mt-8 gap-5 w-full flex-wrap">
          <Button
            title="Follow"
            leftIcon="/plus-round.svg"
            bgColor="bg-light-white-400 !w-max"
            textColor="text-black-100"
          />
          <Link href={`mailto:${userData[0]?.creator?.email}`}>
            <Button title="Hire Me" leftIcon="/email.svg" />
          </Link>
        </div>
      </div>

      {userData?.length > 0 ? (
        <Image
          src={userData[0]?.image}
          alt="project image"
          width={500}
          height={400}
          className="rounded-xl object-contain"
        />
      ) : (
        <Image
          src="/profile-post.png"
          width={500}
          height={400}
          alt="project image"
          className="rounded-xl"
        />
      )}
    </section>

    <section className="flexStart flex-col lg:mt-28 mt-16 w-full">
      <p className="w-full text-left text-lg font-semibold">Recent Work</p>

      <div className="profile_projects">
        {userData?.map((node: ProjectInterface) => (
          <ProjectCard
            key={`${node?._id}`}
            id={node?._id}
            image={node?.image}
            title={node?.title}
            name={userData[0].creator.name}
            avatarUrl={userData[0].creator.avatarUrl}
            userId={userData[0].creator._id}
          />
        ))}
      </div>
    </section>
  </section>
);

export default ProfilePage;
