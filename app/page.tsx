import { fetchAllPosts } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import PostCard from "@/components/PostCard";
import CommentForm from "@/components/CommentForm";
import { PostInterface } from "@/common.types";

type PostSearch = {
  postCollection: {
    edges: { node: PostInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

const Home = async () => {
  const data = (await fetchAllPosts()) as PostSearch;
  const session = await getCurrentUser();

  const postsToDisplay = data?.postCollection?.edges || [];
  console.log("Here are the posts", postsToDisplay);
  if (postsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <p className="no-result-test text-center">No posts found.</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Category</h1>

      <section className="projects-grid">
        {postsToDisplay.map(({ node }: { node: PostInterface }) => (
          <>
            <PostCard
              key={node?.id}
              id={node?.id}
              image={node?.image}
              title={node?.title}
              name={node?.createdBy?.name}
              avatarUrl={node?.createdBy?.avatarUrl}
              userId={node?.createdBy?.id}
            />
            <CommentForm postId={node?.id} session={session} />
          </>
        ))}
      </section>

      <h1>LocalMore</h1>
    </section>
  );
};

export default Home;
