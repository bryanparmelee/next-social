"use client";

import { SessionInterface } from "@/common.types";
import { ChangeEvent, FormEvent, useState } from "react";
import Button from "./Button";
import { createNewComment, fetchToken } from "@/lib/actions";
import { useRouter } from "next/navigation";

type Props = {
  postId: string;
  session: SessionInterface;
};

const CommentForm = ({ postId, session }: Props) => {
  const router = useRouter();
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { token } = await fetchToken();
    try {
      await createNewComment(message, postId, session?.user?.id, token);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleStateChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage((prev) => e.target.value);
  };

  const [message, setMessage] = useState("");

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form bg-white m-8">
      <textarea
        aria-label="Add a comment"
        placeholder="Add a comment"
        name="comment"
        value={message}
        onChange={handleStateChange}
      >
        {message}
      </textarea>
      <div className="flexStart w-full">
        {message.length > 0 && (
          <span role="button" onClick={handleFormSubmit}>
            Post
          </span>
        )}
      </div>
    </form>
  );
};

export default CommentForm;
