package com.sono.tt.location.controller;
import com.sono.tt.location.model.User;
import com.sono.tt.location.repository.UserRepository;


import io.micronaut.core.annotation.NonNull;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.*;
import io.micronaut.http.uri.UriBuilder;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.scheduling.annotation.ExecuteOn;

import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Optional;

@ExecuteOn(TaskExecutors.IO) // <1>
@Controller("/user") // <2>
public class UsersController {

    private final UserRepository userRepository;

    public UsersController(UserRepository userRepository) { // <3>
        this.userRepository = userRepository;
    }

    @Get // <4>
    public List<User> index() {
        return userRepository.findAll();
    }

    @Post // <5>
    public HttpResponse<?> save(@Body("username") @NonNull @NotBlank String username, // <6>
                             @Body("mail") @NonNull @NotBlank String mail, @Body("password") @NonNull @NotBlank String password) {
        String id = userRepository.save(username, mail, password);
        return HttpResponse.created(UriBuilder.of("/user").path(id).build());
    }

    @Get("/{id}") // <7>
    public Optional<User> show(@PathVariable @NonNull @NotBlank String id) { // <8>
        return userRepository.findById(id);
    }

    @Delete("/{id}") // <9>
    @Status(HttpStatus.NO_CONTENT) // <10>
    public void delete(@PathVariable @NonNull @NotBlank String id) {
        userRepository.delete(id);
    }
}
