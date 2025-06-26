import { useState, useEffect } from "react";
import {
  useAddPostMutation,
  useEditPostMutation,
} from "../features/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import {  handleOpen, setFromData } from "../features/handle_form/postformSlice";

export default function PostForm() {
  const dispatch = useDispatch();
  const { id, title: initialTitle, body: initialBody, isEdit } = useSelector((state) => state.postshandle);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [addPost, { isLoading: isAdding, isSuccess: isAdded }] = useAddPostMutation();
  const [editPost, { isLoading: isEditing, isSuccess: isEdited }] = useEditPostMutation();

  useEffect(() => {
    if (isEdit) {
      setTitle(initialTitle);
      setContent(initialBody);
    }
  }, [isEdit, initialTitle, initialBody]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (isEdit) {
      await editPost({ id, data: { title, body: content } });
      dispatch(setFromData({title:"",body:"",id:null}));
        setTitle("");
      setContent("");
      
    } else {
      await addPost({ title, body: content });
      setTitle("");
      setContent("");
    }
  };



  return (
    <div className="fixed w-full h-full bg-black/50 top-0 left-0 ">
   
  
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-lg shadow-md  mx-auto">
    
    <div className="flex justify-end">
         <button className="px-3 py-2 bg-red-200/50 rounded-md text-red-500 m-5" onClick={()=>dispatch(handleOpen())}>Close Form</button>
    </div>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {isEdit ? "✏️ Edit Post" : "📝 Create a New Post"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
          type="text"
          placeholder="Post Title"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post Content"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400 min-h-[120px]"
        ></textarea>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isAdding || isEditing}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition disabled:opacity-50"
          >
            {isAdding || isEditing
              ? isEdit
                ? "Updating..."
                : "Saving..."
              : isEdit
              ? "Update Post"
              : "Save Post"}
          </button>

          {isEdit && (
            <button
              type="button"
              onClick={()=>dispatch(handleOpen())}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {!isEdit && isAdded && (
        <p className="mt-4 text-green-600 text-center font-semibold">
          ✅ Post created successfully!
        </p>
      )}
      {isEdited && 
        <p className="mt-4 text-green-600 text-center font-semibold">
          ✏️ Post Updated successfully!
        </p>
      }
    </div> 
     </div>
  );
}
