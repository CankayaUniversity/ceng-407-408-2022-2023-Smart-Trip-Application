package com.sono.tt.location.model;

import com.sono.tt.location.Identified;
import io.micronaut.core.annotation.NonNull;
import io.micronaut.http.annotation.RequestAttribute;
import io.micronaut.serde.annotation.Serdeable;
import javax.validation.constraints.NotBlank;

import software.amazon.awssdk.services.dynamodb.model.AttributeDefinition;


@Serdeable // <1>
public class User implements Identified {

    @NonNull
    @NotBlank // <2>
    private final String id;
    private String username;
    private String mail;
    private String password;


    public User(@NonNull String id,
                String username,
                String mail,
                String password) {
        this.id = id;
        this.username = username;
        this.mail = mail;
        this.password = password;
    }

    @Override
    @NonNull
    public String getId() {
        return id;
    }

    public String getMail() {
        return mail;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {return password;}
}
