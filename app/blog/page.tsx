import { BlogPosts } from "app/components/posts";
import { PageScramble } from "../PageScramble";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section>
      <PageScramble>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
          My Blog
        </h1>
        <BlogPosts />
      </PageScramble>
    </section>
  );
}
