package com.sono.tt.location.model;

import com.sono.tt.location.Identified;
import io.micronaut.core.annotation.NonNull;
import io.micronaut.serde.annotation.Serdeable;

import javax.validation.constraints.NotBlank;

@Serdeable
public class Location implements Identified {

    @NonNull
    @NotBlank
    private final String id;
    private String name;
    private String latitude;
    private String longitude;
    private String IsAvm;

    public Location(@NonNull String id, String name, String latitude, String longitude, String isAvm) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.IsAvm = isAvm;
    }

    @Override
    @NonNull
    public String getId() {
        return id;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getIsAvm() {
        return IsAvm;
    }

    public void setIsAvm(String IsAvm) {
        this.IsAvm = IsAvm;
    }




}

