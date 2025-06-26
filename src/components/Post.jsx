import { useGetPostQuery } from "../features/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { handleEdit, setFromData } from "../features/handle_form/postformSlice";

export default function Post({ id }) {
    console.log(id);
    const { data: post, isError, isLoading, error } = useGetPostQuery(id);
    let content;
    const isEdit = useSelector((state) => state.postshandle.isEdit);
     const dispatch = useDispatch();
    const handleEEdit = (post) =>{
        if(!isEdit){
         dispatch(handleEdit());
        }
        dispatch(setFromData({id:id,title:post.title,body:post.body}));
    }


    if (isLoading) {
        content = <h1>Loading post...</h1>;
    }
    if (!isLoading && isError) {
        content = (
            <h1 className="text-red-500">Something wrong happened - {error}</h1>
        );
    }
    if (!isLoading && !isError) {
        if (post.id) {
            content = <p>{post.body} <button onClick={()=>handleEEdit(post)} className="px-3 py-2 text-white bg-blue-500 rounded">Edit</button></p>;
        } else {
            content = <h1>No post found!</h1>;
        }
    }

    return (
        <div className="p-10 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow">
            {content}
        </div>
    );
}
