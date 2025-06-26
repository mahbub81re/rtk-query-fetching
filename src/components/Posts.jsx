import { useState } from "react";
import { useDeletePostMutation, useGetPostsQuery } from "../features/api/apiSlice";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { handleOpen, setFromData } from "../features/handle_form/postformSlice";


export default function Posts() {
    const [currentPostId, setCurrentPostId] = useState(null);
    const isOpen = useSelector((state) => state.postshandle.isOpen);
    const { data: posts, isLoading, isError, error } = useGetPostsQuery(20);
    const dispatch = useDispatch();
    let content;
      const [deletePost, { isLoading: isDeleting, isSuccess: isDelete }] =
        useDeletePostMutation();
    const isEdit = useSelector((state) => state.postshandle.isEdit);

       const handleEEdit = (post) =>{
           dispatch(setFromData({id:post.id,title:post.title,body:post.body}));
          
       }
   


    if (isLoading) {
        content = <h1>Loading posts...</h1>;
    }
    if (!isLoading && isError) {
        content = (
            <h1 className="text-red-500">Something wrong happened - {error}</h1>
        );
    }
    if (!isLoading && !isError) {
        if (posts.length > 0) {
            content = (
                <ul>
                    {posts.map((post) => (
                        <li
                            key={post.id}
                            style={{
                                listStyleType: "sqaure",
                            }}
                            className="flex justify-between "
                        >
                            <a
                                href="#"
                                className="w-[200px]"
                                onClick={() => setCurrentPostId(post.id)}
                            >
                                {post.title}
                            </a>
                             <button 
                             className="m-3 px-3 py-2 bg-green-500 rounded-md" 
                             onClick={()=> handleEEdit(post)}>
                            Edit </button>
                             <button 
                             className="m-3 px-3 py-2 bg-red-500 rounded-md text-white" 
                             onClick={()=> deletePost(post.id)}>
                            Delete {isDeleting && "..."}</button>
                        </li>
                    ))}
                </ul>
            );
        } else {
            content = <h1>No posts found!</h1>;
        }
    }

    return (
        <div className="p-10 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow">
            {content}
            <button className="px-3 py-2 bg-blue-500 rounder text-white" onClick={()=>dispatch(handleOpen())}>{isOpen ? "Close Form" :"Open Form"}</button>
            {currentPostId && (
                <div className="max-w-md mx-auto mt-10 space-y-5">
                    <Post id={currentPostId} />
                </div>
            )}
        </div>
    );
}
