package com.flavorgram.fgserver.service.Profile;

import java.util.List;

import org.springframework.stereotype.Service;

import com.flavorgram.fgserver.exception.ResourceNotFoundException;
//import com.flavorgram.fgserver.model.Profile.SuggestedUser;
import com.flavorgram.fgserver.model.authentication.User;
import com.flavorgram.fgserver.repository.authentication.UserRepository;

import lombok.RequiredArgsConstructor;



@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User getUserById(String id){
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User","id",id));
    }

    public User createUser(User user){
        return userRepository.save(user);
    }

    public void deleteUser(String id) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        userRepository.delete(existingUser);
    }
    
    public void followUser(String userId, String followedUserId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        User followedUser = userRepository.findById(followedUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", followedUserId));
        user.getFollowing().add(followedUser.getId());
        followedUser.getFollows().add(user.getId());
        userRepository.save(user);
        userRepository.save(followedUser);
    }
    
    public void unfollowUser(String userId, String unfollowedUserId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        User unfollowedUser = userRepository.findById(unfollowedUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", unfollowedUserId));
        user.getFollowing().remove(unfollowedUser.getId());
        unfollowedUser.getFollows().remove(user.getId());
        userRepository.save(user);
        userRepository.save(unfollowedUser);
    }

    // public String addPhoto(String title, MultiPartFile file) throws IOException{
    //     User user = userRepository.save(title);
    // }

    public User updateUser(String id, User user){
        User existingUser = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());
        existingUser.setProfilePicture(user.getProfilePicture());
        existingUser.setFollows(user.getFollows());
        existingUser.setFollowing(user.getFollowing());
        existingUser.setBio(user.getBio());
        return userRepository.save(existingUser);
    }

    // public List<SuggestedUser> getSuggestedUsers(String userId) {
    //     // Get the user by ID
    //     User user = userRepository.findById(userId);

    //     // Get the user's followers
    //     List<String> followers = user.getFollowers();

    //     // Get all users who aren't followers of this user
    //     List<User> nonFollowers = userRepository.findAll()
    //         .stream()
    //         .filter(u -> !followers.contains(u.getId()))
    //         .collect(Collectors.toList());

    //     // Convert to suggested user objects
    //     List<SuggestedUser> suggestedUsers = nonFollowers.stream()
    //         .map(u -> new SuggestedUser(u.getId(), u.getName()))
    //         .collect(Collectors.toList());

    //     return suggestedUsers;
    // }
}
