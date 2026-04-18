package com.example.faculty_service.controller;

import com.example.faculty_service.model.Faculty;
import com.example.faculty_service.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/faculty")
public class FacultyController {

    @Autowired
    private FacultyService service;

    // POST: Register faculty
    @PostMapping("/register")
    public ResponseEntity<Faculty> register(
            @RequestBody Faculty faculty) {
        return new ResponseEntity<>(
                service.register(faculty), HttpStatus.CREATED);
    }

    // POST: Login faculty
    @PostMapping("/login")
    public ResponseEntity<String> login(
            @RequestBody Faculty loginRequest) {
        Optional<Faculty> faculty = service.login(
                loginRequest.getEmail(), loginRequest.getPassword());
        if (faculty.isPresent()) {
            return ResponseEntity.ok(
                    "Login successful. Welcome, "
                            + faculty.get().getFacultyName());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid credentials.");
    }
}