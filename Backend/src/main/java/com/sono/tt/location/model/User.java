package com.sono.tt.location.model;

import com.sono.tt.location.Identified;
import io.micronaut.core.annotation.NonNull;
import io.micronaut.serde.annotation.Serdeable;
import javax.validation.constraints.NotBlank;


@Serdeable // <1>
public class User implements Identified {

    @NonNull
    @NotBlank // <2>
    private final String id;
    private String username;
    private String email;
    private String password;

    private String icon;


    public User(@NonNull String id,
                String username,
                String email,
                String password,
                String icon) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.icon = icon;
    }

    @Override
    @NonNull
    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {return password;}

    public void setUsername(String username){ this.username = username; }
    public  void setEmail(String email){ this.email = email; }
    public  void setPassword(String password){ this.password = password; }
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
}
