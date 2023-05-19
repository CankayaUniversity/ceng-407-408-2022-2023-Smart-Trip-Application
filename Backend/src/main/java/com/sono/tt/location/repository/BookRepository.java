package com.sono.tt.location;

import com.sono.tt.location.model.Book;
import io.micronaut.core.annotation.NonNull;

import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Optional;

public interface BookRepository {
    @NonNull
    List<Book> findAll();

    @NonNull
    Optional<Book> findById(@NonNull @NotBlank String id);

    void delete(@NonNull @NotBlank String id);

    @NonNull
    String save(@NonNull @NotBlank String isbn,
                @NonNull @NotBlank String name);
}
