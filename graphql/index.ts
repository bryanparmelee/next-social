export const postsQuery = `
query PostCollection {
    postCollection(last: 8) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          description
          id
          image
          createdBy {
            id
            email
            name
            avatarUrl
          }
        }
      }
    }
  }
`;

export const getPostByIdQuery = `
query GetPostById($id: ID!) {
    post(by: { id: $id }) {
      id
      title
      description
      image          
      createdBy {
        id
        name
        email
        avatarUrl
      }
    }
  }
`;

export const getUserQuery = `
    query GetUser($email: String!) {
        user(by: { email: $email }) {
            id
            name
            email
            avatarUrl
            description
        }
    }
`;

export const createUserMutation = `
    mutation CreateUser($input: UserCreateInput!) {
        userCreate(input: $input) {
            user {
                name
                email
                avatarUrl
                description
                id
            }
        }
    }
`;

export const createPostMutation = `
	mutation CreatePost($input: PostCreateInput!) {
		postCreate(input: $input) {
			post {
				id
				title
				description
				createdBy {
					email
					name
				}
			}
		}
	}
`;

export const createCommentMutation = `
  mutation CreateComment($input: CommentCreateInput!) {
    commentCreate(input: $input) {
      comment {
        message
        id
        createdAt
        postedBy {
          name
        }
        post {
          id
        }
      }
    }
  }
`;

export const updatePostMutation = `
	mutation UpdatePost($id: ID!, $input: PostUpdateInput!) {
		postUpdate(by: { id: $id }, input: $input) {
			post {
				id
				title
				description
				createdBy {
					email
					name
				}
			}
		}
	}
`;

export const deletePostMutation = `
  mutation DeletePost($id: ID!) {
    postDelete(by: { id: $id }) {
      deletedId
    }
  }
`;
