package com.sono.tt.location.model;

import com.sono.tt.location.Identified;
import io.micronaut.core.annotation.NonNull;
import io.micronaut.serde.annotation.Serdeable;

import javax.validation.constraints.NotBlank;

@Serdeable
public class Facility implements Identified {

    @NonNull
    @NotBlank
    private final String id;

    private Location location;

    private User user;
    private String Timestamp;
    private String Note;
    private String AdditionalComment;

    public Facility(@NonNull String id,Location location, User user, String Timestamp, String Note, String AdditionalComment) {
        this.id = id;
        this.location = location;
        this.user = user;
        this.Timestamp = Timestamp;
        this.Note = Note;
        this.AdditionalComment = AdditionalComment;
    }
    @Override
    @NonNull
    public String getId() {
        return id;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    public String getTimestamp() {
        return Timestamp;
    }

    public void setTimestamp(String name) {
        this.Timestamp = Timestamp;
    }

    public String getNote() {
        return Note;
    }

    public void setNote(String note) {
        this.Note = Note;
    }

    public String getAdditionalComment() {
        return AdditionalComment;
    }

    public void setAdditionalComment(String AdditionalComment) {
        this.AdditionalComment = AdditionalComment;
    }


}

