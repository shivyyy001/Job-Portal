package com.springbootrest.SpringBootRest;

import com.springbootrest.SpringBootRest.model.JobPost;
import com.springbootrest.SpringBootRest.service.JobService;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller // thinks we are returning view name
// hence add ResponseBody annotation with method
// or we can use @RestController here
@CrossOrigin(origins = "http://localhost:3000")
// enables cross origin for frontend
public class JobController {

    @Autowired
    private JobService service;

    @GetMapping("jobPosts")
    @ResponseBody
    public List<JobPost> getAllJobs() {
        return service.getAllJobs();
    }

//    @GetMapping(path="jobPost/{postId}", produces = "application/xml")
    @GetMapping("jobPost/{postId}")
    @ResponseBody
    public JobPost getJob(@PathVariable("postId") int postId) {
        return service.getJob(postId);
    }

//    @PostMapping(path = "jobPost", consumes = "application/xml", produces = "application/json")
    @PostMapping("jobPost")
    @ResponseBody
    public JobPost addJob(@RequestBody JobPost job) {
        service.addJob(job);
        return service.getJob(job.getPostId());
    }

    @PutMapping("jobPost")
    @ResponseBody
    public JobPost updateJob(@RequestBody JobPost job) {
        service.updateJob(job);
        return service.getJob(job.getPostId());
    }

    @DeleteMapping("jobPost/{postId}")
    @ResponseBody
    public String deleteJob(@PathVariable int postId) {
        return service.deleteJob(postId);
    }

    @GetMapping("load")
    @ResponseBody
    public String loadData() {
        service.load();
        return "success";
    }

    @GetMapping("jobPosts/keyword/{keyword}")
    @ResponseBody
    public List<JobPost> searchByKeyword(@PathVariable String keyword) {
        return service.search(keyword);
    }

}
