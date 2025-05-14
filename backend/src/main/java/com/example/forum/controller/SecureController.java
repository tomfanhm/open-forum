package com.example.forum.controller;

import com.example.forum.dto.response.MessageResponse;
import com.example.forum.security.FirebaseUserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class SecureController {

    @GetMapping("/public")
    public ResponseEntity<MessageResponse> getPublic() {
        MessageResponse response = new MessageResponse();
        response.setMessage("Hello World!");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/protected")
    public ResponseEntity<Map<String, Object>> getProtected(@AuthenticationPrincipal FirebaseUserDetails userDetails) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "This is a protected endpoint");
        response.put("uid", userDetails.getUsername());
        response.put("email", userDetails.getToken().getClaims().get("email"));
        return ResponseEntity.ok(response);
    }
}
