package com.flavorgram.fgserver.dto.user;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class userRequest {
  private String firstName;
  private String lastName;
  private String username;
  private byte[] profilePic;
  private String bio;
}