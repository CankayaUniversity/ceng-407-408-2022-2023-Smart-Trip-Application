package com.sono.tt.location.controller;
import com.sono.tt.location.model.Location;
import com.sono.tt.location.repository.LocationRepository;

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

@ExecuteOn(TaskExecutors.IO)
@Controller("/facility") // <1>
public class FacilityController {

    private final LocationRepository locationRepository;

    public FacilityController(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @Get
    public List<Location> index() {
        return locationRepository.findAll();
    }

    @Post
    public HttpResponse<?> save(@Body @NonNull Location location) {
        String id = locationRepository.save(location);
        return HttpResponse.created(UriBuilder.of("/facility").path(id).build()); // <2>
    }

    @Get("/{id}")
    public Optional<Location> show(@PathVariable @NonNull @NotBlank String id) {
        return locationRepository.findById(id);
    }

    @Delete("/{id}")
    @Status(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NonNull @NotBlank String id) {
        locationRepository.delete(id);
    }
}


