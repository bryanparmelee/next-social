import { getCurrentUser } from "@/lib/session";
import { getPostDetails } from "@/lib/actions";
import { PostInterface } from "@/common.types";
import Image from "next/image";

const Post = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  const result = (await getPostDetails(id)) as { post?: PostInterface };

  if (!result?.post) {
    <p>Project not found.</p>;
  }
  const postDetails = result?.post;
  console.log(result?.post);

  return (
    <div>
      <h1>{postDetails?.title}</h1>
      <Image src={`${postDetails?.image}`} alt={`${postDetails?.title}`} />
      <p>{postDetails?.description}</p>
    </div>
  );
};

export default Post;
