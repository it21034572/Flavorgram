package com.flavorgram.fgserver.controller.authentication;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.flavorgram.fgserver.controller.Post.PostController;
import com.flavorgram.fgserver.model.authentication.UserData;
import com.flavorgram.fgserver.service.authentication.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class HomeController {

  private final AuthenticationService authenticationService;

  /**
   * Get user details
   * 
   * @param principal
   * @return user details as principal
   */
  @CrossOrigin
  @GetMapping("/social")
  @ResponseStatus(HttpStatus.OK)
  public EntityModel<UserData> socialUser(
      OAuth2AuthenticationToken oAuth2AuthenticationToken) {
    try {

      var user = authenticationService.getSocialUser(oAuth2AuthenticationToken.getPrincipal().getAttribute("email"));
      EntityModel<UserData> userDataWithLinks = EntityModel.of(user);
      userDataWithLinks.add(
          WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(PostController.class).getAllPosts()).withRel("post"));
      return userDataWithLinks;
    } catch (UsernameNotFoundException e) {

      String name = oAuth2AuthenticationToken.getPrincipal().getAttribute("name");
      String firstName = "";
      String lastName = "";

      if (name != null) {

        if (name.split(" ")[0] != null) {

          firstName = name.split(" ")[0];
        }
        if (name.split(" ")[1] != null) {

          lastName = name.split(" ")[1];
        }

      }

      var userData = UserData.builder()
          .email(oAuth2AuthenticationToken.getPrincipal().getAttribute("email"))
          .firstname(firstName)
          .lastname(lastName)
          .username(firstName + "_" + lastName)
          .build();
      authenticationService.saveUserData(userData);

      var user = authenticationService.getSocialUser(oAuth2AuthenticationToken.getPrincipal().getAttribute("email"));
      EntityModel<UserData> userDataWithLinks = EntityModel.of(user);
      userDataWithLinks.add(
          WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(PostController.class).getAllPosts()).withRel("post"));
      return userDataWithLinks;

    }
  }

  @CrossOrigin
  @GetMapping("/user")
  @ResponseStatus(HttpStatus.OK)
  public EntityModel<UserData> user(
      UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken) {
    var user = authenticationService.getSocialUser(usernamePasswordAuthenticationToken.getName());

    EntityModel<UserData> userDataWithLinks = EntityModel.of(user);
    userDataWithLinks
        .add(WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(PostController.class).getAllPosts()).withRel("post"));
    return userDataWithLinks;
  }

}