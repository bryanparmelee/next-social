import { getCurrentUser } from "@/lib/session";
import { getPostDetails } from "@/lib/actions";
import { PostInterface } from "@/common.types";
import Image from "next/image";

const Post = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  const result = (await getPostDetails(id)) as { post?: PostInterface };

  if (!result?.post) return <p>Project not found.</p>;

  const postDetails = result?.post;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex bg-blue-50">
        <Image
          className="rounded-xl"
          src={postDetails?.createdBy?.avatarUrl}
          alt={`${postDetails?.createdBy?.name}`}
          width={24}
          height={24}
        />
        <p>{postDetails?.createdBy?.name}</p>
      </div>
      <Image
        className=""
        src={`${postDetails?.image}`}
        alt={`${postDetails?.title}`}
        width={800}
        height={260}
      />
      <p>
        <span className="font-bold">{postDetails?.createdBy.name}</span>{" "}
        {postDetails?.description}
      </p>
    </div>
  );
};

export default Post;
