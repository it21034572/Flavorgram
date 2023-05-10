package com.flavorgram.fgserver.service.authentication;

import java.security.Principal;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.flavorgram.fgserver.dto.authentication.AuthenticationRequest;
import com.flavorgram.fgserver.dto.authentication.AuthenticationResponse;
import com.flavorgram.fgserver.dto.authentication.RegisterRequest;
import com.flavorgram.fgserver.exception.authentication.UserAlreadyExistsException;
import com.flavorgram.fgserver.model.authentication.Role;
import com.flavorgram.fgserver.model.authentication.User;
import com.flavorgram.fgserver.model.authentication.UserData;
import com.flavorgram.fgserver.repository.authentication.UserDataRepository;
import com.flavorgram.fgserver.repository.authentication.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  private final UserDataRepository userDataRepository;

  public AuthenticationResponse register(RegisterRequest request) {

    var existingUser = userRepository.findByEmail(request.getEmail()).orElse(null);

    if (existingUser != null) {
      throw new UserAlreadyExistsException("User already exists with email " + request.getEmail());
    }

    var user = User.builder()
        .firstName(request.getFirstname())
        .lastName(request.getLastname())
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .role(Role.ROLE_USER).build();

    userRepository.save(user);
    var userData = UserData.builder()
        .firstname(request.getFirstname())
        .lastname(request.getLastname())
        .email(request.getEmail())
        .interestedCatgories(request.getInterestedCategories())
        .username(request.getUsername()).build();

    userDataRepository.save(userData);

    var jwtToken = jwtService.generateToken(user);
    return AuthenticationResponse.builder()
        .token(jwtToken)
        .build();

  }

  public AuthenticationResponse authenticate(AuthenticationRequest request) {

    var user = userRepository.findByEmail(request.getEmail()).orElse(null);

    if (user == null) {
      throw new UsernameNotFoundException("User with email " + request.getEmail() + " does not exist!");
    }

    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getEmail(),
            request.getPassword()));

    var jwtToken = jwtService.generateToken(user);
    return AuthenticationResponse.builder()
        .token(jwtToken)
        .build();
  }

  public UserData getSocialUser(String email) {
    var user = userDataRepository.findByEmail(email).orElse(null);
    var u = userRepository.findByEmail(email).orElse(null);
    if (user == null) {
      throw new UsernameNotFoundException("User with email " + email + " is not registered!");
    }

    user.setUser_id(u.getId());

    return user;
  }

  public UserData saveUserData(UserData userData) {
    var user = userDataRepository.findByEmail(userData.getEmail()).orElse(null);
    if (user != null) {
      throw new UserAlreadyExistsException("User " + userData.getEmail() + " is already registered!");
    }

    UserData userDataResponse = userDataRepository.save(userData);

    return userDataResponse;

  }

}
