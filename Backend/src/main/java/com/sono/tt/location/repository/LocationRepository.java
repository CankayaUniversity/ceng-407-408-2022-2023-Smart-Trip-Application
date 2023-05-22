package com.sono.tt.location.repository;

import com.sono.tt.location.model.Location;

import java.util.List;
import java.util.Optional;

public interface LocationRepository {
    List<Location> findAll();

    String save(Location location);

    Optional<Location> findById(String id);

    void delete(String id);
}
