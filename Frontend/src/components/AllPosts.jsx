import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Edit';

import {
  Box,
    Card,
    Grid,
    InputAdornment,
    TextField,
    Typography,
  } from "@mui/material";
  import axios from "axios";
  import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [query, setQuery] = useState("");
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

const handleEdit = (id) => {
  navigate("/edit",{state:{id}});
}

    // useEffect(() => {
    //   const fetchPosts = async () => {
    //     const response = await axios.get(`http://localhost:8080/jobPosts/keyword/${query}`);    
    //     setPost(response.data);
    //   };
    //     const fetchInitialPosts = async () => {
    //         const response = await axios.get(`http://localhost:8080/jobPosts`);
    //         setPost(response.data);
    //     }
    //      fetchInitialPosts();
    //      if (query.length === 0) fetchInitialPosts();
    //      if (query.length > 2) fetchPosts();
    //   }, [query]);

      // Fetch Initial Job Posts only ONCE
  useEffect(() => {
    const fetchInitialPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/jobPosts`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching job posts", error);
      }
    };
    fetchInitialPosts();
  }, []); // Only runs on mount

  // Debounced Fetch for Search
  useEffect(() => {
    const fetchPosts = async () => {
      if (query.length > 2) {
        try {
          const response = await axios.get(
            `http://localhost:8080/jobPosts/keyword/${query}`
          );
          setPost(response.data);
        } catch (error) {
          console.error("Error fetching searched job posts", error);
        }
      }
    };

    // Debounce effect (waits 500ms before calling API)
    const delayDebounce = setTimeout(() => {
      if (query.length > 2) {
        fetchPosts();
      } else if (query.length === 0) {
        // Restore initial posts when query is empty
        axios.get(`http://localhost:8080/jobPosts`).then((response) => {
          setPost(response.data);
        });
      }
    }, 500); // Adjust debounce time if needed

    return () => clearTimeout(delayDebounce);
  }, [query]);

      const handleDelete = (id) => {
        async function deletePost() {
          await axios.delete(`http://localhost:8080/jobPost/${id}`);
      }
      deletePost();
      window.location.reload();
      }

  return (
    <>
      <Grid container spacing={2} sx={{ margin: "2%" }}>
      <Grid item xs={12} sx={12} md={12} lg={12}>
      <Box>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Search..."
            sx={{ width: "75%", padding: "2% auto" }}
            fullWidth
            onChange={(e) => setQuery(e.target.value)}
          />
        </Box>
      </Grid>
      {post &&
        post.map((p) => {
          return (
            <Grid key={p.id} item xs={12} md={6} lg={4}>
              <Card sx={{ padding: "3%", overflow: "hidden", width: "84%", backgroundColor:"#ADD8E6" }}>
                <Typography        
                  variant="h5"
                  sx={{ fontSize: "2rem", fontWeight: "600", fontFamily:"sans-serif" }}
                >
             {p.postProfile}
                </Typography>
                <Typography  sx={{ color: "#585858", marginTop:"2%", fontFamily:"cursive" }} variant="body" >
                  Description: {p.postDesc}
                </Typography>
                <br />
                <br />
                <Typography variant="h6" sx={{ fontFamily:"unset", fontSize:"400"}}>
                  Experience: {p.reqExperience} years
                </Typography>
                <Typography sx={{fontFamily:"serif",fontSize:"400"}} gutterBottom  variant="body">Skills : </Typography>
                {p.postTechStack.map((s, i) => {
                  return (
                    <Typography variant="body" gutterBottom key={i}>
                      {s} .
                      {` `}
                    </Typography>
                  );
                })}
               <DeleteIcon onClick={() => handleDelete(p.postId)} />
                <EditIcon onClick={() => handleEdit(p.postId)} />
              </Card>
            </Grid>
          );
        })}
    </Grid>
    </>
 
  )
}

export default Search