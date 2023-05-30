package com.sono.tt.location.security;

import com.sono.tt.location.repository.UserRepository;
import io.micronaut.core.annotation.Nullable;
import io.micronaut.http.HttpRequest;
import io.micronaut.security.authentication.AuthenticationProvider;
import io.micronaut.security.authentication.AuthenticationRequest;
import io.micronaut.security.authentication.AuthenticationResponse;
import jakarta.inject.Singleton;
import org.reactivestreams.Publisher;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;

import java.util.Map;
import java.util.Objects;

@Singleton
public class AuthenticationProviderUserPassword implements AuthenticationProvider {

    private final UserRepository userRepository;

    public AuthenticationProviderUserPassword(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Publisher<AuthenticationResponse> authenticate(@Nullable HttpRequest<?> httpRequest, AuthenticationRequest<?, ?> authenticationRequest) {
        return Flux.create(emitter -> {
            userRepository.findByEmail((String) authenticationRequest.getIdentity())
                    .filter(user -> Objects.equals(user.getPassword(), authenticationRequest.getSecret()))
                    .ifPresentOrElse(
                            user -> {
                                // user exists and password matches
                                emitter.next(AuthenticationResponse.success(
                                        (String) authenticationRequest.getIdentity(),
                                        Map.of(
                                                "id", user.getId(),
                                                "name", user.getUsername()
                                        )
                                ));
                                emitter.complete();
                            },
                            // user does not exist or password does not match
                            () -> emitter.error(AuthenticationResponse.exception())
                    );
        }, FluxSink.OverflowStrategy.ERROR);
    }

}
