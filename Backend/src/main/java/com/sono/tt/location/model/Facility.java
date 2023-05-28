package com.sono.tt.location.model;

import com.sono.tt.location.Identified;
import io.micronaut.core.annotation.NonNull;
import io.micronaut.serde.annotation.Serdeable;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Serdeable
public class Facility implements Identified {

    @NonNull
    @NotBlank
    private final String id;
    private String facilityName;
    private String latitude;
    private String longitude;
    private String IsAvm;
    private String userId;
    private String Timestamp;
    private String AdditionalComment;
    private String rating;
    private List<String> comments;
    private String hasToilet;
    private String hasDisabled;
    private String hasBabycare;
    private String hasMosque;

    public Facility(@NonNull String id, String facilityName,String latitude, String longitude, String IsAvm, String userId, String Timestamp, String AdditionalComment,
                    String rating, List<String> comments, String hasToilet, String hasDisabled, String hasBabycare, String hasMosque) {
        this.id = id;
        this.facilityName = facilityName;
        this.latitude = latitude;
        this.longitude = longitude;
        this.IsAvm = IsAvm;
        this.userId = userId;
        this.Timestamp = Timestamp;
        this.AdditionalComment = AdditionalComment;
        this.rating = rating;
        this.comments = comments;
        this.hasToilet = hasToilet;
        this.hasDisabled = hasDisabled;
        this.hasBabycare = hasBabycare;
        this.hasMosque = hasMosque;
    }
    @Override
    @NonNull
    public String getId() {
        return id;
    }

    public String getFacilityName() {
        return facilityName;
    }

    public void setFacilityName(String facilityName) {
        this.facilityName = facilityName;
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

    public void setIsAvm(String isAvm) {
        IsAvm = isAvm;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getTimestamp() {
        return Timestamp;
    }

    public void setTimestamp(String timestamp) {
        Timestamp = timestamp;
    }

    public String getAdditionalComment() {
        return AdditionalComment;
    }

    public void setAdditionalComment(String additionalComment) {
        AdditionalComment = additionalComment;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public List<String> getComments() {
        return comments;
    }

    public void setComments(List<String> comments) {
        this.comments = comments;
    }

    public String getHasToilet() {
        return hasToilet;
    }

    public void setHasToilet(String hasToilet) {
        this.hasToilet = hasToilet;
    }

    public String getHasDisabled() {
        return hasDisabled;
    }

    public void setHasDisabled(String hasDisabled) {
        this.hasDisabled = hasDisabled;
    }

    public String getHasBabycare() {
        return hasBabycare;
    }

    public void setHasBabycare(String hasBabycare) {
        this.hasBabycare = hasBabycare;
    }

    public String getHasMosque() {
        return hasMosque;
    }

    public void setHasMosque(String hasMosque) {
        this.hasMosque = hasMosque;
    }

}

