import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:3001/"

const initialState = {
    posts: [],
    postsSearch: [],
    addPostStatus:"",
    addPostError:"",
    getPostStatus:"",
    getPostError:"",
    deletePostStatus:"",
    deletePostError:"",
}

export const postAdd = createAsyncThunk("posts/postAdd", async (post, { rejectWithValue }) =>{
    try {
        const response = await axios.post(baseURL + "posts", post);
        return response.data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data)
    }
    
});

export const getPosts = createAsyncThunk("posts/getPosts", async (id = null, { rejectWithValue }) => {
    try {
        const response = await axios.get(baseURL + "posts");
        return response.data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data)
    }
});

export const deletePost = createAsyncThunk("posts/deletePost", async (id, {rejectWithValue}) =>{
    try {
        const response = await axios.delete(baseURL + "posts/" + id);
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        filteredPosts: (state, action) => {
            state.posts = state.postsSearch.filter(post => 
                post.name.toLowerCase().includes(action.payload.toLowerCase())
            );
        },
    },
    extraReducers: 
    (builder) => {
        // Manejar las acciones asincrónicas
        builder
        .addCase(postAdd.pending, (state, action) => {
            return{
                ...state,
                addPostStatus: "pending",
                addPostError:"",
                getPostStatus:"",
                getPostError:"",
                deletePostStatus:"",
                deletePostError:"",
            }
        })
        .addCase(postAdd.fulfilled, (state, action) => {
            return{
                ...state,
                posts: [...state.posts, action.payload],
                postsSearch: [...state.posts, action.payload],
                addPostStatus: "success",
                addPostError:"",
                getPostStatus:"",
                getPostError:"",
                deletePostStatus:"",
                deletePostError:"",
            }
        })
        .addCase(postAdd.rejected, (state, action) => {
            return{
                ...state,
                addPostStatus: "rejected",
                addPostError: action.payload,
                getPostStatus:"",
                getPostError:"",
                deletePostStatus:"",
                deletePostError:"",
            }
        }) 
        .addCase(getPosts.pending, (state, action) => {
            return{
                ...state,
                addPostStatus: "",
                addPostError:"",
                getPostStatus:"pending",
                getPostError:"",
                deletePostStatus:"",
                deletePostError:"",
            }
        })
        .addCase(getPosts.fulfilled, (state, action) => {
            return{
                ...state,
                posts: action.payload,
                postsSearch: action.payload,
                addPostStatus: "",
                addPostError:"",
                getPostStatus:"success",
                getPostError:"",
                deletePostStatus:"",
                deletePostError:"",
            }
        })
        .addCase(getPosts.rejected, (state, action) => {
            return{
                ...state,
                addPostStatus: "",
                addPostError: "",
                getPostStatus:"rejected",
                getPostError: action.payload,
                deletePostStatus:"",
                deletePostError:"",
            }
        })
        .addCase(deletePost.pending, (state, action) => {
            return{
                ...state,
                addPostStatus: "",
                addPostError:"",
                getPostStatus:"",
                getPostError:"",
                deletePostStatus:"pending",
                deletePostError:"",
            }
        })
        .addCase(deletePost.fulfilled, (state, action) => {
            const currentPosts = state.posts.filter((post) =>
                post.id !== action.payload.id 
            )
            return{
                ...state,
                posts: currentPosts,
                postsSearch: currentPosts,
                addPostStatus: "",
                addPostError:"",
                getPostStatus:"",
                getPostError:"",
                deletePostStatus:"success",
                deletePostError:"",
            }
        })
        .addCase(deletePost.rejected, (state, action) => {
            return{
                ...state,
                addPostStatus: "",
                addPostError: "",
                getPostStatus:"",
                getPostError: "",
                deletePostStatus:"rejected",
                deletePostError: action.payload,
            }
        });   
    }
})

export const { filteredPosts } = postSlice.actions;
export default postSlice.reducer;
